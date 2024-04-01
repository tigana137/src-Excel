import { Link, useNavigate, useParams } from "react-router-dom";
import useCityDataContext, { LevelStatType } from "../../../useContext/CityDataContext";
import { LevelProp } from "../../../App";
import { elvs_remainingCapacity, kethefa, nbr_elvs_inLevel } from "../../MainTable/functions/calcul_ecole";
import { useEffect, useState } from "react";
import axios from "axios";
import getUrl from "../../../useContext/getUrl";






const levels = {
    premiere: 1,
    deuxieme: 2,
    troisieme: 3,
    quatrieme: 4,
    cinquieme: 5,
    sixieme: 6,
}





export const EditSchoolNumbers = () => {
    const params = useParams();
    const { EcolesData, LevelStatData, refetchLevelStat } = useCityDataContext();
    const sid = params.sid as String;
    const level: number = levels[params.level as LevelProp];
    const lid = Number(sid + String(level));
    const dre_id = sid.slice(0, 4);
    const ecole = EcolesData?.[Number(dre_id)][Number(sid)];

    const [newLevelStat, setLevelStat] = useState<LevelStatType>({ nbr_classes: 0, nbr_elvs: 0, nbr_leaving: 0, nbr_comming: 0, });


    useEffect(() => {
        if (LevelStatData) {
            const levelData = LevelStatData[lid];
            console.log('t5al ', levelData)
            setLevelStat(levelData);
        }
    }, [LevelStatData]);

    const navigate = useNavigate();

    const current_nbr_elvs = nbr_elvs_inLevel(newLevelStat.nbr_elvs, newLevelStat.nbr_leaving, newLevelStat.nbr_comming);
    const zyeda_no9san = elvs_remainingCapacity(current_nbr_elvs, newLevelStat.nbr_classes);
    const nbr_kethefa = kethefa(current_nbr_elvs, newLevelStat.nbr_classes);

    const handle_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;


        setLevelStat((prev) => {
            return {
                ...prev,
                [name]: Number(value)
            }
        })
    }

    const send = () => {

        const url = getUrl();

        const payload: any = newLevelStat;
        payload['lid'] = lid;
        console.log(payload)
        axios.post(url + "retrieve/editLevelStat", payload).then(_ => {
            refetchLevelStat()
            navigate('/level/' + params.level)
        })


    }
    return (
        <>
            <div className=" w-0 h-0 z-50 ">

                {/* Background */}
                <div className="fixed w-full h-full bg-gray-200 opacity-40" />

                {/* Modal */}
                <div className=" opacity-100  fixed  z-50 justify-center items-center w-full  h-full">
                    <div className="flex justify-center items-center  h-full  w-full  ">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg  border-2 border-gray-200  shadow-lg shadow-slate-300">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    تغيير معطيات المدرسة
                                </h3>
                                <Link className="  text-gray-400 rounded-lg p-2.5 hover:bg-gray-200 hover:text-black" to={'/level/' + params.level}>
                                    <svg className="w-3 h-3 stroke-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </Link>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">


                                    <>
                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">اسم المدرسة</label>
                                            <input dir="rtl" type="text" value={ecole ? ecole.name : ''} disabled={true}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                        </div>
                                    </>

                                    <>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">التلاميذ بـ30أوت</label>
                                            <input type="number" name="nbr_elvs" value={newLevelStat.nbr_elvs} onChange={handle_change}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">عدد الفصول</label>
                                            <input type="number" name="nbr_classes" value={newLevelStat.nbr_classes} onChange={handle_change}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                        </div>
                                    </>


                                    <>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">عدد مغادرون</label>
                                            <input type="number" name="nbr_leaving" value={newLevelStat.nbr_leaving} onChange={handle_change}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">عدد وافدون</label>
                                            <input type="number" name="nbr_comming" value={newLevelStat.nbr_comming} onChange={handle_change}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                        </div>
                                    </>


                                    <>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الكثافة</label>
                                            <input disabled={true} value={nbr_kethefa}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الزيادة/النقصان</label>
                                            <input disabled={true} value={zyeda_no9san}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                        </div>
                                    </>

                                </div>


                                <button onClick={send}
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className=" text-white me-1 -ms-1 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                    </svg>
                                    تسجيل
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};


export default EditSchoolNumbers;