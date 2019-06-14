import React, { Component } from 'react'
import "./Login.css"

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            err: ''
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })


    }
    Signup = (e) => {
        e.preventDefault()
        const { password, confirmPassword, email } = this.state;
        if (password === confirmPassword) {

            fetch('https://secret-wildwood-21633.herokuapp.com/api/user/signup', {
                method: 'post',
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user))
                    this.history.push('/');
                })
                .catch(err => console.log(err));

        } else {
            this.setState({ err: 'Passwords must match!' })
        }

    }
    render() {

        const { err } = this.state;

        return (
            <div className="login-container">
                {err && <div className="error"> {err} </div>}
                <form onSubmit={this.Signup} className="form-container">
                    <h1 className="login-title">Signup to get started</h1>
                    <label className="login-label">Email</label>
                    <input className="login-input" type='email' name='email' onChange={this.onChange} />
                    <label className="login-label">Password</label>
                    <input className="login-input" type='password' name='password' onChange={this.onChange} />
                    <label className="login-label">Confirm Password</label>
                    <input className="login-input" type='password' name='confirmPassword' onChange={this.onChange} />
                    <button type='submit'>Signup</button>
                </form>
            </div>
        )
    }





}

export default Signup