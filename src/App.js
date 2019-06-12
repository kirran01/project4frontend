import React from 'react';
import './App.css';
import InstagramEmbed from 'react-instagram-embed';
import { TwitterVideoEmbed } from 'react-twitter-embed';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login'
import Navbar from './Nav'




class App extends React.Component {

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
      this.setState({
        links: user.posts
      })
    }
  }

  onChange = (e) => {
    this.setState({ link: e.target.value })
  }


  onSubmit = (e) => {
    e.preventDefault();
    const { links } = this.state;
    links.push(this.state.link);
    this.setState({ links: links });


  }


  render() {
    return (
      <div>
        <Router>
          <Navbar />
          {/* <Route path="/"component={Home}/> */}
          <Route path="/login" component={Login} />
        </Router>

        <h1> Upload instagram or twitter videos</h1>

        <form onSubmit={this.onSubmit}>

          <div class="instructions">
            <p> To find the link to a twitter video, you have to right click on the video and copy video address </p>
          </div>
          <input onChange={this.onChange} type="text" name="link" placeholder="Insert link to video" />
          <button type="submit"> Upload </button>
        </form>


        {this.state.links.map(link => {

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
            console.log('What is my new string after i split it?', split);

            return (
              <TwitterVideoEmbed
                id={split[1]}
              />
            )

          }



        })}




      </div >


    )
  }


}

export default App;
