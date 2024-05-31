import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Container from './components/widgets/container'
import Prueba from './components/prueba'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import AttendanceRecord from './pages/attendance/attendanceRecord'
import Login from './pages/auth/login'
import ProtectedRoute from './utils/protectedRoute'
import axios from 'axios'
import { logIn, logOut } from './redux-toolkit/actions/authActions'
import TableUser from './pages/admin/user/tableUser'
import AttendanceByUser from './pages/attendance/attendanceByUser'

function App() {
  const auth = useSelector((state) => state.auth);
  const [tokenValidated, setTokeValidated] = useState(false);
  const dispatch = useDispatch();
  const validToken = async () => {
    const data = {
      validation: 'validation'
    }
    try {
      await axios.post('user/validate/token', data).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          dispatch(logIn(res.data.userLogin))
          localStorage.setItem('user', JSON.stringify({
            fullName: res.data.userLogin.fullName
          }))
        }
        else {
          dispatch(logOut(false));
          localStorage.removeItem('user');
        }
      })
    } catch (error) {
      dispatch(logOut(false));
      localStorage.removeItem('user');
    }
    setTokeValidated(true);
  }
  const ValidateRedirection = ({ auth, redirecTo, children }) => {
    if (auth) {
      return <Navigate to={redirecTo}></Navigate>;
    }
  }
  useEffect(() => {
    console.log(auth)
    const previewUser = JSON.parse(localStorage.getItem('user'))
    if (previewUser != null) {
      dispatch(logIn(previewUser));
    }
    validToken();
  }, [])

  return (
    <>
      <Routes>
        <Route exact index path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <ProtectedRoute tokenValidated={tokenValidated} auth={auth} roleRequired={'admin'}>
              <Container />
            </ProtectedRoute>
          }
        >
          <Route path='applications' element={<Prueba />} />
          <Route path='attendance-record' element={<AttendanceRecord />} />
          <Route path='users-table' element={<TableUser />} />
          <Route path='attendance' element={<AttendanceByUser />} />
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 1000,
          style: {
            background: "white",
            color: "black",
          },
          error: {
            duration: 1500,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          dismiss: {
            duration: 1500,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          custom: {
            duration: 1000
          }
        }}
      />
    </>
  )
}

export default App
