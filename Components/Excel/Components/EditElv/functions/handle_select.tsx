import { handle_focus } from "../../../functions/handle_focus";






export const handle_MouseDown_Del1 = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, set_eleve_function: Function) => {
    const value = event.currentTarget.getAttribute('val-att');
    event.preventDefault(); // idk why ama hedhi lezmk tzidha bch l handle_focus t5dm

    await set_eleve_function('Del1', value);
    handle_focus('Del1')

}


export const handle_MouseDown_reason = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, set_eleve_function: Function) => {
    const value = event.currentTarget.getAttribute('val-att');
    event.preventDefault(); // idk why ama hedhi lezmk tzidha bch l handle_focus t5dm

    await set_eleve_function('reason', value);
    handle_focus('reason')

}

export const handle_MouseDown_decision = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, set_eleve_function: Function) => {
    const value = event.currentTarget.getAttribute('val-att');
    event.preventDefault(); // idk why ama hedhi lezmk tzidha bch l handle_focus t5dm

    await set_eleve_function('decision', value);
    handle_focus('decision')

}

