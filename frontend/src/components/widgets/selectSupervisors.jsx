import { useEffect, useRef, useState } from "react";

const SelectSupervisors = ({
    datos,
    initialSelected,
    disabled,
    containerClass,
    modalClass,
    handleFunction,
    handleRemoveSelect
}) => {
    const [selected, setSelected] = useState(initialSelected)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    const handleClickItem = (dato) => {
        handleFunction(dato);
        setSelected(dato);
        setTimeout(() => { setIsDropdownOpen(false) }, 500)
    }
    const handleClickRemove = (dato) => {
        handleRemoveSelect(dato);
        // setTimeout(() => { setIsDropdownOpen(false) }, 500)
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div
                disabled={disabled}
                id="dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} flex flex-row justify-between items-center ${containerClass}`}
            >
                <div className='w-auto flex justify-center items-center'>
                    <span>{selected.txt}</span>
                </div>
                <div className=''>
                    {
                        isDropdownOpen ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                            </svg>

                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>

                    }
                </div>

            </div>
            {isDropdownOpen && (
                <div id="dropdown-menu" className={`${modalClass} overflow-auto absolute z-50 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 max-h-48`}>
                    <div className="py-2 p-2 gap-y-[2px] flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        {datos.map((dato, index) => (
                            <div key={index} className={`${selected.id === dato.id ? 'bg-blue-100' : ''} relative items-center justify-between flex block rounded-md  text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer overflow-auto`} role="menuitem"
                            >
                                <span onClick={() => handleClickItem(dato)} className="w-full h-full px-4 py-2">{dato.txt}</span>
                                <button onClick={() => handleClickRemove(dato)} className="absolute p-[2px] rounded-md hover:bg-zinc-200 right-2 z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


export default SelectSupervisors;