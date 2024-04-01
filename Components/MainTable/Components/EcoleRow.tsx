import { ChevronDown, ChevronUp } from "lucide-react";
import { ecole_total_classes, ecole_total_elvs, kethefa } from "../functions/calcul_ecole";
import { useEffect, useState } from "react";
import useCityDataContext, { } from "../../../useContext/CityDataContext";
import { twMerge } from "tailwind-merge";
import CollapsableRow from "./CollapsableRow";




const EcoleRow = ({ sid, collapse }: { sid: number, collapse: boolean }) => {

    const { EcolesData, LevelStatData } = useCityDataContext();

    const del1_id: string = String(sid).slice(0, 4);

    const ecole = EcolesData && EcolesData[Number(del1_id)][sid];

    const [open, setOpen] = useState(false); // ~

    const nbr_elvs = LevelStatData && ecole_total_elvs(sid, LevelStatData)

    const nbr_classes = LevelStatData && ecole_total_classes(sid, LevelStatData)

    const nbr_kethefa = LevelStatData && kethefa(nbr_elvs, nbr_classes);

    const tr_default_classname = twMerge(" transition-all bg-transparent h-0 ", collapse && "bg-white")
    const default_classname = twMerge("shadow-lg shadow-transparent flex items-center justify-center  overflow-hidden transition-all text-center h-0 ", collapse && "h-16 ")


    useEffect(() => { if (collapse && open) setOpen(false) }, [collapse])
    if (!EcolesData && !LevelStatData) return null;

    return (
        <>
            <tr onClick={() => setOpen(!open)} className="expandHeight transition-all sticky top-32">

                <td className=" flex h-0" />

                {/* EcoleName */}
                <td className={tr_default_classname + (open ? " rounded-tr-xl" : " rounded-r-xl")} >
                    <div className={twMerge(default_classname, "    justify-start pr-4 text-right font-medium ")}>
                        {ecole['name']}
                    </div>
                </td>

                {/* NbrElvs */}
                <td className={tr_default_classname}>
                    <div className={default_classname}>
                        {nbr_elvs}
                    </div>
                </td>

                {/* NbrClasses */}
                <td className={tr_default_classname}>
                    <div className={default_classname}>
                        {nbr_classes}
                    </div>
                </td>

                {/* NbrKethefa */}
                <td className={tr_default_classname}>
                    <div className={default_classname}>
                        {nbr_kethefa}
                    </div>
                </td>

                {/* Arrow */}
                <td className={tr_default_classname + (open ? " rounded-tl-xl" : " rounded-l-xl")}>
                    <div className={default_classname}>

                        <div className="w-10/12" />

                        <div className="">

                            {open ? <ChevronUp /> : <ChevronDown />}

                        </div>

                    </div>
                </td>

            </tr>

            {collapse && open && <CollapsableRow sid={sid} principal={ecole.principal} />}

            <tr className={collapse ? "transition-all h-7" : "transition-all h-0 duration-500"} />
        </>

    )
}

export default EcoleRow
