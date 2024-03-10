import { createContext, useContext, useEffect, useState } from "react";
import { CityData, LevelArray, LevelProp, School } from "../App";
import getUrl from "./getUrl";


type CityDataContext2Props = {
    CityData: CityData;
    transfer_elv: Function;
}
const CityDataContext2 = createContext<CityDataContext2Props | null>(null)



type CityDataContextProps = {
    children: React.ReactNode;
}
export const CityDataContext2Provider = ({ children }: CityDataContextProps) => {
    const url = getUrl()
    const levels: LevelProp[] = ["premiere", "deuxieme", "troisieme", "quatrieme", "cinquieme", "sixieme"]

    const [CityData, useCityData] = useState<CityData>({});

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(url + "retrieve/getallecolesdata/");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()

                useCityData(jsonData)

            } catch (error: unknown) {


            }
        };

        const orginizer = async () => {
            await fetchData();


        }
        orginizer()


    }, [])

    const transfer_elv = (prev_ecole_id: number, next_ecole_id: number, level: number, cancel: boolean) => {
        const niveau: LevelProp = levels[level - 1];
        console.log(prev_ecole_id, next_ecole_id, level, cancel)
        console.log('t5l')
        if (prev_ecole_id !== 0) {

            useCityData((prevData) => {

                const del1_id = Math.floor(prev_ecole_id / 100)
                const prev_ecole: School | undefined = prevData[del1_id].ecoles[prev_ecole_id]
                if (!prev_ecole) return prevData


                const prev_ecoleArray: LevelArray = (prevData[del1_id].ecoles[prev_ecole_id] as any)[niveau] as LevelArray;
                !cancel ? prev_ecoleArray.nbr_leaving = prev_ecoleArray.nbr_leaving + 1 : prev_ecoleArray.nbr_leaving = prev_ecoleArray.nbr_leaving - 1

                return prevData
            });



        }

        if (next_ecole_id !== 0) {

            useCityData((prevData) => {

                const del1_id = Math.floor(next_ecole_id / 100)
                const next_ecole: School | undefined = prevData[del1_id].ecoles[next_ecole_id]
                if (!next_ecole) return prevData;


                const next_ecoleArray: LevelArray = (prevData[del1_id].ecoles[next_ecole_id] as any)[niveau] as LevelArray;

                !cancel ? next_ecoleArray.nbr_comming = next_ecoleArray.nbr_comming + 1 : next_ecoleArray.nbr_comming = next_ecoleArray.nbr_comming - 1

                return prevData
            });


        }
    }
    return (
        <CityDataContext2.Provider value={{ CityData, transfer_elv }}>
            {children}
        </CityDataContext2.Provider>
    )
}



export default function useCityDataContext() {

    const context = useContext(CityDataContext2);

    if (!context) {
        throw new Error(
            "useCityDataContext must be used in CityDataContext2Provider"
        )
    }

    return context;
}


