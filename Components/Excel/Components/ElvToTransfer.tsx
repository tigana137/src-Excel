import { useEffect, useState } from "react"
import { Eleve } from "../../Excel"
import ErrorAddElvCom from "./ErrorAddElvCom"
import getUrl from "../../../useContext/getUrl";
import { handle_focus } from "../functions/handle_focus";
import check_img from "../../../img/check.png"

type Del1Props = {
    [id: number]: string;
}

const ColumnHead = ({ title }: { title: string }) => {


    return (
        <>
            <div
                className={`text-xs font-medium text-center border-b border-black h-14 flex justify-center items-center ${title !== "التلميذ(ة)" ? "bg-green-500" : "bg-green-500 rounded-tr-xl"
                    } ${title !== "تسجيل" ? "bg-green-500" : "bg-green-500 rounded-tl-xl"}`}
                style={{ height: '58px' }}
            >
                {title}

            </div >
        </>
    )
}


const ElvToTransfer = ({ eleve: initial_elv, addElv }: { eleve: Eleve, addElv: (eleve: Eleve) => Promise<void> }) => {

    const [eleve, set_eleve] = useState<Eleve>(initial_elv);
    const [ecoles, set_ecoles] = useState<{ [del1: string]: { [id: number]: string } }>({});
    const [del1s, set_del1s] = useState<Del1Props>({});
    const [ErRoR_addElv, set_error_addElv] = useState(false);


    const reasons = ["تغيير مقر الإقامة", "موافقة المدير", "نقلة عمل الولى", "له اخ بنفس المدرسة", "لديه أخت بالمدرسة",]
    const url = getUrl();

    useEffect(() => {
        const testSignal = async () => {
            try {
                const response = await fetch(url + "x/testSignal/");
                if (!response.ok) {
                    console.log("!response.ok")
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                if (jsonData === false) {
                    //    set_ErrorConnection(true)

                }


            } catch (error: unknown) {
                console.log('houni')
                //    setServerError(true)
                //set_ErrorConnection(true)
            }
        };

        const fetch_Del1 = async () => {
            try {
                const response = await fetch(url + "excel/GetDel1/");
                if (!response.ok) {
                    console.log("!response.ok")
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                set_del1s(jsonData)
            } catch (error: unknown) {
                console.log('houni')
                //set_ErrorConnection(true)
            }
        };

        const fetch_ecoles = async () => {
            try {
                const response = await fetch(url + "excel/GetEcoles/");
                if (!response.ok) {
                    console.log("!response.ok")
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                set_ecoles(jsonData)
            } catch (error: unknown) {
                console.log('houni')
                //set_ErrorConnection(true)
            }
        };

        testSignal();
        fetch_Del1();
        fetch_ecoles();
    }, [])

    useEffect(() => {
        set_eleve(initial_elv)
    }, [initial_elv])

    useEffect(() => {
        const timer = setTimeout(() => {
            // Code to execute after 2 seconds
            console.log("Two seconds have passed!");
        }, 2000);

        // Clear the timer if the component unmounts or if you need to reset the timer
        return () => clearTimeout(timer);
    }, []);


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
        const next_ecole_id: string | undefined = Object.entries(ecoles[eleve.Del1]).find(([_, value]) => value === str_value)?.[0]
        console.log(next_ecole_id)
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
            if (Number(value) >= 1 && Number(value) <= 17) {
                const del_name = Object.values(del1s)[Number(value) - 1]
                await set_eleve((prev) => {
                    return {
                        ...prev,
                        [name]: del_name
                    }
                })
            }

            handle_focus(name);
            return
        }
        if (name === 'next_ecole') {
            if (Number(value) >= 1 && Number(value) <= Object.keys(ecoles[eleve.Del1]).length) {
                const [sid, name] = Object.entries(ecoles[eleve.Del1]).sort((a, b) => a[1].localeCompare(b[1]))[Number(value) - 1]

                set_eleve((prev) => {
                    return {
                        ...prev,
                        next_ecole: name,
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


    const enable_Options = (event: React.FocusEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const Selectname = name + "Select"
        const options = document.getElementById(Selectname);
        if (options)
            options.hidden = false;
    }


    const disable_options = (event: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        const name = event.target.name;
        const Selectname = name + "Select"
        const options = document.getElementById(Selectname);
        if (options)
            options.hidden = true;

    }


    const handle_select: React.MouseEventHandler<HTMLDivElement> = async (event) => {
        const parentId = event.currentTarget.parentElement?.id
        const name = (parentId ?? "").replace("Select", "");
        const value = event.currentTarget.getAttribute('val-att');
        event.preventDefault();
        await set_eleve((prev) => {
            return {
                ...prev,
                [name]: value
            }

        })
        handle_focus(name);

    }


    const handle_nextecole_select: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const next_ecole_id = event.currentTarget.getAttribute('val-att');
        const next_ecole = next_ecole_id ? ecoles[eleve.Del1][Number(next_ecole_id)] : ""
        event.preventDefault();

        set_eleve((prev) => ({
            ...prev,
            next_ecole: next_ecole,
            next_ecole_id: Number(next_ecole_id),

        }))

        handle_focus("next_ecole");

    }


    const verif_addElv = () => {
        if (eleve.nom_prenom === "" || eleve.next_ecole === "" || eleve.level === "") {
            set_error_addElv(true)
            return
        };
        set_error_addElv(false)
        addElv(eleve)
    }




    return (
        <div dir="rtl" className="flex mb-5 border border-black rounded-xl text-xs z-20 justify-center "
            style={{ height: '100px', }}
        >
            {ErRoR_addElv && <ErrorAddElvCom eleve={eleve} set_error_addElv={set_error_addElv} />}


            <div className="flex flex-col w-40 h-full ">
                <ColumnHead title="التلميذ(ة)" />
                <div className="h-full outline outline-1 outline-transparent   rounded-br-xl ">
                    <input autoComplete="off" className="w-full h-full pr-1 text-center focus:outline-none outline outline-1 outline-transparent rounded-br-xl" name={"nom_prenom"} value={eleve.nom_prenom} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                </div>
            </div>

            <div className="flex flex-col w-28 h-full border-r border-black  text-center cursor-default">
                <ColumnHead title="المعرف الوحيد" />
                <div className=" h-full items-center flex justify-center bg-white">
                    {eleve.uid !== 0 ? eleve.uid : null}
                </div>
            </div>

            <div className="flex flex-col w-40 h-full border-r border-black  " >
                <ColumnHead title="اسم الأب" />
                <div className=" h-full">
                    <input autoComplete="off" className="w-full h-full pr-1 text-center focus:outline-none" name="nom_pere" value={eleve.nom_pere} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                </div>
            </div>

            <div className="flex flex-col w-24 h-full border-r border-black ">
                <ColumnHead title="تاريخ الولادة" />
                <div className=" h-full">
                    <input autoComplete="off" className="w-full h-full pr-1 text-center focus:outline-none" name="date_naissance" value={eleve.date_naissance ? String(eleve.date_naissance) : ""} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                </div>
            </div>

            <div className="flex flex-col w-24 h-full border-r border-black ">
                <ColumnHead title="مستوى" />
                <div className=" h-full">
                    <input autoComplete="off" className="w-full h-full pr-1 text-center focus:outline-none" name="level" value={eleve.level} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                </div>
            </div>

            <div className="flex flex-col w-40 h-full border-r border-black  ">
                <ColumnHead title="المدرسة المرسم بها" />
                <div className=" h-full">
                    <input autoComplete="off" className="w-full h-full pr-1 text-center focus:outline-none" name="prev_ecole" value={eleve.prev_ecole} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                </div>
            </div>

            <div className="flex flex-col w-32 h-full border-r border-black " onBlur={disable_options} >
                <ColumnHead title="المعتمديّة" />
                <div className=" h-full">
                    <div className="flex h-full">
                        <input autoComplete="off" className="h-full pr-1 w-32 text-xs focus:outline-none" value={eleve.Del1} name="Del1" onFocus={enable_Options} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                    </div>
                    <div className="absolute w-36 border border-black mt-0.5 border-t-0 bg-white l-4 text-right pr-1 cursor-default overflow-y-hidden " id="Del1Select" hidden={true}>
                        {Object.entries(del1s).map(([_, name], index) => {
                            return <div className="hover:bg-slate-300 pb-0.5" val-att={name} onMouseDown={handle_select} key={index} >{index + 1 + ". "}{name}</div>
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-48 h-full border-r border-black " >
                <ColumnHead title="المدرسة المرغوب فيها" />
                <div className="h-full">
                    <div className="flex flex-col h-full">
                        <input autoComplete="off" className="h-full pr-1 w-full focus:outline-none" value={eleve.next_ecole} name="next_ecole" onFocus={enable_Options} onChange={handle_change_nextecole} onKeyUpCapture={handle_Enter} onBlur={disable_options} />
                    </div>
                    {ecoles.hasOwnProperty(eleve.Del1) &&
                        <div style={{ minHeight: '0px' }}
                            className="absolute w-54 min-h-0 max-h-32 outline outline-1 outline-offset-1 mt-0.5 border-t-0 bg-white l-4 text-right pr-1.5 cursor-default overflow-y-auto" id="next_ecoleSelect" hidden={true} >

                            {eleve.Del1 !== '' && ecoles.hasOwnProperty(eleve.Del1) &&
                                Object.entries(ecoles[eleve.Del1]).sort((a, b) => {

                                    return a[1].localeCompare(b[1])
                                })
                                    .map(([sid, school], index) => {
                                        return <div key={index} className="hover:bg-slate-300 pb-0.5" val-att={sid} onMouseDown={handle_nextecole_select} >{index + 1 + ". "}{school}</div>
                                    })
                            }

                        </div>
                    }

                </div>
            </div>

            <div className="flex flex-col w-32 h-full border-r border-black ">
                <ColumnHead title="المؤيدات" />
                <div className=" h-full">
                    <div className="flex h-full">
                        <input autoComplete="off" className="h-full w-full pr-1 focus:outline-none" value={eleve.reason} name="reason" onFocus={enable_Options} onChange={handle_change} onKeyUpCapture={handle_Enter} onBlur={disable_options} />
                    </div>

                    <div className="absolute w-40 border border-black bg-white text-right pr-1.5 cursor-default" id="reasonSelect" hidden={true}>
                        {reasons.map((each, index) => {
                            return <div className="hover:bg-slate-300 pb-0.5" val-att={each} onMouseDown={handle_select} key={index}>{index + 1 + ". "}{each}</div>
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-32 h-full border-r border-black ">
                <ColumnHead title="قرار اللجنة" />
                <div className=" h-full">
                    <input autoComplete="off" className="h-full w-full pr-1 focus:outline-none" name="decision" value={eleve.decision} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                </div>
            </div>

            <div className="flex flex-col w-32 h-full border-r border-black ">
                <ColumnHead title="ملاحظات" />
                <div className=" h-full">
                    <input autoComplete="off" className="h-full w-full pr-1 focus:outline-none" name="comments" value={eleve.comments} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                </div>
            </div>

            <div className="flex flex-col w-32 h-full border-r border-black  ">
                <ColumnHead title="تسجيل" />
                <div className="flex h-full justify-center items-center rounded-bl-xl bg-white">
                    <button className="h-7 w-fit rounded-lg focus:border-2 focus:border-slate-800  " onClick={verif_addElv} id="Submit">
                        {
                            //       <svg className="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            //          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            //      </svg>
                        }
                        <img src={check_img} className="w-6 h-6 text-gray-800 dark:text-white" />
                    </button>
                </div>
            </div>

        </div>
    )
}


export default ElvToTransfer;



export const InvalidElvInput = () => {


    return (
        <div className="bg-red-50 border border-red-300 text-sm text-red-800 rounded-lg p-1.5 " role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                </div>
                <div className="ms-4">
                    <h3 className="text-sm font-semibold">
                        A problem has been occurred while submitting your data.
                    </h3>
                    <div className="mt-0.5 text-sm text-red-700 dark:text-red-400">
                        <ul className="list-disc space-y-0.5 ps-5">
                            <li>
                                This username is already in use
                            </li>
                            <li>
                                Email field can't be empty
                            </li>
                            <li>
                                Please enter a valid phone number
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}