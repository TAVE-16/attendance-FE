import { useState } from 'react';
import DatePicker from 'react-datepicker';
import navArrow from '../assets/navArrow.png';

export default function SessionInput({ 
    label, 
    name, 
    type = "text", 
    value, 
    onChange, 
    placeholder, 
    required = false,
    rows = 1,
    description = false
}) {
    const [selectedDate, setSelectedDate] = useState(null);

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
                        {label} {required && "*"}
                    </label>
                    <span className="text-neutral-400 text-base font-medium">*는 필수 입력 값입니다</span>
                </div>
            )}
            {!description && (
                <label className="text-white text-xl font-medium">
                    {label} {required && "*"}
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
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 bg-blue-400/20 rounded-[10px] text-white text-lg font-bold placeholder-gray-500 placeholder-base placeholder-medium focus:outline-none mt-4"
                    required={required}
                />
            )}
        </div>
    );
}
