import { React, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SessionInput from '../../components/sessionInput';
import backIcon from '../../assets/backIcon.png';

function SessionForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const sessionName = searchParams.get('name');
    const isEditMode = !!sessionName;
    
    const [formData, setFormData] = useState({
        name: sessionName || '',
        date: '',
        time: '',
        description: ''
    });

    const handleBackClick = () => {
        navigate('/session');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            alert('세션명을 입력해주세요.');
            return;
        }
        
        if (!formData.date) {
            alert('날짜를 선택해주세요.');
            return;
        }
        
        if (!formData.time) {
            alert('시간을 입력해주세요.');
            return;
        }

        console.log(isEditMode ? '세션 수정:' : '세션 추가:', formData);
        
        navigate('/session');
    };

    return (
        <div>
            <div className="w-screen mt-20 px-24">
                <div className="flex items-center gap-4 text-gray-600 mb-10">
                    <img 
                        src={backIcon} 
                        alt="back" 
                        className="w-8 h-8 cursor-pointer" 
                        onClick={handleBackClick} 
                    />
                    <h1 className="text-white text-4xl font-semibold">
                        {isEditMode ? '정규 세션 수정' : '정규 세션 추가'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-4 justify-center mx-auto">
                    <div className="space-y-10">
                        <SessionInput
                            label="행사명"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="행사명을 입력해주세요"
                            required={true}
                            description={true}
                        />

                        <SessionInput
                            label="행사 날짜"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                             placeholder="행사 날짜를 선택해주세요"
                            required={true}
                        />

                        <SessionInput
                            label="지각 시간"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            placeholder="지각 시간을 설정해주세요"
                            required={true}
                        />
                        <SessionInput
                            label="얼리버드 종료 시간"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            placeholder="얼리버드 종료 시간을 설정해주세요"
                            required={true}
                        />
                          <SessionInput
                            label="기술 세미나 시작 시간"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            placeholder="기술 세미나 시작 시간을 설정해주세요"
                            required={true}
                        />
                    </div>

                  
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 rounded-[10px] text-white text-lg font-semibold my-20"
                        >
                           저장
                        </button>
                   
                </form>
            </div>
        </div>
    );
}

export default SessionForm;
