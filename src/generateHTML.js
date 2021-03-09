const generateHTML = employees => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Meet The Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="./style.css" />
        <script src="https://kit.fontawesome.com/c1836db28e.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col banner">
                    <h1>My Team</h1>
                </div>
            </div>
            <div class="row justify-content-center card-wrapper">
                ${employees.map(createCard).join('')}
            </div>
        </div>
    </body>
    </html>
    `
}

//this function takes a single employee and creates a card based on the employee's role. I initially had more styling that was dependant on the employee's role, but it ended up
//making the final page look too busy. For now, the role specific styling differences are 1) the manager's card header and 2) the role specific icons.
const createCard = employee => {
    if (employee.getRole() === 'Manager'){
        return `
        <div class="card employee-card" style="width: 18rem;">
            <div class="card-header manager">
                <h2>${employee.getName()}<br><i class="fas fa-user-tie"></i> ${employee.getRole()}</h2>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><span class="label">ID:</span> ${employee.getId()}</li>
                <li class="list-group-item"><span class="label">Email:</span> <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                <li class="list-group-item"><span class="label">Office Number:</span> ${employee.getOfficeNumber()}</li>
            </ul>
        </div>
        `;
    } else if (employee.getRole() === 'Engineer') {
        return `
        <div class="card employee-card" style="width: 18rem;">
            <div class="card-header engineer">
                <h2>${employee.getName()} <br><i class="fas fa-laptop-code"></i> ${employee.getRole()}</h2>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><span class="label">ID:</span> ${employee.getId()}</li>
                <li class="list-group-item"><span class="label">Email:</span> <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                <li class="list-group-item"><span class="label">Github:</span> <a href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a></li>
            </ul>
        </div>
        `;
    } else if (employee.getRole() === 'Intern') {
        return `
        <div class="card employee-card" style="width: 18rem;">
            <div class="card-header">
                <h2>${employee.getName()} <br><i class="fas fa-book"></i> ${employee.getRole()}</h2>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><span class="label">ID:</span> ${employee.getId()}</li>
                <li class="list-group-item"><span class="label">Email:</span> <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                <li class="list-group-item"><span class="label">School:</span> ${employee.getSchool()}</li>
            </ul>
        </div>
        `;
    }
   
}

module.exports = generateHTML;