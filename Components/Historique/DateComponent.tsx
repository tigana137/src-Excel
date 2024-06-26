import { HistoryProps } from "./Historique"

// zid l download l kol date

const DateComponent = ({ date_info }: { date_info: HistoryProps }) => {
    const arabic_months = ["", 'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي',
        'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']

    const year_number = date_info[0].substring(0, 5);
    const month_number = Number(date_info[0].substring(5, 7));
    const day_number = date_info[0].substring(8, 10)

    return (
        <>
            {year_number}--{arabic_months[month_number]}--
            <div>{day_number}</div>
        </>
    )
}

export default DateComponent
