import useCityDataContext from "../../../useContext/CityDataContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import EcoleRow from "./EcoleRow";



const Del1_row = ({ name, id }: { name: string; id: number; }) => {

    const { EcolesData } = useCityDataContext();


    const [collapse, set_collapse] = useState(false);




    return (
        <>

            {/* Spacing row */}
            <tr className=" h-16 sticky top-32  bg-transparent  z-10" >
                <td />
                <td colSpan={5} />
            </tr>

            {/* Del row */}
            <tr className=" bg-transparent  h-20 shadow-xl sticky top-32 z-10 shadow-transparent" onClick={() => set_collapse((prev) => !prev)}>

                {/* DelName td */}
                <td colSpan={6} className="bg-blue-600 pr-4 text-white font-medcium text-right text-2xl  rounded-r-xl  z-20 shadow-lg ">
                    {name}
                </td>


                {/* Arrow td */}
                <td className=" bg-blue-600 text-right rounded-l-xl  z-20 shadow-lg  ">

                    <button onClick={() => set_collapse((prev) => !prev)}>
                        {collapse ? <ChevronUp color="white" /> : <ChevronDown color="white" />}

                    </button>
                </td>

            </tr>

            {/* Spacing row */}
            <tr className={twMerge("transition-all h-5", collapse && "")} />


            {/* Ecoles */}
            {EcolesData && collapse &&
                Object.entries(EcolesData[id]).map(([sid, _]) => (
                    <EcoleRow key={sid} sid={Number(sid)} collapse={collapse} />
                ))
            }


        </>
    )
}

export default Del1_row;
