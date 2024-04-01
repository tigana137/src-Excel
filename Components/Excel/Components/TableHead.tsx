

const TableHead = ({ title }: { title: string }) => {

    return (
        <th dir="rtl"
            className={
                "sticky align-middle   text-sm font-medium text-center border-x border-black  text-white  "
            }
        >
            <span>
                {title}
            </span>

        </th>
    )
}


export default TableHead;