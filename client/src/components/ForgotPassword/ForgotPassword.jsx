import { useState, useRef } from "react";
import axios from "../../helpers/axios";
import Timer from "../Timer/Timer";
import './ForgotPassword.css';
import {Link} from 'react-router-dom';

const ForgotPassword = ({ count }) => {
    const [state, setState] = useState({ email: "", error: "", code: "", password: "", conPass: "" });
    const [next, setNext] = useState("");
    const [resend, restartTimer] = useState(count);
    const [disable, setDisable] = useState(true);
    const errModal = useRef();

    const getCode = async (doResend) => {
        setDisable(true);
        if (resend >= 0) {
            if (doResend) restartTimer(resend - 1);
            try {
                const { data } = await axios.post(
                    '/user/forgotPassword',
                    { email: state.email }
                )
                setState({ ...state, verify: data.code });
                return data
            } catch ({ response }) {
                console.log(response);
                if (response.status === 500) {
                    setState({ ...state, error: "Something went wrong , Try again later!!" });
                } else if (response.status === 401) {
                    setState({ ...state, error: response?.data?.message });
                } else {
                    setState({ ...state, error: response?.data?.errors[0]?.msg });
                }
                errModal.current.style.top = '100px';
                errModal.current.classList.add('error-animation');
                return response.data
            }
        } else {
            let msg = 'Due to security reasons we allow user to request email only thrice. There might be mistake in your email'
            setState({ ...state, error: msg });
            errModal.current.style.top = '100px';
            errModal.current.classList.add('error-animation');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (next === "update") {
                if (state.password === state.conPass) {
                    try {
                        const res = await axios.put(
                            '/user/updatePassword',
                            {
                                email: state.email,
                                password: state.password
                            }
                        )
                        console.log(res);
                        if (res.status === 204) {
                            setNext('success');
                        }
                    } catch ({ response }) {
                        setState({ ...state, error: "Something Went Wrong, Try After Some Time!!, Sorry For The Inconvenience" });
                        errModal.current.style.top = '100px';
                        errModal.current.classList.add('error-animation');
                    }

                } else {
                    setState({ ...state, error: "Password and Confirm Password Doesn't Match" });
                    errModal.current.style.top = '100px';
                    errModal.current.classList.add('error-animation');
                }

            } else if (next === "code") {
                if (state.code === state.verify) {
                    setNext('update')
                }else{
                    setState({ ...state, error: "Incorrect Verification Code" });
                    errModal.current.style.top = '100px';
                    errModal.current.classList.add('error-animation');
                }
            } else {
                const res = await getCode();
                console.log(res)
                if (res.status !== 'failure') {
                    setNext('code')
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        next !== 'success' ?
            <section className="forgot-password">
                <h2>{state.code === 'update' ? 'Update Password' : 'Forgot Password'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='forgot-password-input'>
                        <input
                            className='input-item'
                            type={'email'}
                            name='email'
                            placeholder='Email'
                            autoComplete='off'
                            value={state.email}
                            onChange={(e) => { setState({ ...state, email: e.target.value }) }}
                            required
                        />
                    </div>
                    {next === 'code' &&
                        <>
                            <div className='forgot-password-input'>
                                <input
                                    className='input-item'
                                    type={'text'}
                                    name='code'
                                    placeholder='Verification Code'
                                    autoComplete='off'
                                    value={state.code}
                                    onChange={(e) => { setState({ ...state, code: e.target.value }) }}
                                    required
                                />
                            </div>
                            <p>Verification code has been sent to your registered email. <strong className="color-red">Please look in to your spam messages!!</strong></p>
                            <p>Didn't got the link request in:
                                <Timer setDisable={setDisable} key={resend} deadLine={90} />
                                <button
                                    disabled={disable}
                                    className={`forgot-password-resend-btn ${disable ? "" : "hover-btn"}`}
                                    onClick={() => { getCode(true) }}
                                >Resend</button></p>
                        </>}
                    {next === 'update' &&
                        <>
                            <div className='forgot-password-input'>
                                <input
                                    className='input-item'
                                    type={'password'}
                                    name='password'
                                    placeholder='New Password'
                                    autoComplete='off'
                                    value={state.password}
                                    onChange={(e) => { setState({ ...state, password: e.target.value }) }}
                                    required
                                />
                            </div>
                            <div className='forgot-password-input'>
                                <input
                                    className='input-item'
                                    type={'password'}
                                    name='conPassword'
                                    placeholder='Confirm New Password'
                                    autoComplete='off'
                                    value={state.conPass}
                                    onChange={(e) => { setState({ ...state, conPass: e.target.value }) }}
                                    required
                                />
                            </div>
                        </>
                    }
                    <button className="forgot-password-btn">{next === 'update' ? 'Update' : next === 'code' ? 'Verify' : 'Get Code'}</button>
                </form>
                <section ref={errModal} className="error-modal verify-email">
                    <p className={'color-red'}>{state.error}</p>
                    <button onClick={() => { errModal.current.style.top = '-300px'; setState({ ...state, error: "" }) }}>OK</button>
                </section>
            </section>
            :
            <section className="update-success">
                <h2>Your Password has been updated successfully</h2>
                <Link to={'/login'}>Sign In</Link>
            </section>
    )

}
export default ForgotPassword;