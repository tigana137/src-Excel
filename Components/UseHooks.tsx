import { useContext } from "react"
import { ParamsContext, UrlContext, SwitchContext, CityDataContext, levelContext, updatePageContext, transferElvContext } from "../App"

export const UseParams = () => {
  return useContext(ParamsContext)
}

export const UseUrl = () => {
  return useContext(UrlContext)
}

export const UseSwitch = () => {
  return useContext(SwitchContext)
}

export const UseData = () => {
  return useContext(CityDataContext)
}

export const UseUpdatePage = () => {
  return useContext(updatePageContext)
}

export const UseLevel = () => {
  return useContext(levelContext)
}

export const Usetransfer_elv = () => {
  return useContext(transferElvContext)
}
