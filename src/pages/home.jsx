import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Password from '../components/Password';
import adminIcon from '../assets/adminIcon.png'


function Home() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isEventStarted, setIsEventStarted] = useState(false);
    const [eventStartTime, setEventStartTime] = useState(null);
    const [password, setPassword] = useState('');

    const fetchEventStartTime = async () => {
        try {
            // 여기 나중에 백엔드 API 연결하기

            // 테스트용 하드코딩 시간 데이터
            const mockStartTime = new Date('2024-12-25T10:00:00');
            setEventStartTime(mockStartTime);
            
            checkEventStatus(mockStartTime);
        } catch (error) {
            console.error('행사 시작 시간을 가져오는데 실패했습니다:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const checkEventStatus = (startTime) => {
        const now = new Date();
        const isStarted = now >= startTime;
        setIsEventStarted(isStarted);
    };

    useEffect(() => {
        fetchEventStartTime();
    }, []); 

    useEffect(() => {
        if (!eventStartTime) return;

        const interval = setInterval(() => {
            checkEventStatus(eventStartTime);
        }, 60000);

        return () => clearInterval(interval);
    }, [eventStartTime]);

    if (isLoading) {
        return (
            <div className='flex flex-col items-center justify-center w-screen'>
                <img src={Logo} alt="logo" />
                <div className="mt-4">로딩 중...</div>
            </div>
        );
    }

    const handleAdminIconClick = () => {
        navigate('/login');
        console.log('adminIcon clicked');
    };
    return (
        
        <div className='flex flex-col items-center justify-center w-screen'>
             <img src={adminIcon} alt="adminIcon" 
             className='absolute top-10 right-10 w-10 h-10 cursor-pointer' 
             onClick={handleAdminIconClick}
             />
            <img src={Logo} alt="logo" className='w-96' />
            
            {!isEventStarted ? (
                <div className="text-center">
                    <h1 className='text-4xl font-semibold mb-4'>행사 시작 전입니다.</h1>
                </div>
            ) : (
                <Password />
            )}
        </div>
    );
}

export default Home;
