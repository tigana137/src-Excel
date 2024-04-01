import { handle_focus } from "../../../functions/handle_focus";






export const handle_MouseDown_Del1 = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, set_eleve_function: Function) => {
    const Del1_str_val = event.currentTarget.getAttribute('val-att');
    const Del1_id_val = event.currentTarget.id;
    event.preventDefault(); // idk why ama hedhi lezmk tzidha bch l handle_focus t5dm

    set_eleve_function('Del1', Del1_str_val);
    await set_eleve_function('Del1_id', Del1_id_val);
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

