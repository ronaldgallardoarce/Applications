import { useEffect, useState } from "react";
import Select from "../widgets/select";
import SelectSupervisors from "../widgets/selectSupervisors";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { SuccessAlert } from "../toastAlerts/success";
import { ErrorAlert } from "../toastAlerts/error";

const ModalAddUser = ({
    handleToogleModal,
    Users,
    getAllRecords
}) => {
    const auth = useSelector((state) => state.auth.user)
    const [data, setData] = useState({
        userId: 0,
        email: '',
        user: '',
        password: '',
        fullName: '',
        supervisors: [],
        role: 'level_1',
        state: true
    })
    const [showPassword, setShowPassword] = useState(false);
    const [onFocus, setOnFocus] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([
        { id: 'userNull', txt: 'Ninguno', value: [] }
    ]);
    const handleChangeInput = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [property]: value
        })
    }
    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    const handleFocus = () => {
        setOnFocus(true);
    }
    const handleBlur = () => {
        setOnFocus(false);
    }
    const handleChangeUserState = (dato) => {
        setData({
            ...data,
            state: dato.value
        })
    }
    const handleChangeUserRole = (dato) => {
        setData({
            ...data,
            role: dato.value
        })
    }
    const handleChangeUserSupervisors = (dato) => {
        if (dato.value.length == 0) {
            setData({
                ...data,
                supervisors: []
            })
        }
        else {
            let supervisors = data.supervisors;
            supervisors.push(dato.value);
            setData({
                ...data,
                supervisors: supervisors
            })
        }
    }
    const handleRemoveSupervisor = (dato) => {
        if (data.supervisors.includes(dato.id)) {
            const supervisors = data.supervisors.filter(id => id !== dato.id);
            setData({
                ...data,
                supervisors: supervisors
            })
        }
    }
    useEffect(() => {
        const filtered = Users.filter(user => user.userId !== auth.userId).map(user => ({
            id: user.userId,
            txt: user.fullName,
            value: user.userId
        }))
        setFilteredUsers(prevState => [...prevState, ...filtered])
    }, [Users])
    const handleSubmit = async () => {
        const response = await axios.post('user/createUser', data)
        if (response.data.success) {
            getAllRecords();
            toast.custom((t) => (
                <SuccessAlert t={t} w={'w-[500px]'} message={response.data.message} />
            ))
            setTimeout(() => {
                handleToogleModal();
            }, 500);
        }
        else {
            getAllRecords();
            toast.custom((t) => (
                <ErrorAlert t={t} w={'w-[500px]'} message={response.data.message} />
            ))
            setTimeout(() => {
                handleToogleModal();
            }, 500);
        }
    };
    useEffect(() => {
        // console.log(data)
    }, [data])
    return (
        <>
            <div className="fixed inset-0 overflow-hidden bg-slate-950/20 z-[1] p-2 flex items-center justify-center">
                {/* backdrop modal */}
                <div onClick={handleToogleModal} className="fixed inset-0 z-[2]"></div>
                {/* modal container */}
                <div className="relative w-[800px] h-[600px] bg-white rounded-2xl shadow-xl z-[3] flex-col flex pt-14 px-12">
                    <div className="flex flex-row grow gap-x-10">
                        <div className="w-[50%] h-full flex flex-col gap-y-6">
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="fullName" className='text-md font-semibold text-zinc-500'>Full Name</label>
                                <input onChange={handleChangeInput} name='fullName' type="text" className='rounded-lg py-3 px-4 focus:outline-violet-300 outline-zinc-300 outline outline-offset-0 outline-2' id='fullName' />
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="email" className='text-md font-semibold text-zinc-500'>E-mail</label>
                                <input onChange={handleChangeInput} name='email' type='email' className='rounded-lg py-3 px-4 focus:outline-violet-300 outline-zinc-300 outline outline-offset-0 outline-2' id='email' />
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="userId" className='text-md font-semibold text-zinc-500'>User Id</label>
                                <input onChange={handleChangeInput} name='userId' type='number' className='rounded-lg py-3 px-4 focus:outline-violet-300 outline-zinc-300 outline outline-offset-0 outline-2' id='userId' />
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="state" className='text-md font-semibold text-zinc-500'>State</label>
                                <Select
                                    datos={[
                                        { id: 1, txt: 'Active', value: true },
                                        { id: 2, txt: 'Disabled', value: false }
                                    ]}
                                    initialSelected={{ id: 1, txt: 'Active', value: true }}
                                    disabled={false}
                                    containerClass={'rounded-lg py-3 px-4 outline-zinc-300 outline outline-offset-0 outline-2'}
                                    modalClass={'right-0 mt-2 w-[70%]'}
                                    handleFunction={handleChangeUserState}
                                />
                            </div>
                        </div>
                        <div className="w-[50%] h-full flex flex-col gap-y-6">
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="user" className='text-md font-semibold text-zinc-500'>User</label>
                                <input onChange={handleChangeInput} name='user' type="text" className='rounded-lg py-3 px-4 focus:outline-violet-300 outline-zinc-300 outline outline-offset-0 outline-2' id='user' />
                            </div>
                            <div className='flex flex-col gap-y-2'>
                                <span className='text-md font-semibold ml-2 text-zinc-500'>Password</span>
                                <label htmlFor="password" className={`${onFocus ? 'outline outline-offset-0 outline-2 outline-violet-300' : 'outline-zinc-300 outline outline-offset-0 outline-2'}  rounded-lg flex items-center relative`}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                >
                                    <input onChange={handleChangeInput} name='password' type={showPassword ? 'text' : 'password'} className='bg-transparent py-3 px-4 focus:outline-none grow' id='password' />
                                    <button
                                        onClick={toggleShowPassword}
                                        className='mr-3 text-zinc-500'
                                    >
                                        {showPassword ?
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                            </svg>

                                        }
                                    </button>
                                </label>
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="state" className='text-md font-semibold text-zinc-500'>Role</label>
                                <Select
                                    datos={[
                                        { id: 1, txt: 'Administrator', value: 'admin' },
                                        { id: 2, txt: 'Level 1', value: 'level_1' },
                                        { id: 3, txt: 'Level 2', value: 'level_2' },
                                        { id: 4, txt: 'Level 3', value: 'level_3' },
                                    ]}
                                    initialSelected={{ id: 2, txt: 'Level 1', value: 'level_1' }}
                                    disabled={false}
                                    containerClass={'rounded-lg py-3 px-4 outline-zinc-300 outline outline-offset-0 outline-2'}
                                    modalClass={'right-0 mt-2 w-[70%]'}
                                    handleFunction={handleChangeUserRole}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="state" className='text-md font-semibold text-zinc-500'>Supervisors</label>
                                <SelectSupervisors
                                    datos={filteredUsers}
                                    initialSelected={filteredUsers[0]}
                                    disabled={false}
                                    containerClass={'rounded-lg py-3 px-4 outline-zinc-300 outline outline-offset-0 outline-2'}
                                    modalClass={'right-0 mt-2 w-[100%]'}
                                    handleFunction={handleChangeUserSupervisors}
                                    handleRemoveSelect={handleRemoveSupervisor}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-x-3 py-5">
                        <button onClick={handleToogleModal} className="text-cbaBlue font-semibold px-10 h-10 rounded-full text-sm hover:bg-zinc-100">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="font-semibold bg-cbaBlue px-10 h-10 rounded-full text-sm flex flex-row justify-center items-center text-white">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddUser;