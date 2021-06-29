import React from 'react';
import { Link } from 'react-router-dom';
import WebinairePlease from "./WebinairePlease";
import logo from "../../assets/logoWebinaireplease.svg"

const Error = () =>{

    return(
        <WebinairePlease logo={logo}>
        <div className={"Default_Page"}>
            <span className="icon-404 icon404"></span>
            <h2>oops! Page non trouvée</h2>
            <p>La page que vous tentez d’afficher n’existe pas<br/>
                vous pouvez revenir à la page d’accueil</p>
            <Link to='/connexion' className='btn'>
                Accueil
            </Link>
        </div>
        </WebinairePlease>
    );
}

export default Error