import { useState } from 'react'
import imageLogin from '../../assets/loginPage.png'
// import logo from '../../assets/cba_bar.png'
import logo from '../../assets/logo_cba_white.png'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logIn } from '../../redux-toolkit/actions/authActions'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SuccessAlert } from '../../components/toastAlerts/success'
import { ErrorAlert } from '../../components/toastAlerts/error'
const Login = () => {
    const [login, setLogin] = useState({
        user: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [onFocus, setOnFocus] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChangeInput = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setLogin({
            ...login,
            [property]: value
        });
    }
    const signIn = async () => {
        await axios.post('/user/login', login).then((res) => {
            console.log(res.data)
            if (res.data.success) {
                dispatch(logIn(res.data.userLogin))
                navigate('/');
                toast.custom((t) => {
                    <SuccessAlert t={t} w={'w-[500px]'} message={'Successful login'} />
                })
            }
            else {
                toast.custom((t) => {
                    <ErrorAlert t={t} w={'w-[500px]'} message={res.data.message} />
                })
            }
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
    return (
        <>
            <main className="h-screen w-full flex justify-center items-center"
                style={{ backgroundImage: `linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)` }}
            >
                <div className="sm:rounded-3xl bg-white flex flex-col sm:flex-row h-full sm:h-[90%] md:w-[95%] lg:w-[80%] xl:w-[70%] z-[1] overflow-hidden shadow-xl">
                    <div className="h-56 sm:h-full w-full sm:w-[45%] rounded-b-[50px] sm:rounded-bl-3xl sm:rounded-r-3xl flex items-center justify-center flex-col gap-y-5"
                        style={{ backgroundImage: 'linear-gradient(50deg, #000428, #004e92)' }}
                    >
                        <img src={logo} alt="cba-logo" className='w-[30%]' />
                        <img src={imageLogin} alt="cba-login" className='w-[100%] hidden sm:flex' />
                        <div className='px-14 text-center'>
                            <span className='text-white font-semibold text-sm'>
                                Sign in and explore tools designed to optimize your workday.
                            </span>
                        </div>
                    </div>
                    <div className="w-full sm:w-[55%] pl-5 pr-5 md:pr-10 md:pl-10 lg:pl-20 lg:pr-32 text-zinc-600 flex flex-col justify-center items-center">
                        <h2 className='font-extrabold text-4xl mt-5 sm:mt-0'>Sign In</h2>
                        <span className='font- text-zinc-500 mt-2'>Welcome back to the system</span>
                        <form action="" className='flex flex-col gap-y-5 mt-16 w-full'>
                            <div className='flex flex-col gap-y-2'>
                                <label htmlFor="user" className='text-md font-semibold ml-2 text-zinc-500'>User</label>
                                <input onChange={handleChangeInput} name='user' type="text" className='bg-violet-50 rounded-full p-2 px-4 focus:outline-violet-300' id='user' />
                            </div>
                            <div className='flex flex-col gap-y-2 group/Focus'>
                                <span className='text-md font-semibold ml-2 text-zinc-500'>Password</span>
                                <label htmlFor="password" className={`${onFocus ? 'outline outline-offset-0 outline-2 outline-violet-300' : ''} bg-violet-50 rounded-full flex items-center relative`}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                >
                                    <input onChange={handleChangeInput} name='password' type={showPassword ? 'text' : 'password'} className='bg-transparent p-2 px-4 focus:outline-none grow' id='password' />
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
                        </form>
                        <button onClick={signIn} className='rounded-full bg-cbaBlue text-white font-bold h-10 w-full mt-10 text-sm'>
                            Sign in
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;