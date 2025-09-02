import {React, useState, useEffect} from 'react';
import Header from '../../components/header';
import Logo from '../../assets/logo.png';
import LoginInput from '../../components/loginInput';
import backIcon from '../../assets/backIcon.png';
import SessionBlock from '../../components/sessionBlock';

function Session() {
  const sessions = ["OT", "전반기 만남의 장", "후반기 만남의 장", "전반기 시상식", "테런데이", "OB/현직자 강연", "후반기 컨퍼런스", "TAVE의 밤"];
    return (
        <div>
             <Header />
        <div className=' w-screen mt-24 px-24'>
            <h1 className="justify-start text-white text-2xl font-bold">정규세션</h1>
            <div className='flex flex-col items-center justify-center gap-4 mt-6 mb-20'>
                {sessions.map((session) => (
                    <SessionBlock sessionName={session} />
                ))}
            </div>
            <div className='flex items-center justify-center gap-4 mb-48'>
                <button className="w-44 h-12 bg-gray-300 rounded-[10px] text-center justify-start text-zinc-600 text-xl font-medium ">삭제 취소</button>
                <button className="w-44 h-12 bg-blue-600 rounded-[10px] text-center justify-start text-white text-xl font-semibold ">선택 완료</button>
            </div>

            
        </div>
        </div>
    );
}

export default Session;
