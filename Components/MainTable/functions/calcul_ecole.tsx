import { LevelStatsType } from "../../../useContext/CityDataContext"





export const nbr_elvs_inLevel = (initial_nbr_elv: number, nbr_leaving: number, nbr_comming: number) => {
    return initial_nbr_elv + nbr_comming - nbr_leaving
}


export const elvs_remainingCapacity = (current_elvs_number: number, nbr_classes: number) => {

    return (33 * nbr_classes) - current_elvs_number

}


export const kethefa = (current_nbr_elvs: number, nbr_classes: number) => {
    return (current_nbr_elvs / nbr_classes).toFixed(1)
}


export const ecole_total_elvs = (sid: number, LevelStatData: LevelStatsType) => {

    let ecole_total_elvs = 0;
    for (let i = 1; i < 7; i++) {
        const lid = Number(String(sid) + String(i))
        const nbr_elvs_ = nbr_elvs_inLevel(LevelStatData[lid].nbr_elvs, LevelStatData[lid].nbr_leaving, LevelStatData[lid].nbr_comming)
        ecole_total_elvs += nbr_elvs_;
    }
    return ecole_total_elvs

}

export const ecole_total_classes = (sid: number, LevelStatData: LevelStatsType) => {

    let ecole_total_classes = 0;
    for (let i = 1; i < 7; i++) {
        const lid = Number(String(sid) + String(i))
        ecole_total_classes += LevelStatData[lid].nbr_classes
    }
    return ecole_total_classes
}

