import React from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer'
import PlayList from './components/PlayList.js'
import AddVideo from './components/AddVideo.js'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

class App extends React.Component {
    constructor(props){
      super(props);
    }
    
    render(){
  	  return (
        <Router>
          <div className="container">
          <nav className="navbar navbar-expand-sm bg-warning navbar-light">
                <NavLink to="/videoPlayer" activeClassName="bg-info text-white"><h1>VideoPlayer</h1></NavLink>
                &nbsp; &nbsp;
                <NavLink to="/addVideo" activeClassName="bg-info text-white"><h1>AddVideo</h1></NavLink>
          </nav>
          </div>
	        <Route path="/videoPlayer" component={VideoPlayer}></Route>
	        <Route path="/addVideo" component={AddVideo}></Route> 

          {/* <VideoPlayer source={require('./video/test1.mp4')}/> */}
          {/* <PlayList source="https://my-json-server.typicode.com/diaolanshan/training/db"/> */}
        </Router>
	    )}
}

export default App;
