import notCheckedIcon from '../assets/notCheckedIcon.png';

export default function SessionBlock({sessionName}) {
    return (
        <div className="w-full h-36 bg-blue-400/20 rounded-[20px] flex items-center gap-6">
            <img src={notCheckedIcon} alt="notCheckedIcon" className="w-8 h-8 ml-10" />
            <p className="text-white text-xl font-bold">{sessionName}</p>
        </div>
    );
}