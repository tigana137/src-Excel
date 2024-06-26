import { useEffect, useState } from "react"
import { Eleve, } from "../../Excel"
import getUrl from "../../../../useContext/getUrl";
import { handle_focus } from "../../functions/handle_focus";
import check_img from "../../../../img/check.png"
import "../../../../index.css";
import { handle_MouseDown_Del1, handle_MouseDown_decision, handle_MouseDown_reason } from "./functions/handle_select";
import Thead from "./components/Thead";
import useCityDataContext from "../../../../useContext/CityDataContext";
import axios from "axios";
import CapacityWarning from "./components/CapacityWarning";



export const reasons = ["تغيير مقر الإقامة", "موافقة المدير", "نقلة عمل الولى", "له اخ بنفس المدرسة", "لديه أخت بالمدرسة",]
export const decisions = ["مع الموافقة", "استكمال الملف"]

const Ecoles_scrollbar = ` [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full overflow-y-scroll  
[&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:bg-gray-600 `

const TableTitles = [

    "التلميذ(ة)",
    "المعرف الوحيد",
    "اسم الأب",
    "تاريخ الولادة",
    "مستوى",
    "المدرسة المرسم بها",
    "المعتمديّة",
    "المدرسة المرغوب فيها",
    "المؤيدات",
    "قرار اللجنة",
    "ملاحظات",
    "تسجيل"
];

export type warningProp = {
    kethefa: number;
    name: string;
    sid: number;
    level: number;
    is_comming: boolean;
}

const msg: warningProp = {
    kethefa: 35,
    name: "سوسة المدينة",
    sid: 842401,
    level: 6,
    is_comming: true
}

const ElvToTransfer = ({ eleve: initial_elv, addElv }: { eleve: Eleve, addElv: (eleve: Eleve) => Promise<void> }) => {

    const [eleve, set_eleve] = useState<Eleve>(initial_elv);

    const [error_required_fields, set_error_required_fields] = useState(false);


    const { Del1Data, EcolesData } = useCityDataContext();

    const [warning_elv_kethefa, set_warning_elv_kethefa] = useState<warningProp | null>(msg)

    typeof error_required_fields === 'boolean' &&
    
        useEffect(() => {
            // warning_elv_kethefa && set_warning_elv_kethefa(null)
            set_eleve(initial_elv)
        }, [initial_elv])


    const check_nbr_elv_post_transfer = (is_comming: boolean) => {
        const url = getUrl();

        const elevee = {
            "sid": is_comming ? String(eleve.next_ecole_id) : String(eleve.prev_ecole_id),
            "level": eleve.level,
            "is_comming": is_comming
        }

        axios.post(url + "excel/check_nbr_elv_post_transfer/", elevee).then(response => {
            // Handle success response
            return response.data
            console.log('Response:', response.data);

        })
    }

    useEffect(() => {

        if (Number(eleve.level) && eleve.prev_ecole_id !== 0) {
            console.log('t5l prev')
            check_nbr_elv_post_transfer(false)

        }


    }, [eleve.level, eleve.prev_ecole_id])


    useEffect(() => {

        if (Number(eleve.level) && eleve.next_ecole_id !== 0) {
            console.log('t5l next')
            check_nbr_elv_post_transfer(true)
        }

    }, [eleve.level, eleve.next_ecole_id])


    const handle_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'level') {
            if (value === "" || (Number(value) >= 1 && Number(value) <= 6)) {
                set_eleve((prev) => {
                    return {
                        ...prev,
                        level: value
                    }
                })
            }
            return
        }

        set_eleve((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handle_change_nextecole = (event: React.ChangeEvent<HTMLInputElement>) => {
        const str_value = event.target.value;
        let next_ecole_id: string | undefined = undefined;
        if (EcolesData.hasOwnProperty(eleve.Del1_id)) {
            next_ecole_id = Object.entries(EcolesData[eleve.Del1_id]).find(([_, school]) => school.name === str_value)?.[0]
        }

        set_eleve((prev) => {
            return {
                ...prev,
                next_ecole: str_value,
                next_ecole_id: next_ecole_id ? Number(next_ecole_id) : 0
            }
        })
    }


    const handle_Enter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget
        if (event.key !== "Enter") return

        event.preventDefault();

        const number = Number(value)
        if (number <= 0) return

        if (name === 'level') {
            console.log(value)
            if (Number(value) >= 1 && Number(value) <= 6) {
                set_eleve((prev) => {
                    return {
                        ...prev,
                        [name]: value
                    }
                })
            }

            handle_focus(name);
            return
        }
        if (name === 'Del1') {
            if (Number(value) >= 1 && Number(value) <= Object.keys(Del1Data).length) {
                const [del1_id, del_name] = Object.entries(Del1Data)[Number(value) - 1]
                await set_eleve((prev) => {
                    return {
                        ...prev,
                        [name]: del_name,
                        ['Del1_id']: Number(del1_id)
                    }
                })
            }

            handle_focus(name);
            return
        }
        if (name === 'next_ecole') {
            if (eleve.Del1_id !== 0 && Number(value) >= 1 && Number(value) <= Object.keys(EcolesData[eleve.Del1_id]).length) {

                const [sid, school] = Object.entries(EcolesData[eleve.Del1_id]).sort((a, b) => a[1].name.localeCompare(b[1].name))[Number(value) - 1]

                set_eleve((prev) => {
                    return {
                        ...prev,
                        next_ecole: school.name,
                        next_ecole_id: Number(sid)
                    }
                })

            }

            handle_focus(name);
            return
        }

        if (name === 'reason') {
            if (Number(value) >= 1 && Number(value) <= 5) {
                set_eleve((prev) => {
                    return {
                        ...prev,
                        [name]: reasons[Number(value) - 1]
                    }
                })

            }

            handle_focus(name);
            return

        }

        if (name === 'comments') {
            handle_focus(name);
            return
        }
        if (name === 'decision') {
            if (number <= decisions.length) {
                set_eleve((prev) => {
                    return {
                        ...prev,
                        [name]: decisions[number - 1]
                    }
                })
            }

            handle_focus(name);
            return
        }

        if (name === 'nom_prenom') {
            handle_focus(name);
            return
        }
        if (name === 'nom_pere') {
            handle_focus(name);
            return
        }
        if (name === 'date_naissance') {
            handle_focus(name);
            return
        }
        if (name === 'prev_ecole') {
            handle_focus(name);
            return
        }




        // console.log(event.key)

    }


    const set_eleve_function = async (name: string, value: string) => {

        await set_eleve((prev) => {
            return {
                ...prev,
                [name]: value
            }

        })

    }




    const handle_nextecole_select: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const next_ecole_id = event.currentTarget.getAttribute('val-att');
        const next_ecole = next_ecole_id ? (EcolesData[eleve.Del1_id][Number(next_ecole_id)].name) : ""
        EcolesData
        event.preventDefault();

        set_eleve((prev) => ({
            ...prev,
            next_ecole: next_ecole,
            next_ecole_id: Number(next_ecole_id),

        }))

        handle_focus("next_ecole");

    }


    const close_warning_component = () => {

        set_warning_elv_kethefa(null)
    }
    const verif_addElv = () => {
        if (eleve.nom_prenom === "" || eleve.next_ecole === "" || eleve.level === "") {
            set_error_required_fields(true)
            return
        };
        set_error_required_fields(false)
        addElv(eleve)
    }




    return (
        <>
            <div className=" w-full h-fit flex flex-col items-center   z-50 ">

                <div className=" w-11/12  flex justify-center items-center  rounded-xl  ">

                    <div className="w-11/12 flex flex-col items-center  border border-gray-600 rounded-xl">
                        <table className="divide-y divide-gray-600 w-full ">

                            <thead className=" ">
                                <tr className=" select-none  ">
                                    {TableTitles.map((tabletitle, index) => {
                                        let className = "";
                                        if (index === 0) className += "rounded-tr-xl";
                                        if (index === TableTitles.length - 1) className += "border-l-0 rounded-tl-xl";
                                        return (<Thead key={index} title={tabletitle} className={className} />)
                                    })}
                                </tr>
                            </thead>


                            <tbody>
                                <tr className="  text-sm ">

                                    {/* التلميذ(ة) cell */}
                                    <td className="border-l border-gray-600 ">
                                        <input className="w-full h-16   pr-1 text-center focus:outline-none   rounded-br-xl"
                                            name={"nom_prenom"} value={eleve.nom_prenom} onChange={handle_change} onKeyUpCapture={handle_Enter} autoComplete="off"
                                        />
                                    </td>

                                    {/* المعرف الوحيد	 */}
                                    <td className="border-l border-gray-600 text-center bg-white w-28 ">
                                        {eleve.uid !== 0 ? eleve.uid : null}
                                    </td>

                                    {/* اسم الأب */}
                                    <td className="border-l border-gray-600 bg-white w-1/12 ">
                                        <input autoComplete="off" className="w-full text-xs h-16  pr-1 text-center focus:outline-none " name="nom_pere" value={eleve.nom_pere} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>

                                    {/* تاريخ الولادة */}
                                    <td className="border-l border-gray-600 bg-white w-24 ">
                                        <input autoComplete="off" className="w-full h-16  pr-1 text-center focus:outline-none" name="date_naissance" value={eleve.date_naissance ? String(eleve.date_naissance) : ""} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>

                                    {/* مستوى */}
                                    <td className="border-l border-gray-600 bg-white">
                                        <input autoComplete="off" className="w-14 h-16  pr-1 text-center focus:outline-none" name="level" value={eleve.level} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>

                                    {/* المدرسة المرسم بها */}
                                    <td className="border-l border-gray-600 bg-white ">
                                        <input autoComplete="off" className="w-full h-16   pr-1 text-center focus:outline-none" name="prev_ecole" value={eleve.prev_ecole} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>

                                    {/* المعتمديّة */}
                                    <td className="border-l border-gray-600 bg-white ">
                                        <div className=" h-full group">
                                            <div className="flex h-full ">
                                                <input autoComplete="off" className="h-16 pr-1 w-32 text-xs focus:outline-none" value={eleve.Del1} name="Del1" onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                            </div>
                                            <div className="absolute text-xs h-0  font-normal   group-focus-within:h-fit opacity-100 overflow-hidden  cursor-default   group-focus-within:opacity-100 group-focus-within:animate-fade    bg-white shadow-md rounded-lg group-focus-within:p-2 group-focus-within:mt-1  " id="Del1Select" >

                                                {Del1Data && Object.entries(Del1Data).map(([id, name], index) => {
                                                    return <div className="hover:bg-slate-300 pb-0.5 pr-1 pl-2 rounded-md" val-att={name} id={id} onMouseDown={(event) => handle_MouseDown_Del1(event, set_eleve_function)} key={index} >{index + 1 + ". "}{name}</div>
                                                })}
                                            </div>
                                        </div>
                                    </td>

                                    {/* المدرسة المرغوب فيها	 */}
                                    <td className="border-l border-gray-600 bg-white ">
                                        <div className=" group">
                                            <div className="flex  flex-col ">
                                                <input autoComplete="off" className="h-16 text-xs pr-1 w-full focus:outline-none" value={eleve.next_ecole} name="next_ecole" onChange={handle_change_nextecole} onKeyUpCapture={handle_Enter} />
                                            </div>
                                            {EcolesData && EcolesData.hasOwnProperty(eleve.Del1_id) &&

                                                <div className={" text-xs   absolute opacity-0 h-0  cursor-default  max-w-xs group-focus-within:h-32 group-focus-within:opacity-100 group-focus-within:animate-fade    bg-white shadow-md rounded-lg group-focus-within:p-2 group-focus-within:mt-1 " + Ecoles_scrollbar}>

                                                    {eleve.Del1_id !== 0 && EcolesData.hasOwnProperty(eleve.Del1_id) &&
                                                        Object.entries(EcolesData[eleve.Del1_id]).sort((a, b) => {

                                                            return a[1].name.localeCompare(b[1].name)
                                                        })
                                                            .map(([sid, school], index) => {
                                                                return <div key={index} className="hover:bg-slate-300 pb-0.5 pr-1 pl-2 rounded-md" val-att={sid} onMouseDown={handle_nextecole_select} >{index + 1 + ". "}{school.name}</div>
                                                            })
                                                    }

                                                </div>
                                            }

                                        </div>
                                    </td>

                                    {/* المؤيدات */}
                                    <td className="border-l border-gray-600 bg-white ">
                                        <div className=" h-full group">
                                            <div className="flex h-full">
                                                <input autoComplete="off" className="h-16 w-full pr-1 focus:outline-none" value={eleve.reason} name="reason" onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                            </div>

                                            <div className="absolute w-40 opacity-0 text-xs  overflow-hidden h-0  cursor-default group-focus-within:h-fit group-focus-within:opacity-100 group-focus-within:animate-fade    bg-white shadow-md rounded-lg group-focus-within:p-2 group-focus-within:mt-1" id="reasonSelect" >
                                                {reasons.map((each, index) => {
                                                    return <div className="hover:bg-slate-300 pb-0.5 pr-1 pl-2 rounded-md" val-att={each} onMouseDown={(event) => handle_MouseDown_reason(event, set_eleve_function)} key={index}>{index + 1 + ". "}{each}</div>
                                                })}
                                            </div>
                                        </div>
                                    </td>

                                    {/* قرار اللجنة	 */}
                                    <td className="border-l border-gray-600 ">
                                        <div className=" h-full group">
                                            <div className="flex h-full">
                                                <input autoComplete="off" className="h-16 w-full pr-1 focus:outline-none" name="decision" value={eleve.decision} onChange={handle_change} onKeyUpCapture={handle_Enter} />

                                            </div>

                                            <div className="absolute text-xs w-fit opacity-0  overflow-hidden h-0  cursor-default group-focus-within:h-fit group-focus-within:opacity-100 group-focus-within:animate-fade    bg-white shadow-md rounded-lg group-focus-within:p-2 group-focus-within:mt-1">
                                                {decisions.map((each, index) => {
                                                    return <div className="hover:bg-slate-300 pb-0.5 pr-1 pl-2 rounded-md" val-att={each} onMouseDown={(event) => handle_MouseDown_decision(event, set_eleve_function)} key={index}>{index + 1 + ". "}{each}</div>
                                                })}
                                            </div>
                                        </div>
                                    </td>

                                    {/* ملاحظات	 */}
                                    <td className="border-l border-gray-600 bg-white">
                                        <input autoComplete="off" className="h-16 w-full pr-1 focus:outline-none" name="comments" value={eleve.comments} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>


                                    {/* تسجيل */}
                                    <td className="  bg-white rounded-bl-xl">
                                        <button className="flex items-center justify-center w-14  rounded-lg focus:border-2 focus:border-slate-800  "
                                            onClick={verif_addElv} id="Submit">
                                            {
                                                //       <svg className="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                //          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                //      </svg>
                                            }
                                            <img src={check_img} className="w-6 h-6 text-gray-800 " />
                                        </button>
                                    </td>



                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Warning if elvs to transfer will excced the capacity of the new school */}
                <div className="h-14  flex justify-center mt-4">

                    {warning_elv_kethefa && <CapacityWarning warning_msg={warning_elv_kethefa} close_warning_component={close_warning_component} />}

                </div>


            </div>
            {/* <div className="h-24" /> */}
        </>
    )
}


export default ElvToTransfer;



export const InvalidElvInput = () => {


    return (
        <div className="bg-red-500 text-sm text-white rounded-lg p-4" role="alert">
            <span className="font-bold">Danger</span> alert! You should check in on some of those fields below.
        </div>

    )
}



//const Blabla = () => {
//
//
//    return (
//        <div dir="rtl" className="flex  mb-5 border border-black rounded-xl text-xs z-20 justify-center ">
//
//            {error_required_fields && <ErrorAddElvCom eleve={eleve} set_error_addElv={set_error_required_fields} />}
//
//            <div className="flex flex-col w-40 h-full ">
//                <ColumnHead title="التلميذ(ة)" />
//                <div className=" outline outline-1 outline-transparent flex  rounded-br-xl ">
//                    <input autoComplete="off" className="w-full h-16   pr-1 text-center focus:outline-none outline outline-1 outline-transparent rounded-br-xl" name={"nom_prenom"} value={eleve.nom_prenom} onChange={handle_change} onKeyUpCapture={handle_Enter} />
//                </div>
//            </div>
//
//            <div className="flex flex-col w-28 h-full border-r border-black  text-center cursor-default">
//                <ColumnHead title="المعرف الوحيد" />
//                <div className="  items-center flex justify-center bg-white">
//                    {eleve.uid !== 0 ? eleve.uid : null}
//                </div>
//            </div>
//
//            <div className="flex flex-col w-40  border-r border-black  " >
//                <ColumnHead title="اسم الأب" />
//                <div className=" ">
//                    <input autoComplete="off" className="w-full h-16  pr-1 text-center focus:outline-none" name="nom_pere" value={eleve.nom_pere} onChange={handle_change} onKeyUpCapture={handle_Enter} />
//                </div>
//            </div>
//
//            <div className="flex flex-col w-24  border-r border-black ">
//                <ColumnHead title="تاريخ الولادة" />
//                <div className=" ">
//                    <input autoComplete="off" className="w-full h-16  pr-1 text-center focus:outline-none" name="date_naissance" value={eleve.date_naissance ? String(eleve.date_naissance) : ""} onChange={handle_change} onKeyUpCapture={handle_Enter} />
//                </div>
//            </div>
//
//            <div className="flex flex-col w-24  border-r border-black ">
//                <ColumnHead title="مستوى" />
//                <div className=" ">
//                    <input autoComplete="off" className="w-full h-16  pr-1 text-center focus:outline-none" name="level" value={eleve.level} onChange={handle_change} onKeyUpCapture={handle_Enter} />
//                </div>
//            </div>
//
//            <div className="flex flex-col w-40  border-r border-black  ">
//                <ColumnHead title="المدرسة المرسم بها" />
//                <div className=" ">
//                    <input autoComplete="off" className="w-full h-16   pr-1 text-center focus:outline-none" name="prev_ecole" value={eleve.prev_ecole} onChange={handle_change} onKeyUpCapture={handle_Enter} />
//                </div>
//            </div>
//            {/* absolute w-36 border border-black mt-0.5 border-t-0 bg-white l-4 text-right pr-1 cursor-default overflow-y-hidden  */}
//            <div className="flex group flex-col w-32 h-full border-r border-black " >
//                <ColumnHead title="المعتمديّة" />
//                <div className=" h-full group">
//                    <div className="flex h-full ">
//                        <input autoComplete="off" className="h-full pr-1 w-32 text-xs focus:outline-none" value={eleve.Del1} name="Del1" onChange={handle_change} onKeyUpCapture={handle_Enter} />
//                    </div>
//                    <div className="absolute h-0 group-focus-within:h-fit opacity-100 overflow-hidden  cursor-default   w-36  group-focus-within:opacity-100 group-focus-within:animate-fade    bg-white shadow-md rounded-lg group-focus-within:p-2 group-focus-within:mt-1  " id="Del1Select" >
//
//                        {Object.entries(Del1Data).map(([_, name], index) => {
//                            return <div className="hover:bg-slate-300 pb-0.5 " val-att={name} onMouseDown={(event) => handle_MouseDown_Del1(event, set_eleve_function)} key={index} >{index + 1 + ". "}{name}</div>
//                        })}
//                    </div>
//                </div>
//            </div>
//            {/* absolute group-focus-within: w-54 min-h-0 max-h-32 outline outline-1 outline-offset-1 mt-0.5 border-t-0 bg-white l-4 text-right pr-1.5 cursor-default overflow-y-auto */}
//            <div className="flex flex-col w-48 h-full border-r border-black  " >
//                <ColumnHead title="المدرسة المرغوب فيها" />
//                <div className="h-full group">
//                    <div className="flex  flex-col h-full">
//                        <input autoComplete="off" className="h-full pr-1 w-full focus:outline-none" value={eleve.next_ecole} name="next_ecole" onChange={handle_change_nextecole} onKeyUpCapture={handle_Enter} />
//                    </div>
//                    {EcolesData.hasOwnProperty(eleve.Del1) &&
//                        <div
//                            className="  absolute opacity-0 h-0  cursor-default  max-w-xs group-focus-within:h-32 group-focus-within:opacity-100 group-focus-within:animate-fade    bg-white shadow-md rounded-lg group-focus-within:p-2 group-focus-within:mt-1
//
//            [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full overflow-y-scroll
//            [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full
//            [&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-slate-700
//            dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 pl-0.5
//
//            ">
//
//
//                            {eleve.Del1 !== '' && ecoles.hasOwnProperty(eleve.Del1) &&
//                                Object.entries(ecoles[eleve.Del1]).sort((a, b) => {
//
//                                    return a[1].localeCompare(b[1])
//                                })
//                                    .map(([sid, school], index) => {
//                                        console.log('t5l')
//                                        return <div key={index} className="hover:bg-slate-300 pb-0.5" val-att={sid} onMouseDown={handle_nextecole_select} >{index + 1 + ". "}{school}</div>
//                                    })
//                            }
//
//
//                        </div>
//                    }
//
//                </div>
//            </div>
//
//            <div className="flex flex-col w-32 h-full border-r border-black ">
//                <ColumnHead title="المؤيدات" />
//                <div className=" h-full group">
//                    <div className="flex h-full">
//                        <input autoComplete="off" className="h-full w-full pr-1 focus:outline-none" value={eleve.reason} name="reason" onChange={handle_change} onKeyUpCapture={handle_Enter} />
//                    </div>
//
//                    <div className="absolute w-40 opacity-0  overflow-hidden h-0  cursor-default group-focus-within:h-fit group-focus-within:opacity-100 group-focus-within:animate-fade    bg-white shadow-md rounded-lg group-focus-within:p-2 group-focus-within:mt-1" id="reasonSelect" >
//                        {reasons.map((each, index) => {
//                            return <div className="hover:bg-slate-300 pb-0.5" val-att={each} onMouseDown={(event) => handle_MouseDown_reason(event, set_eleve_function)} key={index}>{index + 1 + ". "}{each}</div>
//                        })}
//                    </div>
//                </div>
//            </div>
//
//
//
//            <div className="flex flex-col w-32 h-full border-r border-black ">
//                <ColumnHead title="قرار اللجنة" />
//                <div className=" h-full group">
//                    <div className="flex h-full">
//                        <input autoComplete="off" className="h-full w-full pr-1 focus:outline-none" name="decision" value={eleve.decision} onChange={handle_change} onKeyUpCapture={handle_Enter} />
//
//                    </div>
//
//                    <div className="absolute w-28 opacity-0  overflow-hidden h-0  cursor-default group-focus-within:h-fit group-focus-within:opacity-100 group-focus-within:animate-fade    bg-white shadow-md rounded-lg group-focus-within:p-2 group-focus-within:mt-1">
//                        {decisions.map((each, index) => {
//                            return <div className="hover:bg-slate-300 pb-0.5" val-att={each} onMouseDown={(event) => handle_MouseDown_decision(event, set_eleve_function)} key={index}>{index + 1 + ". "}{each}</div>
//                        })}
//                    </div>
//                </div>
//            </div>
//
//            <div className="flex flex-col w-32 h-full border-r border-black ">
//                <ColumnHead title="ملاحظات" />
//                <div className=" h-full">
//                    <input autoComplete="off" className="h-full w-full pr-1 focus:outline-none" name="comments" value={eleve.comments} onChange={handle_change} onKeyUpCapture={handle_Enter} />
//                </div>
//            </div>
//
//            <div className="flex flex-col w-32 h-full border-r border-black  ">
//                <ColumnHead title="تسجيل" />
//                <div className="flex h-full justify-center items-center rounded-bl-xl bg-white">
//                    <button className="h-7 w-fit rounded-lg focus:border-2 focus:border-slate-800  " onClick={verif_addElv} id="Submit">
//                        {
//                            //       <svg className="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                            //          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
//                            //      </svg>
//                        }
//                        <img src={check_img} className="w-6 h-6 text-gray-800 dark:text-white" />
//                    </button>
//                </div>
//            </div>
//        </div>
//    )
//}