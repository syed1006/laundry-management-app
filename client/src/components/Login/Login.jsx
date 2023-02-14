import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from '../../helpers/axios'
import CompanyText from '../CompanyText/CompanyText';
import SubFooter from '../Sub-footer/SubFooter';
import './Login.css';

const Login = ()=>{
    const [data, setData] = useState({'email':'', 'password':''});
    const [showPass, togglePass] = useState(true);

    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            console.log(data)
            const response = await axios.post('user/login', data);
            console.log(response)
        }catch(e){
            console.log(e);
        }

    }
    return(
        <>  
        <section className="container">
            <CompanyText path='/register' text='Register'/>
            <section className="form-container">
                <h2>SIGN IN</h2>
                <form onSubmit={handleLogin}>
                    <div className='input-container'>
                        <input 
                        className='input-item'
                        type={'text'} 
                        name='email' 
                        placeholder='Email'
                        autoComplete='off'  
                        value={data.email}
                        onChange={(e)=>{setData({...data, email: e.target.value})}}
                        required
                        />
                    </div>
                    <div className="input-container">
                        <input 
                        className='input-item'
                        type={showPass? 'password': 'text'}
                        name='password' 
                        placeholder='Password'
                        autoComplete='off' 
                        value={data.password}
                        onChange={(e)=>{setData({...data, password: e.target.value})}}
                        required
                        />
                        <span id='show-password' onClick={()=>{togglePass(!showPass)}}></span>
                    </div>
                    <div className="forgot-password"><span>Forgot Password?</span></div>
                    <button>Sign in</button>
                </form>
            </section>
        </section>
        <section className="referals">
            <h3>Now Refer & Earn ₹500 for every referral*</h3>
            <p>* Terms and conditions will be applied</p>
        </section>
        <SubFooter/>
        </>
    )
}

export default Login;