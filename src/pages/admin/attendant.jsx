import { React, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import backIcon from '../../assets/backIcon.png';

export default function Attendant() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const sessionName = searchParams.get('name') || '세션명';
    const sessionDate = searchParams.get('date') || '2025.08.30';
    const sessionTime = searchParams.get('time') || '13:00';

    const handleBackClick = () => {
        navigate('/session');
    };

    return (
        <div>
            <Header title="출석 현황" />
            <div className="w-screen mt-40 px-24">
               
                <div className="flex items-center gap-4 text-gray-600 mb-10">
                <img src={backIcon} alt="back" className="w-6 h-6 cursor-pointer" onClick={handleBackClick} />

                <h1 className="text-white text-2xl font-bold">{sessionName}</h1>
                <span className="text-gray-300 text-2xl font-medium ">{sessionDate} {sessionTime}</span>
                </div>
            </div>
        </div>
    );
}
