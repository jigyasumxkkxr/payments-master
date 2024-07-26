

export const Button = ({onClick,label}) => {
    return (
        <div className="flex justify-center items-center mx-9 mt-6">
            <button onClick={onClick} className="bg-slate-900 hover:bg-slate-800 text-slate-100 w-full h-10 rounded-lg text-md font-semibold">{label}</button>
        </div>
    )
}