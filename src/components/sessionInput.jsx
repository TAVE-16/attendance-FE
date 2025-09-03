export default function SessionInput({ 
    label, 
    name, 
    type = "text", 
    value, 
    onChange, 
    placeholder, 
    required = false,
    rows = 1 ,
    description = false
}) {

    return (
        <div>
            {description && (
       <div className="flex items-center justify-between gap-3">
       <label className="text-white text-xl font-medium">
           {label} {required && "*"}
       </label>
       <span className="text-neutral-400 text-base font-medium">*는 필수 입력 값입니다</span>
       </div>
            )}
            {!description && (
            <label className="text-white text-xl font-medium">
                {label} {required && "*"}
            </label>
            )}
           
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 bg-blue-400/20 rounded-[10px] text-white text-lg font-bold placeholder-gray-500 placeholder-base placeholder-medium focus:outline-none mt-4"
                    required={required}
                />
            
        </div>
    );
}
