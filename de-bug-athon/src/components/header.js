import Test from './Test/Test'
import Login from './Login/Login'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { loginUser, compileCode } from '../redux/ActionCreator'
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'
//TODO: import actionCreators

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    compileCode: (creds) => dispatch(compileCode(creds))
})

class header extends Component {
    constructor (props) {
        super(props)
    
        this.state = {}
    }

    render() {
        const LoginComponent = () => {
            return (
                <Login loginUser={this.props.loginUser} />
            )
        }

        const TestDebugathon = () => {
            return (
                <Test user={this.props.user} compileCode={this.props.compileCode} />
            )
        }

        return (
            <>
                <Switch>
                    {this.props.user.valid ? (
                        <>
                            <Redirect to='/test' />
                            <Route path='/test' component={TestDebugathon} />
                        </>
                    ) : (
                        <>
                            <Redirect to='/login' />
                            <Route path='/login' component={LoginComponent} loginUser={this.props.loginUser} />
                        </>
                    )}
                    <Redirect to='/login' />
                </Switch>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(header))
