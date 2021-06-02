import React,{useState , useEffect} from 'react';
import WebinairePlease from "../utils/components/WebinairePlease";
import ChoicePackage from "./components/ChoicePackage";

function PackagePayement(){

    return(
        <div className="PackagePayement">
          <WebinairePlease>
            <ChoicePackage/>
          </WebinairePlease>
        </div>
    )

}
export default PackagePayement