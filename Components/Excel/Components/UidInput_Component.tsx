import { useState, useEffect, } from "react";
import { handle_focus } from "../functions/handle_focus";
import { Eleve } from "../Excel";
import HSPinInput from "@preline/pin-input";
import getUrl from "../../../useContext/getUrl";




const UidInput_Component = ({ set_eleve }: { set_eleve: (eleve: Eleve) => void }) => {

    const [ErRoR_uid, set_error_uid] = useState(false);
    const [loading, set_loading] = useState(false);


    const getElv = async (uid: string) => {
        const url = getUrl();
        
        const fetchData = async () => {
            try {
                const response = await fetch(url + "excel/GetElv/" + uid);
                if (!response.ok) {
                    if (response.status === 404) {
                        set_loading(false)
                        set_error_uid(true)

                        set_eleve({ uid: Number(uid), nom_prenom: "", nom_pere: "", date_naissance: "", level: "", prev_ecole: "", prev_ecole_id: 0, Del1: "", Del1_id: 0, next_ecole: "", next_ecole_id: 0, reason: "تغيير مقر الإقامة", decision: "مع الموافقة", comments: "" })

                        handle_focus("manual");
                        return
                    }

                    throw new Error('Network response was not ok');
                }

                const jsonData = await response.json()
                set_eleve({ ...jsonData, level: "", Del1: "", Del1_id: 0, next_ecole: "", next_ecole_id: 0, reason: "تغيير مقر الإقامة", decision: "مع الموافقة", comments: "" })

                set_loading(false);
                handle_focus("");



            } catch (error: unknown) {
                // set_ErrorConnection(true)
            }
        };

        await fetchData()
    }

    useEffect(() => {
        window.HSStaticMethods.autoInit();

        const el: HSPinInput = HSPinInput.getInstance('#uid') as HSPinInput;
        el.on('completed', async ({ currentValue }: { currentValue: string[] }) => {
            set_loading(true)
            const uid = currentValue.join('')
            await getElv(uid)

            el.el.childNodes.forEach((each_input, key) => {
                const a: HTMLInputElement = each_input as HTMLInputElement
                if (key !== 0 && key !== 1) a.value = ''
            })

            set_loading(false)
        });


        handle_focus('uid')
    }, []);

    //console.log('hedha zeda')
    return (
        <>
            <div className="flex mt-10 " dir="rtl" >

                <div className=" ml-5">
                    <div className="flex flex-col">


                        <div className="flex" dir='rtl'>

                            <span className="text-lg h-10  ml-4 ">المعرف : </span>


                            <div className="flex space-x-2 " dir='ltr' data-hs-pin-input='{  "availableCharsRE": "^[0-9]+$"  }' id='uid' >
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} defaultValue={0} />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} defaultValue={1} />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" id='uidFocusCell' />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                                <input className="block border h-10 w-8 text-center border-gray-400 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline focus:outline-blue-500 disabled:opacity-40 disabled:cursor-progress " type="text" placeholder="○" autoComplete="off" data-hs-pin-input-item disabled={loading} name="pin" />
                            </div>
                            <div>
                                <div className="absolute  w-8 h-10 mr-4 pt-1">
                                    {loading && <LoadingIcon />}
                                </div>
                            </div>

                        </div>

                        <div className=" h-5">
                            {"017070057572"}
                            {"--"}
                            {"016989001140"}
                            {"--"}
                            {"013971018518"}
                            {ErRoR_uid && <span className=" text-sm ml-5 text-red-600 font-semibold" dir="ltr">لم يتم العثور على المُعرّف</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UidInput_Component;


const LoadingIcon = () => {

    return (
        <svg aria-hidden="true" role="status" className="inline w-8 h-8  text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
        </svg>
    )
}

