import { useCallback, useEffect, useRef, useState } from "react";
import check_img from '../img/check.png';
import download_img from '../img/download.png';
import VirginTableRow from "./VirginTableRow";
import ErrorConComponent from "./ErrorConComponent";
import DowloadCom from "./Excel/Components/DowloadCom";
import ErrorAddElvCom from "./Excel/Components/ErrorAddElvCom";
import { UseUrl, Usetransfer_elv } from "./UseHooks";
import TableHeads from "./Excel/Components/TableHeads";
import { cancel_elv_db, transfer_elv_db } from "./Excel/functions/cancel_elv_db";
import { handle_focus } from "./Excel/functions/handle_focus";

import axios from "axios";



export interface Eleve {
    id: number;
    uid: number;
    nom_prenom: string;
    nom_pere: string;
    date_naissance: String | null;
    level: string;
    prev_ecole: string;
    prev_ecole_id: number;
    Del1: string;
    next_ecole: string;
    next_ecole_id: number;
    reason?: string;
    decision: string;
    comments?: string;
}

interface Del1Props {
    [id: number]: string;
}


const Excel4 = ({ setServerError }: { setServerError: Function }) => {
    const ngrok = UseUrl();
    const transfer_elv = Usetransfer_elv();
    const [del1s, set_del1s] = useState<Del1Props>({});
    const [ecoles, set_ecoles] = useState<{ [del1: string]: { [id: number]: string } }>({});
    const reasons = ["تغيير مقر الإقامة", "موافقة المدير", "نقلة عمل الولى", "له اخ بنفس المدرسة", "لديه أخت بالمدرسة",]
    const [eleves, set_eleves] = useState<Eleve[]>([]);
    const [eleve, set_eleve] = useState<Eleve>({ nom_prenom: '', nom_pere: '', date_naissance: null, decision: '', Del1: '', prev_ecole: '', prev_ecole_id: 0, next_ecole_id: 0, level: "", id: 0, uid: 0, reason: '', comments: '', next_ecole: '' });
    const [ErrorConnection, set_ErrorConnection] = useState(false);

    const [loading, set_loading] = useState(false);
    const [ErRoR_uid, set_error_uid] = useState(false);
    const [ErRoR_addElv, set_error_addElv] = useState(false);
    const [Dowloading, setDowloading] = useState(false);
    const [rowsNumber, setRowsNumber] = useState(0);
    const [pageNumber, setpageNumber] = useState(1);
    const [loadingfetchingRows, set_loadingfetchingRows] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastRowElemnt = useCallback((node: any) => {
        if (loadingfetchingRows) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(async entries => {

            if (entries[0].isIntersecting && eleves.length < rowsNumber) {
                console.log('yep')
                const [data, _] = await fetchElvsRows(pageNumber)
                set_eleves((prev) => [...prev, ...data])

            }
        })
        if (node) observer.current.observe(node)
    }, [loadingfetchingRows])


    useEffect(() => {
        const testSignal = async () => {
            try {
                const response = await fetch(ngrok + "x/testSignal/");
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
                setServerError(true)
                //set_ErrorConnection(true)
            }
        };

        const fetch_Del1 = async () => {
            try {
                const response = await fetch(ngrok + "excel/GetDel1/");
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
                const response = await fetch(ngrok + "excel/GetEcoles/");
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

        const fetch_elvs = async () => {
            const [data, rowsnumber] = await fetchElvsRows(0)
            set_eleves(data)
            setRowsNumber(rowsnumber)

        };
        testSignal();
        fetch_Del1();
        fetch_ecoles();
        fetch_elvs();
    }, [])


    useEffect(() => {

        const input = document.getElementById("uid") as HTMLInputElement;
        input.focus();


    }, [ecoles])


    const fetchElvsRows = async (page: number) => {
        set_loadingfetchingRows((prev) => !prev)
        console.log(loadingfetchingRows)
        const data = await axios({
            method: 'GET',
            url: ngrok + 'excel/Getexcelrows/' + page,

        }).then(res => {
            return [res.data.data, res.data.length]

        }).catch(e => {
            return [[], 0]
        })
        set_loadingfetchingRows((prev) => !prev)
        console.log(loadingfetchingRows)
        return data

    }


    const delRow = (index: number, eleve: Eleve) => {
        cancel_elv_db(eleve, ngrok); // ~ zid condition ken rj3 false raou l database mouneka 
        const Newelvs = [...eleves];
        Newelvs.splice(index, 1);
        set_eleves(Newelvs);
        transfer_elv(eleve.prev_ecole_id, eleve.next_ecole_id, eleve.level, true)
        setRowsNumber(prev => prev - 1)
    }


    const TableHead = ({ title }: { title: string }) => {

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

            <tr className=" bg-slate-50 hover:bg-slate-400 border-b border-black  h-16" id={String(hash)} ref={eleves.length !== hash + 1 ? undefined : lastRowElemnt} >
                <td className="border-x border-black align-middle  text-xs  w-12  justify-center">
                    <div className="flex justify-center  " >
                        <div className="outline rounded-lg outline-1">
                            <button className="w-5 h-5 text-center text-white bg-red-600 rounded-lg" tabIndex={hash} onClick={() => delRow(hash, eleve)}>X</button>
                        </div>
                    </div>
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-12">
                    {rowsNumber - hash}</td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 h-full ">

                    {eleve.nom_prenom}
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 cursor-default " >
                    {eleve.uid}
                </td>


                <td className="border-x border-black  text-center align-middle  text-xs  w-32 h-full">

                    {eleve.nom_pere}
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-20 ">

                    {eleve.date_naissance}
                </td>

                <td className="border-x border-black  text-center align-middle text-xs w-16 ">

                    {eleve.level}
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">

                    {eleve.prev_ecole}
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-40">
                    <div className="flex justify-center">

                        {eleve.Del1}

                    </div>
                </td>

                <td className=" border-x border-black  text-center align-middle  text-xs  w-40 ">
                    <div className="flex justify-center">

                        {eleve.next_ecole}

                    </div>
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-40 ">
                    <div className="flex justify-center">

                        {eleve.reason}

                    </div>
                </td>
                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">

                    {eleve.decision}
                </td>
                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">

                    {eleve.comments}
                </td>

            </tr >
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
        if (eleve.nom_prenom === "" || eleve.next_ecole === "") return false;
        return true
    }


    const addElv = async () => {
        if (verif_addElv()) {
            set_error_uid(false)
            const response = await transfer_elv_db(eleve, ngrok); // zid condition ken rj3 false raou l database mouneka 
            if (response === true) {
                transfer_elv(eleve.prev_ecole_id, eleve.next_ecole_id, eleve.level, false)
                setRowsNumber(prev => prev + 1)
                await set_eleves(prev_eleves => [eleve, ...prev_eleves])
                set_eleve({ nom_prenom: '', nom_pere: '', date_naissance: null, decision: '', Del1: '', prev_ecole: '', prev_ecole_id: 0, next_ecole_id: 0, level: "", id: 0, uid: 0, reason: '', comments: '', next_ecole: '' })
            }
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
                const url = ngrok + "excel/CreateExcel/";

                await fetch(url)
                    .then((response) => {
                        // Check if the response is successful (status code 200)
                        if (!response.ok) {
                            throw new Error(`Failed to download file (HTTP status ${response.status})`);
                        }

                        // Extract the filename from the response headers (Content-Disposition)
                        const contentDisposition = response.headers.get('Content-Disposition');
                        const filenameMatch = contentDisposition && contentDisposition.match(/filename=([^;]+\.xlsx)/);

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
                        set_eleves([])
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

    // comonponts
    const Title_plus_downloadlogo = () => {

        return (
            <div className=" text-3xl font-bold">
                <div>

                    قرارات مجالس النقل بين المدارس لـالسنة الدراسيّة 2023/2024
                </div>

                <button className="absolute top-20 left-20 hover:scale-125 transition-transform outline outline-1 border-black rounded-full  " id="Download" onClick={downloadexcel}>
                    { //    <svg className="w-7 h-7 text-gray-800 dark:text-white  py-0.5 px-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                        //       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                        //   </svg>
                    }
                    <img src={download_img} className="w-7 h-7 text-gray-800 dark:text-white  py-0.5 px-1.5" />
                    <div></div>
                </button>

            </div>
        )
    }

    const Id_input = () => {
        const [xxx, set_xxx] = useState('01');


        useEffect(() => {

            if (xxx.length === 12) {
                const fetchData = async () => {
                    try {
                        console.log(xxx)
                        const response = await fetch(ngrok + "excel/GetElv/" + xxx);
                        if (!response.ok) {
                            if (response.status === 404) {
                                set_loading(false)
                                set_error_uid(true)
                                //  const input = document.getElementById("uid") as HTMLInputElement;
                                //   input.focus();
                                // input.select();
                                set_eleve({ ...eleve, uid: Number(xxx), nom_prenom: "", nom_pere: "", date_naissance: "", level: "", prev_ecole: "", prev_ecole_id: 0, next_ecole: eleve.next_ecole, next_ecole_id: eleve.next_ecole_id, reason: "تغيير مقر الإقامة", decision: "مع الموافقة", comments: "" })
                                set_xxx('01');
                                handle_focus("manual");
                                return
                            }

                            throw new Error('Network response was not ok');
                        }

                        const jsonData = await response.json()
                        set_eleve({ ...jsonData, level: "", Del1: eleve.Del1, next_ecole: eleve.next_ecole, next_ecole_id: eleve.next_ecole_id, reason: "تغيير مقر الإقامة", decision: "مع الموافقة", comments: "" })
                        set_xxx('01');
                        set_loading(false);
                        handle_focus("");



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

        const handle_input = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

            const { value } = event.target;
            set_error_uid(false)
            !isNaN(Number(value)) && value.length <= 12 && set_xxx(value)

        }, [])



        return (
            <>
                <div className="flex mt-10 " dir="rtl" >

                    <div className=" ml-5">
                        <div className="flex flex-col">


                            <div className="flex">

                                <span className="text-lg font-semibold ml-4">المعرف : </span>

                                <div className="flex bg-white border border-black rounded-xl text-right h-7 mt-0.5">
                                    <input
                                        onChange={handle_input} value={xxx} id="uid" type="text" dir="ltr" autoComplete="off" className="text-right pr-5 w-40  rounded-xl focus:outline-none appearance-none spin-button-hidden" />


                                    <span className=" ml-2 mt-0.5 w-4">
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
            </>
        )
    }

    const TableBody = () => {

        return (
            <>
                <tbody id="myTable" className="">
                    {eleves.map((eleve, index) => {
                        {
                            return <TableRow key={index} eleve={eleve} hash={index} />
                        }
                    })}

                    {eleves.length <= 9 && (
                        <>
                            {Array.from({ length: 9 - eleves.length }).map((_, index2) => (
                                <VirginTableRow key={index2} />
                            ))}
                        </>
                    )

                    }

                </tbody>
            </>
        )
    }


    return (

        <>
            <div className="flex justify-center w-full">
                <div className="flex flex-col items-center mt-16  max-h-screen  " >



                    <Title_plus_downloadlogo />

                    <Id_input />

                    {7070057572}
                    {"--"}
                    {6989001140}


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

                        <div className="flex flex-col w-40 h-full border-r border-black  ">
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
                                <button className="h-7 w-fit rounded-lg focus:border-2 focus:border-slate-800  " onClick={addElv} id="Submit">
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

                    <div className="w-full mt-8 overflow-y-scroll outlinee ">
                        <table className="items-center  bg-transparent border  w-full" dir="rtl">

                            <TableHeads />

                            <TableBody />

                        </table>
                    </div>

                </div>
            </div>
            {ErrorConnection && <ErrorConComponent />}
            {Dowloading && <DowloadCom />}

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