export default function Count({type, count}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-200 text-base font-bold">{type}: </span>
            <span className="text-white text-xl font-bold">{count}</span>
        </div>
    );
}