import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import LoginInput from '../../components/loginInput';
import backIcon from '../../assets/backIcon.png';
import { postLogin } from '../../api/login';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (type, value) => {
        setFormData(prev => ({
            ...prev,
            [type === 'ID' ? 'email' : 'password']: value
        }));
    };

    const handleLogin = async () => {
        if (!formData.email.trim() || !formData.password.trim()) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await postLogin(formData.email, formData.password);
            console.log('로그인 성공:', response);
            
            if (response.data && response.data.data && response.data.data.accessToken) {
                const accessToken = response.data.data.accessToken;
                localStorage.setItem('accessToken', accessToken);
            } else {
                console.warn('응답에서 토큰을 찾을 수 없습니다:', response.data);
            }
            
            navigate('/session');
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        
        <div className='flex flex-col items-center justify-center w-screen'>
            <img src={backIcon} alt="backIcon" className='absolute top-10 left-10 w-10 h-10 cursor-pointer' 
            onClick={() => navigate('/')}/>
            <img src={Logo} alt="logo" className='w-96' />
           <h3 className='text-2xl font-bold text-white mt-10'>관리자 로그인</h3>
           <div className='flex items-center justify-center gap-4 mt-10'>
            <div className='flex flex-col gap-4'>
                <LoginInput 
                    type="ID" 
                    value={formData.email}
                    onChange={(value) => handleInputChange('ID', value)}
                />
                <LoginInput 
                    type="Password" 
                    value={formData.password}
                    onChange={(value) => handleInputChange('Password', value)}
                />
            </div>
            <button 
                className="px-6 py-10 bg-blue-600 rounded-[10px] text-white text-2xl font-semibold text-center disabled:opacity-50"
                onClick={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? '로그인 중...' : 'LOGIN'}
            </button>
           </div>
        </div>
    );
}

export default Login;
