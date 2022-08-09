import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';

class UserLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email:"",
			password:"",
			jsonDB: [],
			redirect: false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		this.setState({
	      [event.target.name] : event.target.value
	  })
	}

	handleSubmit(event){
		event.preventDefault();
		var db_data = this.state.jsonDB;
		console.log("Data" , db_data);
		var c = 0;
		db_data.map((d, i) => {
		// console.log(d, i);
		// console.log(d.username);
			if (this.state.email === d.email){
				c++;
			}
		})
		console.log('C', c);

		if (c !== 0){
			this.setState({
					redirect: true
				})
			alert("Login Successful")
			
		}
	}

	getData(){
		fetch("http://localhost:3000/users", {
			method: 'GET',
			headers: {'Content-Type' : 'application/json'},
		})
		.then(res => res.json())
		.then(data =>
			this.setState({
				jsonDB:data
			})
		)
	}

	componentDidMount() {
		this.getData();
	}

	render() {

		if(this.state.redirect) {
			console.log("count");
			return(<Navigate to="/dashboard" />)
		}

		return(
				<div className="page-section">
					<div className="w-50 admin-bg">
					</div>
					<div className="w-50 edit-block">
						<div className="input-cover">
							<div className="text-center">
								<h2>Welcome</h2>
								<p>Sign in to visit your dashboard</p>
							 	<div className="login-form">
							 		<form onSubmit={this.handleSubmit}>

								 		<div className="form-group basic">
								 			<div className="input-wrapper guest-detail float-label field-container">
												<input className="form-control" type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange} /> 		
												{/*<label className="floating-label">Username</label>*/}
								 			</div>
								 		</div>
						 		 		<div className="form-group basic">
						 		 			<div className="input-wrapper guest-detail float-label field-container">
						 						<input className="form-control" type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} /> 		
						 						{/*<label className="floating-label">Password</label>*/}
						 		 			</div>
						 		 		</div>
							 			<div className="button-container">
							 			    <input className="btn btn-submit" type="submit" />
							 			</div>
							 			{/*<div onClick={this.pageChange}>Goto Register</div>*/}
							 			<Link to ="/register" className="top-space">Signup</Link>

							 		</form>
							 	</div>
							</div>
						</div>
					</div>
			    </div>
		)
	}
}

export default UserLogin;
