import { eleveSearchProp } from "../Search";


const TableRow = ({ eleve }: { eleve: eleveSearchProp }) => {


    return (
        <>
            <tr className=' h-14'>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 border">{eleve[1]}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border  ">{eleve[0]}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border w-80 ">{eleve[2]}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border  w-32">{eleve[3]}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border ">{eleve[4]}</td>
            </tr>
        </>
    )
}

export default TableRow;
