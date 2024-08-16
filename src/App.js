import React from 'react';
import MapView from './components/MapView';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<MapView />} />
                    <Route path='/About' element={<About/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
