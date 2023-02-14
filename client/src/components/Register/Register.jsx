import { useState } from "react";
import CompanyText from "../CompanyText/CompanyText";
import SubFooter from "../Sub-footer/SubFooter";
import './Register.css';
import generatePassword from '../../helpers/generate-password';

const Register = () => {
    const [data, setData] = useState({name: "", email: "", password: ""})
    const [showPass, togglePass] = useState(true);

    const createPassword = ()=>{
        const password = generatePassword(16);
        setData({...data, password});
    }
    const handleRegister = (e)=>{
        e.preventDefault();
    }
    return (
        <>
            <section className="container">
                <CompanyText path={'/login'} text='Sign In' />
                <section className="form-container">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                    <div className='input-container'>
                        <input 
                        className='input-item'
                        type={'text'} 
                        name='name' 
                        placeholder='Full Name'
                        autoComplete='off'  
                        value={data.name}
                        onChange={(e)=>{setData({...data, name: e.target.value})}}
                        required
                        />
                    </div>
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
                        <span className='show-password' onClick={()=>{togglePass(!showPass)}}></span>
                    </div>
                    <div 
                    className="generate-password"
                    onClick={createPassword}
                    ><span>Generate Password?</span></div>
                    <button>Register</button>
                </form>
                </section>
            </section>
            <SubFooter/>
        </>
    )
}
export default Register