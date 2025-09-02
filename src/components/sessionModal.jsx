import { useNavigate } from 'react-router-dom';
import closeIcon from '../assets/closeIcon.png';

export default function SessionModal({ isOpen, onClose, sessionName }) {
    const navigate = useNavigate();
    
    const handleAttendanceCheck = () => {
        const sessionData = {
            name: sessionName,
            date: '2025.08.30',
            time: '13:00'
        };
        
        const params = new URLSearchParams({
            name: sessionData.name,
            date: sessionData.date,
            time: sessionData.time
        });
        
        navigate(`/attendant?${params.toString()}`);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-96 h-60 bg-white rounded-[10px] relative">
            <img src={closeIcon} alt="close" className="w-3.5 h-3.5 ml-auto mt-5 mr-5 cursor-pointer"
             onClick={onClose} />
            

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">{sessionName}</h2>
                    <div className="flex items-center justify-center gap-2 my-9">
                        <span className="text-neutral-900 text-2xl font-medium">📅</span>
                        <span className="text-neutral-900 text-xl font-medium">2025.08.30</span>
                        <span className="text-gray-500 text-xl font-medium">13:00</span>
                        </div>
                   
                    <div className="flex gap-4 justify-center">
                        <button className="px-12 py-2 bg-gray-300 rounded-[10px] text-zinc-600 text-xl font-medium">
                            세션수정
                        </button>
                                                 <button 
                            onClick={handleAttendanceCheck}
                            className="px-12 py-2 bg-blue-600 rounded-[10px] text-white text-xl font-semibold"
                         >
                             출석확인
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
