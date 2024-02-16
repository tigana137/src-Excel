


export const handle_focus = (current_element: string) => {
    if (current_element === 'uid') {
        const input = document.getElementById("uid") as HTMLInputElement;
        //   input.focus();
        input.focus();
    }
    else if (current_element === '') {
        const input = document.querySelector('input[name="level"]') as HTMLInputElement;
        //   input.focus();
        input.select();
    }
    else if (current_element === 'level') {
        const input = document.querySelector('input[name="Del1"]') as HTMLInputElement;
        //   input.focus();
        input.select();
    }
    else if (current_element === 'Del1') {
        const input = document.querySelector('input[name="next_ecole"]') as HTMLInputElement;
        // input.focus();
        input.select();
    }
    else if (current_element === 'next_ecole') {
        const input = document.querySelector('input[name="reason"]') as HTMLInputElement;
        // input.focus();
        input.select();
    }
    else if (current_element === 'reason') {
        const submitButton = document.getElementById("Submit") as HTMLButtonElement;
        // input.focus();
        submitButton.focus();
    }
    else if (current_element === 'comments') {
        const submitButton = document.getElementById("Submit") as HTMLButtonElement;
        // input.focus();
        submitButton.focus();
    }
    else if (current_element === 'decision') {
        const submitButton = document.getElementById("Submit") as HTMLButtonElement;
        // input.focus();
        submitButton.focus();
    }
    else if (current_element === 'manual') {
        const input = document.querySelector('input[name="nom_prenom"]') as HTMLInputElement;
        input.focus();
    }
    else if (current_element === 'nom_prenom') {
        const input = document.querySelector('input[name="nom_pere"]') as HTMLInputElement;
        input.focus();
    }
    else if (current_element === 'nom_pere') {
        const input = document.querySelector('input[name="date_naissance"]') as HTMLInputElement;
        input.focus();
    }
    else if (current_element === 'date_naissance') {
        const input = document.querySelector('input[name="prev_ecole"]') as HTMLInputElement;
        input.focus();
    }
    else if (current_element === 'prev_ecole') {
        const input = document.querySelector('input[name="Del1"]') as HTMLInputElement;
        input.select();
    }

}