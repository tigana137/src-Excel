import { Eleve } from '../Excel'


const ErrorAddElvCom = ({ eleve, set_error_addElv }: { eleve: Eleve, set_error_addElv: Function }) => {

    let text = "";
    if (eleve.nom_prenom === "") {
        text = "التلميذ(ة)";
    }

    if (eleve.next_ecole === "") {
        if (text === "") text = "المدرسة المرغوب فيها"
        else text = text + ", المدرسة المرغوب فيها"
    }

    return (
        <>
            <div className="absolute w-full flex justify-center items-center  z-50  ">
                <div className="border border-gray-400  bg-slate-200 rounded-xl p-4 flex flex-col justify-between leading-normal">
                    <div className="flex w-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 bg-yellow-400 outline outline-1 round ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>

                        <div className="text-gray-900 font-bold text-xl mb-2 w-9/12 pr-2">معطيات ناقصة</div>
                        <button className=' outline outline-1 rounded-lg p-1 font-semibold bg-white hover:bg-yellow-400' onClick={() => { set_error_addElv(false) }} >رجوع</button>
                    </div>
                    <p className="text-gray-700 text-base">الرجاء اكمال خانة
                        <span className=" text-green-700 font-bold px-1">{text}</span>
                    </p>
                </div>
            </div >

        </>
    )
}

export default ErrorAddElvCom;