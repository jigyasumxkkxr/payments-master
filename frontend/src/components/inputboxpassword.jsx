

export const InputBoxPassword = ({
    onChange,
    placeholder,
    label
}) => {
    return (
        <div className="grid grid-cols-1 mx-9 pb-3 gap-1">
            <div className="text-md font-semibold text-slate-800">
                {label}
            </div>
            <div className="w-full">
                <input onChange={onChange} type="password" placeholder={placeholder} className="w-full h-8 border border-slate-700 rounded px-2 text-slate-300   focus:border-slate-600 focus:outline-none dark:text-slate-700" />
            </div>
        </div>
    )
}