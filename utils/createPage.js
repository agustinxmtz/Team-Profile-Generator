const fs = require('fs');

// function to write HTML file, it checks to see if the "dist" directory exists and if not, creates it, then writes the HTML to that directory.
const writeToFile = (fileName, data) => {
    return new Promise((resolve, reject) => {
        const dir = "./dist"

        //check to see if the dist directory exists, if not, create it
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, err => {
                if (err) {
                    reject(err);
                    return;
                }
            });  
        }
        //write the index.html file to the ./dist directory
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve ({
                ok: true,
                message: "File created!"
            });
        });
    });
}

const copyStyle = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            //if there is an error, reject the Promise and send the error to the Promise's .catch() method
            if (err) {
                reject(err);
                return;
            }

            //if everything went well, resolve the Promise and send the successful data to the .then()
            resolve({
                ok: true,
                message: 'Style sheet copied successfully'
            });
        });
    });
}

module.exports = { writeToFile, copyStyle };
