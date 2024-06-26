
const Thead = () => {
    return (
        <>
            <thead className="sticky top-0 text-xs text-white bg-blue-600 bg h-14 ">
                <tr className=" text-sm font-medium">

                    <th scope="col" className="px-6 py-3   w-64">
                        المدرسة
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                        التلاميذ بـ30أوت
                    </th>
                    <th scope="col" className="px-6 py-3">
                        مغادرون
                    </th>
                    <th scope="col" className="px-6 py-3">
                        وافدون
                    </th>
                    <th scope="col" className="px-6 py-3">
                        حاصل الحركة
                    </th>
                    <th scope="col" className="px-6 py-3">
                        عدد الفصول
                    </th>
                    <th scope="col" className="px-6 py-3">
                        الكثافة
                    </th>
                    <th scope="col" className="px-6 py-3">
                        الزيادة/النقصان
                    </th>
                    <th scope="col" className="px-6 py-3 text-left w-fit">
                    تحيين المعطيات
                    </th>

                </tr>
            </thead>
        </>
    )
}

export default Thead
