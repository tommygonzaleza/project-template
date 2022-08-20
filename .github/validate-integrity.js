import fetch from "node-fetch";

async function getSchema(){
    let response = await fetch("https://github.com/4GeeksAcademy/project-template/blob/main/.github/learn-schema.json");
    let learnSchema = await response.json(); 
    return learnSchema
} 
console.log(getSchema())

process.exit(1);