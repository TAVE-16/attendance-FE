import { useState } from 'react';
import backIcon from '../assets/backIcon.png';

export default function Dropdown() {
    const list = ["전체", "프론트", "백엔드", "디자인", "딥러닝", "데이터분석"]
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("전체");
    
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };
    
  return <div className="relative">
    <div 
        className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 bg-transparent w-28"
        onClick={() => setIsOpen(!isOpen)}
    >
        <span className="text-white text-lg font-semibold mx-2">{selectedItem}</span>
        <img 
            src={backIcon} 
            alt="dropdown arrow" 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-[270deg]'}`} 
        />
    </div>
    
    {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-neutral-800 rounded-[10px] z-10 w-28 h-64 ">
            {list.map((item, index) => (
                <div
                    key={index}
                    className={`px-3 py-2.5 cursor-pointer hover:text-white hover:font-semibold transition-colors text-neutral-400 text-base font-medium`}
                    onClick={() => handleItemClick(item)}
                >
                    {item}
                </div>
            ))}
        </div>
    )}
  </div>;
}