import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Container from './components/widgets/container'
import Prueba from './components/prueba'
import AttendanceRecord from './components/attendance/attendanceRecord'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Container />}>
          <Route path='applications' element={<Prueba />} />
          <Route path='attendance-record' element={<AttendanceRecord />} />
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
