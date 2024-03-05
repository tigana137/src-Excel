import download_img from '../../../img/download.png';


const DownloadExcelCom = ({ downloadexcel }: { downloadexcel: Function }) => {


    return (
        <>
            <div className=" text-3xl font-bold">


                <button className="absolute hover:animate-bounce top-20 left-20 hover:scale-125 transition-transform outline outline-1 border-black rounded-full  " id="Download" onClick={() => downloadexcel()}>
                    { //    <svg className="w-7 h-7 text-gray-800 dark:text-white  py-0.5 px-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                        //       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                        //   </svg>
                    }
                    <img src={download_img} className="w-7 h-7 text-gray-800 dark:text-white  py-0.5 px-1.5" />
                    <div></div>
                </button>

            </div>

        </>
    )
}


export default DownloadExcelCom;

