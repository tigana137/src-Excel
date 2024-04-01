import useCityDataContext from "../../../useContext/CityDataContext";
import { elvs_remainingCapacity, nbr_elvs_inLevel } from "../functions/calcul_ecole"


const LevelsTable = ({ index, lid }: { index: number, lid: number }) => {

    const { LevelStatData } = useCityDataContext();

    let current_elvs_number = 0;
    let kethefa = "";
    let zyeda_no9san = 0;

    if (LevelStatData) {

        current_elvs_number = nbr_elvs_inLevel(LevelStatData[lid].nbr_elvs, LevelStatData[lid].nbr_leaving, LevelStatData[lid].nbr_comming)
        kethefa = (current_elvs_number / LevelStatData[lid].nbr_classes).toFixed(1)
        zyeda_no9san = elvs_remainingCapacity(current_elvs_number, LevelStatData[lid].nbr_classes)
    }

    return (
        <>
            <tr>
                <td className=" text-center">
                    س{index + 1}
                </td>

                <td className=" text-center">
                    {LevelStatData[lid].nbr_elvs}
                </td>
                <td className=" text-center">
                    {current_elvs_number}
                </td>
                <td className=" text-center">
                    {LevelStatData[lid].nbr_classes}
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



export default LevelsTable;