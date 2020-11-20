import React from 'react'
import $ from  'jquery'
import Player from './Player'
import VideoControl from './VideoControl'
import PlayList from './PlayList'
import testVideo1 from '../video/test1.mp4';
import testVideo2 from '../video/test2.mp4';

class VideoPlayer extends React.Component{
	constructor(props){
		super(props)
		this.state={
			selectedItem: ""
		};
		this.handleSelectedItem = this.handleSelectedItem.bind(this);
	}

	//store the last played video id
	componentWillUnmount(){
		window.onbeforeunload = function(){
			return null;
		};
		localStorage.react_lastPlayVideoId = this.state.selectedItem.id;
	}

	//load the last played video id
	componentWillMount(){
        window.addEventListener('beforeunload', ()=>{
			localStorage.react_lastPlayVideoId = this.state.selectedItem.id;
		});
        
		if(localStorage.react_lastPlayVideoId){
			console.log(localStorage.react_lastPlayVideoId);
			let reqUrl = "http://localhost:3001/youtube/"+localStorage.react_lastPlayVideoId;
			this.serverRequest = $.get(reqUrl, function (result) {
				this.setState({
					"selectedItem": result
				})
		   }.bind(this));

		}
	}

	//Playlist component pass the selected video to its parent component, then parent will pass it to Player component.
	handleSelectedItem(item){
		console.log("selectedUrl="+item.url);
		this.setState({
			"selectedItem": item
		})
	}

	render(){
		//const testVideo1 = require("../video/test1.mp4");
		//const testVideo2 = require("../video/test2.mp4");
		return(
			<div className="container">
				<h1>React VideoPlayer</h1>
				
				{this.state.selectedItem.url && this.state.selectedItem.url.length>=0 ? 
					<Player source={this.state.selectedItem.url}/>
					:
					<Player source={testVideo1}/>
				}	
				
				<VideoControl source={this.state.selectedItem}/>
				
				{/* <PlayList source="https://my-json-server.typicode.com/diaolanshan/training/youtube?approved=1"/> */}
				<PlayList source="http://localhost:3001/youtube?approved=1" handleSelectedItem={this.handleSelectedItem}/>
			</div>
		)
	}
}

export default VideoPlayer
		