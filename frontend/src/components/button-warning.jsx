import { Link } from "react-router-dom"


export const ButtonWarning = ({
    label,
    linkLabel,
    to
}) => {
    return (
        <div className="flex pb-4 pt-2 justify-center gap-1 text-sm ">
            {label}
            <Link className="pointer cursor-pointer underline" to={to}>{linkLabel}</Link>
        </div>
        
    )
}