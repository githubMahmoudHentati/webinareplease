import React,{useState , useEffect} from 'react';
import WebinairePlease from "../utils/components/WebinairePlease";
import ChoicePackage from "./components/ChoicePackage";
import logo from "../assets/logoWebinaireplease.svg"


function PackagePayement(){

    return(
        <div className="PackagePayement">
          <WebinairePlease logo={logo}>
            <ChoicePackage/>
          </WebinairePlease>
        </div>
    )

}
export default PackagePayement