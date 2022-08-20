const fs = require("fs");

fs.readFile("../workflows/validate-integrity.yml", (err, content) => {
    console.log(content)
})

process.exit();