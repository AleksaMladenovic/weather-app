import "./styles.css";
import { getStructuredData } from "./weatherAPI";
import "./inputControl.js"
import { displayData } from "./displayingData.js";
import "./animationDivControls.js"

getStructuredData("belgrade").then((structuredData)=>{
    console.log(structuredData);
    displayData(structuredData);
})


