//All of the require statments for the various pieces teh application uses.
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/generateHTML');
const { writeToFile, copyStyle } = require('./utils/createPage');

//employees is a global array that is used to store the employee objects as they are created.
let employees = [];

//this function adds the team manger object. it prompts the user for input and returns the provided answers.
//**NOTE** - while i have input validation, validating input on a type: 'number' prompt was acting funny for me in testing. if invalid input is provided,
//inquirer generates a NaN error that displays on the input prompt. you have to clear the error before you can enter valid input or the input will continue to be invalid.
//you can't just backspace to clear the error, you have to use the up and down arrows on the keyboard to get rid of it. i'm not sure if this is something with inquirer or 
//if it is due to the type of terminal i am using, but i couldn't find anything in inquirer's documentation or online that would indicate how to change this behavior.
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

//if the user chooses to add an engineer from the main menu, this function is called and the user is prompted with engineer appropriate questions.
//see my NOTE in addManager regarding the validation on type: 'number' questions.
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

//if the user chooses to add an intern from the main menu, this function is called and the user is prompted with intern appropriate questions.
//see my NOTE in addManager regarding the validation on type: 'number' questions.
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

//this function is called to display the main menu where the user selects to add an engineer, add an intern, or finish. when a choice is made, the appropriate
//function is called, the answers that are returned are then pushed to the employees array and then the displayMenu function is recursively called. if the finished
//option is selected the app calls the function to generate the HTML and write the file.
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

//start the application
addManager().then(function(mgrInfo){
    const manager = new Manager(mgrInfo.name, mgrInfo.id, mgrInfo.email, mgrInfo.officeNum);
    employees.push(manager);
    displayMenu();
}).catch(err => {
    console.log(err);
});