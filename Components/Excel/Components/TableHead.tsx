

const TableHead = ({ title }: { title: string }) => {

    return (
        <th dir="rtl"
            className={
                "sticky align-middle  text-xs font-normal text-center border-x border-black  "
            }
        >
            <span>
                {title}
            </span>

        </th>
    )
}


export default TableHead;