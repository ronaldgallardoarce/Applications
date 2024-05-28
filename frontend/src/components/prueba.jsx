const Prueba = () => {
    return (
        <div className="flex justify-center items-center py-10 bg-zinc-100">
            <div className=" justify-center items-center flex flex-col shadow-xl w-[90%] rounded-2xl p-10 bg-white">
                <div className="flex w-full justify-between pl-20 text-3xl py-10 font-bold text-zinc-600">
                    <span>Febrero</span>
                    <div className="flex gap-x-3">
                        <span>{`<`}</span>
                        <span>2024</span>
                        <span>{`>`}</span>
                        <button className="rounded-md bg-blue-500 text-white text-xl px-10">Hoy</button>
                        <button className="rounded-md border-2 text-xl px-10">Mes</button>
                    </div>
                </div>
                <div className="flex mb-2 mt-5 w-full flex-wrap gap-x-3 text-lg font-bold text-zinc-500">
                    <span className="w-32 text-end">Lun</span>
                    <span className="w-32 text-end">Mar</span>
                    <span className="w-32 text-end">Mier</span>
                    <span className="w-32 text-end">Jue</span>
                    <span className="w-32 text-end">Vie</span>
                    <span className="w-32 text-end">Sab</span>
                    <span className="w-32 text-end">Dom</span>
                </div>
                <div className='flex flex-row gap-3 justify-center text-2xl flex-wrap '>
                    {
                        Array.from({ length: 30 }, (_, i) => {
                            return (
                                <div key={i} className={`bg-white h-32 w-32 text-zinc-500 flex items-end p-2 flex-col gap-y-1.5 overflow-hidden ${i==25?'rounded-lg bg-blue-50':''}`}>
                                    <span className={`${i == 25 ? ' shrink-0 items-center flex justify-center' : ''}`}>{i + 1}</span>
                                    <div className={`${i == 10 ? 'bg-teal-100 w-full rounded-sm px-1.5 text-sm' : 'hidden'}`}>evento 1</div>
                                    <div className={`${i == 25 ? 'bg-violet-100 w-full rounded-sm px-1.5 text-sm' : 'hidden'}`}>evento 3</div>
                                    <div className={`${i == 25 ? 'bg-violet-100 w-full rounded-sm px-1.5 text-sm' : 'hidden'}`}>evento 4</div>
                                    <div className={`${i == 25 ? 'bg-violet-100 w-full rounded-sm px-1.5 text-sm' : 'hidden'}`}>evento 2</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Prueba;