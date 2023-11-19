import { useState, useEffect } from "react";
import { UseSwitch, UseUrl } from "../App";
import img from "./../img/2.jpg"
import img2 from "./../img/xp2.png"


const Logins2 = () => {

    const [isLoading, setIsLoading] = useState(false);  // ~
    const ngrok = UseUrl();
    const go_to_main = UseSwitch();
    const [imageData, set_image] = useState<string>();

    const [code, set_code] = useState("");
    const [error_IsNaN, set_error_IsNaN] = useState(false)
    const [error_code, set_error_code] = useState(false)
    const [Enable_buttons, set_buttons] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ngrok + "GetCapatcha/");
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

       // orginizer()   ~~





    }, [])

    
    useEffect(() => {
        if (imageData)
            displayImage(imageData)

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
                const response = await fetch(ngrok + "VerifyCapatcha/" + code);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                if (!jsonData) {
                    set_error_code(true)
                }
            } catch (error: unknown) {
            }
        };

        set_buttons(false)
        // await SendCode();
        set_buttons(true)
        go_to_main()

    }



    if (isLoading) {
        return <Loading />
    }





    return (
        <>
            <div className="absolute top-0  w-full h-full ">
                <img className="absolute inset-0 z-0 h-full w-full object-cover"
                    src={img}
                />

                <div className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4  ">
                    <div className=" flex justify-center">

                        <div className="aboslute flex justify-center items-center inset-0 translate-y-20 w-11/12  h-28 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-600 bg shadow-xl rounded-xl">
                            <div className="text-white text-center text-4xl font-semibold pr-5">Smart Sheet</div>
                            <img src={img2} className=" w-12 h-12 " />
                        </div>
                    </div>

                    <div className="max-w-sm p-6 pt-28 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 "
                        style={{ height: "497px" }}>

                        <div className="items-center border-b focus-within:border-teal-500 py-2 mb-7 mt-2">
                            <input autoComplete="off" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="اسم المستعمل" name="nom" />
                        </div>

                        <div className="items-center border-b  py-2 focus-within:border-teal-500 mb-7 ">
                            <input autoComplete="off" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="كلمة السرّ" name="mdp" />
                        </div>

                        <div className="flex mb-20 py-2 " >
                            <div className="items-center border-b focus-within:border-teal-500 w-1/2 mr-4 ">
                                <input autoComplete="off" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="الرمز" name="securite" onKeyUp={handle_input_id} />
                            </div>
                            {imageData && <img className=" " id="imageElement" src="" alt="Image" />}
                        </div>

                        <div className=" flex w-full  justify-center ">

                            <button id="Submit" type="button" className="text-white bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-600  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-500 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-60 h-12"
                                onClick={handle_click}>
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

                    </div>


                </div>


            </div>
        </>
    )
}

export default Logins2;





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