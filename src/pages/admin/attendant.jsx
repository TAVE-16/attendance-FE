import { React, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import backIcon from '../../assets/backIcon.png';
import Tab from '../../components/tab';
import Dropdown from '../../components/dropdown';
import Count from '../../components/count';
import AttendeeCard from '../../components/attendeeCard';
import { getSessionMembers } from '../../api/session';

export default function Attendant() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const sessionName = searchParams.get('name') || '세션명';
    const sessionDate = searchParams.get('date') || '2025.08.30';
    const sessionTime = searchParams.get('time') || '13:00';

    const handleBackClick = () => {
        navigate('/session');
    };

    const feilds = [{label:"WEBFRONTEND", value:"FE"}, {label:"BACKEND", value:"BE"}, {label:"DESIGN", value:"DS"}, {label:"DEEPLEARNING", value:"DL"}, {label:"DATAALAYYSIS", value:"DA"}];

    const tabList = ["전체 명단", "일반 출석", "얼리버드", "기술 세미나", "지각/결석"];
    const [activeTab, setActiveTab] = useState("전체 명단");
    const [members, setMembers] = useState([]);

    const handleGetSessionMembers = async (statusFilter = null) => {
        try {
            const response = await getSessionMembers(13, statusFilter);
            setMembers(response.data.data);
            console.log(response);
        } catch (error) {
            console.error('세션 멤버 조회 실패:', error);
        }
    };

    // 탭 변경 핸들러
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        
        // 탭에 따른 상태 필터 매핑
        let statusFilter = null;
        if (tabName === '일반 출석') {
            statusFilter = 'ATTENDANCE';
        } else if (tabName === '얼리버드') {
            statusFilter = 'EARLY_BIRD';
        } else if (tabName === '지각/결석') {
            statusFilter = 'ABSENT';
        }
        // '전체 명단'과 '기술 세미나'는 필터 없이 전체 조회
        
        handleGetSessionMembers(statusFilter);
    };

    useEffect(() => {
        handleGetSessionMembers();
    }, []);

    // field를 두글자 코드로 변환하는 함수
    const getFieldCode = (field) => {
        const fieldMapping = {
            'WEBFRONTEND': 'FE',
            'APPFRONTEND': 'FE',
            'BACKEND': 'BE',
            'DESIGN': 'DS',
            'DEEPLEARNING': 'DL',
            'DATAANALYSIS': 'DA'
        };
        return fieldMapping[field] || field;
    };

    // status를 한글로 변환하는 함수
    const getStatusText = (status) => {
        const statusMapping = {
            'ATTENDANCE': '출석',
            'TARDY': '지각',
            'ABSENT': '결석',
            'EARLY_BIRD': '얼리버드'
        };
        return statusMapping[status] || status;
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

                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {tabList.map((tabName) => (
                        <Tab 
                            key={tabName}
                            tabName={tabName} 
                            isActive={activeTab === tabName} 
                            onClick={() => handleTabChange(tabName)} 
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
                <div className="grid grid-cols-3 items-center gap-12 flex-wrap mb-20">
                    {members.map((member) => (
                        <AttendeeCard 
                            key={member.memberId}
                            part={getFieldCode(member.field)}
                            name={member.username}
                            status={getStatusText(member.status)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
