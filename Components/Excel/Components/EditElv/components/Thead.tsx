import { ClassNameValue, twMerge } from "tailwind-merge";



const Thead = ({ title, className }: { title: string, className: ClassNameValue }) => {


    return (
        <>
            <th scope="col"
                className={twMerge(`text-sm text-white w-fit font-medium text-center border-gray-600  border-l bg-sky-600 h-10`, className, "")}>

                    {title}

            </th >
        </>
    )
}

export default Thead;