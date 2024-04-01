import { ChevronLast, ChevronFirst } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import { pages } from "../../App";
import { SidebarItem } from "./SidebarItem";
import { useLocation } from "react-router-dom";


export default function Sidebar() {

    const [expanded, setExpanded] = useState(false);
    const [active, set_active] = useState(0);
    const set_active_funct = (index: number) => {
        set_active(index)
    }

    const location = useLocation();


    useLayoutEffect(() => {

        pages.map((page, index) => {
            location.pathname.startsWith(page.path) && set_active(index)
        })
    }, [])

    return (
        <div className=" bg-transparent shadow-xl shadow-transparent  ">


            <aside className="  h-screen w-fit top-0 z-50 " dir="rtl">
                <nav className="h-full flex flex-col bg-white border-l w-fit ">
                    <div className="p-4 pb-6 flex justify-between items-center ">
                        <img
                            src="https://img.logoipsum.com/243.svg"
                            className={`overflow-hidden transition-all duration-300 ${expanded ? "w-32" : "w-0"
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
                    overflow-hidden transition-all duration-300 ${expanded ? "w-52 mr-3" : "w-0"}`}>

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



