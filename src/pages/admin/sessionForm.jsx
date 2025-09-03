import { React, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/header';
import backIcon from '../../assets/backIcon.png';

function SessionForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // URL 파라미터에서 세션명을 가져와서 수정 모드인지 확인
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

        // 여기에 실제 세션 추가/수정 로직 구현
        console.log(isEditMode ? '세션 수정:' : '세션 추가:', formData);
        
        // 성공 후 세션 목록으로 이동
        navigate('/session');
    };

    return (
        <div>
            <Header title="관리자 페이지" />
            <div className="w-screen mt-40 px-24">
                <div className="flex items-center gap-4 text-gray-600 mb-10">
                    <img 
                        src={backIcon} 
                        alt="back" 
                        className="w-6 h-6 cursor-pointer" 
                        onClick={handleBackClick} 
                    />
                    <h1 className="text-white text-2xl font-bold">
                        {isEditMode ? '정규 세션 수정' : '정규 세션 추가'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <div className="space-y-6">
                        {/* 세션명 */}
                        <div>
                            <label className="block text-white text-lg font-semibold mb-2">
                                세션명 *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="세션명을 입력하세요"
                                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* 날짜 */}
                        <div>
                            <label className="block text-white text-lg font-semibold mb-2">
                                날짜 *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* 시간 */}
                        <div>
                            <label className="block text-white text-lg font-semibold mb-2">
                                시간 *
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* 설명 */}
                        <div>
                            <label className="block text-white text-lg font-semibold mb-2">
                                설명
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="세션에 대한 설명을 입력하세요 (선택사항)"
                                rows={4}
                                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                            />
                        </div>
                    </div>

                    {/* 버튼들 */}
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="px-8 py-3 bg-gray-300 rounded-lg text-zinc-600 text-lg font-semibold hover:bg-gray-400 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 rounded-lg text-white text-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            {isEditMode ? '수정하기' : '추가하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SessionForm;
