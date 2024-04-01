import { createContext, useContext } from "react";
import useCityData from "../hooks/useCityData";


type Del1sType = {
    [id: number]: string;
}

export type SchoolType = {
    sid: number;
    name: string;
    principal: string;

}

export type EcolesType = {
    [id: number]: {
        [sid: number]: SchoolType
    }
}

export type LevelStatType = {
    nbr_classes: number;
    nbr_elvs: number;
    nbr_leaving: number;
    nbr_comming: number;
}


export type LevelStatsType = {
    [lid: number]: LevelStatType
}

type CityDataContextProps = {
    Del1Data: Del1sType;
    EcolesData: EcolesType;
    LevelStatData: LevelStatsType;
    refetchLevelStat: Function;
}

const CityDataContext = createContext<CityDataContextProps | null>(null)


export const CityDataContextProvider = ({ children }: { children: React.ReactNode }) => {


    const { Del1Data, EcolesData, LevelStatData, refetchLevelStat } = useCityData();



    return (
        <>
            <CityDataContext.Provider value={{ Del1Data, EcolesData, LevelStatData, refetchLevelStat }}>
                {children}
            </CityDataContext.Provider>
        </>
    )

}




export default function useCityDataContext() {

    const context = useContext(CityDataContext);

    if (!context) {
        throw new Error(
            "useCityDataContext must be used in CityDataContext2Provider"
        )
    }

    return context;
}
