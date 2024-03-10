import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LevelProp } from "../App";
import { UseLevel, UseUpdatePage } from "../useContext/UseHooks";






const LevelsHandler = ({ children }: { children: ReactNode }) => {

    const navigate = useNavigate();
    const updatePage = UseUpdatePage();
    const currentLevel = UseLevel();

    useEffect(() => {

        const currentPath = (window.location.pathname).slice(7);
        if (["premiere", "deuxieme", "troisieme", "quatrieme", "cinquieme", "sixieme"].includes(currentPath) && currentPath !== currentLevel) {

            updatePage(currentPath)
            navigate('/level/' + currentPath);
        }

    }, [navigate]);



    return (
        <>
            {children}
        </>
    )
}


export default LevelsHandler;
