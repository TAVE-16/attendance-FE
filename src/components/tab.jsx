export default function Tab({tabName, isActive, onClick}) {
    return (
        <button 
            onClick={onClick} 
            className={`px-4 py-2 text-lg font-bold transition-all duration-300 relative ${
                isActive 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-gray-300'
            }`}
        >
            {tabName}
            {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
            )}
        </button>
    );
}