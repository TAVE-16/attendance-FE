import React, { useState, useEffect } from 'react';
import PWIcon1 from '../assets/Vector 3.png'
import PWIcon2 from '../assets/Vector 4.png'
import PWIcon3 from '../assets/Vector 7.png'
import PWIcon4 from '../assets/Vector 8.png'
import PWIcon5 from '../assets/Vector 9.png'
import Modal from './modal.jsx'

function Password() {
    const [password, setPassword] = useState(['', '', '', '', '', '', '', '']);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [completedPhoneNumber, setCompletedPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (index, value) => {
      
        setErrorMessage('');
        
        if (!/^[0-9]$/.test(value)) {
            return;
        }
        
        if (value.length > 1) return;
        
        const newPassword = [...password];
        newPassword[index] = value;
        setPassword(newPassword);
        
        if (value && index < 7) {
            const nextInput = document.getElementById(`input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (password[index]) {
                // 현재 칸에 값이 있으면 현재 칸의 값만 지우기
                const newPassword = [...password];
                newPassword[index] = '';
                setPassword(newPassword);
                // 현재 칸에 포커스 유지 (값이 지워진 칸)
            } else if (index > 0) {
                // 현재 칸이 비어있고 이전 칸이 있으면 이전 칸으로 이동하여 값 지우기
                const newPassword = [...password];
                newPassword[index - 1] = '';
                setPassword(newPassword);
                
                // 이전 칸에 포커스 (값이 지워진 칸)
                setTimeout(() => {
                    const prevInput = document.getElementById(`input-${index - 1}`);
                    if (prevInput) prevInput.focus();
                }, 10);
            }
        }
    };

    const handleSubmit = () => {
        const fullPassword = password.join('');
        
        if (fullPassword.length === 8) {
            // 000000 에러 체크-> 나중에 없는 번호일때 띄우기
            if (fullPassword === '00000000') {
                setErrorMessage('존재하지 않는 번호입니다.');
                return;
            }
            
          
            const formattedPhoneNumber = fullPassword.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            setCompletedPhoneNumber(formattedPhoneNumber);
            setShowModal(true);
        } else {
            setErrorMessage('비밀번호가 8자리가 아닙니다.');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        // 비밀번호 입력 초기화
        setPassword(['', '', '', '', '', '', '', '']);
        // 첫 번째 입력 칸에 포커스
        const firstInput = document.getElementById('input-0');
        if (firstInput) firstInput.focus();
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setPassword(['', '', '', '', '', '', '', '']);
        setErrorMessage(''); 
       
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
        
        // 첫 번째 입력 칸에 포커스
        const firstInput = document.getElementById('input-0');
        if (firstInput) firstInput.focus();
    };

    const getIconForIndex = (index) => {
        const icons = [PWIcon1, PWIcon2, PWIcon3, PWIcon4, PWIcon5, PWIcon1, PWIcon2, PWIcon3];
        return icons[index] || PWIcon1;
    };

    return (
        <div className="text-center">
            <h1 className='text-2xl font-bold mb-4 text-black'>전화번호 입력</h1>
            <div className="flex items-center justify-center gap-3 mb-6">
                {password.map((digit, index) => (
                    <div key={index} className="relative">
                        {digit ? (
                            <div className="w-12 h-12 flex items-center justify-center">
                                <img 
                                    src={getIconForIndex(index)} 
                                    alt={`icon-${index}`}
                                    className="w-8 h-8"
                                />
                            </div>
                        ) : (
                            <input
                                id={`input-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-full bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                        )}
                    </div>
                ))}
                {/* 새로고침 버튼 */}
                <button
                    onClick={handleRefresh}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 ml-2 p-0"
                    title="비밀번호 초기화"
                >
                    <svg 
                        className={`w-6 h-6 text-gray-500 transition-transform duration-500 ${isRefreshing ? 'animate-spin-reverse' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                        />
                    </svg>
                </button>
            </div>
            {!errorMessage && <p className="text-gray-600 mb-4">010을 제외한 전화번호 8자리를 입력해주세요!</p>}
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
            <button 
                onClick={handleSubmit}
                disabled={password.join('').length !== 8}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    password.join('').length === 8 
                        ? 'bg-blue-500 text-white cursor-pointer' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                출석!
            </button>
           
            <Modal 
                isOpen={showModal} 
                onClose={handleModalClose} 
                phoneNumber={completedPhoneNumber} 
            />
        </div>
    );
}

export default Password; 