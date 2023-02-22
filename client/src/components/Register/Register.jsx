import { useState } from "react";
import CompanyText from "../CompanyText/CompanyText";
import SubFooter from "../Sub-footer/SubFooter";
import './Register.css';
import generatePassword from '../../helpers/generate-password';
import axios from '../../helpers/axios';
import VerifyEmail from "../VerifyEmail/VerifyEmail";

const Register = () => {
    const [data, setData] = useState({name: "", email: "", password: ""})
    const [showPass, togglePass] = useState(true);
    const [err, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const setToInitial = ()=>{
        setData({name: "", email: "", password: ""});
        togglePass(true);
        setError("");
        setSuccess(false)
    }

    const createPassword = ()=>{
        const password = generatePassword(16);
        togglePass(false)
        setData({...data, password});
    }
    const handleRegister = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(
                '/user/register',
                data
            );
            if(res.data.status === 'success'){
                setSuccess(true);
            }
        } catch ({response}) {
            if(response.status === 500){
                setError("Something went wrong , Try again later!!");
            }else if(response.status === 401){
                setError(response?.data?.message);
            }else{
                setError(response?.data?.errors[0]?.msg);
            }
        }
    }
    if(success){
        return (
            <VerifyEmail data={data} count={2} setToInitial={setToInitial}/>
        )
    }
    return (
        <>
            <section className="container">
                <CompanyText path={'/login'} text='Sign In' />
                <section className="form-container">
                    <h2>Register</h2>
                    <p className="errors">{err}</p>
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
                        type={'email'} 
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
                        minLength={5}
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