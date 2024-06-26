import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { elvs_remainingCapacity, kethefa, nbr_elvs_inLevel } from "../MainTable/functions/calcul_ecole";

import { LevelProp } from "../../App";
import useCityDataContext from "../../useContext/CityDataContext";
import { twMerge } from "tailwind-merge";
import Hemich_TableCell from "./Components/Hemich_TableCell";
import Kethefa_TableCell from "./Components/Kethefa_TableCell";
import LoadingIcon from "../../lib/LoadingIcon";
import Thead from "./Components/Thead";



const levels = {
    premiere: 1,
    deuxieme: 2,
    troisieme: 3,
    quatrieme: 4,
    cinquieme: 5,
    sixieme: 6,
}




const LevelComp = () => {

    const { Del1Data, EcolesData, LevelStatData } = useCityDataContext();
    const [del1_picked, set_del1] = useState<number>(0);
    const params = useParams();
    const level: number = levels[params.level as LevelProp]
    const CityData_isfetched = Del1Data && EcolesData && LevelStatData


    useEffect(() => {

        if (Del1Data) {
            const first_key = Object.keys(Del1Data)[0];
            set_del1(Number(first_key));
        }
    }, [Del1Data]);






    if (!Del1Data) {

        return (
            <>
                <div className="top-0 bg-indigo-200/75   w-full px-10 flex justify-center overflow-y-scroll ">
                    <div className=" mt-40">
                        <LoadingIcon className="" />
                    </div>
                </div>
            </>
        )
    }



    return (
        <>

            <Outlet />

            <div className="flex flex-col w-full shadow-md  m-12 bg-white p-5">

                <div className="flex items-center justify-between space-y-4 md:space-y-0 py-4 p-5 bg-white ">
                    <label className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search for users" />
                    </div>

                    <div>
                        <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5" type="button">
                            <span className="sr-only">Action button</span>
                            Action
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                    </div>

                </div>

                <div className="flex py-5 w-full flex-wrap  ">

                    {Del1Data && Object.entries(Del1Data).map(([cityID, name]) => {
                        return (

                            <button key={cityID} onClick={() => set_del1(Number(cityID))}
                                className={twMerge("transition-colors border rounded-xl   text-gray-900 bg-white  mb-1   py-1.5 px-1.5  mx-1    text-sm  font-semibold whitespace-nowrap ",
                                    Number(cityID) === del1_picked && "bg-blue-600 text-white hover:bg-blue-600",
                                    Number(cityID) !== del1_picked && "hover:bg-blue-300"
                                )
                                }
                            >
                                {name}
                            </button >


                        )
                    })}

                </div>



                {/* table */}
                <div className="relative   flex-grow  
                        overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full  
                        [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-600 
                       
                     
                        ">


                    <table className=" w-[calc(100%-1rem)] text-sm text-left  rtl:text-right text-gray-500 select-none border-none ">
                        <Thead />

                        <tbody>

                            {CityData_isfetched && !!del1_picked && Object.entries(EcolesData[del1_picked]).map(([sid, school], index) => {

                                const lid = Number(String(sid) + String(level))

                                const current_nbr_elvs = nbr_elvs_inLevel(LevelStatData[lid].nbr_elvs, LevelStatData[lid].nbr_leaving, LevelStatData[lid].nbr_comming)
                                const zyeda_no9san = elvs_remainingCapacity(current_nbr_elvs, LevelStatData[lid].nbr_classes)
                                const nbr_kethefa = kethefa(current_nbr_elvs, LevelStatData[lid].nbr_classes)

                                return <tr className=" h-16 border-b border-black  hover:bg-slate-200 " key={index}>

                                    <td className="flex items-center h-16 pl-6  pr-3  font-medium text-gray-900 whitespace-nowrap ">
                                        {school.name}
                                    </td>
                                    <td className=" pl-6 pr-10 py-4 ">
                                        {LevelStatData[lid].nbr_elvs}
                                    </td>
                                    <td className=" pr-5 px-6 py-4 ">
                                        {LevelStatData[lid].nbr_leaving}
                                    </td>
                                    <td className=" pr-5 px-6 py-4">
                                        {LevelStatData[lid].nbr_comming}
                                    </td>
                                    <td className=" pr-5 px-6 py-4">
                                        {current_nbr_elvs}
                                    </td>
                                    <td className=" pr-5 px-6 py-4">
                                        {LevelStatData[lid].nbr_classes}
                                    </td>
                                    <td className="">
                                        <Kethefa_TableCell number={Number(nbr_kethefa)} />
                                    </td>
                                    <td className="pr-5 px-6 py-4">
                                        <Hemich_TableCell number={zyeda_no9san} />
                                    </td>
                                    <td className="pr-5 px-6 py-4 flex  justify-end">
                                        <button className="font-medium text-blue-600  hover:underline pl-5">
                                            <Link to={'edit/' + sid}>
                                                تحيين
                                            </Link>
                                        </button>
                                    </td>


                                </tr>

                            })}

                        </tbody>
                    </table>
                </div>


            </div >

        </>
    )
}




export default LevelComp;