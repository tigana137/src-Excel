import { useContext } from "react"
import { ParamsContext, SwitchContext, transferElvContext } from "../App"

export const UseParams = () => {
  return useContext(ParamsContext)
}

export const UseSwitch = () => {
  return useContext(SwitchContext)
}

export const Usetransfer_elv = () => {
  return useContext(transferElvContext)
}
