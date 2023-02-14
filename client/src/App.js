import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';



const App = ()=>{
    return(
        <>
            <Navbar/>
            <main>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>

                    </Route>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App;