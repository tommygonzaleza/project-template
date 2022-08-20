const fs = require("fs");
const path = require("path");

let errors = [];

let schemaPath = path.resolve(__dirname, "./learn-schema.json");
let schema = JSON.parse(fs.readFileSync(schemaPath));

let learnjsonPath = path.resolve(__dirname, "../learn.json");
let learnjson = JSON.parse(fs.readFileSync(learnjsonPath));

schema.forEach(item => {
    let learnItem = learnjson[item.key];
    
    if(item.mandatory){
        console.log(`Checking for the "${item.key}" property...`);
        
        if(!learnItem) {
            errors.push(`learn.json missing "${item.key}" mandatory property.`);
            return;
        }
        
        if(item.max_size && learnItem.length > item.max_size) errors.push(`The "${item.key}" property should have a maximum size of ${item.max_size}`);

        if(item.enum){
            if(typeof learnItem == "object"){
                let valid = true;
                learnItem.forEach(ele => {
                    if(!item.enum.includes(ele)) valid = false;
                });
                if(!valid) errors.push(`The "${item.key}" property (current: ${learnItem}) should be one of the following values: ${item.enum.join(", ")}.`);
            } else if (!item.enum.includes(learnItem.toLowerCase())) errors.push(`The "${item.key}" property (current: ${learnItem}) should be one of the following values: ${item.enum.join(", ")}.`);
        }
        
        if(item.type == "url" && item.allowed_extensions){
            let valid = false;
            item.allowed_extensions.forEach(ele => {
                if(learnItem.split(".").includes(ele)) valid = true;
            })
            if(!valid) errors.push(`The "${item.key}" property should have one of the allowed extensions: ${item.allowed_extensions.join(", ")}.`);
        }

        if(item.max_item_size && learnItem.length > item.max_item_size) errors.push(`The "${item.key}" property has more items than allowed (${item.max_item_size}).`);
    }
});

if(errors.length > 0){
    errors.forEach((err, i) => console.log(`${i+1}) ${err}`))
    process.exit(1);
} else {
    console.log("✓ The integrity of the project is perfect!")
}