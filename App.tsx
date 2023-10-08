import { useContext, useState } from 'react';
import './index.css'

import React from 'react';
import Logins from './Components/Logins';
import Excel4 from './Components/Excel4';

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

const ParamsContext = React.createContext<ParamsProp>({ sid: 0, school_name: "", saisieprenom: "", saisienom: "", login: "", saisiepasswd: "", mp: '', ecole_url: "" })
const UrlContext = React.createContext<string>('http://xzy.pagekite.me/')

export const UseParams = () => {
  return useContext(ParamsContext)
}

export const UseUrl = () => {
  return useContext(UrlContext)
}


function App() {
  const [params, set_params] = useState<ParamsProp>({ sid: 842920, school_name: "", saisieprenom: "", saisienom: "", saisiepasswd: "", login: "", mp: '', ecole_url: "" });
  const [Logins_isVisible, set_InsertSid] = useState(false);
  const [Excel_isVisible, set_Excel] = useState(true);




  return (
    <>
      <ParamsContext.Provider value={params}>
        {Logins_isVisible && <Logins />}
        {Excel_isVisible && <Excel4 />}
      </ParamsContext.Provider>
    </>
  )

}



export default App
