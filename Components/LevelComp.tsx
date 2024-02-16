import { useEffect, useState } from "react";
import { UseData, UseLevel, UseUpdatePage } from "./UseHooks";
import { useNavigate, useParams } from "react-router-dom";








const LevelComp = ({ level }: { level: string }) => {

    const data = UseData();
    const [picked, setpicked] = useState<number>();
    const prev_level = UseLevel();
    const updatePage = UseUpdatePage();
    const navigate = useNavigate();

    useEffect(() => {

        console.log(level)
        if (level !== prev_level) {

            updatePage(level)
        }

    }, [navigate]);

    useEffect(() => {

        if (Object.keys(data).length > 0) {
            const first_key = Object.keys(data)[0];
            setpicked(Number(first_key));
        }
    }, [data]);


    function getRandomNumber(min = 3, max = 30) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


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
                                (picked === Number(cityID) ? "bg-violet-400" : 'bg-tablebg hover:bg-violet-300')} onClick={() => setpicked(Number(cityID))}>
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
                                        المقاعد الشاغرة
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {picked && Object.entries(data[picked].ecoles).map(([_, school], index) => {

                                    const zyeda_no9san = school[prev_level][3] - school[prev_level][2]
                                    const kethefa = (school[prev_level][0] + zyeda_no9san / school[prev_level][1]).toFixed(1)
                                    return <tr className=" h-16 border-b border-black " key={index}>
                                        <td>
                                            {school.name}
                                        </td>
                                        <td className=" pr-5">
                                            {school[prev_level][0]}
                                        </td>
                                        <td className=" pr-5">
                                            {school[prev_level][2]}
                                        </td>
                                        <td className=" pr-5">
                                            {school[prev_level][3]}
                                        </td>
                                        <td className=" pr-5">
                                            {zyeda_no9san}
                                        </td>
                                        <td className=" pr-5">
                                            {school[prev_level][1]}
                                        </td>
                                        <td className=" pr-5">
                                            {kethefa}
                                        </td>
                                        <td className=" pr-5">
                                            {getRandomNumber()}
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


export default LevelComp;