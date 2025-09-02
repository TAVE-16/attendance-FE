export default function LoginInput({ type }) {
    return (
        <div className='flex items-center gap-3'>
            <label className='text-white ml-auto text-2xl font-semibold'>{type}</label>
            <input type="text" className="w-96 h-12 bg-slate-50 rounded-md focus:outline-none text-xl text-black pl-4"/>
        </div>
    );
}