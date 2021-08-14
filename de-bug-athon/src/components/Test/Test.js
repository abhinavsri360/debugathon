import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Button, Grid } from '@material-ui/core'
import FlipCountdown from '@rumess/react-flip-countdown'

function Test(props) {
    var [code, setCode] = useState(props.user.code.replace(/\\n/g, '\n').replace(/\\t/g, '\t'))
    var [time, setTime] = useState(new Date(new Date().getTime() + props.user.time * 60000))

    function handleEditorChange(value, event) {
        setCode(value)
    }

    const debug = () => {
        props.compileCode({
            userId: props.user.user,
            code: code,
            language: 'cpp'
        })
        setCode(props.user.code.replace(/\\n/g, '\n').replace(/\\t/g, '\t'))
        setTime(new Date(new Date().getTime() + props.user.time * 60000))
    }

    if (props.user.isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Grid container direction='row' justify='center' alignItems='center'>
                <Grid item xs={4}>
                    <h1>De-bug-athon</h1>
                </Grid>
                <Grid item xs={2} style={{ marginBlockStart: '0.67em', marginBlockEnd: '0.67em' }}>
                    <FlipCountdown
                        theme='light'
                        hideYear
                        hideMonth
                        hideDay
                        hideHour
                        endAtZero
                        size='small'
                        endAt={time}
                    />
                </Grid>
            </Grid>
            <div style={{ backgroundColor: '#fff', padding: '10px' }}>
                <Editor
                    height="75vh"
                    defaultLanguage="cpp"
                    defaultValue={code}
                    theme="light"
                    onChange={handleEditorChange}
                />
            </div>
            <Grid container direction='row' justify='center' alignItems='center' style={{ padding: '10px' }}>
                <Grid item xs={1}>
                    <Button disabled={props.user.level === 0} variant="contained" color="secondary" onClick={() => {debug()}}>
                        De-bug
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Test
