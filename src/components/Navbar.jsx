import React from 'react';

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
            <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#61dafb',
                margin: 0,
            }}>
                Dijkstra’s Path Finder
            </h1>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                gap: '20px',
            }}>
                <li>
                    <a href="#about" style={{
                        textDecoration: 'none',
                        color: '#fff',
                        fontSize: '18px',
                        transition: 'color 0.3s ease',
                    }}>About</a>
                </li>
                <li>
                    <a href="#how-it-works" style={{
                        textDecoration: 'none',
                        color: '#fff',
                        fontSize: '18px',
                        transition: 'color 0.3s ease',
                    }}>How It Works</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

