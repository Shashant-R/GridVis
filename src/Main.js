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
                <div  style={{display: 'flex'}}>
                    <Link to='/'>
                        <h1>GridVis</h1>
                    </Link>
                    <ul className='header'>
                        <li>
                            <Link to='/Labyrinth'>Labyrinth</Link>
                        </li>
                        <li>
                            <Link to='/Prob1'>Counting rooms</Link>
                        </li>
                    </ul>
                </div>
                <div className='content'>
                    <Routes>
                        <Route path='/' element={<></>}/>
                        <Route path='/Labyrinth' element={<App/>}/>
                        <Route path='/Prob1' element={<Prob1/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}