import { twMerge } from "tailwind-merge";



const Kethefa_TableCell = ({ number }: { number: number }) => {

    return (
        <div className=" w-20" >
            <div className="flex items-center font-medium pr-5 ">
                <div className="  w-8  text-left">
                    {number}

                </div>
                <div className={
                    twMerge("h-2.5 w-2.5 rounded-full bg-green-500  ms-2",
                        number >= 33 && "bg-red-500",
                        number < 18 && "bg-yellow-500")}
                />
            </div>

        </div>
    )
}

export default Kethefa_TableCell;