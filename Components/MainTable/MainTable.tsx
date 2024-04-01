import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ecole_total_classes, ecole_total_elvs, elvs_remainingCapacity, kethefa, nbr_elvs_inLevel } from "./functions/calcul_ecole";
import useCityDataContext, { SchoolType } from "../../useContext/CityDataContext";
import Del1_row from "./Components/Del1_row";







const MainTable = () => {

    const { Del1Data, } = useCityDataContext();



    const tableHeads = [
        "",
        "المدرسة",
        "عدد التلاميذ",
        "عدد الفصول",
        "كثافة الفصول",
        "الزيادة/ النقصان"
    ]


    return (
        <>
            <div className="bg-transparent  w-full   px-10 
             overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full  
             [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full
             [&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-slate-700
             dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 pl-0.5 
            " >

                <div className="  flex sticky h-5 justify-center items-center w-full z-30  top-0  ">
                    <div className="w-full h-60 bg-slate-300 sticky top-0  " />
                </div>

                {/* <div className=" w-full h-10 z-50 sticky top-0 "></div> */}
                <div className="   flex justify-center">
                    <table className=" bg-transparent w-9/12 transition-all border-collapse border-none  cursor-default " >
                        <thead>
                            <tr className=" shadow-lg outline-none  sticky top-10 bg-gray-100 z-50 ">
                                <th className=" w-4 h-14 rounded-r-xl" />
                                <th className=" w-72  text-right pr-5 ">
                                    المدرسة
                                </th>
                                <th className=" px-8 text-center">
                                    عدد التلاميذ
                                </th>
                                <th className=" px-8 text-center">
                                    عدد الفصول
                                </th>
                                <th className=" px-8 text-center">
                                    كثافة الفصول
                                </th>
                                <th className=" px-8 text-center ">
                                    هامش الزيادة/النقصان
                                </th>
                                <th className="w-4 rounded-l-xl">
                                    <button >
                                        {<ChevronDown />}

                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" ">
                            <tr className=" h-20 sticky top-16 bg-transparent  z-50" ><td colSpan={tableHeads.length} /></tr>
                            {!Del1Data &&
                                <tr className=" h-40 ">
                                    <td className="  items-center justify-center" colSpan={3}></td>
                                    <td className="  items-center justify-center" colSpan={2}>
                                        <div className="items-center justify-center w-full">

                                            <LoadingIcon />
                                        </div>
                                    </td>
                                </tr>
                            }
                            <tr className=" h-10" />
                            {Del1Data && Object.entries(Del1Data).map(([id, name], index) => (

                                <Del1_row key={Number(id)} name={name} id={Number(id)} />

                            ))}

                        </tbody>
                    </table>
                </div>

            </div >
        </>
    )
}

export default MainTable;



const LoadingIcon = () => {

    return (
        <svg aria-hidden="true" role="status" className="inline w-40 h-40 mb-1 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
        </svg>
    )
}