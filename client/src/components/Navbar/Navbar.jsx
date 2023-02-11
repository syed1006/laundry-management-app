import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = ()=>{
    const {auth} = useAuth();
    let links;
    if(auth === null){
        links = {
            'Home': '/',
            'Pricing': '/pricing',
            'Career':'/career',
            'Sign in': '/login'
        }
    }else{
        links = {
            'Pricing': '/pricing',
            'Career':'/carer',
            'User': '/user'
        }
    }

    return(
        <header>
            <h1>Laundry</h1>
            <nav className='nav-bar'>
                <ul>
                    {Object.keys(links).map((path)=>{
                        return(
                            <li  key={path}><Link to={links[path]}>{path}</Link></li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;