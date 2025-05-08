import { getStructuredData } from "./weatherAPI";

const input = document.querySelector("input");

input.addEventListener("keyup", (event)=>{
    if(event.key === 'Enter'){
        const location = input.value;
        getStructuredData(location)
        .then((structuredData)=>{
            console.log(structuredData);
        })
    }
})