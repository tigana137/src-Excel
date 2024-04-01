import LevelsTable from './LevelsTable';





const CollapsableRow = ({ sid, principal }: { sid: number; principal: string; }) => {



    return (

        <tr className=" animate-fade  z-10 "  >
            <td className=" bg-transparent outline-none border-none shadow-none " />
            <td colSpan={5} className=" shadow-sm  border-none rounded-b-xl  overflow-hidden bg-white " >
                <div className=' w-full flex justify-center'>
                    <hr className=' w-11/12   border-t-4 rounded-xl' />
                </div>
                <div className="pb-5  bg-white pt-2  shadow-lg rounded-b-xl">
                    <div className="flex ">
                        <div className="w-1/2 pr-3">
                            <span>مدير المدرسة :  </span>
                            <span>{principal}</span>
                        </div>
                        <div className="w-1/2 text-left pl-3">
                            <span>رمز المدرسة :</span>
                            <span>{sid}</span>
                        </div>
                    </div>
                    <div className=" text-xl mr-5 mt-3 mb-2 ">
                        حركة كل مستوى
                    </div>
                    <div className=" w-full flex justify-center mb-5 ">
                        <table className=" w-11/12 ">

                            <thead className=" ">
                                <tr>
                                    <th>
                                        المستوى
                                    </th>
                                    <th>
                                        عدد التلاميذ بـ30أوت
                                    </th>
                                    <th>
                                        حاصل الحركة
                                    </th>
                                    <th>
                                        عدد الفصول
                                    </th>
                                    <th>
                                        الكثافة
                                    </th>
                                    <th>
                                        الزيادة/ النقصان
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr className="  h-2  border-b border-gray-400"></tr>
                                {[...Array(6)].map((_, index) => {
                                    return <LevelsTable key={index} lid={Number(String(sid) + String(index + 1))} index={index} />
                                })}

                            </tbody>


                        </table>
                    </div>
                </div>
            </td>
        </tr>

    )
}

export default CollapsableRow
