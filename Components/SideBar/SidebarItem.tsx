import { Link, } from "react-router-dom"
import { pageProp } from "../../App"





export const SidebarItem = ({ page, active, expanded, index, set_active_funct }: { page: pageProp, active: boolean, expanded: boolean, index: number, set_active_funct: Function }) => {


    return (
        <Link to={page.path} onClick={() => set_active_funct(index)}  >
            <li
                className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${active
                        ? " bg-blue-600 text-white"
                        : "hover:bg-blue-100 text-gray-600"}`}>

                {<page.icon active={active} />}

                <span className={`overflow-hidden transition-all duration-300 h-10 flex truncate  pt-1  items-center ${expanded ? "w-44 mr-3 " : "w-0"}`} >
                    {page.name}
                </span>


                {!expanded && (
                    <div className={`
                    absolute right-full rounded-md px-2 py-1 mr-6 w-max z-40
                    bg-blue-100 text-blue-700 text-sm
                    invisible opacity-20 -translate-x-3 transition-all duration-300
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {page.name}
                    </div>
                )}
            </li >
        </Link>
    )
}