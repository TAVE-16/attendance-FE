import { React, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import backIcon from '../../assets/backIcon.png';
import Tab from '../../components/tab';
import Dropdown from '../../components/dropdown';
import Count from '../../components/count';
import AttendeeCard from '../../components/attendeeCard';

export default function Attendant() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const sessionName = searchParams.get('name') || '세션명';
    const sessionDate = searchParams.get('date') || '2025.08.30';
    const sessionTime = searchParams.get('time') || '13:00';

    const handleBackClick = () => {
        navigate('/session');
    };

    const tabList = ["전체 명단", "일반 출석", "얼리버드", "기술 세미나", "지각/결석"];
    const [activeTab, setActiveTab] = useState("전체 명단");

    return (
        <div>
            <Header title="출석 현황" />
            <div className="w-screen mt-40 px-24">
               
                <div className="flex items-center gap-4 text-gray-600 mb-10">
                <img src={backIcon} alt="back" className="w-6 h-6 cursor-pointer" onClick={handleBackClick} />
                <h1 className="text-white text-2xl font-bold">{sessionName}</h1>
                <span className="text-gray-300 text-2xl font-medium ">{sessionDate} {sessionTime}</span>
                </div>

                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {tabList.map((tabName) => (
                        <Tab 
                            key={tabName}
                            tabName={tabName} 
                            isActive={activeTab === tabName} 
                            onClick={() => setActiveTab(tabName)} 
                        />
                    ))}
                </div>
                <Dropdown />
                </div>
                <div className="flex items-center gap-12 my-10">
                    {activeTab === "전체 명단" ? (
                        <>
                            <Count type="출석" count="00"/>
                            <Count type="지각" count="00"/>
                            <Count type="결석" count="00"/>
                        </>
                    ) : (
                        <Count type="출석" count="00"/>
                    )}
                </div>
                <div className="flex items-center gap-12">
                    <AttendeeCard part="FE" name="김시은" status="지각"/>
                    <AttendeeCard part="DS" name="김지우" status="출석"/>
                </div>
            </div>
        </div>
    );
}
