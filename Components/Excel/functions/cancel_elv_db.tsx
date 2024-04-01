import { Eleve } from "../Excel";






export const transfer_elv_db = (eleve: Eleve, ngrok: string) => {


    const SendData = async () => {
        try {
            const response = await fetch(ngrok + "excel/transferElv/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eleve)
            });

            if (!response.ok) {
                // Handle non-successful responses if needed
                throw new Error('Network response was not ok.');
                return false
            }

            const data = await response.json();
            if (data.response === true) return true
            return false

        } catch (error) {
            console.error(error);
            return false
        }
    }

    return SendData();

}


export const cancel_elv_db = (eleve: Eleve, ngrok: string) => {

    const SendData = async () => {
        try {
            const response = await fetch(ngrok + "excel/cancel_transferElv/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eleve)
            });

            if (!response.ok) {
                // Handle non-successful responses if needed
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            return data.response;

        } catch (error) {
            console.error(error);
        }
    }

    return SendData();
}