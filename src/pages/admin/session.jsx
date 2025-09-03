import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import SessionBlock from '../../components/sessionBlock';
import SessionModal from '../../components/sessionModal';

function Session() {
  const navigate = useNavigate();
  const sessions = ["OT", "전반기 만남의 장", "후반기 만남의 장", "전반기 시상식", "테런데이", "OB/현직자 강연", "후반기 컨퍼런스", "TAVE의 밤"];
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSessionName, setSelectedSessionName] = useState('');

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
      setSelectedSessionName(sessionName);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSessionName('');
  };

  const handleAddSession = () => {
    navigate('/session/form');
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
                    className="px-4 py-2 bg-blue-600 rounded-[10px] text-center justify-start text-white text-base font-semibold hover:bg-blue-700 transition-colors">
                  세션 추가
                  </button>
            </div>
            </div>
           
                         <div className='flex flex-col items-center justify-center gap-4 mt-6 mb-20'>
                 {sessions.map((session) => (
                     <SessionBlock 
                        key={session}
                        sessionName={session} 
                        isDeleteMode={isDeleteMode}
                        isSelected={selectedSessions.includes(session)}
                        onSelect={() => handleSessionSelect(session)}
                        onClick={() => handleSessionClick(session)}
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
                        onClick={() => {
                            if (selectedSessions.length > 0) {
                                console.log('삭제할 세션들:', selectedSessions);
                                handleCancelDelete();
                            }
                        }}
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
            />
            
        </div>
        </div>
    );
}

export default Session;
