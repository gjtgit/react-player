import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

class VideoControl extends React.Component{
	constructor(props){
		super(props);

		this.playVideo = this.playVideo.bind(this);
		this.pauseVideo = this.pauseVideo.bind(this);
		this.volumeUp = this.volumeUp.bind(this);
		this.volumeDown = this.volumeDown.bind(this);
		this.mute = this.mute.bind(this);
		this.reload = this.reload.bind(this);
		this.updateProgress = this.updateProgress.bind(this);
		this.state= {
			"playbuttondisplay": 'true',
			"isMuted": 'false',
			"curV": 0.3
		}

	}
	
	playVideo(){
		console.log(document.getElementById("videoItem").src);
		document.getElementById("videoItem").play();
		this.setState({
			"playbuttondisplay": 'false'
		})
	}

	pauseVideo(){
		document.getElementById("videoItem").pause();
		this.setState({
			"playbuttondisplay": 'true'
		})
	}

	volumeUp(){
		if(this.state.isMuted === 'false'){
			var _video = document.getElementById("videoItem");
			_video.volume = this.state.curV;
			if(_video.volume+0.1 > 1 ) _video.volume = 1;
			else _video.volume = (_video.volume + 0.1).toFixed(1);
			this.setState({
				"curV":_video.volume
			});
		}
	}
	
	volumeDown(){
		if(this.state.isMuted === 'false'){
			var _video = document.getElementById("videoItem");
			_video.volume = this.state.curV;
			if(_video.volume-0.1 < 0 ) _video.volume = 0;
			else _video.volume = (_video.volume - 0.1).toFixed(1);
			this.setState({
				"curV":_video.volume
			});
		}    
	}
	
	reload(){
		var _video = document.getElementById("videoItem");
		_video.currentTime = 0;
		_video.play();
		this.setState({
			"playbuttondisplay": 'false'
		})
	}

	mute(){
		var _video = document.getElementById("videoItem");
		if(this.state.isMuted === 'true'){
			this.setState({
				"isMuted": 'false'
			});
			_video.volume = this.state.curV;
			
		}else{
			this.setState({
				"isMuted": 'true'
			});
			_video.volume = 0;
			
		}
	}

	like(){
		if(localStorage.likecount){
			localStorage.likecount = Number(localStorage.likecount)+1;
		}
		document.getElementById("number_like").innerHTML = localStorage.likecount;
	}
	
	dislike(){
		if(localStorage.unlikecount){
			localStorage.unlikecount = Number(localStorage.unlikecount)+1;
		}
		document.getElementById("number_dislike").innerHTML = localStorage.unlikecount;
	}

	updateProgress() {
		var _video = document.getElementById("videoItem");
		var app = this;
		if(_video){
			_video.ontimeupdate=function(){
				var videoProgress = document.getElementById("videoProgress");
				if(videoProgress){
					if( _video.duration){
						var per = ((_video.currentTime / _video.duration)*100).toFixed(0);
						if(per && typeof(per)!="undefined") videoProgress.value = per;
						if(_video.currentTime === _video.duration){
							_video.currentTime = 0;
							_video.pause();
							app.setState({
								"playbuttondisplay": 'true'
							})
						} 
					}else{
						videoProgress.value = 0;
						_video.currentTime = 0;
						_video.pause();
						app.setState({
							"playbuttondisplay": 'true'
						})
					}
				}
			}
		}
	}

	render(){
		const divClass = "row";
		if(!window.localStorage.likecount) window.localStorage.likecount = 0;
		if(!window.localStorage.unlikecount) window.localStorage.unlikecount = 0;
		let playbuttonstyle = this.state.playbuttondisplay==='false'? {display: 'none'}:{display: 'inline'};
		let playdisablebuttonstyle = this.state.playbuttondisplay==='true'? {display: 'none'}:{display: 'inline'};
		let mutestyle = this.state.isMuted==='true'? {display:'inline'}:{display: 'none'};
		let unmutestyle = this.state.isMuted==='false'? {display:'inline'}:{display: 'none'};
		
		const progStyle = {"width":"100%"};
		//setInterval(this.updateProgress,500);
		setTimeout(this.updateProgress,0);
		return(
			<div className={divClass}>
				<div className="col-md-12">

				<progress id="videoProgress" style={progStyle} value="0" max="100" >  </progress>
				</div>
				
				<div className="col-md-8">
					<button id="play"  onClick={this.playVideo} title="Play">
					<img src={require("../images/play.png")} style={playbuttonstyle} alt="Play" />
					<img src={require("../images/play-disable.png")} style={playdisablebuttonstyle} alt=""/>
					</button>
					<button id="pause"  onClick={this.pauseVideo} title="Pause">
					<img src={require("../images/pause.png")} style={playdisablebuttonstyle} alt="Pause"/>
					<img src={require("../images/pause-disable.png")} style={playbuttonstyle} alt=""/>
					</button>
					<button id="volumeup"  onClick={this.volumeUp} title="VolumeUp">
					<img src={require("../images/volume-up.png")} alt="VolumeUp" />
					</button>
					<button id="volumedown"  onClick={this.volumeDown} title="VolumeDown">
					<img src={require("../images/volume-down.png")} alt="VolumeDown"/>
					</button>
					<button id="reload"  onClick={this.reload} title="Reload">
					<img src={require("../images/replay.png")} alt="Reload"/>
					</button>
					<button id="mute"  onClick={this.mute} title="Mute/Unmute">
					<img src={require("../images/unmute.png")} alt="Unmute" style={unmutestyle} />
					<img src={require("../images/mute.png")} alt="Mute" style={mutestyle} />
					</button>
					{/* 
					<img src={play} id="playbutton" onClick={this.playVideo} style={playbuttonstyle}/>
					<img src={require("../images/play-disable.png")} style={playdisablebuttonstyle} id="playdisablebutton" />
					<img src={require("../images/pause.png")} style={playdisablebuttonstyle} onClick={this.pauseVideo} id="pausebutton"/>
					<img src={require("../images/pause-disable.png")} style={playbuttonstyle}/>
					<img src={require("../images/volume-up.png")} onClick={this.volumeUp} id="volumeup" />
					<img src={require("../images/volume-down.png")} onClick={this.volumeDown} id="volumedown" />
					<img src={require("../images/replay.png")} onClick={this.reload} id="reload" />
					<img src={require("../images/unmute.png")} onClick={this.mute} id="mute" style={unmutestyle}/>
					<img src={require("../images/mute.png")} onClick={this.mute} style={mutestyle} />
					*/}	
				</div>
				<div className="col-md-4" align="right">
					<button id="like"  onClick={this.like} title="Like">
					<img src={require("../images/like.png")} alt="Like"/>
					<span id="number_like">{this.props.source.likes}</span>
					</button>
					<button id="dislike"  onClick={this.dislike} title="Dislike">
					<img src={require("../images/dislike.png")} alt="Dislike"/>
					<span id="number_dislike">{this.props.source.unlike}</span>
					</button>
					{/* 
					<img src={require("../images/like.png")} onClick={this.like} id="like" title="Like">/>
					<div id="number_like">{window.localStorage.likecount}</div>
					<img src={require("../images/dislike.png")} onClick={this.dislike} id="dislike" title="Dislike" />
					<div id="number_dislike">{window.localStorage.unlikecount}</div>
					*/}
				</div>
			

			</div>
		)
	}
}

export default VideoControl