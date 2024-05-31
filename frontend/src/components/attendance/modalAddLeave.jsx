import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const ModalAddLeave = ({
    handleToogleModal,
    record
}) => {
    const auth = useSelector((state) => state.auth);
    const [data, setData] = useState({
        reason: '',
        reviewDate: '',
        regularDate: '',
        regularTime: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        userId: auth.user.userId,
        typeId: ''
    })
    // Función para formatear tiempos a HH:mm
    const formatTime = (time) => {
        return dayjs(time, 'HH:mm:ss').format('HH:mm');
    };
    useEffect(() => {
        console.log(record)
    }, [])
    return (
        <>
            <div className="fixed inset-0 overflow-hidden bg-slate-950/20 z-[1] p-2 flex items-center justify-center">
                {/* backdrop modal */}
                <div onClick={handleToogleModal} className="fixed inset-0 z-[2]"></div>
                {/* modal container */}
                <div className="relative w-[800px]  bg-white rounded-2xl shadow-xl z-[3] flex-col flex pt-6 px-8 justify-between">
                    <div className="flex flex-col grow">
                        <div className="flex flex-row text-zinc-400 font-semibold text-sm gap-x-10 border-b-2 pb-6">
                            <span>{dayjs(record.date).add(1, 'day').format('dddd, DD [de] MMMM [de] YYYY')}</span>
                            <label htmlFor="">
                                {formatTime(record.clockIn)}
                            </label>
                            <div>
                                <span>Llegar Tarde</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2 text-zinc-600 font-bold py-6">
                            <span className="">Reason</span>
                            <textarea className="rounded-lg py-2 px-4 focus:outline-violet-300 outline-zinc-200 outline outline-offset-0 outline-2" name="" id="" cols="30" rows="6" />
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-x-3 py-5">
                        <button onClick={handleToogleModal} className="text-cbaBlue font-semibold px-10 h-10 rounded-full text-sm hover:bg-zinc-100">
                            Cancel
                        </button>
                        <button className="font-semibold bg-cbaBlue px-10 h-10 rounded-full text-sm flex flex-row justify-center items-center text-white">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddLeave;