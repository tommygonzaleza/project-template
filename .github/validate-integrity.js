const { readFile } = require('node:fs');

readFile("../workflows/validate-integrity.yml", (err, content) => {
    if(err)console.log(err)
    console.log(content)
})

process.exit();