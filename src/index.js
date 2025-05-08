import "./styles.css";
import { getStructuredData } from "./weatherAPI";

getStructuredData("belgrade").then((structuredData)=>{
    console.log(structuredData);
})


