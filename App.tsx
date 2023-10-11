import { useContext, useState } from 'react';
import './index.css'

import React from 'react';
import Logins from './Components/Logins';
import Excel4 from './Components/Excel4';
import Logins2 from './Components/Logins2';

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
const SwitchContext = React.createContext<Function>(() => { })

const UrlContext = React.createContext<string>('http://xzy.pagekite.me/')

export const UseParams = () => {
  return useContext(ParamsContext)
}

export const UseUrl = () => {
  return useContext(UrlContext)
}

export const UseSwitch = () => {
  return useContext(SwitchContext)
}


function App() {
  const [params, set_params] = useState<ParamsProp>({ sid: 842920, school_name: "", saisieprenom: "", saisienom: "", saisiepasswd: "", login: "", mp: '', ecole_url: "" });
  const [Logins_isVisible, set_InsertSid] = useState(true);
  const [Excel_isVisible, set_Excel] = useState(false);

  const swwitch = () => {
    set_InsertSid(false);
    set_Excel(true);
  }


  return (
    <>
      <SwitchContext.Provider value={swwitch}>
        {Logins_isVisible && <Logins2 />}
        {Excel_isVisible && <Excel4 />}
      </SwitchContext.Provider>
    </>
  )

}



export default App
