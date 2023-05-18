import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from '../../helpers/axios'
import CompanyText from '../CompanyText/CompanyText';
import SubFooter from '../Sub-footer/SubFooter';
import useAuth from '../../hooks/useAuth';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [formData, setformData] = useState({'email':'', 'password':''});
    const [showPass, togglePass] = useState(true);
    const {setAuth} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            toast.loading('Loading')
            const {data} = await axios.post('user/login', formData);
            setAuth({token: data.token, role: data.roles});
            localStorage.setItem('auth-token', data.token);
            localStorage.setItem('role', data.roles);
            toast.dismiss();
            toast.success("Successfully logged in.");
            navigate('/dashboard');
        }catch({response}){
            toast.dismiss();
            if(response.status === 500){
                toast.error("Something went wrong , Try again later!!");
            }else if(response.status === 401){
                toast.error(response?.data?.message);
            }else{
                toast.error(response?.data?.errors[0]?.msg);
            }
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
                        type={'email'} 
                        name='email' 
                        placeholder='Email'
                        autoComplete='off'  
                        value={formData.email}
                        onChange={(e)=>{setformData({...formData, email: e.target.value})}}
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
                        value={formData.password}
                        onChange={(e)=>{setformData({...formData, password: e.target.value})}}
                        required
                        minLength={5}
                        />
                        <span className='show-password' onClick={()=>{togglePass(!showPass)}}></span>
                    </div>
                    <div className="forgot-password"><Link to={'/forgotPassword'}>Forgot Password?</Link></div>
                    <button>Sign in</button>
                </form>
            </section>
        </section>
        <SubFooter/>
        </>
    )
}

export default Login;