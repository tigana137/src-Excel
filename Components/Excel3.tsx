





const Excel3 = () => {

    class CustomRowComponent {
        private rowElement: HTMLTableRowElement;
        private inputElement: HTMLInputElement;


        private add_ww = (constructor: object, initialValue: string) => {
            this.inputElement = document.createElement('input');
            this.inputElement.type = 'text';
            this.inputElement.className = 'editable';
            this.inputElement.classList.add(
                "bg-slate-50", "hover:bg-slate-400", "border-b", "border-black", "h-8"
            );
            this.inputElement.value = initialValue;
            const cell = document.createElement('td');
            cell.appendChild(this.inputElement);
            this.rowElement.appendChild(cell);

            this.inputElement.addEventListener('blur', this.updateArray.bind(this));
            console.log('t5al')
        }


        constructor(initialValue: string) {
            this.rowElement = document.createElement('tr');
            this.rowElement.classList.add(
                'bg-slate-50',
                'hover:bg-slate-400',
                'border-b',
                'border-black',
                'h-8'
            );
            this.add_ww(this, initialValue)



            this.inputElement = document.createElement('input');
            this.inputElement.type = 'text';
            this.inputElement.className = 'editable';
            this.inputElement.value = initialValue;

            const cell2 = document.createElement('td');
            cell2.appendChild(this.inputElement);
            this.rowElement.appendChild(cell2);

            this.inputElement.addEventListener('blur', this.updateArray.bind(this));
        }

        private updateArray(event: Event) {
            const newValue = (event.target as HTMLInputElement).value;
            // Perform the necessary action to update your array with the new value
            console.log(newValue); // Replace with your actual update logic
        }

        getRowElement(): HTMLTableRowElement {
            return this.rowElement;
        }
    }

    // Function to add a new custom row component to the table
    function addCustomRow() {
        const newRowValue = 'sqdqsd'; // Initial value for the new row's input

        const customRow = new CustomRowComponent(newRowValue);
        const dataTable = document.getElementById('data-table') as HTMLTableElement;
        dataTable.appendChild(customRow.getRowElement());
    }


    return (
        <>

            <div id="xx">
                <table id="data-table" className="items-center  bg-transparent border h-min mr-11 mt-10" dir="rtl">

                    <thead dir="rtl" className=" h-6 border border-black bg-sky-400">
                        <tr>
                            <Threads title={""} />
                            <Threads title={"المستوى"} />
                            <Threads title={"ع/ر"} />
                            <Threads title={"التلميذ(ة)"} />
                            <Threads title={"المعرف الوحيد"} />
                            <Threads title={"اسم الأب"} />
                            <Threads title={"تاريخ الولادة"} />
                            <Threads title={"المدرسة المسجل بها ويرغب في مغادرتها"} />
                            <Threads title={"المعتمديّة"} />
                            <Threads title={"المدرسة المرغوب فيها"} />
                            <Threads title={"المؤيدات"} />
                            <Threads title={"قرار اللجنة"} />
                            <Threads title={"ملاحظات"} />

                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
                <button id='add-row-button' onClick={addCustomRow}>Add Row</button>
            </div>
        </>
    )
}



export default Excel3;



const Threads = ({ title }: { title: string }) => {

    return (
        <th dir="rtl"
            className={
                " align-middle  text-xs font-normal text-center  border border-black "
            }
        >
            <span>
                {title}
            </span>
            {title !== "ع/ر" && title !== "" &&
                <button className=' mr-2'
                    onClick={() => { }}>
                    <img
                        alt="..."
                        className="inline-block h-3 w-3 "


                    />
                </button>}
        </th>
    )
}
