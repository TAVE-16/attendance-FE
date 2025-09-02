import Logo from '../assets/logo.png';

export default function Header() {
    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 h-20 bg-transparent backdrop-blur-sm'>
            <img src={Logo} alt="logo" className='w-32 ml-10' />
            <h1 className="text-center justify-start text-white text-4xl font-semibold">관리자 페이지</h1>
            <div className='w-36'></div>
        </div>
    );
}