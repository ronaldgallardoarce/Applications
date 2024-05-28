import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/sideBar";
import { useState } from "react";

const Container = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebarOpen = () => {
        setSidebarOpen(!sidebarOpen)
    }
    return (
        <>
            <div className="flex min-screen">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    toggleSidebarOpen={toggleSidebarOpen}
                />
                <div className="flex flex-col w-0 flex-1 lg:ml-64 relative">
                    <div className="navbar h-[8vh]">
                        navbar
                    </div>
                    <main className="">
                        <div className="min-h-[92vh] bg-zinc-50">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Container;