import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';

class UserDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email:"",
			password:"",
			jsonDB: [],
			deleteState: false,
		}
	}

	updateList = (id) =>{
		console.log('Hit update', id);
		var inpEmail = "email_"+id;
		var inpPass = "pass_"+id;
		var inpPhone = "phone_"+id;
		var email = document.getElementById(inpEmail);
		// console.log('idemail', email);
		var password = document.getElementById(inpPass);
		var phoneNumber = document.getElementById(inpPhone);
		const formData = { email:email.value, password:password.value, phoneNumber:phoneNumber.value};
		// console.log('formData', formData);

		fetch("http://localhost:3000/users/" + id, {
	         method: "PUT",
	         headers: {"Content-Type": "application/json"},
	         body: JSON.stringify(formData)
	       })
	       .then(res => res.json())
	       .then((data) => {
	           // console.log('redirect', this.state.redirect);
	           this.setState({	 	 
	           })
	           this.getData();
	        })
	}

	deleteList = (id) =>{
		console.log('Hit delete', id);
		fetch("http://localhost:3000/users/" + id, {
	         method: "DELETE",
	         headers: {"Content-Type": "application/json"},
	         // body: JSON.stringify(formData)
	       })
	       .then(res => res.json())
	       .then((data) => {
	           this.getData();
	         })
	}

	getData(){
	    fetch("http://localhost:3000/users/", {
	      method: 'GET',
	      headers: {'Content-Type' : 'application/json'},
	    })
	    .then(res => res.json())
	    .then((data) =>{
	    	  // console.log('Json data',data);
	    	  this.setState({
	    	    jsonDB:data
	    	  })
	    })
	  }

	componentDidMount() {
		 this.getData();
	}

	render() {

		return(
			<div className="page-section">
				<div className="dashboard mar-auto edit-block">
					<div className="input-cover">
						<div className="text-center mt-100">
							<h2 className="text-center">Welcome to Dashboard</h2>
							{this.state.jsonDB && this.state.jsonDB.length > 0 && 
								this.state.jsonDB.map((d, i) => {
									// console.log(d, i);
									var inpEmail = "email_"+d.id;
									var inpPass = "pass_"+d.id;
									var inpPhone = "phone_"+d.id;
									return(
										<div className="" key={i}>
											<div className="login-form">
										 		<form className="disp-flex">
											 		<div className="form-group basic">
											 			<div className="input-wrapper guest-detail float-label field-container">
											 			     <label className="floating-label">Username</label>
															<input className="form-control" type='email' name={inpEmail} id={inpEmail} placeholder='Email' defaultValue={d.email} /> 		
											 			</div>
											 		</div>
									 		 		<div className="form-group basic">
									 		 			<div className="input-wrapper guest-detail float-label field-container">
											 			     <label className="floating-label">Password</label>
									 						<input className="form-control" type='text' name={inpPass} id={inpPass} placeholder='Password' defaultValue = {d.password} /> 		
									 		 			</div>
									 		 		</div>
							 		 		 		<div className="form-group basic">
							 		 		 			<div className="input-wrapper guest-detail float-label field-container">
											 			     <label className="floating-label">Phone Number</label>
							 		 						<input className="form-control" type='number' name={inpPhone} id={inpPhone} placeholder='Phone Number' defaultValue={d.phoneNumber}  /> 		
							 		 		 			</div>
							 		 		 		</div>
							 		 		 		<div className="button-container">
							 		 		 			<button className="btn-action btn-update" type="button" onClick={() => this.updateList(d.id)}>Update</button>
							 		 		 			<button className="btn-action btn-delete" type="button" onClick={() => this.deleteList(d.id)}>Delete</button>
							 		 		 		</div>
										 		</form>
											</div>
										</div>
									)
								})
							}
						     <Link to ="/login">Logout</Link>	
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UserDashboard;
