import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Header({title}) {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');

    };
    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 h-44 bg-transparent backdrop-blur-sm mx-16'>
            <img src={Logo} alt="logo" className='w-32 cursor-pointer' onClick={handleLogoClick} />
            <h1 className="text-center justify-start text-white text-4xl font-semibold">{title}</h1>
            <div className='w-36 '></div>
        </div>
    );
}