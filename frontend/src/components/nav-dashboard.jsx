

export const NavDashboard = ({
    label,
    userName
}) => {
    return (
        <nav className="flex justify-between items-center px-8 pb-2  shadow-sm shadow-slate-300 mb-10">
            <div className="text-2xl font-bold text-slate-800">
                {label}
            </div>
            <div className="flex gap-6 text-slate-800 items-center font-semibold">
                <div>
                    {userName}
                </div>
                <div className="bg-slate-300 h-10 w-10 rounded-full flex justify-center items-center font-bold">
                    {userName[0]}
                </div>
            </div>
        </nav>
    )
}