//All of the require statments for the various pieces teh application uses.
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/generateHTML');
const { writeToFile, copyStyle } = require('./utils/createPage');

//employees is a global array that is used to store the employee objects as they are created.
let employees = [];


const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the team manager's name?",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("Please enter the team manager's name!");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: "What is the team manager's ID?", 
            validate: idInput => {
                if(idInput) {
                    return true;
                } else {
                    console.log("Please enter the team manager's ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the team manager's email address?",
            validate: emailInput => {
                if(emailInput) {
                    return true;
                } else {
                    console.log("Please enter the team manager's email!");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'officeNum',
            message: "What is the team manager's office number?",
            validate: officeInput => {
                if(officeInput) {
                    return true;
                } else {
                    console.log("Please enter the team manager's office number!");
                    return false;
                }
            }
        }
    ]);
}


const addEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("Please enter the engineer's name!");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: "What is the engineer's ID?",
            validate: idInput => {
                if(idInput) {
                    return true;
                } else {
                    console.log("Please enter the engineer's ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email address?",
            validate: emailInput => {
                if(emailInput) {
                    return true;
                } else {
                    console.log("Please enter the engineer's email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's Github username?",
            validate: githubInput => {
                if(githubInput) {
                    return true;
                } else {
                    console.log("Please enter the engineer's Github username!");
                    return false;
                }
            }
        }
    ])
    
}


const addIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("Please enter the intern's name!");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: "What is the intern's ID?",
            validate: idInput => {
                if(idInput) {
                    return true;
                } else {
                    console.log("Please enter the intern's ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email address?",
            validate: emailInput => {
                if(emailInput) {
                    return true;
                } else {
                    console.log("Please enter the intern's email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the intern's school?",
            validate: schoolInput => {
                if(schoolInput) {
                    return true;
                } else {
                    console.log("Please enter the intern's school!");
                    return false;
                }
            }
        }
    ]);
   
}


const displayMenu = () => {
    let done = false;
        inquirer.prompt(
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['Add an Engineer', 'Add an Intern', 'Finish Building My Team']
            }
        ).then(menuChoice => {
        
            if(menuChoice.choice === 'Add an Engineer'){
                addEngineer()
                .then(engInfo => {
                    const engineer = new Engineer(engInfo.name, engInfo.id, engInfo.email, engInfo.github);
                    employees.push(engineer);
                    displayMenu();
            
                })
            } else if (menuChoice.choice === 'Add an Intern') {
                addIntern()
                .then(intInfo => {
                    const intern = new Intern(intInfo.name, intInfo.id, intInfo.email, intInfo.school);
                    employees.push(intern);
                    displayMenu();
            
                })
            } else {
                console.log('Finished building team');
                //call generateHTML and pass the employees array so the index.html page can be created.
                const pageHTML = generateHTML(employees);
                //write the index.html file using the HTML generated previously.
                writeToFile('./dist/index.html', pageHTML).then(writeResponse => {
                    console.log(writeResponse.message);
                    //copy the style.css sheet to the ./dist directory
                    return copyStyle();
                })
                .catch(err => {
                    console.log(err);
                });
            }
            
        });
}


addManager().then(function(mgrInfo){
    const manager = new Manager(mgrInfo.name, mgrInfo.id, mgrInfo.email, mgrInfo.officeNum);
    employees.push(manager);
    displayMenu();
}).catch(err => {
    console.log(err);
});