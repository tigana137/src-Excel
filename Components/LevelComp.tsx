import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { elvs_remainingCapacity, kethefa, nbr_elvs_inLevel } from "./MainTable/calcul_ecole";

import useCityDataContext from "../useContext/CityDataContext";
import { LevelProp } from "../App";








const LevelComp = () => {

    const { CityData: data } = useCityDataContext();
    const [del1_picked, set_del1] = useState<number>();
    const paramss = useParams();
    const level: LevelProp = paramss.level as LevelProp;


    useEffect(() => {

        if (Object.keys(data).length > 0) {
            const first_key = Object.keys(data)[0];
            set_del1(Number(first_key));
        }
    }, [data]);


    if (Object.keys(data).length === 0) {

        return (
            <>
                <div className="top-0 bg-indigo-200/75   w-full px-10 flex justify-center overflow-y-scroll ">
                    <div className=" mt-40">
                        <LoadingIcon />
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <div className="top-0 bg-indigo-200/75   w-full px-10 flex justify-center overflow-y-scroll ">
                <div className=" mt-20  ">

                    <div className="flex  h-fit " >
                        {data && Object.entries(data).map(([cityID, city]) => (


                            <div key={cityID} className={"flex select-none items-center text-center cursor-pointer border border-b-0  border-gray-300 h-9 px-2 rounded-tl-2xl rounded-tr-lg  " +
                                (del1_picked === Number(cityID) ? "bg-violet-400" : 'bg-tablebg hover:bg-violet-300')} onClick={() => set_del1(Number(cityID))}>
                                {city.name}
                            </div>

                        ))}
                    </div>
                    <div className=" bg-tablebg h-3 w-full"></div>
                    <div className="shadow-xl bg-tablebg p-2 pb-16">
                        <table className=" w-full bg-white border rounded-lg select-none">
                            <thead >
                                <tr className=" border-b  border-black">
                                    <th className=" w-2/12 text-right pr-3">
                                        المدرسة
                                    </th>
                                    <th className=" w-28 text-right">
                                        التلاميذ بـ30أوت
                                    </th>
                                    <th className="w-28 text-right">
                                        مغادرون
                                    </th>
                                    <th className="w-28 text-right">
                                        وافدون
                                    </th>
                                    <th className="w-28 text-right">
                                        حاصل الحركة
                                    </th>
                                    <th className="w-28 text-right">
                                        عدد الفصول
                                    </th>
                                    <th className="w-28 text-right">
                                        الكثافة
                                    </th>
                                    <th className="w-28 text-right">
                                        هامش الزيادة/النقصان
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {del1_picked && Object.entries(data[del1_picked].ecoles).map(([_, school], index) => {

                                    const current_nbr_elvs = nbr_elvs_inLevel(school[level].nbr_elvs, school[level].nbr_leaving, school[level].nbr_comming)
                                    const zyeda_no9san = elvs_remainingCapacity(current_nbr_elvs, school[level].nbr_classes)
                                    const nbr_kethefa = kethefa(current_nbr_elvs, school[level].nbr_classes)

                                    return <tr className=" h-16 border-b border-black " key={index}>
                                        <td>
                                            {school.name}
                                        </td>
                                        <td className=" pr-5">
                                            {school[level].nbr_elvs}
                                        </td>
                                        <td className=" pr-5">
                                            {school[level].nbr_leaving}
                                        </td>
                                        <td className=" pr-5">
                                            {school[level].nbr_comming}
                                        </td>
                                        <td className=" pr-5">
                                            {current_nbr_elvs}
                                        </td>
                                        <td className=" pr-5">
                                            {school[level].nbr_classes}
                                        </td>
                                        <td className="">
                                            <Kethefa_cell number={Number(nbr_kethefa)} />
                                        </td>
                                        <td className="pr-5">
                                            <Hemich_cell number={zyeda_no9san} />
                                        </td>
                                    </tr>

                                })}




                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </>
    )
}

const LoadingIcon = () => {

    return (
        <svg aria-hidden="true" role="status" className="inline w-40 h-40 mb-1 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
        </svg>
    )
}


const Kethefa_cell = ({ number }: { number: number }) => {

    const possible_colors = ['text-green-800', 'text-yellow-800', 'text-red-800', 'bg-green-100', 'bg-yellow-100', 'bg-red-100']
    let color: string
    if (number >= 33) color = "red"
    else if (number <= 33 && number >= 19) color = "green"
    else color = "yellow"

    return (
        <div className=" w-20" >
            <span className={` w-16 py-1 px-1.5 h-7 inline-flex items-center gap-x-1 text-xs font-medium bg-${color}-100 text-${color}-800 rounded-full`}>
                <span className=" w-7 justify-center flex">
                    {number}
                </span>

                <svg className="size-2.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
            </span>
        </div>
    )
}


const Hemich_cell = ({ number }: { number: number }) => {

    const possible_colors = ['text-green-800', 'text-yellow-800', 'text-red-800']
    let color: string
    if (number >= 0) color = "red"
    else color = "green"

    return (
        <div className=" w-20" >
            <span className="inline-flex">
                <span className=" w-6 ">
                    {Math.abs(number)}
                </span>

                {
                    number <= 0 ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={` w-6 h-6 text-red-600 `}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                        </svg>

                }
            </span>
        </div>
    )
}



export default LevelComp;