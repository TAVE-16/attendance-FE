import notCheckedIcon from '../assets/notCheckedIcon.png';
import checkedIcon from '../assets/checkedIcon.png';

export default function SessionBlock({sessionName, isDeleteMode, isSelected, onSelect}) {
    return (
        <div 
            className={`w-full h-36 bg-blue-400/20 rounded-[20px] flex items-center gap-6 px-10 transition-all duration-300 ease-in-out ${
                isDeleteMode ? 'cursor-pointer hover:bg-blue-400/30' : ''
            }`}
            onClick={isDeleteMode ? onSelect : undefined}
        >
            {isDeleteMode && (
                <img 
                    src={isSelected ? checkedIcon : notCheckedIcon} 
                    alt={isSelected ? "checkedIcon" : "notCheckedIcon"} 
                    className="w-8 h-8" 
                />
            )}
            <p className="text-white text-xl font-bold">{sessionName}</p>
        </div>
    );
}