import { useCallback, useEffect, useRef, useState } from "react";
import VirginTableRow from "./Components/VirginTableRow";
import ErrorConComponent from "../ErrorConComponent";
import DowloadCom from "./Components/DowloadCom";
import TableHeads from "./Components/TableHeads";
import { cancel_elv_db, transfer_elv_db } from "./functions/cancel_elv_db";
import { handle_focus } from "./functions/handle_focus";

import axios from "axios";
import getUrl from "../../useContext/getUrl";
import ElvToTransfer from "./Components/EditElv/ElvToTransfer";
import DownloadExcelCom from "./Components/DownloadExcelCom";
import useCityDataContext from "../../useContext/CityDataContext";
import UidInput_Component from "./Components/UidInput_Component";



export interface Eleve {
    uid: number;
    nom_prenom: string;
    nom_pere: string;
    date_naissance: String | null;
    level: string;
    prev_ecole: string;
    prev_ecole_id: number;
    Del1: string;
    Del1_id: number;
    next_ecole: string;
    next_ecole_id: number;
    reason?: string;
    decision: string;
    comments?: string;
}

const empty_elv: Eleve = { nom_prenom: '', nom_pere: '', date_naissance: '', decision: '', Del1: '', Del1_id: 0, prev_ecole: '', prev_ecole_id: 0, next_ecole_id: 0, level: '', uid: 0, reason: '', comments: '', next_ecole: '' }


const Excel = ({ setServerError }: { setServerError: Function }) => {

    const { refetchLevelStat } = useCityDataContext();
    const [eleves, set_eleves] = useState<Eleve[]>([]);
    const [eleve, set_eleve] = useState<Eleve>(empty_elv)
    const [ErrorConnection, set_ErrorConnection] = useState(false);

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
                const [data, _] = await fetchElvsRows(pageNumber)
                set_eleves((prev) => [...prev, ...data])

            }
        })
        if (node) observer.current.observe(node)
    }, [loadingfetchingRows])


    useEffect(() => {

        const fetch_elvs = async () => {
            const [data, rowsnumber] = await fetchElvsRows(0)
            set_eleves(data)
            setRowsNumber(rowsnumber)

        };
        fetch_elvs();
    }, [])


    const change_elv = (eleve: Eleve) => {
        set_eleve(eleve)
    }



    const fetchElvsRows = async (page: number) => {
        const url = getUrl();
        set_loadingfetchingRows((prev) => !prev)
        const data = await axios({
            method: 'GET',
            url: url + 'excel/Getexcelrows/' + page,

        }).then(res => {
            return [res.data.data, res.data.length]

        }).catch(e => {
            return [[], 0]
        })
        set_loadingfetchingRows((prev) => !prev)
        return data

    }


    const delRow = (index: number, eleve: Eleve) => {
        const url = getUrl();
        cancel_elv_db(eleve, url); // ~ zid condition ken rj3 false raou l database mouneka 
        const Newelvs = [...eleves];
        Newelvs.splice(index, 1);
        set_eleves(Newelvs);
        refetchLevelStat()
        setRowsNumber(prev => prev - 1)
    }


    const TableRow = ({ eleve, hash }: { eleve: Eleve, hash: number }) => {

        return (

            <tr className={" bg-slate-50 hover:bg-slate-400 border-b border-black  h-16 " + (hash === 0 && "animate-fadeIn")} id={String(hash)} ref={eleves.length !== hash + 1 ? undefined : lastRowElemnt} >
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


    const addElv = async (eleve: Eleve) => {
        const url = getUrl();
        const response = await transfer_elv_db(eleve, url); // zid condition ken rj3 false raou l database mouneka 
        if (response === true) {
            refetchLevelStat()
            setRowsNumber(prev => prev + 1)
            await set_eleves(prev_eleves => [eleve, ...prev_eleves])
            set_eleve(empty_elv)
        }
        handle_focus("uid")


    }


    const downloadexcel = async () => {
        const url = getUrl();
        const SendData = async () => {
            async function downloadExcelFile() {
                // Replace 'your-django-url' with the actual URL of your Django view

                await fetch(url + "excel/CreateExcel/")
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


    const TableBody = () => {

        return (
            <>
                <tbody id="myTable" className=" bg-white">
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
            <div className="flex justify-center w-full ">
                <div className="flex flex-col items-center mt-12  max-h-screen w-full  " >



                    <DownloadExcelCom downloadexcel={downloadexcel} />

                    <UidInput_Component set_eleve={change_elv} />

                    <div className=" h-14" />


                    <ElvToTransfer eleve={eleve} addElv={addElv} />


                    <div className=" h-20" />



                    <ScrollbarDiv>

                        <table className="items-center  bg-transparent border  h-fit w-full pr-5 " dir="rtl">

                            <TableHeads />

                            <TableBody />

                        </table>

                    </ScrollbarDiv>


                </div>
            </div>
            {ErrorConnection && <ErrorConComponent />}
            {Dowloading && <DowloadCom />}

        </>
    )
}

export default Excel;


const ScrollbarDiv = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="w-full overflow-y-scroll   pr-5 h-fit
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-slate-700
        dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 pl-0.5 "

        >
            {children}


        </div>
    )

}