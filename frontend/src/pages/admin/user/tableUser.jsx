import axios from "axios";
import { useEffect, useState } from "react";
import TablePagination from "../../../components/widgets/tablePagination";
import NoData from "../../../components/widgets/noData";
import ModalAddUser from "../../../components/user/modalAddUser";

const TableUser = () => {
    // variables para paginacion
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [records, setRecords] = useState([])
    const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda
    const [filteredRecords, setFilteredRecords] = useState([])
    const [selectedRecords, setSelectedRecords] = useState([])
    const handleChangeItemsPerPage = (value) => {
        if (value < 1000 && value >= 0) {
            setItemsPerPage(value)
        }
    }
    // Función para manejar el cambio en el input de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // Función para filtrar los eventos basándose en el término de búsqueda
    const filterRecords = () => {
        if (searchTerm.trim() !== "") {
            const filter = records.filter(record =>
                record.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRecords(filter);
        } else {
            // Si el input está vacío, cargar todos los eventos
            setFilteredRecords(records);
        }
    };

    // Llamada a filterEvents cada vez que searchTerm cambia
    useEffect(() => {
        filterRecords();
    }, [searchTerm]);
    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleToogleModal = () => {
        setOpenModal(!openModal);
    }
    const getAllRecords = async () => {
        await axios.get('/user/getAll').then(res => {
            if (res.data.success) {
                setRecords(res.data.users);
                setFilteredRecords(res.data.users);
                // console.log(res.data.users);
            }
            setTotalPages(Math.ceil(res.data.users.length / itemsPerPage))
        })
    }

    useEffect(() => {
        if (filteredRecords.length > 0 && itemsPerPage > 0) {
            setTotalPages(Math.ceil(filteredRecords.length / itemsPerPage))
        }
    }, [itemsPerPage, filteredRecords])
    const handleSelectAllRecords = () => {
        if (selectedRecords.length == filteredRecords.length) {
            setSelectedRecords([])
        }
        else {
            let allRecords = []
            filteredRecords.map(record => {
                allRecords.push(record.recordId)
            })
            setSelectedRecords(allRecords)
        }
    }
    const handleSelectRecord = (recordId) => {
        if (selectedRecords.includes(recordId)) {
            const newSelectedRecords = selectedRecords.filter(id => id !== recordId);
            setSelectedRecords(newSelectedRecords);
        }
        else {
            setSelectedRecords([
                ...selectedRecords,
                recordId
            ])
        }
    }
    useEffect(() => {
        getAllRecords();
    }, [])
    return (
        <>
            {
                openModal &&
                <ModalAddUser
                    handleToogleModal={handleToogleModal}
                    Users={records}
                    getAllRecords={getAllRecords}
                />
            }
            <div className="w-full h-full px-10 py-5 bg-zinc-100 min-h-[92vh]">
                <h2 className="text-3xl font-extrabold text-zinc-500 mb-5">Users</h2>
                <div className="flex flex-row justify-between items-center">
                    <div className="group/search rounded-full h-10 w-6/12 bg-white text-zinc-500 flex flex-row justify-center items-center border-[1px]">
                        {
                            searchTerm === '' &&
                            <div className="px-3 group-has-[:focus]/search:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        }
                        <input
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={`w-full h-full border-none ${searchTerm === '' ? 'rounded-r-full' : 'rounded-full'} text-sm focus:rounded-full px-5 focus:px-5 focus:outline-violet-300`} type="text" name="" id="" placeholder="Search ..." />
                    </div>
                    <div className="flex flex-row justify-end items-center gap-x-3 text-white">
                        <button
                            // onClick={deleteSelectedEvents}
                            disabled={selectedRecords.length == 0 ? true : false} className="font-bold bg-cbaRed px-4 h-10 rounded-full text-sm flex flex-row justify-center items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <span>Delete {selectedRecords.length}</span>
                        </button>
                        <button onClick={handleToogleModal} className="font-semibold bg-cbaBlue px-4 h-10 rounded-full text-sm flex flex-row justify-center items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                            <span>Add user</span>
                        </button>
                    </div>
                </div>
                {
                    records.length > 0 ?
                        <section className="w-full">
                            <div className="w-full text-sm font-bold text-zinc-500">
                                <div className="w-full h-14 bg-blue-50 shadow flex flex-row items-center px-2 rounded-tl-2xl rounded-tr-2xl mt-3 mb-2">
                                    <div className="group/Check w-[5%] flex justify-center items-center h-full p-2">
                                        <label htmlFor='DeleteAll' className=" flex items-center justify-center border-2 w-5 h-5 rounded-md border-zinc-500 has-[:checked]:bg-blue-200 has-[:checked]:border-blue-300">
                                            <input type="checkbox" name="" id='DeleteAll' className="hidden " onChange={handleSelectAllRecords} checked={selectedRecords.length == filteredRecords.length ? true : false} />
                                            <span className="text-white hidden group-has-[:checked]/Check:block">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>

                                            </span>
                                        </label>
                                    </div>
                                    <div className="w-[5%]">Id</div>
                                    <div className="w-[15%]">Full Name</div>
                                    <div className="w-[20%] flex justify-center items-center">E-mail</div>
                                    <div className="w-[10%] flex justify-center items-center">User</div>
                                    <div className="w-[5%] flex justify-center items-center">Role</div>
                                    <div className="w-[20%] flex justify-center items-center">Supervisors</div>
                                    <div className="w-[10%] flex justify-center items-center">State</div>
                                    <div className="w-[10%] flex justify-center items-center">Actions</div>
                                </div>
                                <div className="w-full flex flex-col gap-y-2">
                                    {
                                        records.length > 0 &&
                                        filteredRecords.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((record, index) => (
                                            <div key={index} className=" w-full h-16 flex flex-row items-center px-2 bg-white shadow-sm rounded-lg">
                                                <div className="w-[5%] flex justify-center items-center h-full p-2 group/Check">
                                                    <label htmlFor={record.userId} className=" flex items-center justify-center border-2 w-5 h-5 rounded-md border-zinc-300 has-[:checked]:bg-blue-200 has-[:checked]:border-blue-300">
                                                        <input type="checkbox" name="" id={record.userId} className="hidden "
                                                            checked={selectedRecords.includes(record.userId) ? true : false}
                                                            onChange={() => handleSelectRecord(record.userId)}
                                                        />
                                                        <span className="text-white hidden group-has-[:checked]/Check:block">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                            </svg>
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="w-[5%]">{record.userId}</div>
                                                <div className="w-[15%]">{record.fullName}</div>
                                                {/* <div className="w-[25%] text-center ">{new Date(record.date).toISOString()}</div> */}
                                                <div className="w-[20%] text-center ">{record.email}</div>
                                                <div className="w-[10%] flex flex-row justify-center items-center gap-x-2 font-semibold text-zinc-400">{record.user}</div>
                                                <div className="w-[5%] flex flex-row justify-center items-center gap-x-2 font-semibold text-zinc-400">{record.role}</div>
                                                <div className="w-[20%] flex flex-row justify-center items-center gap-x-2 font-semibold text-zinc-400">Supervisors</div>
                                                <div className="w-[10%] flex justify-center items-center flex-row gap-x-1.5">
                                                    <span className={`${record.state ? 'bg-emerald-100 text-emerald-400 border-emerald-400' : 'bg-red-100 text-red-400 border-red-400'} rounded-full text-xs py-1.5 px-3 border-[1.5px]`}>
                                                        {`${record.state ? 'Active' : 'Disabled'}`}
                                                    </span>
                                                </div>
                                                <div className="w-[10%] h-full p-[1px] flex items-center justify-center gap-x-1.5 text-zinc-400">
                                                    <button
                                                        // onClick={() => handleEditEvent(record.userId)}
                                                        className="text-cbaBlue transition ease-in-out delay-150 duration-300 p-2 rounded-full hover:bg-zinc-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                        </svg>
                                                    </button>
                                                    <div className="h-6 w-[1px] bg-zinc-300"></div>
                                                    <button
                                                        // onClick={() => handleDeleteRecordById(record.userId)}
                                                        className="text-cbaRed transition ease-in-out delay-150 duration-300 p-2 rounded-full hover:bg-zinc-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <TablePagination
                                    classes={`h-14 bg-blue-50 rounded-bl-2xl rounded-br-2xl`}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={onPageChange}
                                    topRank={5}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={filteredRecords.length}
                                    handleChangeItemsPerPage={handleChangeItemsPerPage}
                                />
                            </div>
                        </section> :
                        <div className="w-full h-96">
                            <NoData
                                text={'Aun no hay eventos'}
                                fontSize={''}
                            />
                        </div>
                }
            </div>
        </>
    );
}

export default TableUser;