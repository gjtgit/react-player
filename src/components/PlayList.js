import React from 'react'
import $ from  'jquery'

class PlayList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			movies: []
		}
	}

	componentDidMount() {
	    this.serverRequest = $.get(this.props.source, function (result) {
	     	this.setState({
				 // movies: result['youtube']
				 movies: result
	     	})
	    }.bind(this));
    }

	handleListItemClick(item,e){
		var rows = document.getElementsByTagName("tr");
		for(var i=1;i<rows.length;i++){
			if(i === e.currentTarget.rowIndex){
				rows[i].className = "bg-warning";
			}else{
				rows[i].className="";
			}
		}
		//item.url = '../video/test1.mp4';
		this.props.handleSelectedItem(item);
	}

	render(){
		let content;
		if(this.state.movies && this.state.movies.length>0){
			 content =	this.state.movies.map((item,i)=>
			        <tr key={i} onClick={(e)=>{
					 return this.handleListItemClick(item, e);
				 	}}>
					<td>{item.title}</td><td>{item.url}</td>
					</tr>
			  )
			  content = <table className="table table-bordered table-condensed table-hover">
				<thead>
				<tr className="bg-light">
					<th>Title</th>
					<th>Url</th>
				</tr>
				</thead>
				<tbody>{content}</tbody>
				</table>
		}else{
			content = <div><h3>No videos or JSON-Server is not running on port 3001.</h3></div>
		}

		return(
			content
		)
	}
}

export default  PlayList