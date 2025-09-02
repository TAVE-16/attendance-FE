import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import LoginInput from '../../components/loginInput';
import backIcon from '../../assets/backIcon.png';

function Login() {
  
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/session');
    }
    return (
        
        <div className='flex flex-col items-center justify-center w-screen'>
            <img src={backIcon} alt="backIcon" className='absolute top-10 left-10 w-10 h-10 cursor-pointer' 
            onClick={() => navigate('/')}/>
            <img src={Logo} alt="logo" className='w-96' />
           <h3 className='text-2xl font-bold text-white mt-10'>관리자 로그인</h3>
           <div className='flex items-center justify-center gap-4 mt-10'>
            <div className='flex flex-col gap-4'>
                <LoginInput type="ID" />
                <LoginInput type="Password" />
            </div>
            <button className="px-6 py-10 bg-blue-600 rounded-[10px] text-white text-2xl font-semibold text-center"
            onClick={handleLogin}>
                LOGIN</button>
           </div>
        </div>
    );
}

export default Login;
