import { useEffect, useState } from "react";
import { UseUrl } from "../App";







const Logins = () => {


    const [isLoading, setIsLoading] = useState(true);
    const ngrok = UseUrl();
    const [imageData, set_image] = useState("")

    const [code, set_code] = useState("");
    const [error_IsNaN, set_error_IsNaN] = useState(false)
    const [error_code, set_error_code] = useState(false)
    const [Enable_buttons, set_buttons] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/GetCapatcha/");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                set_image(jsonData.image_data);
            } catch (error: unknown) {
            }
        };



        const orginizer = async () => {
            await fetchData();

            setIsLoading(false)
        }

        orginizer()





    }, [])
    useEffect(() => {
        if (imageData !== "") {
            displayImage(imageData)
        }
    }, [imageData])


    function displayImage(base64ImageData: string) {
        const imageElement = document.getElementById('imageElement') as HTMLImageElement;

        // Set the source of the image element with the base64 data
        imageElement.src = `data:image/jpeg;base64,${base64ImageData}`;
    }

    const handle_input_id = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        if (!isNaN(Number(value))) {
            set_error_IsNaN(false)
            set_error_code(false)
            set_code(value)

        }
        else {
            set_error_IsNaN(true)
        }
    }

    const handle_click = async () => {
        const SendCode = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/VerifyCapatcha/" + code);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                if (!jsonData){
                    set_error_code(true)
                }
            } catch (error: unknown) {
            }
        };


        set_buttons(false)
        await SendCode();
        set_buttons(true)

    }



    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="absolute top-0 w-full h-screen bg-slate-900/75 ">
                <div className=" flex flex-col w-full justify-center items-center mt-16 w-fit bg-white">
                    <div className="font-semibold text-4xl text-blueGray-700">
                        : الرجاء ادخال الرمز التالي
                    </div>
                    {imageData !== "" && <img className=" mt-10" id="imageElement" src="" alt="Image" />}
                    <div className=" flex mt-10" dir="rtl">
                        <input type="text"
                            className=" bg-slate-200  border border-black text-center autofocus px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            autoFocus
                            onKeyUp={handle_input_id}

                        />
                        <button className={"flex items-center justify-center text-white bg-green-800/75  font-medium rounded-lg text-sm  mr-2 mb-2 w-32 h-11 transition-transform " + (Enable_buttons && 'hover:bg-green-700 outline-none focus:ring-4 shadow-lg transform active:scale-75 ') + (!Enable_buttons && ' ')}
                            disabled={!Enable_buttons} onClick={handle_click}>
                            {!Enable_buttons ?
                                <div className='ml-2 '>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                    </svg>
                                </div>
                                : "دخول"}
                        </button>
                    </div>
                    {error_IsNaN && <div dir="rtl" className=" text-center text-red-500 pt-3">يجب على الرمز أن يحتوي على أرقام فقط</div>}
                    {error_code && <div dir="rtl" className=" text-center text-red-500 pt-3">رمز خاطأ الرجاء التثبت</div>}

            
                </div>
                heyyy
                

            </div>
        </>
    )
}


export default Logins;





const Loading = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen ">
                <div className="mb-4 w-32 h-32 w border-t-4 border-blue-500 rounded-full animate-spin">
                </div>
                <div>
                    Loading
                </div>
            </div>
        </>
    )
}

//        {error_sid && <div dir="rtl" className=" text-center text-red-500 pt-3">رمز خاطأ الرجاء التثبت</div>}