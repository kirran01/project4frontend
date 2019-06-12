import React, { Component } from 'react'

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
        fetch('http://localhost:4000/api/user/login', {
            method: 'post',
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        })
            .then(res => res.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user))
                //redirect user to his feed
            })
    }
    render() {

        return (
            <div>
                <form onSubmit={this.Login}>
                    <h1>email</h1>
                    <input type='email' name='email' onChange={this.onChange} />
                    <h1>password</h1>
                    <input type='password' name='password' onChange={this.onChange} />
                    <button type='submit'>login</button>
                </form>
            </div>
        )
    }





}

export default Login