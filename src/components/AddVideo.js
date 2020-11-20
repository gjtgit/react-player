import React from 'react'
import $ from  'jquery'

class AddVideo extends React.Component{
	constructor(props){
		super(props)
		this.add = this.add.bind(this);
		this.update = this.update.bind(this);	
		this.state = {
			videoList: [],
			restUrl : "http://localhost:3001/youtube/",
			selectedItem: ""
		}
	}

	componentDidMount() {
		//  let getUrl = "https://my-json-server.typicode.com/diaolanshan/training/db";
		let getUrl = "http://localhost:3001/db";
	    this.serverRequest = $.get(getUrl, function (result) {
	     	this.setState({
				videoList: result['youtube']
	     	})
	    }.bind(this));
	}
	
	add(e){
		let title=$("#title").val(); 
		let url = $("#url").val();
		const urlPatten = /^(http|https)(:)(\/\/)/;
		if(title.length===0 || url.length===0){
			alert("Title or Url can't be empty");
			e.preventDefault();return;
		};
		if (!urlPatten.test(url)) {
			alert("Please input a valid url");
			e.preventDefault();return;
		}	  
		
		let newVideo = {'title': $("#title").val(), 'url': $("#url").val()
			,'likes':0,'unlike':0
	    };
		let options = {
			method: "POST",  
	  		body: JSON.stringify(newVideo), 
			headers: { 
		　　  'Accept': 'application/json',
		　　  'Content-Type': 'application/json'
			}
		}
		fetch(this.state.restUrl,options)
		.then(response=>response.json())
		.then((response) => {
			console.log(response);
		})
		.then((data) => {
			//console.log(data);
			this.componentDidMount();
		})
		.catch((error) => {
			console.log(error)
		})
	}

	edit(item){
		$("#title").val(item.title);
		$("#url").val(item.url);
		this.setState({
			"selectedItem": item
		})
	}
	update(e){
		let item = this.state.selectedItem;
		if(item){
			let title=$("#title").val(); 
			let url = $("#url").val();
			const urlPatten = /^(http|https)(:)(\/\/)/;
			if(title.length===0 || url.length===0){
				alert("Title or Url can't be empty");
				e.preventDefault();return;
			};
			if (!urlPatten.test(url)) {
				alert("Please input a valid url");
				e.preventDefault();return;
			}
			item.title = title;
			item.url = url;
			item.approved = 0;
			let reqUrl = this.state.restUrl + item.id;
			let options = {
				method: "PUT",  
				body: JSON.stringify(item), 
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}
			fetch(reqUrl,options)
			.then(response=>response.json())
			.then((data) => {
				console.log(data);
				this.componentDidMount();
			})
			.catch((error) => {
				console.log(error)
			})
		}else{
			alert("Please choose one and click Edit button");
		}
	}

	delete(item){
		let reqUrl = this.state.restUrl + item.id;
		fetch(reqUrl,{method:"DELETE"})
		.then((data) => {
			console.log(data);
			this.componentDidMount();
		})
		.catch((error) => {
			console.log(error)
		})
	}

	approve(item){
		item.approved = 1;
		let reqUrl = this.state.restUrl + item.id;
		let options = {
			method: "PUT",  
	  		body: JSON.stringify(item), 
			headers: { 
		　　  'Accept': 'application/json',
		　　  'Content-Type': 'application/json'
			}
		}
		fetch(reqUrl,options)
		.then((data) => {
			console.log(data);
			this.componentDidMount();
		})
		.catch((error) => {
			console.log(error)
		})
	}

	handleSelectedRow(e){
		var rows = document.getElementsByTagName("tr");
		for(var i=1;i<rows.length;i++){
			if(i === e.currentTarget.rowIndex){
				rows[i].className = "bg-warning";
			}else{
				rows[i].className="";
			}
		}

	}

	render(){
		let content;
		if(this.state.videoList && this.state.videoList.length>0){
			content = this.state.videoList.map((item, index)=>
				<tr key={index} onClick={(e)=>this.handleSelectedRow(e)}>
				<td>{index+1}</td><td>{item.title}</td>
				<td><input type="text" id="item_url" onChange={()=>{}} value={item.url}></input></td>
				<td><input type="button" id="edit" className="btn btn-primary"  onClick={()=>this.edit(item)} value="Edit"></input></td>
				<td><input type="button" id="delete" className="btn btn-danger" onClick={()=>this.delete(item)} value="Delete"></input></td>
				<td>
				  {item.approved && item.approved===1 ? 
					<input type="button" id="approve" className="btn btn-success" disabled value="Approved"></input>
				  	:
					<input type="button" id="approve" className="btn btn-primary" onClick={()=>this.approve(item)} value="Approve"></input>  
				  }
				</td>	
				</tr>
			)
			content = <table className="table table-bordered table-condensed table-hover">
				<thead>
				<tr className="bg-light">
					<th>S.no</th>
					<th>Title</th>
					<th>Url</th>
					<th></th>
					<th></th>
					<th></th>
				</tr>
				</thead>
				<tbody>{content}</tbody>
				</table>
		}else{
			content = <table><tbody>
			  <tr><td>
			  <h3>No videos or JSON-Server is not running on port 3001.</h3>
			  </td></tr>
			  </tbody></table>
			
		}

		content = 
		<div className="container">
		<h1>Add Video</h1>
		<div className="row">
			<div className="col-md-6">
				<label className="col-md-2 control-label">Title</label>
				<div className="col-md-10">
				<input type="text" id="title"
					name="title"
					required="required" 
					className="form-control"
					placeholder="Enter title"/>
				</div>	
				
				<label className="col-md-2 control-label">Url</label>
				<div className="col-md-10">
				<input type="url" id="url"
					name="url"
					required="required" 
					className="form-control"
					placeholder="Enter url"
					/>
				</div>
				<br/>
			
				<div className="btn-group">
					<button className="btn btn-primary"
					onClick={(e)=>this.add(e)}>Add</button>
					&nbsp;
					<button className="btn btn-warning"
					onClick={this.update}>Update</button>
				</div>
			</div>
		</div>

		{content}
		</div>

		return(content)
	
	}
}

export default  AddVideo