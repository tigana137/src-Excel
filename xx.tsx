import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getUrl from './useContext/getUrl';

type eleve = [uid: string, nom_prenom: string, nom_pere: string, date_naissance: string, ecole__ministre_school_name: string]
const empty_elv: eleve = ["", "", "", "", "",]

const fetch_elv = () => {

  const nom_elve_input = document.getElementById('nom_eleve') as HTMLInputElement;
  const date_naissance_input = document.getElementById('date-naissance') as HTMLInputElement;

  const nom_elve = nom_elve_input.value
  const date_naissance = date_naissance_input.value

  const url = getUrl();
  if (date_naissance !== "") return axios.get(url + "retrieve/getElv/bydate/" + date_naissance)

  if (nom_elve !== "") return axios.get(url + "retrieve/getElv/byname/" + nom_elve)
}


const set_date_null = () => {
  const date_naissance_input = document.getElementById('date-naissance') as HTMLInputElement;
  date_naissance_input.value = ""
}

const set_name_null = () => {
  const nom_elve_input = document.getElementById('nom_eleve') as HTMLInputElement;
  nom_elve_input.value = ""
}




const XX = () => {


  const { isLoading, data, isError, isFetching, refetch } = useQuery('search_elv', fetch_elv, { enabled: false, cacheTime: 0, onSuccess: () => { set_current_page(1) } })

  let table_totalpage_numbers = 0;
  const [current_page, set_current_page] = useState(0);

  const number_of_rows_each_pagination = 9

  console.log(data)
  const elvs_array = data?.data as eleve[]
  console.log(elvs_array)

  if (data) table_totalpage_numbers = Math.ceil(elvs_array.length / number_of_rows_each_pagination)

  const change_pagination_number = (page_number: number) => {
    console.log(page_number)
    if (page_number <= table_totalpage_numbers) set_current_page(page_number)
  }
  console.log(isFetching)
  return (
    <div className=' w-full h-full bg-sky-100'>


      <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-11/12 h-full">
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900 h-full flex flex-col items-center ">
          <div className="flex flex-col bg-white border border-t-4 w-9/12  border-t-blue-600 border-b-4  border-b-blue-600 shadow-sm rounded-xl  h-24">

            {/* search_card */}
            <div className="p-4 md:p-5 flex space-x-8">


              {/* name_search */}
              <div className="relative pl-5 w-4/6 ">
                <input type="text" className="peer py-3 px-4 ps-12 block w-full bg-gray-100 border  border-transparent rounded-lg text-sm focus:border-blue-600 focus:outline focus:outline-blue-600 disabled:opacity-50 disabled:pointer-events-none" placeholder="اسم التلميذ" id='nom_eleve' />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg className="flex-shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <div className="absolute -inset-y-0  end-0 flex items-center  pe-6  peer-disabled:opacity-50 peer-disabled:pointer-events-none" >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="gray" className="w-4 h-4 ml-2" onClick={set_name_null} >
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>


              {/* date_search */}
              <div className='relative   bg-gray-100  items-center border  border-transparent rounded-lg '>

                <input type="date" className="bg-gray-100 peer block w-400 py-3 pl-10 pr-2 border  border-transparent rounded-lg text-sm focus:border-blue-600 focus:outline focus:outline-blue-600 disabled:opacity-50 disabled:pointer-events-none" id='date-naissance' />

                <div className='absolute -inset-y-0  end-0 flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="gray" className=" w-4 h-4 ml-2 " onClick={set_date_null}>
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
                  </svg>
                </div>

              </div>

              {/* button */}

              <button type="button" className="flex justify-center items-center my-2  w-8 h-8 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={() => refetch()} disabled={isFetching}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 font-bold">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>


            </div>
          </div>


          <div className="flex flex-col mt-10 w-11/12">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                {isFetching &&
                  <div className=' w-full flex items-center justify-center h-80'>
                    <LoadingIcon />
                  </div >
                }
                {elvs_array && <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">


                  {/* table */}

                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 w-11/12">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 w-80">الاسم و اللقب</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 w-20">المعرف الوحيد</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">اسم الأب</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 w-32">تاريخ الولادة</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">المدرسة المرسم بها</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                      {
                        elvs_array.map((eleve, index) => {
                          return index + 1 > (current_page - 1) * number_of_rows_each_pagination && index + 1 <= current_page * number_of_rows_each_pagination ? <TableRow key={eleve[0]} eleve={eleve} /> : null
                        })
                      }

                      {current_page === table_totalpage_numbers && elvs_array.length < table_totalpage_numbers * number_of_rows_each_pagination && [...Array(number_of_rows_each_pagination * table_totalpage_numbers - elvs_array.length)].map((_, index) => (
                        <TableRow key={index} eleve={empty_elv} />
                      ))}

                    </tbody>
                  </table>


                  {/* pagination */}


                  <Pagination_Display table_totalpage_numbers={table_totalpage_numbers} change_pagination_number={change_pagination_number} />


                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XX;




const Pagination_Display = ({ table_totalpage_numbers, change_pagination_number }: { table_totalpage_numbers: number, change_pagination_number: Function }) => {


  return (
    <>
      <hr />
      <div className="py-1 px-4 w-full">
        <nav className="flex items-center space-x-1">

          <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <span aria-hidden="true">«</span>
          </button>

          {[...Array(table_totalpage_numbers)].map((_, index) => (
            <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10" onClick={() => change_pagination_number(index + 1)}>{index + 1}</button>
          ))}

          <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <span aria-hidden="true">»</span>
          </button>

        </nav>
      </div>
    </>
  )
}









const TableRow = ({ eleve }: { eleve: eleve }) => {


  return (
    <>
      <tr className=' h-14'>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 border">{eleve[1]}</td>
        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border  ">{eleve[0]}</td>
        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border w-80 ">{eleve[2]}</td>
        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border  w-32">{eleve[3]}</td>
        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border ">{eleve[4]}</td>
      </tr>
    </>
  )
}



const LoadingIcon = () => {

  return (
    <svg aria-hidden="true" role="status" className="inline w-40 h-40  text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
    </svg>
  )
}