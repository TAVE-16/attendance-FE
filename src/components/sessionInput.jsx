import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import navArrow from '../assets/navArrow.png';

export default function SessionInput({ 
    label, 
    name, 
    type = "text", 
    value, 
    onChange, 
    placeholder, 
    withCheck = false,
    rows = 1,
    description = false,
    timeValue: propTimeValue,
    onTimeChange: propOnTimeChange
}) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [timeValue, setTimeValue] = useState({
        hour: 12,
        minute: 0,
        period: 'AM'
    });

    // 부모 컴포넌트에서 전달된 timeValue가 변경될 때 로컬 state 업데이트
    useEffect(() => {
        if (propTimeValue) {
            setTimeValue(propTimeValue);
        }
    }, [propTimeValue]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // 부모 컴포넌트로 날짜 전달
        if (onChange) {
            const event = {
                target: {
                    name: name,
                    value: date
                }
            };
            onChange(event);
        }
    };

    const handleTimeInputClick = () => {
        if (type === "time") {
            setShowTimeModal(true);
        }
    };

    const handleTimeChange = (field, value) => {
        const newTimeValue = {
            ...timeValue,
            [field]: value
        };
        setTimeValue(newTimeValue);
    };

    const handleTimeSave = () => {
        const { hour, minute, period } = timeValue;
        let displayHour = hour;
        
        if (period === 'AM' && hour === 12) {
            displayHour = 0;
        } else if (period === 'PM' && hour !== 12) {
            displayHour = hour + 12;
        }
        
        const timeString = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // 부모 컴포넌트로 시간 변경 전달
        if (propOnTimeChange) {
            propOnTimeChange('formattedTime', timeString);
        }
        
        setShowTimeModal(false);
    };

    const handleTimeCancel = () => {
        setShowTimeModal(false);
    };

    // 시간 표시용 문자열 생성 (부모 컴포넌트의 propTimeValue 기준)
    const getTimeDisplayString = () => {
        const timeData = propTimeValue || { hour: 0, minute: 0, period: 'AM' };
        const { hour, minute, period } = timeData;
        if (hour === 0 && minute === 0) return '';
        
        let displayHour = hour;
        if (period === 'AM' && hour === 12) {
            displayHour = 0;
        } else if (period === 'PM' && hour !== 12) {
            displayHour = hour + 12;
        }
        
        return `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    };

    const formatMonthYear = (date) => {
        try {
            if (!date) return '';
            
            const dateObj = date instanceof Date ? date : new Date(date);
            
            if (isNaN(dateObj.getTime())) return '';
            
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            return `${year}.${month}`;
        } catch (error) {
            console.error('formatMonthYear error:', error);
            return '';
        }
    };

    const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        
        return (
            <div className="react-datepicker__header flex justify-between items-center w-full">
                <div className="react-datepicker__current-month">
                    {year}.{month}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="react-datepicker__navigation react-datepicker__navigation--previous"
                        onClick={decreaseMonth}
                    >
                        <img 
                            src={navArrow} 
                            alt="다음 월" 
                            className="w-4 h-4"
                        />
                    </button>
                    <button
                        type="button"
                        className="react-datepicker__navigation react-datepicker__navigation--next"
                        onClick={increaseMonth}
                    >
                         <img 
                            src={navArrow} 
                            alt="이전 월" 
                            className="w-4 h-4 rotate-180"
                        />
                       
                    </button>
                </div>
            </div>
        );
    };



    return (
        <div>
            {description && (
                <div className="flex items-center justify-between gap-3">
                    <label className="text-white text-xl font-medium">
                        {label} {withCheck && "*"}
                    </label>
                    <span className="text-neutral-400 text-base font-medium">*는 필수 입력 값입니다</span>
                </div>
            )}
            {!description && (
                <label className="text-white text-xl font-medium">
                    {label} {withCheck && "*"}
                </label>
            )}
            
            {type === "date" ? (
                <div className="mt-4">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        withPortal
                        placeholderText={placeholder}
                        className="w-full px-4 py-4 bg-blue-400/20 rounded-[10px] text-white text-lg font-bold placeholder-gray-500 focus:outline-none"
                        dateFormat="yyyy. MM. dd"
                        renderCustomHeader={renderCustomHeader}
                    />
                </div>
            ) : type === "time" ? (
                <div className="mt-4">
                    <input
                        type="text"
                        name={name}
                        value={getTimeDisplayString()}
                        onClick={handleTimeInputClick}
                        placeholder={placeholder}
                        className="w-full px-4 py-4 bg-blue-400/20 rounded-[10px] text-white text-lg font-bold placeholder-gray-500 placeholder-base placeholder-medium focus:outline-none cursor-pointer"
                        readOnly
                    />
                    
                    {/* 시간 선택 모달 */}
                    {showTimeModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg w-[490px] px-11 py-7">
                                <h3 className="text-black text-xl font-semibold mb-8 text-center">
                                    {label}
                                </h3>
                                
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center flex-col mr-8">
                                            <button
                                                type="button"
                                                onClick={() => handleTimeChange('period', 'AM')}
                                                className={`px-6 py-1 rounded-t-lg rounded-b-none text-lg font-semibold ${
                                                    timeValue.period === 'AM' 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-white text-neutral-300  border-l border-r border-b border-gray-300'
                                                }`}
                                            >
                                                오전
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleTimeChange('period', 'PM')}
                                                className={`px-6 py-1 rounded-t-none rounded-b-lg text-lg font-semibold ${
                                                    timeValue.period === 'PM' 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-white text-neutral-300  border-l border-r border-b border-gray-300'
                                                }`}
                                            >
                                                오후
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-center">
                                        <input
                                            type="text"
                                            value={timeValue.hour}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // 숫자만 입력 허용
                                                if (/^\d*$/.test(value)) {
                                                    if (value === '') {
                                                        handleTimeChange('hour', 0);
                                                    } else {
                                                        const numValue = parseInt(value);
                                                        if (numValue >= 1 && numValue <= 12) {
                                                            handleTimeChange('hour', numValue);
                                                        }
                                                    }
                                                }
                                            }}
                                            maxLength="2"
                                            className="w-28 py-5 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-200 text-center text-neutral-700 text-3xl font-medium"
                                            placeholder="12"
                                        />
                                    </div>
                                    <span className="text-neutral-700 text-4xl font-medium">:</span>

                                    <div className="flex flex-col items-center">
                                        <input
                                            type="text"
                                            value={timeValue.minute === 0 ? '' : timeValue.minute.toString()}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    if (value === '') {
                                                        handleTimeChange('minute', 0);
                                                    } else {
                                                        const numValue = parseInt(value);
                                                        if (numValue >= 0 && numValue <= 59) {
                                                            handleTimeChange('minute', numValue);
                                                        }
                                                    }
                                                }
                                            }}
                                            onBlur={(e) => {
                                                // 2자리 포맷팅 (00 형식)
                                                if (timeValue.minute > 0) {
                                                    e.target.value = timeValue.minute.toString().padStart(2, '0');
                                                }
                                            }}
                                            maxLength="2"
                                            className="w-28 py-5 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-200 text-center text-neutral-700 text-3xl font-medium"
                                            placeholder="00"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-4 mt-12">
                                    <button
                                        type="button"
                                        onClick={handleTimeCancel}
                                        className="w-28 h-12 py-1.5 bg-gray-300 rounded-[10px] text-zinc-600 text-lg font-semibold"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleTimeSave}
                                        className="w-28 h-12 py-[5px] bg-blue-600 text-white text-lg font-semibold"
                                    >
                                        저장
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 bg-blue-400/20 rounded-[10px] text-white text-lg font-bold placeholder-gray-500 placeholder-base placeholder-medium focus:outline-none mt-4"
                />
            )}
        </div>
    );
}
