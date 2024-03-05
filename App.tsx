import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import roman_1 from "./img/roman_numbers/roman-numeral-1.svg"
import roman_2 from "./img/roman_numbers/roman-numeral-2.svg"
import roman_3 from "./img/roman_numbers/roman-numeral-3.svg"
import roman_4 from "./img/roman_numbers/roman-numeral-4.svg"
import roman_5 from "./img/roman_numbers/roman-numeral-5.svg"
import roman_6 from "./img/roman_numbers/roman-numeral-6.svg"
import excel_icon from "./img/excel_icon.png"
import search_icon from "./img/search_icon.png"
import historique_icon from "./img/historique_icon.png"
import premiere_no from "./img/premiere_no.png"
import total from "./img/total.png"
import './index.css'

import Excel from './Components/Excel';
import Logins2 from './Components/Logins2';
import Sidebar from './Components/Sidebar';
import MainTable from './Components/MainTable';
import LevelComp from './Components/LevelComp';
import ErrorConComponent from './Components/ErrorConComponent';

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import CityDataContext2Provider from './useContext/useCityDataContext';
import XX from './xx';


declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}


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
    path: 'level/premiere',
    element: <LevelComp />,
    icon: roman_1
  },
  {
    name: "حركة السنوات الثانية",
    path: 'level/deuxieme',
    element: <LevelComp />,
    icon: roman_2
  },
  {
    name: "حركة السنوات الثالثة",
    path: 'level/troisieme',
    element: <LevelComp />,
    icon: roman_3
  },
  {
    name: "حركة السنوات الرابعة",
    path: 'level/quatrieme',
    element: <LevelComp />,
    icon: roman_4
  },
  {
    name: "حركة السنوات الخامسة",
    path: 'level/cinquieme',
    element: <LevelComp />,
    icon: roman_5
  },
  {
    name: "حركة السنوات السادسة",
    path: 'level/sixieme',
    element: <LevelComp />,
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
    name: "search",
    path: '/search',
    element: <XX />,
    icon: search_icon
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


export type LevelArray = {
  nbr_elvs: number,
  nbr_classes: number,
  nbr_leaving: number,
  nbr_comming: number
};


export type School = {
  name: string;
  principal: string;
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


export type LevelProp = "premiere" | "deuxieme" | "troisieme" | "quatrieme" | "cinquieme" | "sixieme";
const levels = ["premiere", "deuxieme", "troisieme", "quatrieme", "cinquieme", "sixieme"]


export const ParamsContext = createContext<ParamsProp>({ sid: 0, school_name: "", saisieprenom: "", saisienom: "", login: "", saisiepasswd: "", mp: '', ecole_url: "" })
export const SwitchContext = createContext<Function>(() => { })
export const transferElvContext = createContext<Function>(() => { })

export const cityIdContext = createContext<number>(0)







'http://localhost:80/'





function App() {
  //const [params, set_params] = useState<ParamsProp>({ sid: 842920, school_name: "", saisieprenom: "", saisienom: "", saisiepasswd: "", login: "", mp: '', ecole_url: "" });
  const [Logins_isVisible, set_InsertSid] = useState(false);



  const [serverError, setServerError] = useState(false);







  const swwitch = () => {
    set_InsertSid(false);
  }



  return (
    <>
      <div className='h-screen w-screen flex bg-indigo-200/75' dir="rtl">

        <Router>

          <Sidebar />

          <CityDataContext2Provider>

            <Routes>
              <Route path="/" element={<MainTable />} />
              <Route path='level/:level' element={<LevelComp />} />
            </Routes>

            <Routes>

              <Route path="SmartExcel" element={<Excel setServerError={setServerError} />} />
            </Routes>

          </CityDataContext2Provider>


          <Routes>

            <Route path="search" element={<XX />} />
          </Routes>
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