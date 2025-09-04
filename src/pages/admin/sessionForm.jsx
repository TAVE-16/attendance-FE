import { React, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SessionInput from '../../components/sessionInput';
import backIcon from '../../assets/backIcon.png';
import warningIcon from '../../assets/warningIcon.png';
import closeIcon from '../../assets/closeIcon.png';


function SessionForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const sessionName = searchParams.get('name');
    const isEditMode = !!sessionName;
    
    const [formData, setFormData] = useState({
        name: sessionName || '',
        date: '',
        description: ''
    });

    const [timeData, setTimeData] = useState({
        lateTime: { hour: 0, minute: 0, period: 'AM' },
        earlybirdEndTime: { hour: 0, minute: 0, period: 'AM' },
        seminarStartTime: { hour: 0, minute: 0, period: 'AM' }
    });

    const [showWarningModal, setShowWarningModal] = useState(false);

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

    const handleTimeChange = (timeType, field, value) => {
        if (field === 'formattedTime') {
            // 시간 문자열을 파싱하여 각 필드에 저장
            const [hourStr, minuteStr] = value.split(':');
            const hour24 = parseInt(hourStr);
            const minute = parseInt(minuteStr);
            
            let hour12, period;
            if (hour24 === 0) {
                hour12 = 12;
                period = 'AM';
            } else if (hour24 < 12) {
                hour12 = hour24;
                period = 'AM';
            } else if (hour24 === 12) {
                hour12 = 12;
                period = 'PM';
            } else {
                hour12 = hour24 - 12;
                period = 'PM';
            }
            
            setTimeData(prev => ({
                ...prev,
                [timeType]: {
                    hour: hour12,
                    minute: minute,
                    period: period
                }
            }));
        } else {
            setTimeData(prev => ({
                ...prev,
                [timeType]: {
                    ...prev[timeType],
                    [field]: value
                }
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 필수 입력값 검증
        const isNameEmpty = !formData.name.trim();
        const isDateEmpty = !formData.date;
        const isLateTimeEmpty = timeData.lateTime.hour === 0 && timeData.lateTime.minute === 0;
        const isEarlybirdTimeEmpty = timeData.earlybirdEndTime.hour === 0 && timeData.earlybirdEndTime.minute === 0;
        
        if (isNameEmpty || isDateEmpty || isLateTimeEmpty || isEarlybirdTimeEmpty) {
            setShowWarningModal(true);
            return;
        }

        console.log(isEditMode ? '세션 수정:' : '세션 추가:', { ...formData, timeData });
        
        navigate('/session');
    };

    const handleCloseWarningModal = () => {
        setShowWarningModal(false);
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
                            name="lateTime"
                            type="time"
                            timeValue={timeData.lateTime}
                            onTimeChange={(field, value) => handleTimeChange('lateTime', field, value)}
                            placeholder="지각 시간을 설정해주세요"
                            required={true}
                        />
                        <SessionInput
                            label="얼리버드 종료 시간"
                            name="earlybirdEndTime"
                            type="time"
                            timeValue={timeData.earlybirdEndTime}
                            onTimeChange={(field, value) => handleTimeChange('earlybirdEndTime', field, value)}
                            placeholder="얼리버드 종료 시간을 설정해주세요"
                            required={true}
                        />
                          <SessionInput
                            label="기술 세미나 시작 시간"
                            name="seminarStartTime"
                            type="time"
                            timeValue={timeData.seminarStartTime}
                            onTimeChange={(field, value) => handleTimeChange('seminarStartTime', field, value)}
                            placeholder="기술 세미나 시작 시간을 설정해주세요"
                            required={false}
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

            {/* 경고 모달 */}
            {showWarningModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-96 h-60 p-4 flex-col justify-center items-center gap-2.5">
                   
                   <img src={closeIcon} alt="warning" className="w-3.5 h-3.5 ml-auto mb-10 cursor-pointer" 
                   onClick={handleCloseWarningModal}
                   />
                   <img src={warningIcon} alt="warning" className="w-12 h-12 mb-8 mx-auto" />
                        <p className="text-black text-xl font-medium text-center">
                            필수 입력값을 입력해주세요
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SessionForm;
