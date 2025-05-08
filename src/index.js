import "./styles.css";
import { getStructuredData } from "./weatherAPI";
import "./inputControl.js"

getStructuredData("belgrade").then((structuredData)=>{
    console.log(structuredData);
})


