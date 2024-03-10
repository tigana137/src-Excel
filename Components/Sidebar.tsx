import { ChevronLast, ChevronFirst } from "lucide-react"
import { useState } from "react"

import { Link } from "react-router-dom"
import { pageProp, pages } from "../App"



export default function Sidebar() {

    const [expanded, setExpanded] = useState(true);
    const [active, set_active] = useState(0);
    const set_active_funct = (index: number) => {
        set_active(index)
    }


    return (
        <div className=" bg-transparent ">


            <aside className="  h-screen w-fit top-0 z-50" dir="rtl">
                <nav className="h-full flex flex-col bg-white border-l shadow-sm w-fit">
                    <div className="p-4 pb-6 flex justify-between items-center ">
                        <img
                            src="https://img.logoipsum.com/243.svg"
                            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                                }`}
                            alt=""
                        />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            {expanded ? <ChevronLast /> : <ChevronFirst />}
                        </button>
                    </div>

                    <ul className="flex-1 px-3 ">

                        {pages.map((page, index) => {
                            return (
                                <div key={index}>

                                    <SidebarItem page={page} active={active !== index ? false : true} expanded={expanded} index={index} set_active_funct={set_active_funct} />
                                    {(index === 0 || index === 6 || index === 8) && <hr />}

                                </div>
                            )
                        })}

                    </ul>

                    <div className="border-t flex p-3">
                        <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" alt="" className="w-10 h-10 rounded-md" />

                        <div className={` flex justify-between items-center
                    overflow-hidden transition-all ${expanded ? "w-52 mr-3" : "w-0"}`}>

                            <div className="leading-4">
                                <h4 className="font-semibold">John Doe</h4>
                                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                            </div>

                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    )
}




export const SidebarItem = ({ page, active, expanded, index, set_active_funct }: { page: pageProp, active: boolean, expanded: boolean, index: number, set_active_funct: Function }) => {
    console.log(active)
    return (
        <Link to={page.path} onClick={() => set_active_funct(index)}  >
            <li
                className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${active
                        ? "bg-gradient-to-tr from-indigo-300 to-indigo-200 text-indigo-800"
                        : "hover:bg-indigo-100 text-gray-600"}`}>

                <img src={page.icon} alt="" className="w-10 h-10 rounded-md" />

                <span className={`overflow-hidden transition-all h-10 flex items-center ${expanded ? "w-56 mr-3 " : "w-0"}`} >
                    {page.name}
                </span>


                {!expanded && (
                    <div className={`
                    absolute right-full rounded-md px-2 py-1 mr-6 w-max z-40
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {page.name}
                    </div>
                )}
            </li >
        </Link>
    )
}