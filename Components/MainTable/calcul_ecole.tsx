import { School } from "../../App"





export const nbr_elvs_inLevel = (initial_nbr_elv: number, nbr_leaving: number, nbr_comming: number) => {
    return initial_nbr_elv + nbr_comming + nbr_leaving
}

export const elvs_remainingCapacity = (current_elvs_number: number, nbr_classes: number) => {

    return (33 * nbr_classes) - current_elvs_number

}


export const kethefa = (current_nbr_elvs: number, nbr_classes: number) => {
    return (current_nbr_elvs / nbr_classes).toFixed(1)
}


export const ecole_total_elvs = (ecole: School) => {
    const nbr_elvs_1 = nbr_elvs_inLevel(ecole.premiere.nbr_elvs, ecole.premiere.nbr_leaving, ecole.premiere.nbr_comming)
    const nbr_elvs_2 = nbr_elvs_inLevel(ecole.deuxieme.nbr_elvs, ecole.deuxieme.nbr_leaving, ecole.deuxieme.nbr_comming)
    const nbr_elvs_3 = nbr_elvs_inLevel(ecole.troisieme.nbr_elvs, ecole.troisieme.nbr_leaving, ecole.troisieme.nbr_comming)
    const nbr_elvs_4 = nbr_elvs_inLevel(ecole.quatrieme.nbr_elvs, ecole.quatrieme.nbr_leaving, ecole.quatrieme.nbr_comming)
    const nbr_elvs_5 = nbr_elvs_inLevel(ecole.cinquieme.nbr_elvs, ecole.premiere.nbr_leaving, ecole.premiere.nbr_comming)
    const nbr_elvs_6 = nbr_elvs_inLevel(ecole.sixieme.nbr_elvs, ecole.sixieme.nbr_leaving, ecole.sixieme.nbr_comming)

    return nbr_elvs_1 + nbr_elvs_2 + nbr_elvs_3 + nbr_elvs_4 + nbr_elvs_5 + nbr_elvs_6

}

export const ecole_total_classes = (ecole: School) => {

    return ecole.premiere.nbr_classes + ecole.deuxieme.nbr_classes + ecole.troisieme.nbr_classes + ecole.quatrieme.nbr_classes + ecole.cinquieme.nbr_classes + ecole.sixieme.nbr_classes

}

