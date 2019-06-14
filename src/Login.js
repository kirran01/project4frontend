import React, { Component } from 'react'
import "./Login.css"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })


    }
    Login = (e) => {
        e.preventDefault()
        fetch('https://secret-wildwood-21633.herokuapp.com/api/user/login', {
            method: 'post',
            body: JSON.stringify({ email: this.state.email, password: this.state.password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user))
                this.history.push('/');
            })
    }
    render() {

        return (
            <div className="login-container">
                <form onSubmit={this.Login} className="form-container">
                    <h1 className="login-title">Login to your account</h1>
                    <label className="login-label">email</label>
                    <input className="login-input" type='email' name='email' onChange={this.onChange} />
                    <label className="login-label">password</label>
                    <input className="login-input" type='password' name='password' onChange={this.onChange} />
                    <button type='submit'>login</button>
                </form>
            </div>
        )
    }





}

export default Login