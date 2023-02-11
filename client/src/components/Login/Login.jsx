import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from '../../helpers/axios'

const Login = ()=>{
    const [data, setData] = useState({'email':'', 'password':''});
    const [showPass, togglePass] = useState(false);

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
        <section className="conatiner">
            <section className="text-container">
                <h1 className='heading-logo'><span>Laundry</span><span>Service</span></h1>
                <h5 className='tag-line' >Doorstep Wash & Dryclean Service</h5>
                <p>Don't Have An Account</p>
                <Link to={'/register'}>Register</Link>
            </section>
            <section className="form-container">
                <h2>SIGN IN</h2>
                <form onSubmit={handleLogin}>
                    <div className='input-container'>
                        <input 
                        type={'text'} 
                        name='email' 
                        placeholder='Email' 
                        value={data.email}
                        onChange={(e)=>{setData({...data, email: e.target.value})}}
                        required
                        />
                    </div>
                    <div className="input-container">
                        <input 
                        type={showPass? 'password': 'text'}
                        name='password' 
                        placeholder='Password' 
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
        </>
    )
}

export default Login;