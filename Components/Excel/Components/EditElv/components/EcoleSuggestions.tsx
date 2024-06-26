import useCityDataContext from "../../../../../useContext/CityDataContext";
import { kethefa, nbr_elvs_inLevel } from "../../../../MainTable/functions/calcul_ecole";
import { warningProp } from "../ElvToTransfer";



const EcoleSuggestions = ({ warning_msg, }: { warning_msg: warningProp, }) => {

    const { EcolesData, LevelStatData } = useCityDataContext();
    const del1_id = Number(String(warning_msg.sid).slice(0, 4))
    const ecoles = EcolesData[del1_id];



    return (
        <>
            <div className=" absolute border border-black  w-full flex invisible  ">
                <div className="  visible flex p-4 mb-4 text- text-red-800 rounded-lg bg-red-50 expandHeight transition-all">
                    <table>
                        <tbody>

                            {
                                Object.values(ecoles).map((ecole) => {
                                    const lid = Number(String(ecole.sid) + String(warning_msg.level))
                                    const current_nbr_elvs = nbr_elvs_inLevel(LevelStatData[lid].nbr_elvs, LevelStatData[lid].nbr_leaving, LevelStatData[lid].nbr_comming)
                                    const nbr_kethefa = kethefa(current_nbr_elvs, LevelStatData[lid].nbr_classes)

                                    return (
                                        <>
                                            <tr className=" ">
                                                <td className=" pl-5 font-medium ">{ecole.name}</td>
                                                <td>  {"  "} الكثافة : <span className=" font-medium">{nbr_kethefa}</span></td>

                                            </tr>
                                            <tr className=" h-2" />

                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default EcoleSuggestions;
