import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import roman_1 from "./img/roman_numbers/roman-numeral-1.svg"
import roman_2 from "./img/roman_numbers/roman-numeral-2.svg"
import roman_3 from "./img/roman_numbers/roman-numeral-3.svg"
import roman_4 from "./img/roman_numbers/roman-numeral-4.svg"
import roman_5 from "./img/roman_numbers/roman-numeral-5.svg"
import roman_6 from "./img/roman_numbers/roman-numeral-6.svg"
import excel_icon from "./img/excel_icon.png"
import historique_icon from "./img/historique_icon.png"
import premiere_no from "./img/premiere_no.png"
import total from "./img/total.png"
import './index.css'

import Excel4 from './Components/Excel';
import Logins2 from './Components/Logins2';
import Sidebar from './Components/Sidebar';
import MainTable from './Components/MainTable';
import LevelComp from './Components/LevelComp';
import ErrorConComponent from './Components/ErrorConComponent';

export type pageProp = {
  name: string;
  path: string;
  element: JSX.Element;
  icon: string;
}

export const pages: pageProp[] = [
  {
    name: "احصاء جميع المدارس",
    path: '/',
    element: <MainTable />,
    icon: total
  },
  {
    name: "حركة السنوات الأولى",
    path: 'premiere',
    element: <LevelComp level="premiere" />,
    icon: roman_1
  },
  {
    name: "حركة السنوات الثانية",
    path: 'deuxieme',
    element: <LevelComp level="deuxieme" />,
    icon: roman_2
  },
  {
    name: "حركة السنوات الثالثة",
    path: 'troisieme',
    element: <LevelComp level="troisieme" />,
    icon: roman_3
  },
  {
    name: "حركة السنوات الرابعة",
    path: 'quatrieme',
    element: <LevelComp level="quatrieme" />,
    icon: roman_4
  },
  {
    name: "حركة السنوات الخامسة",
    path: 'cinquieme',
    element: <LevelComp level="cinquieme" />,
    icon: roman_5
  },
  {
    name: "حركة السنوات السادسة",
    path: 'sixieme',
    element: <LevelComp level="sixieme" />,
    icon: roman_6
  },
  {
    name: "Smart Excel",
    path: 'SmartExcel',
    element: <></>,
    icon: excel_icon
  },
  {
    name: "اعتراضات السنة الأولى",
    path: '/',
    element: <></>,
    icon: premiere_no
  },
  {
    name: "historique",
    path: '/',
    element: <></>,
    icon: historique_icon
  },

]

export interface ParamsProp {
  sid: number,
  school_name: string,
  saisieprenom: string,
  saisienom: string,
  saisiepasswd: string,
  login: string,
  mp: string,
  ecole_url: string,

}

export type LevelArray = [nbr_elvs: number, nbr_classes: number, nbr_leaving: number, nbr_comming: number];

export type LevelProp = "premiere" | "deuxieme" | "troisieme" | "quatrieme" | "cinquieme" | "sixieme";
const levels = ["premiere", "deuxieme", "troisieme", "quatrieme", "cinquieme", "sixieme"]


export type School = {
  name: string;
  nbr_elvs: number;
  nbr_classes: number;
  premiere: LevelArray;
  deuxieme: LevelArray;
  troisieme: LevelArray;
  quatrieme: LevelArray;
  cinquieme: LevelArray;
  sixieme: LevelArray;

};

export type CityData = {
  [del1_id: number]: {
    name: string;
    ecoles: {
      [sid: number]: School;
    };
  };
};

export const ParamsContext = createContext<ParamsProp>({ sid: 0, school_name: "", saisieprenom: "", saisienom: "", login: "", saisiepasswd: "", mp: '', ecole_url: "" })
export const SwitchContext = createContext<Function>(() => { })
export const transferElvContext = createContext<Function>(() => { })

export const updatePageContext = createContext<Function>(() => { })
export const levelContext = createContext<LevelProp>("premiere");
export const cityIdContext = createContext<number>(0)


export const CityDataContext = createContext<CityData>({})

const url = 'https://tigana1.pythonanywhere.com/'
'http://localhost:80/api/'






'http://localhost:80/'

export const UrlContext = createContext<string>(url)




function App() {
  //const [params, set_params] = useState<ParamsProp>({ sid: 842920, school_name: "", saisieprenom: "", saisienom: "", saisiepasswd: "", login: "", mp: '', ecole_url: "" });
  const [Logins_isVisible, set_InsertSid] = useState(false);

  const [data, set_data] = useState<CityData>({});

  const [level, setlevel] = useState<LevelProp>("premiere");

  const [serverError, setServerError] = useState(false);

  const updatePage = (new_level: string) => {
    if (["premiere", "deuxieme", "troisieme", "quatrieme", "cinquieme", "sixieme"].includes(new_level)) {
      const level1: LevelProp = new_level as LevelProp;
      setlevel(level1)

    }

  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(url + "x/getallecolesdata/");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json()

        set_data(jsonData)

      } catch (error: unknown) {
        setServerError(true)

      }
    };

    const orginizer = async () => {
      await fetchData();


    }
    orginizer()


  }, [])


  const swwitch = () => {
    set_InsertSid(false);
  }


  const transfer_elv = (prev_ecole_id: number, next_ecole_id: number, level: number, cancel: boolean) => {
    const niveau: string = levels[level - 1];

    console.log('t5l')
    if (prev_ecole_id !== 0) {

      set_data((prevData) => {

        const del1_id = Math.floor(prev_ecole_id / 100)
        const prev_ecole: School | undefined = prevData[del1_id].ecoles[prev_ecole_id]
        if (!prev_ecole) return prevData


        const prev_ecoleArray: LevelArray = (prevData[del1_id].ecoles[prev_ecole_id] as any)[niveau] as LevelArray;


        return {
          ...prevData,
          [del1_id]: {
            ...prevData[del1_id],
            ecoles: {
              ...prevData[del1_id].ecoles,
              [prev_ecole_id]: {
                ...prevData[del1_id].ecoles[prev_ecole_id],
                [niveau]: !cancel ? [prev_ecoleArray[0], prev_ecoleArray[1], prev_ecoleArray[2] + 1, prev_ecoleArray[3]] : [prev_ecoleArray[0], prev_ecoleArray[1], prev_ecoleArray[2] - 1, prev_ecoleArray[3]]
              },

            },
          }
        }
      });



    }

    if (next_ecole_id !== 0) {

      set_data((prevData) => {

        const del1_id = Math.floor(next_ecole_id / 100)
        const next_ecole: School | undefined = prevData[del1_id].ecoles[next_ecole_id]
        if (!next_ecole) return prevData;


        const next_ecoleArray: LevelArray = (prevData[del1_id].ecoles[next_ecole_id] as any)[niveau] as LevelArray;

        return {
          ...prevData,
          [del1_id]: {
            ...prevData[del1_id],
            ecoles: {
              ...prevData[del1_id].ecoles,
              [next_ecole_id]: {
                ...prevData[del1_id].ecoles[next_ecole_id],
                [niveau]: !cancel ? [next_ecoleArray[0], next_ecoleArray[1], next_ecoleArray[2], next_ecoleArray[3] + 1] : [next_ecoleArray[0], next_ecoleArray[1], next_ecoleArray[2], next_ecoleArray[3] - 1]
              }
            },
          }
        }
      });


    }
  }


  return (
    <>
      <div className='h-screen w-screen flex bg-indigo-200/75' dir="rtl">


        <Router>
          <updatePageContext.Provider value={updatePage}>

            <Sidebar />

            <CityDataContext.Provider value={data}>
              <levelContext.Provider value={level}>

                <Routes>
                  <Route path="/" element={<MainTable />} />

                  <Route path="/premiere" element={<LevelComp level="premiere" />} />
                  <Route path="/deuxieme" element={<LevelComp level="deuxieme" />} />
                  <Route path="/troisieme" element={<LevelComp level="troisieme" />} />
                  <Route path="/quatrieme" element={<LevelComp level="quatrieme" />} />
                  <Route path="/cinquieme" element={<LevelComp level="cinquieme" />} />
                  <Route path="/sixieme" element={<LevelComp level="sixieme" />} />
                </Routes>


              </levelContext.Provider>

              <Routes>

                <Route path="SmartExcel" element={
                  <transferElvContext.Provider value={transfer_elv}>
                    <Excel4 setServerError={setServerError} />
                  </transferElvContext.Provider>
                } />
              </Routes>

            </CityDataContext.Provider>
          </updatePageContext.Provider>

        </Router>


        <SwitchContext.Provider value={swwitch}>

          {Logins_isVisible && <Logins2 />}

        </SwitchContext.Provider>
      </div >
      {serverError && <ErrorConComponent />}
    </>
  )

}



export default App;




// zid 7ot l server error f kol w7da o5rin tb3th fihom requette 