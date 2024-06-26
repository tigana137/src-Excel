

const Pagination_Display = ({ table_totalpage_numbers, change_pagination_number }: { table_totalpage_numbers: number, change_pagination_number: Function }) => {


    return (
        <>
            <hr />
            <div className="py-1 px-4 w-full">
                <nav className="flex items-center space-x-1">

                    {/* <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              <span aria-hidden="true">«</span>
            </button> */}

                    {[...Array(table_totalpage_numbers)].map((_, index) => (
                        <button key={index} type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10" onClick={() => change_pagination_number(index + 1)}>{index + 1}</button>
                    ))}

                    {/* <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              <span aria-hidden="true">»</span>
            </button> */}

                </nav>
            </div>
        </>
    )
}


export default Pagination_Display
