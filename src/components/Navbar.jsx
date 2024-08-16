import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{
            backgroundColor: '#282c34',
            color: '#fff',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            top: 0,
            width: '100%',
            zIndex: 1000,
        }}>
            <Link to='/' style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#61dafb',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                margin: 0,
                padding: '10px 20px',
                borderRadius: '5px',
                backgroundColor: '#20232a',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'inline-block',
            }}>
                Dijkstra's Path Navigator
            </Link>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                gap: '20px',
            }}>
                <li>
                    <Link to="/About" style={{
                        textDecoration: 'none',
                        color: '#fff',
                        fontSize: '18px',
                        transition: 'color 0.3s ease',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        display: 'inline-block',
                        backgroundColor: '#333',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}>
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
