import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';



class UserRegister extends Component{
	constructor(props){
			super(props);
			this.state = {
				email:"",
				password: "",
				// confirmPassword: "",
				phoneNumber:"",
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
        /*console.log(this.state.email);*/
		const { email, password, phoneNumber } = this.state
		const formData = { email:`${email}`, password:`${password}`, phoneNumber:`${phoneNumber}`}
		console.log('formData', formData);

		fetch('http://localhost:3000/users', {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify(formData)
		})
		.then(res => res.json())
		.then(data =>
			this.setState({
				redirect: true
			})
		)
	}

	componentDidMount(){
	}

	render(){
		if(this.state.redirect) {
			return(<Navigate to="/login" />)
		}
		return(
				<div className="page-section">
					<div className="w-50 admin-bg">
					</div>
					<div className="w-50 edit-block">
						<div className="input-cover">
							<div className="text-center">
								<h2>Welcome</h2>
								<p>Sign up to visit your dashboard</p>
							 	<div className="login-form">
							 		<form onSubmit={this.handleSubmit}>
								 		<div className="form-group basic">
								 			<div className="input-wrapper guest-detail float-label field-container">
												<input className="form-control" type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange} /> 		
								 			</div>
								 		</div>
								 		<div className="form-group basic">
						 		 			<div className="input-wrapper guest-detail float-label field-container">
						 						<input className="form-control" type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} /> 		
						 		 			</div>
						 		 		</div>
						 		 		<div className="form-group basic">
						 		 			<div className="input-wrapper guest-detail float-label field-container">
						 						<input className="form-control" type='number' name='phoneNumber' placeholder='Phone Number' value={this.state.phoneNumber} onChange={this.handleChange} /> 		
						 		 			</div>
						 		 		</div>
							 			<div className="button-container">
							 			   <input className="btn btn-submit" type="submit" />
							 			</div>
							 			<Link to ="/login">Login</Link>
							 		</form>
							 	</div>
							</div>
						</div>
					</div>
			    </div>
			)

	}

}


export default UserRegister;