import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';


// PAGES
import UserLogin from './components/Login';
import UserRegister from './components/Register';
import UserDashboard from './components/Dashboard';


const AppRoutes = () => (
	<BrowserRouter>
		<Routes>
		      <Route path="/" element={<UserLogin />} />
	          <Route path="/dashboard" element={<UserDashboard />} />
	          <Route path="/login" element={<UserLogin />} />
	          <Route path="/register" element={<UserRegister />} />
	          <Route element={<UserLogin/>} />
		</Routes>
	</BrowserRouter>
);

export default AppRoutes;