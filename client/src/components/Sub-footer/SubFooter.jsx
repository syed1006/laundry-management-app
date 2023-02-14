import React from 'react';
import { Link } from 'react-router-dom';
import './SubFooter.css';

const SubFooter = ()=>{
    return(
        <section className="sub-footer">
            <section className="about-us">
                <Link to={'/aboutUs'}>About us</Link>
                <p>Doorstep Wash & Dryclean Service</p>
            </section>
            <section className="home-link">
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Sign in</Link>
                <Link to={'/register'}>Register</Link>
            </section>
            <section className="pricing-link">
                <Link to={'/pricing'}>Pricing</Link>
            </section>
            <section className="career-link">
                <Link to={'/career'}>Career</Link>
                <Link to={'/blogs'}>Blogs</Link>
                <Link to={'/to-do'}>Create</Link>
            </section>
            <section className="contact-link">
                <Link to={'/contact'}>Contact</Link>
            </section>
            <section className="socialmedia">
                <Link to={'/to-do'}>Social Media</Link>
                <span className="facebook"></span>
                <span className="instagram"></span>
                <span className="linkedin"></span>
            </section>
        </section>
    )
}

export default SubFooter;