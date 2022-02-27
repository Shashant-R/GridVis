import React from 'react';
import {Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Prob1 from './Prob1';
//import { Button } from 'ui-neumorphism';
//import 'ui-neumorphism/dist/index.css';
export default function Main() {

    return (
        <Router>
            <div>
                <h1>GridVis</h1>
                <h3 style={{textAlign: "center", color: "white"}}>Grid Problems Visualizer</h3>
                <ul className='header'>
                    <li>
                        <Link to='/'>Labyrinth</Link>
                    </li>
                    <li>
                        <Link to='/Prob1'>Counting rooms</Link>
                    </li>
                </ul>
                <div className='content'>
                    <Routes>
                        <Route path='/' element={<App/>}/>
                        <Route path='/Prob1' element={<Prob1/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}