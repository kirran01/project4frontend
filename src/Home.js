import React from 'react';
import './App.css';
import InstagramEmbed from 'react-instagram-embed';
import { TwitterVideoEmbed } from 'react-twitter-embed';
import Login from './Login'
import Navbar from './Nav'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            link: ''
        }
    }
    componentDidMount() {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user._id;
            console.log(userId);
            fetch(`http://localhost:4000/api/user/user/${userId}`)
                .then(res => res.json())
                .then(user => {
                    console.log(user);
                    this.setState({
                        links: user.posts
                    })
                })

        }
    }

    onChange = (e) => {
        this.setState({ link: e.target.value })
    }


    onSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"))
        const userId = user._id
        const { links, link } = this.state;
        console.log({ post: link });
        fetch(`http://localhost:4000/api/user/updateposts/${userId}`, {
            method: "PUT",
            body: JSON.stringify({ post: link }),
            //specifies backend to expect json content 
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(res => {
                links.push(this.state.link);
                this.setState({ links: links });
            })
            .catch(err => {
                console.log(err)
            })



    }
    render() {
        return (
            <div>
                <h1> Upload instagram or twitter videos</h1>
                <form onSubmit={this.onSubmit}>
                    <div class="instructions">
                        <p> To find the link to a twitter video, you have to right click on the video and copy video address </p>
                    </div>
                    <input onChange={this.onChange} type="text" name="link" placeholder="Insert link to video" />
                    <button type="submit"> Upload </button>
                </form>
                {
                    this.state.links.length > 0 && this.state.links.map(link => {
                        if (link.includes('instagram')) {
                            return (
                                <InstagramEmbed
                                    url={link}
                                    maxWidth={320}
                                    hideCaption={false}
                                    containerTagName='div'
                                    protocol=''
                                    injectScript
                                    onLoading={() => { }}
                                    onSuccess={() => { }}
                                    onAfterRender={() => { }}
                                    onFailure={() => { }}
                                />
                            )
                        } else if (link.includes('twitter')) {
                            const split = link.split('status/');
                            return (
                                <TwitterVideoEmbed
                                    id={split[1]}
                                />
                            )
                        }



                    })
                }

            </div>
        )
    }
}

export default Home