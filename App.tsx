import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import './index.css'

import Excel from './Components/Excel/Excel';
import Logins2 from './Components/Logins2';
import Sidebar from './Components/SideBar/Sidebar';
import MainTable from './Components/MainTable/MainTable';
import ErrorConComponent from './Components/ErrorConComponent';

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import Search from './Components/Search/Search';
import { CityDataContextProvider } from './useContext/CityDataContext';
import LevelComp from './Components/LevelComp/LevelComp';
import { MainTableSVG, SmartExcelSVG, historique_iconSVG, roman_1SVG, roman_2SVG, roman_3SVG, roman_4SVG, roman_5SVG, roman_6SVG, searchSVG } from './lib/Svgs';
import EditSchoolNumbers from "./Components/LevelComp/Components/EditSchoolNumbers";
import QuillComponent from './Components/Quill/Quill';
import Historique from './Components/Historique/Historique';
import axios from 'axios';
import getUrl from './useContext/getUrl';


declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}


export type pageProp = {
  name: string;
  path: string;
  element: JSX.Element;
  icon: ({ active }: { active: boolean; }) => JSX.Element;
}

export const pages: pageProp[] = [
  {
    name: "احصاء جميع المدارس",
    path: '/',
    element: <MainTable />,
    icon: MainTableSVG
  },
  {
    name: "حركة السنوات الأولى",
    path: '/level/premiere',
    element: <LevelComp />,
    icon: roman_1SVG
  },
  {
    name: "حركة السنوات الثانية",
    path: '/level/deuxieme',
    element: <LevelComp />,
    icon: roman_2SVG
  },
  {
    name: "حركة السنوات الثالثة",
    path: '/level/troisieme',
    element: <LevelComp />,
    icon: roman_3SVG
  },
  {
    name: "حركة السنوات الرابعة",
    path: '/level/quatrieme',
    element: <LevelComp />,
    icon: roman_4SVG
  },
  {
    name: "حركة السنوات الخامسة",
    path: '/level/cinquieme',
    element: <LevelComp />,
    icon: roman_5SVG
  },
  {
    name: "حركة السنوات السادسة",
    path: '/level/sixieme',
    element: <LevelComp />,
    icon: roman_6SVG
  },
  {
    name: "Smart Excel",
    path: '/SmartExcel',
    element: <></>,
    icon: SmartExcelSVG
  },
  {
    name: "اعتراضات السنة الأولى",
    path: '/qsd',
    element: <></>,
    icon: SmartExcelSVG
  },
  {
    name: "البحث عن تلميذ",
    path: '/search',
    element: <Search />,
    icon: searchSVG
  },
  {
    name: "الأرشيف",
    path: '/historique',
    element: <></>,
    icon: historique_iconSVG
  },


]

export type ParamsProp = {
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


function App() {
  //const [params, set_params] = useState<ParamsProp>({ sid: 842920, school_name: "", saisieprenom: "", saisienom: "", saisiepasswd: "", login: "", mp: '', ecole_url: "" });



  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const url = getUrl();
    const ff = async () => {

      const response = await axios.get(url + "x/testSignal/");
      if (response.data) setServerError(true)
    }

    ff()
  }, [])





  return (
    <>
      <div className='h-screen w-screen flex bg-slate-300 ' dir="rtl">

        <Router>

          <Sidebar />

          <CityDataContextProvider>
            <CityDataContextProvider>

              <Routes >
                <Route path="/" element={<MainTable />} />
                <Route path='level/:level' element={<LevelComp />} >
                  <Route path='edit/:sid' element={<EditSchoolNumbers />} />
                </Route>
                <Route path="SmartExcel" element={<Excel setServerError={setServerError} />} />
                <Route path="search" element={<Search />} />
                <Route path="historique" element={<Historique />} />

              </Routes>

            </CityDataContextProvider>
          </CityDataContextProvider>


        </Router>


        {/* <SwitchContext.Provider value={swwitch}>

          {Logins_isVisible && <Logins2 />}

        </SwitchContext.Provider> */}
      </div >
      {serverError && <ErrorConComponent />}
    </>
  )

}



export default App;




// zid 7ot l server error f kol w7da o5rin tb3th fihom requette 