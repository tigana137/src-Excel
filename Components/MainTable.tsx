import { useEffect, useState } from "react";
import { LevelArray, School, } from "../App";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ecole_total_classes, ecole_total_elvs, elvs_remainingCapacity, kethefa, nbr_elvs_inLevel } from "./MainTable/calcul_ecole";
import useCityDataContext from "../useContext/CityDataContext";







const MainTable = () => {
    // const ngrok = UseUrl();
    const { CityData: data } = useCityDataContext();

    const tableHeads = [
        "",
        "المدرسة",
        "عدد التلاميذ",
        "عدد الفصول",
        "كثافة الفصول",
        "الزيادة/ النقصان"
    ]

    const [collapseAll, setcollapseAll] = useState<boolean>(true);
    const [collapseArray, setcollapseArray] = useState<boolean[]>([]);

    useEffect(() => {
        let NewArray: boolean[] = [];

        Object.keys(data).forEach(_ => {
            NewArray.push(false) // ~
        });
        setcollapseArray(NewArray);

    }, [])

    const LevelsTable = ({ level, index }: { level: LevelArray; index: number }) => {

        const current_elvs_number = nbr_elvs_inLevel(level.nbr_elvs, level.nbr_leaving, level.nbr_comming)
        const kethefa = (current_elvs_number / level.nbr_classes).toFixed(1)
        const zyeda_no9san = elvs_remainingCapacity(current_elvs_number, level.nbr_classes)

        return (
            <>
                <tr>
                    <td className=" text-center">
                        س{index + 1}
                    </td>

                    <td className=" text-center">
                        {level.nbr_elvs}
                    </td>
                    <td className=" text-center">
                        {current_elvs_number}
                    </td>
                    <td className=" text-center">
                        {level.nbr_classes}
                    </td>
                    <td className=" text-center">
                        {kethefa}
                    </td>
                    <td className=" text-center">
                        {zyeda_no9san}
                    </td>

                </tr>

                <tr className="  h-0.5  border-b border-gray-400">
                    <td colSpan={6} />
                </tr>
            </>
        )
    }


    const CollapsableRow = ({ sid, levels, principal }: { sid: number; principal: string; levels: LevelArray[] }) => {



        return (

            <tr className="  z-10 "  >
                <td className=" bg-transparent outline-none border-none shadow-none" />
                <td colSpan={tableHeads.length - 1} className=" shadow-sm  border-none rounded-b-xl  overflow-hidden " >
                    <div className="pb-5  bg-white pt-2  shadow-lg rounded-b-xl">
                        <div className="flex ">
                            <div className="w-1/2 pr-3">
                                <span>مدير المدرسة :  </span>
                                <span>{principal}</span>
                            </div>
                            <div className="w-1/2 text-left pl-3">
                                <span>رمز المدرسة :</span>
                                <span>{sid}</span>
                            </div>
                        </div>
                        <div className=" text-xl mr-5 mt-3 mb-2 ">
                            حركة كل مستوى
                        </div>
                        <div className=" w-full flex justify-center mb-5 ">
                            <table className=" w-11/12 ">
                                <thead className=" ">
                                    <tr>

                                        <th>
                                            المستوى
                                        </th>
                                        <th>
                                            عدد التلاميذ بـ30أوت
                                        </th>
                                        <th>
                                            حاصل الحركة
                                        </th>
                                        <th>
                                            عدد الفصول
                                        </th>
                                        <th>
                                            الكثافة
                                        </th>
                                        <th>
                                            الزيادة/ النقصان
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr className="  h-2  border-b border-gray-400"></tr>
                                    {levels.map((level, index) => {
                                        return <LevelsTable key={index} level={level} index={index} />
                                    })}

                                </tbody>


                            </table>
                        </div>
                    </div>
                </td>
            </tr>

        )
    }


    const EcoleRow = ({ ecole, sid }: { ecole: School, sid: number }) => {
        const [open, setOpen] = useState(false); // ~

        const nbr_elvs = ecole_total_elvs(ecole)

        const nbr_classes = ecole_total_classes(ecole)

        const nbr_kethefa = kethefa(nbr_elvs, nbr_classes);

        return (
            <>
                <tr onClick={() => setOpen(!open)} className={"sticky top-24  h-16 rounded-t-xl cursor-default " + (open ? "" : "rounded-b-xl")} >

                    <td className=" bg-transparent shadow-none  " />

                    <td className={"bg-white shadow-lg  outline-none border-none pr-4 text-right font-normal  " + (open ? "rounded-tr-xl " : "rounded-r-xl")} >
                        {ecole['name']}
                    </td>

                    <td className="bg-white shadow-lg outline-none border-none text-center">
                        {nbr_elvs}
                    </td>

                    <td className="bg-white shadow-lg outline-none border-none text-center">
                        {nbr_classes}
                    </td>

                    <td className="bg-white shadow-lg outline-none border-none text-center">
                        {nbr_kethefa}
                    </td>

                    <td className={"bg-white shadow-lg outline-none border-none text-center " + (open ? "rounded-tl-xl" : "rounded-l-xl")}>

                        <div className="flex">

                            <div className="w-10/12" />

                            <div className="">

                                {open ? <ChevronUp /> : <ChevronDown />}

                            </div>

                        </div>

                    </td>
                </tr>

                {open && <CollapsableRow sid={sid} principal={ecole.principal} levels={[ecole["premiere"], ecole["deuxieme"], ecole["troisieme"], ecole["quatrieme"], ecole["cinquieme"], ecole["sixieme"]]} />}

                <tr className=" h-7" />
            </>

        )
    }

    const toggleBooleanAtIndex = (index: number) => {
        const newArray = [...collapseArray];

        newArray[index] = !newArray[index];

        setcollapseArray(newArray);
    };


    const setAllTo = () => {
        const newArray = collapseArray.map(() => collapseAll);
        console.log(newArray)
        setcollapseArray(newArray);
        setcollapseAll((curr) => !curr)
    };

    const Del_row = ({ name, ecoles, index }: { name: string; ecoles: { [sid: number]: School }, index: number }) => {

        return (
            <>
                <tr className=" h-10 sticky top-0 bg-transparent  z-10" >
                    <td />
                    <td colSpan={tableHeads.length - 1} />
                </tr>

                <tr className=" bg-transparent  h-16  " onClick={() => toggleBooleanAtIndex(index)}>
                    <td />
                    <td colSpan={tableHeads.length - 1} className=" cursor-default outline-none  sticky top-24 bg-violet-300 pr-4 text-right text-xl  rounded-r-xl border-none z-20 shadow-lg ">
                        {name}
                    </td>
                    <td className="outline-none  sticky top-24 bg-violet-300 text-right rounded-l-xl border-none z-20 shadow-lg  ">
                        <button onClick={() => toggleBooleanAtIndex(index)}>
                            {collapseArray[index] ? <ChevronUp /> : <ChevronDown />}

                        </button>
                    </td>
                </tr>



                {collapseArray[index] &&
                    <>
                        <tr className=" h-5" />
                        {Object.entries(ecoles).map(([sid, school]) => (
                            <EcoleRow key={sid} ecole={school} sid={Number(sid)} />
                        ))}
                    </>
                }





            </>
        )
    }


    return (
        <>
            <div className="bg-transparent  overflow-y-scroll w-full   px-10 " >
                <div className=" w-full h-10 z-50 sticky top-0 "></div>
                <div className="   flex justify-center">
                    <table className=" bg-transparent w-9/12  " >
                        <thead>
                            <tr className=" shadow-lg outline-none  sticky top-10 bg-gray-100 z-10 ">
                                <th className=" w-4 h-11 rounded-r-xl" />
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
                                    <button onClick={() => setAllTo()}>
                                        {collapseAll ? <ChevronDown /> : <ChevronUp />}

                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr className=" h-20 sticky top-16 bg-transparent  z-10" ><td colSpan={tableHeads.length} /></tr>
                            {Object.keys(data).length === 0 &&
                                <tr className=" h-40 ">
                                    <td className="  items-center justify-center" colSpan={3}></td>
                                    <td className="  items-center justify-center" colSpan={2}>
                                        <div className="items-center justify-center w-full">

                                            <LoadingIcon />
                                        </div>
                                    </td>
                                </tr>
                            }
                            {Object.entries(data).map(([_, city], index) => (

                                <Del_row key={index} name={city['name']} ecoles={city['ecoles']} index={index} />

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