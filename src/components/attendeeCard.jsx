export default function AttendeeCard({part, name, status}) {
    return (
        <div className="w-96 h-24 bg-blue-400/20 rounded-[20px] flex justify-between px-10 items-center">
                <div className="flex items-center gap-3">
                    <span className="text-white text-lg font-semibold">{part}</span>
                    <span className="text-white text-lg font-semibold">{name}</span>
                </div>
                <span className="text-white text-lg font-semibold">{status}</span>
        </div>

    );
}