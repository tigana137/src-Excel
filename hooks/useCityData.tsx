import axios from "axios"
import { useQuery } from "react-query"
import getUrl from "../useContext/getUrl";



const fetch_Del1s = () => {
    const url = getUrl();

    return axios.get(url + 'retrieve/getDel1s');
}

const fetch_ecoles = () => {
    const url = getUrl();


    return axios.get(url + 'retrieve/getEcoles');
}

const fetch_levelstat = () => {
    const url = getUrl();


    return axios.get(url + 'retrieve/getLevelStat');
}

export const useEcolesData = () => {
    const { data: Del1sQuery, } = useQuery('getDel1s', fetch_Del1s, { cacheTime: 0, refetchOnWindowFocus: false })


    const { data: EcolesQuery, } = useQuery('getEcoles', fetch_ecoles, { cacheTime: 0, refetchOnWindowFocus: false })

    const Del1Data = Del1sQuery?.data;
    if (Del1Data !== undefined && Del1Data !== null ) {

        delete Del1Data[8498]
    }

    const EcolesData = EcolesQuery?.data;
    if (EcolesData !== undefined && EcolesData !== null ) {
        delete EcolesData[8498]

    }
    return { Del1Data, EcolesData }
}


const useCityData = () => {
    const { Del1Data, EcolesData } = useEcolesData();
    const { data: LevelStatQuery,refetch:refetchLevelStat } = useQuery('getLevelStat', fetch_levelstat, {});

    const LevelStatData = LevelStatQuery?.data;

    return { Del1Data, EcolesData, LevelStatData,refetchLevelStat }
}


export default useCityData;
