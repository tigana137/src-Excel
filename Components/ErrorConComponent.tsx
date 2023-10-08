


const ErrorConComponent = () => {



    return (
        <>
            <div className="absolute top-0 flex justify-center items-center w-full h-full z-50 ">
                <div className="w-full h-full bg-slate-500  flex justify-center items-center bg-opacity-50">
                    <div className="border-r border-b border-l border-gray-400 lg:border-l-1 lg:border-t lg:border-gray-400 bg-white rounded-b   lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="text-gray-900 font-bold text-xl mb-2">Nous sommes désolés, la connexion au serveur a échoué</div>
                        <p className="text-gray-700 text-base">N'hésitez pas à nous contacter au numéro
                            <span className=" text-green-700 font-bold px-1">50099988</span> pour résoudre le problème</p>
                    </div>
                </div>
            </div >
        </>
    )
}


export default ErrorConComponent;



//<div className="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
//<p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
