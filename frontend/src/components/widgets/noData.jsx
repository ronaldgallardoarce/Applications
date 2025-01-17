import noData from "../../assets/No_data.png"
const NoData = ({
    text,
    fontSize
}) => {
    return (
        <div className="h-full w-full bg-white shadow-xl rounded-2xl flex justify-center items-center flex-col gap-y-3">
            <img className="h-[65%]" src={noData} alt="No hay datos" />
            <div className="flex items-center justify-center text-blue-300 text-xl font-bold gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
                <span className={`${fontSize}`}>{text}</span>
            </div>
        </div>
    );
}

export default NoData;