import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import Timer from "../Timer/Timer";
import './VerifyEmail.css';

const VerifyEmail = ({ data, count, setToInitial }) => {
    const [disable, setDisable] = useState(true);
    const [error, setError] = useState({msg: "", path:""});
    const [resend, restartTimer] = useState(count);
    const errModal = useRef();
    const navigate = useNavigate();

    const handleResend = async()=>{
        setDisable(true);
        if(resend >= 0){
            restartTimer(resend - 1);
            data.resend = true;
            try{
                const res = await axios.post(
                    '/user/register',
                    data
                )
                console.log(res);
            }catch({response:{data}}){
                console.log(data);
                if(data?.active){
                    let msg = 'Your account is already activated, Please sign in';
                    setError({msg, text: 'Sign In'});
                    errModal.current.classList.add('error-animation')
                }
            }
        }else{
            let msg ='Due to security reasons we allow user to request email only thrice. There might be mistake in your email'
            setError({msg, text: 'Register'})
            errModal.current.classList.add('error-animation')
        }
    }

    const handleReset = ()=>{
        setToInitial();
        if(error.text === "Sign In"){
            navigate('/login');
        }
    }
    return (
        <main className="main-email">
            <section className="verify-email">
                <h2>Verification link has been sent to your registered email <strong>{`${data.email[0] + data.email[1]}*****@${data.email.split('@')[data.email.split('@').length - 1]}`}</strong></h2>
                <p className="color-red"><strong>Please look in to your spam messages!!</strong></p>
                <p>Didn't got the link request in: </p>
                <section className="verify-btn">
                    <Timer setDisable={setDisable} key={resend} deadLine={90}/>
                    <button 
                    disabled={disable} 
                    className={disable?"":"hover-btn"}
                    onClick={handleResend}
                    >Request</button>
                </section>
            </section>
            <section ref={errModal} className="error-modal verify-email">
                <p className={error.path === '/register'?'color-red':'color-green'}>{error.msg}</p>
                <button key={error.path} onClick={handleReset}>{error.text}</button>
            </section>
        </main>
    )
}
export default VerifyEmail;