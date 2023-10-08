




const DowloadCom = () => {







    return (
        <>
            <div className="absolute top-0 flex justify-center items-center w-full h-full z-40 cursor-progress ">
                <div className="w-full h-full bg-slate-500  flex justify-center items-center bg-opacity-50">

                    <div className="text-black font-bold text-6xl mb-2 ">Telechargement en cours </div>
                    <div className="flex items-center justify-center space-x-2 animate-pulse pt-5 pl-5">
                        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                    </div>

                </div>
            </div >
        </>



    )
}

export default DowloadCom;