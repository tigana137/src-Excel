import { ChangeEvent, useEffect, useState } from "react";
import sort_img from '../img/sorting2.png'
import { UseUrl } from "../App";


export interface Eleve {
    id: number;
    uid: number;
    nom_prenom: string;
    nom_pere: string;
    date_naissance: Date | null;
    ecole: string;
    Del1: string;
    level: number | undefined;
    decision: string;
}



const Excel = () => {
    const ngrok = UseUrl();

    const [eleves, set_eleves] = useState<Eleve[]>([]);
    const [ErrorConnection, set_ErrorConnection] = useState(true);

    const [sorted_column, set_sorted_column] = useState("nom");
    const [asc_desc, set_asc_desc] = useState(true);
    const [uid, set_uid] = useState('01');
    const [loading, set_loading] = useState(false)
    const [ErRoR, set_error] = useState(false)

    const handle_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target as HTMLInputElement;
        set_error(false)
        !isNaN(Number(value)) && value.length <= 12 && set_uid(value)

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/testSignal/");
                if (!response.ok) {
                    console.log("!response.ok")
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                if (jsonData === false) {
                    set_ErrorConnection(true)

                }


            } catch (error: unknown) {
                console.log('houni')
                set_ErrorConnection(true)
            }
        };

        fetchData();
    }, [])

    useEffect(() => {

        if (uid.length === 12) {
            const fetchData = async () => {
                try {
                    const response = await fetch(ngrok + "/login_handler/GetElv/" + uid);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const jsonData = await response.json()
                    if (jsonData === false) {
                        set_loading(false)
                        set_error(true)
                    }
                    else {
                        const selectElement = document.getElementById('MainLevel') as HTMLSelectElement;
                        jsonData.level = selectElement.value
                        set_eleves([jsonData, ...eleves]);
                        set_uid('01');
                        set_loading(false)
                    }


                } catch (error: unknown) {
                }
            };

            const orginizer = async () => {
                await fetchData();


            }
            set_loading(true)
            orginizer()

        }

    }, [uid])


    function sortTableData(sortBy: string,) {
        sorted_column === sortBy ? set_asc_desc(!asc_desc) : set_asc_desc(true)
        sorted_column !== sortBy && set_sorted_column(sortBy)

        eleves.sort((a, b) => {
            if (sortBy === "الإسم") {
                return asc_desc ? a.nom_prenom.localeCompare(b.nom_prenom) : b.nom_prenom.localeCompare(a.nom_prenom);
            }
            else if (sortBy === "اللقب") {
                return asc_desc ? a.nom_pere.localeCompare(b.nom_pere) : b.nom_pere.localeCompare(a.nom_pere);
            }
            else if (sortBy === "المعرف الوحيد") {
                return asc_desc ? a.uid - b.uid : b.uid - a.uid;
            }
            else if (sortBy === "يذهب إلى قسم") {
                const A_next_class = a.level ?? 0;
                const B_next_class = b.level ?? 0;
                return asc_desc ? A_next_class - B_next_class : B_next_class - A_next_class;
            }
            else {
                // Handle other sorting criteria here if needed
                return 0;
            }

        });
        const updatedEleves = eleves.map((eleve) => { return eleve; }
        );
        set_eleves(updatedEleves)
    }


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
                        onClick={() => sortTableData(title)}>
                        <img
                            alt="..."
                            className="inline-block h-3 w-3 "

                            src={sort_img}
                        />
                    </button>}
            </th>
        )
    }

    const handle_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const index = Number(event.target.getAttribute('index-att'));

        //   set_eleves((prevData) => {
        //       return {  
        //           ...prevData,  
        //           [index]: {
        //               ...prevData[index],   
        //               [name]: value,
        //           } 
        //       } 
        //   })
        //const NewElvs = [...eleves]; 
        //NewElvs[index] = {   
        //    ...NewElvs[index],   
        //    [name]: value
        //}
        //set_eleves(NewElvs)  

    }

    const handle_Blur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const index = Number(event.target.getAttribute('index-att'));
        const NewElvs = [...eleves];
        NewElvs[index] = {
            ...NewElvs[index],
            [name]: value
        }
        set_eleves((prev) => NewElvs)
    }
    const reason_array = [
        "",
        "تغيير مقر الإقامة",
        "موافقة المدير",
        "نقلة عمل الولى",
        "له اخ بنفس المدرسة",
        "لديه أخت بالمدرسة",
    ]

    const handle_select_table = (event: ChangeEvent<HTMLSelectElement>) => {

        let { name, value } = event.target;
        let index = String(event.target.getAttribute('index-att'));
        name = name.replace("Select", '')
        // console.log(name)
        // console.log(value)
        // console.log(index)

        const trElement = document.getElementById(index);
        if (trElement) {
            const inputElement = trElement.querySelector('input[name="reason"]');
            if (inputElement instanceof HTMLInputElement) {
                inputElement.value = reason_array[Number(value)];
            }
        }
        //  const NewElvs = [...eleves];
        // NewElvs[index] = {
        //     ...NewElvs[index],
        //     [name]: reason_array[Number(value)]
        // }
        // set_eleves((prev) => NewElvs)
    }


    const TableRow = ({ eleve, hash }: { eleve: Eleve, hash: number }) => {

        return (

            <tr className=" bg-slate-50 hover:bg-slate-400 border-b border-black  h-8" id={String(hash - 1)} >
                <td className="border-x border-black align-middle  text-xs  w-12">
                    <button className="w-full text-center">X</button>
                </td>

                <td className="border-x border-black  align-middle  text-xs  w-7 items-center justify-center">
                    <select className="rounded-xl " name="level" value={eleve.level}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </select>
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-12">
                    {hash}
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    <input className="h-full pr-1 text-center" name="nom_prenom" defaultValue={eleve.nom_prenom} data-info={hash} />
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    {eleve.uid}
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    <input className="h-full pr-1 text-center" name="nom_pere" defaultValue={eleve.nom_pere} index-att={hash - 1} />
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-20">
                    <input className="h-full pr-1 text-center" name="date_naissance" defaultValue={String(eleve.date_naissance)} />
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    <input className="h-full pr-1 text-center" name="ecole" defaultValue={eleve.ecole} />
                </td>

                <td className="border-x border-black  text-center align-middle text-xs  w-40">
                    <div className="flex">
                        <input className="h-6 pr-1 w-32" defaultValue={"المعتمديّة"} />
                        <select className="rounded-xl w-6 mr-0.5 scale-75 " name="level" >
                            <option value={0}></option>
                            <option value={1}>تغيير مقر الإقامة</option>
                            <option value={2}>موافقة المدير</option>
                            <option value={3}>نقلة عمل الولى</option>
                            <option value={4}>له اخ بنفس المدرسة</option>
                            <option value={5}>لديه أخت بالمدرسة</option>
                        </select>
                    </div>
                </td>

                <td className=" border-x border-black  text-center align-middle  text-xs  w-40 ">
                    <div className="flex">
                        <input className="h-6 pr-1 w-32" defaultValue={"لمدرسة المرغوب فيها"} />
                        <select className="rounded-xl w-6 mr-0.5 scale-75 " name="level" >
                            <option value={0}></option>
                            <option value={1}>تغيير مقر الإقامة</option>
                            <option value={2}>موافقة المدير</option>
                            <option value={3}>نقلة عمل الولى</option>
                            <option value={4}>له اخ بنفس المدرسة</option>
                            <option value={5}>لديه أخت بالمدرسة</option>
                        </select>
                    </div>
                </td>

                <td className="border-x border-black  text-center align-middle  text-xs  w-40 ">
                    <div className="flex">
                        <input className="h-6 pr-1 w-32" defaultValue={"المؤيدات"} name="reason" />
                        <select className="rounded-xl w-6 mr-0.5 scale-75 " name="reasonSelect" onChange={handle_select_table} index-att={hash - 1} >
                            <option value={0}></option>
                            <option value={1}>تغيير مقر الإقامة</option>
                            <option value={2}>موافقة المدير</option>
                            <option value={3}>نقلة عمل الولى</option>
                            <option value={4}>له اخ بنفس المدرسة</option>
                            <option value={5}>لديه أخت بالمدرسة</option>
                        </select>
                    </div>
                </td>
                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    <input className="h-full pr-1" name="decision" defaultValue={eleve.decision} />
                </td>
                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    <input className="h-full pr-1" name="comments" />
                </td>

            </tr>
        )
    }


    const [tableCaptured, set_tableCaptured] = useState(false)

    useEffect(() => {

        console.log("tableCaptured : " + tableCaptured)
    }, [tableCaptured])

    const table = document.getElementById('myTable');
    const tableElements = table?.getElementsByTagName('*'); // Get all elements within the table

    // Function to check if an element or its descendants have focus
    function isElementOrDescendantFocused(element: HTMLElement): boolean {
        return element === document.activeElement || element.contains(document.activeElement);
    }

    function handleMouseMove(event: MouseEvent) {
        // Get the target element (where the cursor is)
        const target = event.target as HTMLElement;

        // Check if the target element is not a descendant of the table
        if (table)
            if (!table.contains(target) && !isElementOrDescendantFocused(table)) {
                set_tableCaptured(false);
                console.log('Cursor is neither in the table nor focused on any element within the table.');
                // You can perform actions here when the cursor is outside the table and not focused on any table element.
            }
    }

    useEffect(() => {
        if (tableCaptured) {
            // Add a mousemove event listener to the document
            console.log('addEventListener')
            document.addEventListener('mousemove', handleMouseMove)
        }
        else {
            console.log('removeEventListener')
            document.removeEventListener('mousemove', handleMouseMove)
            set_eleves((prv) => [...prv])
        }

    }, [tableCaptured])



    return (

        <>
            <div className="absolute top-0 w-full h-screen bg-white ">
                <div className="flex flex-col justify-center items-center mt-16" >
                    <div className=" text-3xl font-bold">
                        قرارات مجالس النقل بين المدارس لـالسنة الدراسيّة 2023/2024
                    </div>
                    <div className="flex mt-10 " dir="rtl">

                        <div className=" ml-5">
                            <div className="flex flex-col">


                                <div className="flex">


                                    <span className="text-lg font-semibold">المعرف : </span>

                                    <div className="flex border border-black rounded-xl text-right h-7 mt-0.5">
                                        <input onChange={handle_input} value={uid ? uid : ''} type="text" dir="ltr" autoFocus className="text-right pr-5 w-40  rounded-xl focus:outline-none appearance-none spin-button-hidden" />


                                        <span className="ml-2 mt-0.5 w-4">
                                            {loading && <LoadingIcon />}
                                        </span>
                                    </div>
                                </div>
                                <div className=" h-5">
                                    {ErRoR && <div className=" text-sm ml-5 text-red-600 font-semibold" dir="ltr">لم يتم العثور على المُعرّف</div>}

                                </div>
                            </div>
                        </div>

                        <div className="">
                            <span className="text-lg font-semibold">المستوى : </span>

                            <select className=" border border-black rounded-xl p-0.5 px-1" id="MainLevel">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                        </div>

                    </div>
                    {7070057572}
                    {"--"}
                    {6989001140}
                    <table

                        onFocus={() => { if (!tableCaptured) { set_tableCaptured(true); console.log("capture walla true") } }}
                        
                        className="items-center  bg-transparent border h-min mr-11 mt-10" dir="rtl">
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
                        <tbody id="myTable">
                            {eleves.map((eleve, index) => {
                                return (<TableRow key={index} eleve={eleve} hash={index + 1} />)
                            })}

                        </tbody>

                    </table>

                </div>
                {!ErrorConnection && <> fdeji</>}
            </div>
        </>
    )
}


export default Excel;




const LoadingIcon = () => {

    return (
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mb-1 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
        </svg>
    )
}