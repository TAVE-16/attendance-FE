import React from 'react';

function Modal({ isOpen, onClose, phoneNumber }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center shadow-xl">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg 
                            className="w-8 h-8 text-green-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        출석 완료!
                    </h2>
                    <p className="text-gray-600">
                        김시은님 출석이 완료되었습니다!
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                >
                    확인
                </button>
            </div>
        </div>
    );
}

export default Modal;
