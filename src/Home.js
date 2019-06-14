import React from 'react';
import './Home.css';
import InstagramEmbed from 'react-instagram-embed';
import { TwitterVideoEmbed } from 'react-twitter-embed';
import Login from './Login'
import Navbar from './Nav'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            link: '',
            err: ""
        }
    }


    componentDidMount() {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user._id;
            console.log(userId);
            fetch(`https://secret-wildwood-21633.herokuapp.com/api/user/user/${userId}`)
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

    deletePost = (url) => {
        const user = JSON.parse(localStorage.getItem("user"))
        const userId = user._id
        console.log(userId)
        fetch(`https://secret-wildwood-21633.herokuapp.com/api/user/deletePost`, {
            method: "PUT",
            body: JSON.stringify({ post: url, id: userId }),
            //specifies backend to expect json content 
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(message => {
                //remove from front end automatically
                const { links } = this.state;
                const updatedLinks = links.filter(link => {
                    return link !== url
                })
                this.setState({
                    links: updatedLinks
                })
            })
    }


    onSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"))
        const userId = user._id
        const { links, link } = this.state;
        console.log({ post: link });
        fetch(`https://secret-wildwood-21633.herokuapp.com/api/user/updateposts/${userId}`, {
            method: "PUT",
            body: JSON.stringify({ post: link }),
            //specifies backend to expect json content 
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(res => res.json())
            .then(entry => {
                if (entry.nModified === 1) {
                    links.push(this.state.link);
                    this.setState({ links: links, err: "" });

                } else {
                    this.setState({
                        err: "video already exists"
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })



    }
    render() {
        return (
            <div>
                <h1> Upload instagram or twitter videos</h1>
                {this.state.err && <div>{this.state.err}</div>}
                <form onSubmit={this.onSubmit}>
                    <div className="instructions">
                        <p> To find the link to a twitter video, you have to right click on the video and copy video address </p>
                    </div>
                    <input onChange={this.onChange} type="text" name="link" placeholder="Insert link to video" />
                    <button className="button" type="submit"> Upload </button>
                </form>
                <div className="items-grid">
                    {
                        this.state.links.length > 0 && this.state.links.map(link => {
                            if (link.includes('instagram')) {
                                return (
                                    <div>
                                        <InstagramEmbed
                                            className="insta-video"
                                            url={link}
                                            hideCaption={true}
                                            containerTagName='div'
                                            protocol=''
                                            injectScript
                                            onLoading={() => { }}
                                            onSuccess={() => { }}
                                            onAfterRender={() => { }}
                                            onFailure={() => { }}
                                        />
                                        <button onClick={() => this.deletePost(link)}>delete</button>
                                    </div>
                                )
                            } else if (link.includes('twitter')) {
                                const split = link.split('status/');
                                return (
                                    <div>
                                        <TwitterVideoEmbed
                                            className="twitter-video"
                                            id={split[1]}

                                        />
                                        <button className="button" onClick={() => this.deletePost(link)}>delete</button>
                                    </div>
                                )
                            }



                        })
                    }
                </div>
            </div>
        )
    }
}

export default Home