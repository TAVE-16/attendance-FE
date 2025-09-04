export default function LoginInput({ type, value, onChange }) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className='flex items-center gap-3'>
            <label className='text-white ml-auto text-2xl font-semibold'>{type}</label>
            <input 
                type={type === "Password" ? "password" : "text"} 
                className="w-96 h-12 bg-slate-50 rounded-md focus:outline-none text-xl text-black pl-4"
                value={value || ''}
                onChange={handleChange}
            />
        </div>
    );
}