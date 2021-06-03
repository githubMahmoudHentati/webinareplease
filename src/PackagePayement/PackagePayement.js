import React,{useState , useEffect} from 'react';
import WebinairePlease from "../utils/components/WebinairePlease";
import ChoicePackage from "./components/ChoicePackage";
import "./PackagePayement.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import logo from "../assets/logoWebinaireplease.svg"

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

function PackagePayement(){

    return(
        <div className="PackagePayement">
            <Elements stripe={stripePromise}>
          <WebinairePlease logo={logo}>
            <ChoicePackage/>
          </WebinairePlease>
            </Elements>
        </div>
    )

}
export default PackagePayement