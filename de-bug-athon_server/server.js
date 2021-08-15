const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const InitiateMongoServer = require("./db")
InitiateMongoServer()
app.use(express.json())
const User = require("./User")
const Code = require("./Code")
const request = require("request")
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000

app.post("/login-auth", async (req, res) => {
  var userId = req.body.userId;
  try {
    let user = await User.findOne({
      userId
    });
    if (!user)
      return res.status(200).json({
        message: "user"
      });
    if (user.loggedIn === true) {
      res.status(200).json({
        message: 'session'
      });
    } else {
      user.loggedInAt = Date.now();
      user.loggedIn = true;
      user.level = 1;
      user.time = Date.now();
      user.save();
      var userLevel = user.level;
      const code = await Code.findOne({ level: userLevel });
      if (!code)
        return res.status(400).json({
          message: "Problem not found"
        });
      res.status(200).json({
        time: code.time,
        code: code.question,
        level: code.level,
        message: 'success'
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.post("/compile", async (req, res) => {
  var bodyObj = JSON.parse(JSON.stringify(req.body));

  var userId = bodyObj.userId.toString();
  var user = await User.findOne({
    userId
  });
  if (!user)
    return res.status(400).json({
      message: "User Not Exist"
    });

  const code = bodyObj.code.toString();
  const language = bodyObj.language.toString();

  var program = {
    script: code,
    language: language,
    stdin: "",
    versionIndex: "0",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  };

  var userLevel = user.level;
  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: program
    },
    async function (error, response, body) {
      // console.log("error:", error);
      // console.log("statusCode:", response && response.statusCode);
      // console.log("body:", body);
      try {
        const code2 = await Code.findOne({ level: userLevel });
        const maxCount = await Code.countDocuments({})
        if (code2.solution.toString() == body.output.toString().slice(0,-1)) {
          user.level = userLevel + 1;
          user.time = user.time.getTime() + (Date.now() - user.time.getTime());
          user.save();
          if ( user.level <= maxCount ) {
            newCode = await Code.findOne({ level: userLevel + 1 });
            res
              .status(200)
              .json({
                message: 'success',
                time: newCode.time,
                code: newCode.question,
                level: newCode.level
              });
          } else {
            res.status(200).json({
              message: 'win',
              time: 0,
              code: 'Congratulations on winning the buggathon!',
              level: 0
            });
          }
        } else {
          res.status(200).json({
            message: 'lose',
            time: code2.time,
            code: code2.question,
            level: code2.level
          });
        }
      } catch (err) {
        console.log(err)
        return res
          .status(500)
          .json({ message: 'Internal server err'})
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
