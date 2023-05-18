import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import PublicRoute from './routes/PublicRoutes';



const App = ()=>{
    return(
        <>  
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar/>
            <main className="App">
                <Routes>
                    <Route path='/' element={<PublicRoute/>}>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/forgotPassword' element={<ForgotPassword count={0}/>}/>

                    </Route>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App;