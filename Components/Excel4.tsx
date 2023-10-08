import { useEffect, useState } from "react";
import sort_img from '../img/sorting2.png'
import { UseUrl } from "../App";
import VirginTableRow from "./VirginTableRow";
import ErrorConComponent from "./ErrorConComponent";
import DowloadCom from "./DowloadCom";
import ErrorAddElvCom from "./ErrorAddElvCom";


export interface Eleve {
    id: number;
    uid: number;
    nom_prenom: string;
    nom_pere: string;
    date_naissance: String | null;
    prev_ecole: string;
    Del1: string;
    next_ecole: string;
    level: number | undefined;
    reason?: string;
    decision: string;
    comments?: string;
}



const Excel4 = () => {
    const ngrok = UseUrl();
    const [del1s, set_del1s] = useState([]);
    const [ecoles, set_ecoles] = useState<{ [del1: string]: string[] }>({});
    const reasons = ["تغيير مقر الإقامة", "موافقة المدير", "نقلة عمل الولى", "له اخ بنفس المدرسة", "لديه أخت بالمدرسة",]
    const [eleves, set_eleves] = useState<Eleve[]>([]);
    const [eleve, set_eleve] = useState<Eleve>({ nom_prenom: '', nom_pere: '', date_naissance: null, decision: '', Del1: '', prev_ecole: '', level: 0, id: 0, uid: 0, reason: '', comments: '', next_ecole: '' });
    const [ErrorConnection, set_ErrorConnection] = useState(false);

    const [sorted_column, set_sorted_column] = useState("nom");
    const [asc_desc, set_asc_desc] = useState(true);
    const [xxx, set_xxx] = useState('01');
    const [loading, set_loading] = useState(false)
    const [ErRoR_uid, set_error_uid] = useState(false);
    const [ErRoR_addElv, set_error_addElv] = useState(false);
    const [Dowloading, setDowloading] = useState(false);
    const handle_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target as HTMLInputElement;
        set_error_uid(false)
        !isNaN(Number(value)) && value.length <= 12 && set_xxx(value)

    }
    useEffect(() => {
        const testSignal = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/testSignal/");
                if (!response.ok) {
                    console.log("!response.ok")
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                if (jsonData === false) {
                    set_ErrorConnection(true)

                }


            } catch (error: unknown) {
                console.log('houni')
                set_ErrorConnection(true)
            }
        };

        const fetch_Del1 = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/GetEDel1/");
                if (!response.ok) {
                    console.log("!response.ok")
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                set_del1s(jsonData)
            } catch (error: unknown) {
                console.log('houni')
                set_ErrorConnection(true)
            }
        };

        const fetch_ecoles = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/GetEcoles/");
                if (!response.ok) {
                    console.log("!response.ok")
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                set_ecoles(jsonData)
            } catch (error: unknown) {
                console.log('houni')
                set_ErrorConnection(true)
            }
        };



        testSignal();
        fetch_Del1();
        fetch_ecoles();
    }, [])


    useEffect(() => {

        if (xxx.length === 12) {
            const fetchData = async () => {
                try {
                    const response = await fetch(ngrok + "/login_handler/GetElv/" + xxx);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const jsonData = await response.json()
                    if (jsonData === false) {
                        set_loading(false)
                        set_error_uid(true)
                        //  const input = document.getElementById("uid") as HTMLInputElement;
                        //   input.focus();
                        // input.select();
                        set_eleve({ ...eleve, uid: Number(xxx), nom_prenom: "", nom_pere: "", date_naissance: "", prev_ecole: "", next_ecole: eleve.next_ecole, reason: "تغيير مقر الإقامة", decision: "مع الموافقة", comments: "" })
                        set_xxx('01');
                        handle_focus("manual")
                    }
                    else {
                        set_eleve({ ...jsonData, Del1: eleve.Del1, next_ecole: eleve.next_ecole, reason: "تغيير مقر الإقامة", decision: "مع الموافقة", comments: "" })
                        set_xxx('01');
                        set_loading(false)
                        handle_focus("")
                    }


                } catch (error: unknown) {
                    set_ErrorConnection(true)
                }
            };

            const orginizer = async () => {
                await fetchData();


            }

            set_loading(true)
            orginizer()



        }

    }, [xxx])

    function sortTableData(sortBy: string,) {
        sorted_column === sortBy ? set_asc_desc(!asc_desc) : set_asc_desc(true)
        sorted_column !== sortBy && set_sorted_column(sortBy)

        eleves.sort((a, b) => {
            if (sortBy === "الإسم") {
                return asc_desc ? a.nom_prenom.localeCompare(b.nom_prenom) : b.nom_prenom.localeCompare(a.nom_prenom);
            }
            else if (sortBy === "اللقب") {
                return asc_desc ? a.nom_pere.localeCompare(b.nom_pere) : b.nom_pere.localeCompare(a.nom_pere);
            }
            else if (sortBy === "المعرف الوحيد") {
                return asc_desc ? a.uid - b.uid : b.uid - a.uid;
            }
            else if (sortBy === "يذهب إلى قسم") {
                const A_next_class = a.level ?? 0;
                const B_next_class = b.level ?? 0;
                return asc_desc ? A_next_class - B_next_class : B_next_class - A_next_class;
            }
            else {
                // Handle other sorting criteria here if needed
                return 0;
            }

        });
        const updatedEleves = eleves.map((eleve) => { return eleve; }
        );
        set_eleves(updatedEleves)
    }


    const delRow = (index: number) => {
        const Newelvs = [...eleves];
        Newelvs.splice(index, 1);
        set_eleves(Newelvs);
    }

    const Threads = ({ title }: { title: string }) => {

        return (
            <th dir="rtl"
                className={
                    "sticky align-middle  text-xs font-normal text-center border-x border-black  "
                }
            >
                <span>
                    {title}
                </span>

            </th>
        )
    }

    const TableRow = ({ eleve, hash }: { eleve: Eleve, hash: number }) => {

        return (

            <tr className=" bg-slate-50 hover:bg-slate-400 border-b border-black  h-16" id={String(hash)} >
                <td className="border-x border-black align-middle  text-xs  w-12  justify-center">
                    <div className="flex justify-center  ">
                        <div className="outline rounded-lg outline-1">
                            <button className="w-5 h-5 text-center text-white bg-red-600 rounded-lg" tabIndex={hash} onClick={() => delRow(hash)}>X</button>
                        </div>
                    </div>
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-12">
                    {eleves.length - hash}</td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 h-full ">
                    {  /* <input autoComplete="off" className="h-16 w-full pr-1 text-center" name={"nom_prenom" + String(hash)} defaultValue={eleve.nom_prenom} />
              */ }
                    {eleve.nom_prenom}
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 cursor-default " >
                    {eleve.uid}
                </td>


                <td className="border-x border-black  text-center align-middle  text-xs  w-32 h-full">
                    {/*}         
                              <input autoComplete="off" className="h-16 w-full pr-1 text-center" name="nom_pere" defaultValue={eleve.nom_pere} />
                        */}
                    {eleve.nom_pere}
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-20 ">
                    {/*}                   <input autoComplete="off" className="h-16 w-full pr-1 text-center" name="date_naissance" defaultValue={String(eleve.date_naissance)} />
                    */}
                    {eleve.date_naissance}
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    {/*}                   <input autoComplete="off" className="h-16 w-full pr-1 text-center" name="ecole" defaultValue={eleve.prev_ecole} />
                    */}
                    {eleve.prev_ecole}
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-40">
                    <div className="flex justify-center">
                        {/*}                       <input autoComplete="off" className="h-16 pr-1 w-32" defaultValue={eleve.Del1} />
                    */}
                        {eleve.Del1}

                    </div>
                </td>

                <td className=" border-x border-black  text-center align-middle  text-xs  w-40 ">
                    <div className="flex justify-center">
                        {/*}                       <input autoComplete="off" className="h-16 pr-1 w-32" defaultValue={eleve.next_ecole} />
                    */}
                        {eleve.next_ecole}

                    </div>
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-40 ">
                    <div className="flex justify-center">
                        {/*}                       <input autoComplete="off" className="h-16 pr-1 w-32" defaultValue={eleve.reason} name="reason" />
                    */}
                        {eleve.reason}

                    </div>
                </td>
                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    {/*}                   <input autoComplete="off" className="h-16 w-full pr-1" name="decision" defaultValue={eleve.decision} />
                    */}
                    {eleve.decision}
                </td>
                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    {/*}                   <input autoComplete="off" className="h-16 w-full pr-1" name="comments" defaultValue={eleve.comments} />
                    */}
                    {eleve.comments}
                </td>

            </tr>
        )
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

    const handle_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        set_eleve((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handle_focus = (current_element: string) => {
        if (current_element === 'uid') {
            const input = document.getElementById("uid") as HTMLInputElement;
            //   input.focus();
            input.focus();
        }
        else if (current_element === '') {
            const input = document.querySelector('input[name="Del1"]') as HTMLInputElement;
            //   input.focus();
            input.select();
        }
        else if (current_element === 'Del1') {
            const input = document.querySelector('input[name="next_ecole"]') as HTMLInputElement;
            // input.focus();
            input.select();
        }
        else if (current_element === 'next_ecole') {
            const input = document.querySelector('input[name="reason"]') as HTMLInputElement;
            // input.focus();
            input.select();
        }
        else if (current_element === 'reason') {
            const submitButton = document.getElementById("Submit") as HTMLButtonElement;
            // input.focus();
            submitButton.focus();
        }
        else if (current_element === 'comments') {
            const submitButton = document.getElementById("Submit") as HTMLButtonElement;
            // input.focus();
            submitButton.focus();
        }
        else if (current_element === 'decision') {
            const submitButton = document.getElementById("Submit") as HTMLButtonElement;
            // input.focus();
            submitButton.focus();
        }
        else if (current_element === 'manual') {
            const input = document.querySelector('input[name="nom_prenom"]') as HTMLInputElement;
            input.focus();
        }
        else if (current_element === 'nom_prenom') {
            const input = document.querySelector('input[name="nom_pere"]') as HTMLInputElement;
            input.focus();
        }
        else if (current_element === 'nom_pere') {
            const input = document.querySelector('input[name="date_naissance"]') as HTMLInputElement;
            input.focus();
        }
        else if (current_element === 'date_naissance') {
            const input = document.querySelector('input[name="prev_ecole"]') as HTMLInputElement;
            input.focus();
        }
        else if (current_element === 'prev_ecole') {
            const input = document.querySelector('input[name="Del1"]') as HTMLInputElement;
            input.select();
        }

    }

    const handle_Enter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget
        if (event.key === "Enter") {
            event.preventDefault();
            if (name === 'Del1') {
                if (Number(value) >= 1 && Number(value) <= 17) {
                    set_eleve((prev) => {
                        return {
                            ...prev,
                            [name]: del1s[Number(value) - 1]
                        }
                    })
                }

                handle_focus(name);
            }

            else if (name === 'next_ecole') {
                if (Number(value) >= 1 && Number(value) <= ecoles[eleve.Del1].length) {
                    set_eleve((prev) => {
                        return {
                            ...prev,
                            [name]: ecoles[eleve.Del1][Number(value) - 1]
                        }
                    })

                }

                handle_focus(name);

            }

            else if (name === 'reason') {
                if (Number(value) >= 1 && Number(value) <= 5) {
                    set_eleve((prev) => {
                        return {
                            ...prev,
                            [name]: reasons[Number(value) - 1]
                        }
                    })

                }

                handle_focus(name);

            }

            else if (name === 'comments') {
                handle_focus(name);
            }
            else if (name === 'decision') {
                handle_focus(name);
            }

            else if (name === 'nom_prenom') {
                handle_focus(name);
            }
            else if (name === 'nom_pere') {
                handle_focus(name);
            }
            else if (name === 'date_naissance') {
                handle_focus(name);
            }
            else if (name === 'prev_ecole') {
                handle_focus(name);
            }


        }

        if (event.key === "ArrowDown") {

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

    const handle_select: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const parentId = event.currentTarget.parentElement?.id
        const name = (parentId ?? "").replace("Select", "");
        const value = event.currentTarget.getAttribute('val-att');
        event.preventDefault();
        set_eleve((prev) => {
            return {
                ...prev,
                [name]: value
            }

        })
        handle_focus(name);

    }


    const verif_addElv = () => {
        if (eleve.nom_prenom === "" || eleve.next_ecole === "") return false;
        return true
    }

    const addElv = () => {
        if (verif_addElv()) {
            set_error_uid(false)
            set_eleves([eleve, ...eleves])
            handle_focus("uid")
        }
        else {
            set_error_addElv(true);
        }
    }

    const downloadexcel = async () => {

        const SendData = async () => {
            async function downloadExcelFile() {
                // Replace 'your-django-url' with the actual URL of your Django view
                const url = ngrok + "/login_handler/CreateExcel/";

                await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(eleves)
                })
                    .then((response) => {
                        // Check if the response is successful (status code 200)
                        if (!response.ok) {
                            throw new Error(`Failed to download file (HTTP status ${response.status})`);
                        }

                        // Extract the filename from the response headers (Content-Disposition)
                        const contentDisposition = response.headers.get('Content-Disposition');
                        const filenameMatch = contentDisposition && contentDisposition.match(/filename=([^;]+\.xlsx)/);
                        console.log(response)
                        // Generate a unique filename if one is not provided
                        const filename = filenameMatch ? filenameMatch[1] : 'نقل جديدة.xlsx';

                        // Trigger the download by creating a blob and using the 'download' attribute
                        response.blob().then((blob) => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = filename;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        // Handle error here, e.g., display an error message to the user
                    });
            }
            await downloadExcelFile()
        }

        setDowloading(true);
        await SendData()
        setDowloading(false);
    }

    return (

        <>


            <div className="absolute top-0 w-full h-screen bg-white max-h-screen overflow-y-hidden">
                <div className="flex flex-col items-center mt-16  max-h-screen" >
                    <div className=" text-3xl font-bold">
                        <div>

                            قرارات مجالس النقل بين المدارس لـالسنة الدراسيّة 2023/2024
                        </div>

                        <button className="absolute top-20 left-20 hover:scale-125 transition-transform outline outline-1 border-black rounded-full  " id="Download" onClick={downloadexcel}>
                            <svg className="w-7 h-7 text-gray-800 dark:text-white  py-0.5 px-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                            </svg>
                            <div></div>
                        </button>

                    </div>
                    <div className="flex mt-10 " dir="rtl" >

                        <div className=" ml-5">
                            <div className="flex flex-col">


                                <div className="flex">

                                    <span className="text-lg font-semibold ml-4">المعرف : </span>

                                    <div className="flex border border-black rounded-xl text-right h-7 mt-0.5">
                                        <input
                                            onChange={handle_input} value={xxx} id="uid" type="text" dir="ltr" autoFocus className="text-right pr-5 w-40  rounded-xl focus:outline-none appearance-none spin-button-hidden" />


                                        <span className="ml-2 mt-0.5 w-4">
                                            {loading && <LoadingIcon />}
                                        </span>
                                    </div>
                                </div>
                                <div className=" h-5">
                                    {ErRoR_uid && <div className=" text-sm ml-5 text-red-600 font-semibold" dir="ltr">لم يتم العثور على المُعرّف</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {7070057572}
                    {"--"}
                    {6989001140}




                    <div dir="rtl" className="flex mb-5 border border-black rounded-xl text-xs z-20 justify-center "
                        style={{ height: '100px', }}
                    >
                        {ErRoR_addElv && <ErrorAddElvCom eleve={eleve} set_error_addElv={set_error_addElv} />
                        }


                        <div className="flex flex-col w-40 h-full ">
                            <ColumnHead title="التلميذ(ة)" />
                            <div className="h-full outline outline-1 outline-transparent   rounded-br-xl ">
                                <input className="w-full h-full pr-1 text-center focus:outline-none outline outline-1 outline-transparent rounded-br-xl" name={"nom_prenom"} value={eleve.nom_prenom} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                            </div>
                        </div>

                        <div className="flex flex-col w-28 h-full border-r border-black  text-center cursor-default">
                            <ColumnHead title="المعرف الوحيد" />
                            <div className=" h-full items-center flex justify-center">
                                {eleve.uid !== 0 ? eleve.uid : null}
                            </div>
                        </div>

                        <div className="flex flex-col w-40 h-full border-r border-black ">
                            <ColumnHead title="اسم الأب" />
                            <div className=" h-full">
                                <input className="w-full h-full pr-1 text-center focus:outline-none" name="nom_pere" value={eleve.nom_pere} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                            </div>
                        </div>

                        <div className="flex flex-col w-24 h-full border-r border-black ">
                            <ColumnHead title="تاريخ الولادة" />
                            <div className=" h-full">
                                <input className="w-full h-full pr-1 text-center focus:outline-none" name="date_naissance" value={eleve.date_naissance ? String(eleve.date_naissance) : ""} onChange={handle_change} onKeyUpCapture={handle_Enter} />
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
                                <div className="absolute w-36 border border-black mt-0.5 border-t-0 bg-white l-4 text-right pr-1 cursor-default overflow-y-hidden" id="Del1Select" hidden={true}>
                                    {del1s.map((each, index) => {
                                        return <div className="hover:bg-slate-300 pb-0.5" val-att={each} onMouseDown={handle_select} >{index + 1 + ". "}{each}</div>
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-48 h-full border-r border-black " >
                            <ColumnHead title="المدرسة المرغوب فيها" />
                            <div className="h-full">
                                <div className="flex flex-col h-full">
                                    <input autoComplete="off" className="h-full pr-1 w-full focus:outline-none" value={eleve.next_ecole} name="next_ecole" onFocus={enable_Options} onChange={handle_change} onKeyUpCapture={handle_Enter} onBlur={disable_options} />
                                </div>
                                <div style={{ minHeight: '0px' }}
                                    className="absolute w-54 min-h-0 h-32  outline outline-1 outline-offset-1 mt-0.5 border-t-0 bg-white l-4 text-right pr-1.5 cursor-default overflow-y-auto" id="next_ecoleSelect" hidden={true} >

                                    {ecoles.hasOwnProperty(eleve.Del1) && ecoles[eleve.Del1].map((each, index) => {
                                        return <div className="hover:bg-slate-300 pb-0.5" val-att={each} onMouseDown={handle_select} >{index + 1 + ". "}{each}</div>
                                    })
                                    }

                                </div>
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

                        <div className="flex flex-col w-32 h-full border-r border-black ">
                            <ColumnHead title="تسجيل" />
                            <div className="flex h-full justify-center items-center">
                                <button className="h-7 w-fit rounded-lg focus:border-2 focus:border-slate-800  " onClick={addElv} id="Submit">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="w-full mt-8 overflow-y-scroll outlinee">
                        <div className="sticky top-0 w-full outline outline-2 outline-white"></div>
                        <table className="items-center  bg-transparent border  w-full" dir="rtl">
                            <thead dir="rtl" className="sticky top-0 z-10  h-11  bg-sky-400 outline outline-1 outline-black -outline-offset-1 ">
                                <tr className=" ">
                                    <Threads title={"     "} />
                                    <Threads title={"ع/ر"} />
                                    <Threads title={"التلميذ(ة)"} />
                                    <Threads title={"المعرف الوحيد"} />
                                    <Threads title={"اسم الأب"} />
                                    <Threads title={"تاريخ الولادة"} />
                                    <Threads title={"المدرسة المسجل بها ويرغب في مغادرتها"} />
                                    <Threads title={"المعتمديّة"} />
                                    <Threads title={"المدرسة المرغوب فيها"} />
                                    <Threads title={"المؤيدات"} />
                                    <Threads title={"قرار اللجنة"} />
                                    <Threads title={"ملاحظات"} />
                                </tr>
                            </thead>

                            <tbody id="myTable" className="">
                                {eleves.map((eleve, index) => {
                                    return (<TableRow key={index} eleve={eleve} hash={index} />)
                                })}
                                {eleves.length <= 9 && (
                                    <>
                                        {Array.from({ length: 9 - eleves.length }).map((_,) => (
                                            <VirginTableRow />
                                        ))}
                                    </>
                                )

                                }

                            </tbody>

                        </table>
                    </div>
                </div>
                {ErrorConnection && <ErrorConComponent />}
                {Dowloading && <DowloadCom />}

            </div >
        </>
    )
}


export default Excel4;




const LoadingIcon = () => {

    return (
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mb-1 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
        </svg>
    )
}