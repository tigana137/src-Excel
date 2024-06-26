import { useState } from "react";
import { warningProp } from "../ElvToTransfer";
import EcoleSuggestions from "./EcoleSuggestions";






const CapacityWarning = ({ warning_msg, close_warning_component }: { warning_msg: warningProp, close_warning_component: Function }) => {

    const [openEcoleSuggestions, setopenEcoleSuggestions] = useState(false)
    const aa = true
    return (
        <>

            <div className={"flex items-center px-4 h-0 overflow-hidden text-yellow-800 rounded-lg bg-yellow-50  transition-all " +(aa ? "  h-20 duration-500" :"")}  role="alert">

                {/* I svg */}
                <button className=" group " onClick={() => setopenEcoleSuggestions(prev => !prev)}>
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>

                    {/* Hover msg */}
                    <div className="absolute invisible  group-hover:visible ">
                        <span >
                            مدارس أخرى بنفس المعتمديّة
                        </span>
                    </div>
                </button>

                <div className="ms-3 text-sm font-medium">

                    طاقة الاستعاب بالمدرسة {warning_msg.name} لا تحتمل الزيادة (كثافة المستوى بالمدرسة : {warning_msg.kethefa})
                </div>

                {/* X button */}
                <button type="button" onClick={() => close_warning_component()}
                    className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-4" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>



            {openEcoleSuggestions && <EcoleSuggestions warning_msg={warning_msg} />}
        </>
    )
}


export default CapacityWarning;