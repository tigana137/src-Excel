import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import getUrl from '../../useContext/getUrl';
import DateComponent from './DateComponent';

export type HistoryProps = [string, "general" | "premiere"]

const Historique = () => {

    const [historyDates, set_historyDates] = useState<HistoryProps[]>([]);

    useEffect(() => {

        const fetch_history = async () => {
            const url = getUrl();
            const response: AxiosResponse<HistoryProps[]> = await axios.get<HistoryProps[]>(url + 'retrieve/getHistoriqueDates');
            set_historyDates(response.data)
        }


        fetch_history();

    }, [])


    return (
        <>
            <div className=' w-full h-full bg-transparent' dir='ltr'>
                <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-11/12 h-full ">
                    <div className="bg-white rounded-xl shadow p-4 sm:p-7 h-full flex flex-col items-center  shadow-gray-400">


                        {
                            historyDates.map((date_info, index) => {
                                return <DateComponent key={index} date_info={date_info} />
                            })
                        }

                    </div >
                </div >
            </div >
        </>
    )
}

export default Historique;



