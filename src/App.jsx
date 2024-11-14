import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectedRoute from './components/RedirectedRoute';
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from './context/AuthContext';

export default function App(){
    return( 
            <AuthProvider>     
                <Router>
                    <Nav/>
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <RedirectedRoute>
                                    <Login/>
                                </RedirectedRoute>
                            } />
                        <Route 
                            path="/signup" 
                            element={
                                <RedirectedRoute>
                                    <Signup/>
                                </RedirectedRoute>
                                } />
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                                } />
                        
                    </Routes>                
                </Router> 
            </AuthProvider>    
      ) 
}