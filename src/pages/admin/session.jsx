import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import SessionBlock from '../../components/sessionBlock';
import SessionModal from '../../components/sessionModal';
import { getSessions, deleteSession } from '../../api/session';
function Session() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSessionName, setSelectedSessionName] = useState('');
  const [selectedSessionDate, setSelectedSessionDate] = useState('');
  const [selectedSessionTime, setSelectedSessionTime] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getSessions();
        setSessions(response.data.data);
      } catch (error) {
        console.error('세션 조회 실패:', error);
      }
    };
    
    fetchSessions();
  }, []);

  const handleDeleteMode = () => {
    setIsDeleteMode(true);
    setSelectedSessions([]);
  };

  const handleCancelDelete = () => {
    setIsDeleteMode(false);
    setSelectedSessions([]);
  };

  const handleSessionSelect = (sessionName) => {
    if (selectedSessions.includes(sessionName)) {
      setSelectedSessions(selectedSessions.filter(session => session !== sessionName));
    } else {
      setSelectedSessions([...selectedSessions, sessionName]);
    }
  };

  const handleSessionClick = (sessionName) => {
    if (!isDeleteMode) {
      // 선택된 세션의 데이터 찾기
      const selectedSession = sessions.find(session => session.title === sessionName);
      if (selectedSession) {
        setSelectedSessionName(sessionName);
        setSelectedSessionDate(selectedSession.sessionDate);
        setSelectedSessionTime(selectedSession.tardyTime);
        setIsModalOpen(true);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSessionName('');
    setSelectedSessionDate('');
    setSelectedSessionTime('');
  };

  const handleAddSession = () => {
    navigate('/session/form');
  };

  const handleEditSession = () => {
    // 선택된 세션의 전체 데이터 찾기
    const selectedSession = sessions.find(session => session.title === selectedSessionName);
    if (selectedSession) {
      // 세션 데이터를 URL 파라미터로 전달
      const params = new URLSearchParams({
        id: selectedSession.id,
        title: selectedSession.title,
        sessionDate: selectedSession.sessionDate,
        tardyTime: selectedSession.tardyTime,
        earlyBirdDeadline: selectedSession.earlyBirdDeadline,
        seminarTime: selectedSession.seminarTime
      });
      
      navigate(`/session/form?${params.toString()}`);
      handleCloseModal();
    }
  };

  const handleDeleteSessions = async () => {
    if (selectedSessions.length === 0) return;
    
    try {
      // 선택된 세션들의 ID 찾기
      const sessionsToDelete = sessions.filter(session => 
        selectedSessions.includes(session.title)
      );
      
      // 각 세션을 순차적으로 삭제
      for (const session of sessionsToDelete) {
        await deleteSession(session.id);
      }
      
      // 삭제 후 세션 목록 새로고침
      const response = await getSessions();
      setSessions(response.data.data);
      
      setIsDeleteMode(false);
      setSelectedSessions([]);
      
      alert('세션이 삭제되었습니다!');

    } catch (error) {
      console.error('세션 삭제 실패:', error);
    }
  };

    return (
        <div>
             <Header title="관리자 페이지" />
        <div className=' w-screen mt-40 px-24'>
            <div className='flex items-center justify-between'>
            <h1 className="justify-start text-white text-2xl font-bold">정규세션</h1>
            <div className='flex items-center justify-center gap-4'>
                                 <button 
                    onClick={handleDeleteMode}
                    className="px-4 py-2 rounded-[10px] bg-gray-300 text-zinc-600 text-center justify-start text-base font-semibold whitespace-nowrap">
                    세션 삭제
                 </button>
                <button 
                    onClick={handleAddSession}
                    className="px-4 py-2 bg-blue-600 rounded-[10px] text-center justify-start text-white text-base font-semibold">
                  세션 추가
                  </button>
            </div>
            </div>
           
                         <div className='flex flex-col items-center justify-center gap-4 mt-6 mb-20'>
                 {sessions?.map((session) => (
                     <SessionBlock 
                        key={session.id}
                        sessionName={session.title} 
                        isDeleteMode={isDeleteMode}
                        isSelected={selectedSessions.includes(session.title)}
                        onSelect={() => handleSessionSelect(session.title)}
                        onClick={() => handleSessionClick(session.title)}
                     />
                 ))}
             </div>
            {isDeleteMode && (
                <div className='flex items-center justify-center gap-4 mb-48'>
                    <button 
                        onClick={handleCancelDelete}
                        className="px-16 py-2 bg-gray-300 rounded-[10px] text-center justify-start text-zinc-600 text-xl font-medium"
                    >
                        삭제 취소
                    </button>
                    <button 
                        onClick={handleDeleteSessions}
                        className={`px-16 py-2 rounded-[10px] text-center justify-start text-xl transition-all duration-300 ease-in-out ${
                            selectedSessions.length > 0 
                                ? 'bg-blue-600 text-white font-semibold ' 
                                : 'bg-gray-300 text-zinc-600 font-medium'
                        }`}
                    >
                        삭제하기
                    </button>
                </div>
            )}

            {/* 세션 모달 */}
            <SessionModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                sessionName={selectedSessionName}
                sessionDate={selectedSessionDate}
                sessionTime={selectedSessionTime}
                onEdit={handleEditSession}
            />
            
        </div>
        </div>
    );
}

export default Session;
