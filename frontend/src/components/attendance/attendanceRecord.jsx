import { useState } from "react";
import ButtonNew from "../widgets/buttonNew";
import ModalUpload from "./modalUpload";

const AttendanceRecord = () => {
    const [openModal, setOpenModal] = useState(false)
    const handleToogleModal = () => {
        setOpenModal(!openModal);
    }
    return (
        <>
            {
                openModal &&
                <ModalUpload
                    handleToogleModal={handleToogleModal}
                />
            }
            <div className="w-full h-full bg-teal-100 px-10 py-5">
                <div className="flex flex-row justify-end items-center">
                    <ButtonNew
                        text={'Upload Data'}
                        handleFunction={handleToogleModal}
                    />
                </div>
            </div>
        </>
    );
}

export default AttendanceRecord;