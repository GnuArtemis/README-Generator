// Require all dependencies needed: inquirer fs
const inquirer = require("inquirer");
const fs = require("fs");


//Write a README in a markdwon file as a template

//function that will generate my readme template

//Use inquirer to prompt users with questions

//use answers that come back from inquirer - pass those into generate README function

//write file using template generated from readme function

// array of questions for user
const { questions } = require('./questions');
const { licenses } = require('./licenses');
let answers;
inquirer
    .prompt(questions)
    .then(saveResult, errHandler)
    .then(createText, errHandler)
    .then(createImages, errHandler)
    .then(createTechnologies, errHandler)
    .then(continueText, errHandler)
    .then(createTest, errHandler)
    .then(createOtherAuthors, errHandler)
    .then(finishText, errHandler)
    .then(createLicense, errHandler)
    .then(writeReadme, errHandler);

function saveResult(result) {
    answers = result;
    return result;
}
function errHandler(err) {
    if (err) console.log(err);
}

function createText(result) {
    let text =
        `# ${answers.projectTitle}
## Description
${answers.description}

## Table of Contents
1. [Description](#-Description)`;


    if (answers.visuals > 0) text += `\r\n1. [Visuals](#Visuals)`;

    text +=
        `\r\n1. [Installation](#Installation)
1. [Usage](#Usage)
1. [Contributing](#Contributing)\r\n`;


    if (answers.tests) text += `1. [Tests](#Tests)\r\n`;
    if (answers.otherAuthors > 0) text += `1. [Authors](#Authors)\r\n`;

    text +=
        `1. [Questions](#Questions)
1. [License](#License)\r\n\r\n`
    return text;
}

async function createImages(text) {
    let newText = "";
    if (answers.images > 0) {
        newText += `## Visuals \r\n\r\n`;
        for (i = 0; i < answers.images; i++) {
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Please enter a short description of the image.",
                        name: "imageDesc"
                    },
                    {
                        type: "input",
                        message: "What is the relative or absolute link to the image you want to add?",
                        name: "link"
                    },
                ]).then(function (res) {
                    let imageText = `![image](${res.link})`;
                    imageText += "\r\n\r\n"
                    imageText += res.imageDesc;
                    imageText += "\r\n\r\n"

                    newText += imageText;
                })

        }
    }
    return (text + newText);
}

async function createTechnologies(text) {
    let newText = "";
    if (answers.technologies > 0) {
        newText += `## Technologies \r\n\r\n`;
        for (i = 0; i < answers.technologies; i++) {
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the name of the technology used?",
                        name: "techname"
                    }, {
                        type: "input",
                        message: "What is the relative or absolute link to attribute the technology?",
                        name: "link"
                    }
                ]).then(function (res) {
                    let tech = `[${res.techname}](${res.link})`;
                    tech += "\r\n\r\n";

                    newText += tech;
                })

        }
    }
    return (text + newText);
}

function continueText(text) {
    const newText =
        `## Installation
${answers.installation}

## Usage
${answers.usage}
    
## Contributing
${answers.contributing}`;


    return text + newText + "\r\n\r\n";
}

async function createTest(text) {

    let newText = "";
    if (answers.tests) {
        newText += `## Tests\r\n\r\n`
        await inquirer
            .prompt([
                {
                    type: "input",
                    message: "Please enter your test instructions in one paragraph.",
                    name: "testContents"
                }
            ]).then(function (res) {
                newText += res.testContents + "\r\n\r\n";
            });


    }
    return (text + newText);
}

async function createOtherAuthors(text) {
    let newText = "";
    if (answers.otherAuthors > 0) {
        newText += "## Authors \r\n\r\n";
        for (i = 0; i < answers.otherAuthors; i++) {
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What was a contributor's name?",
                        name: "authorName"
                    },
                    {
                        type: "input",
                        message: "What was their github username?",
                        name: "authorGithub"
                    }
                ]).then(function (res) {
                    let author = `[${res.authorName}](https://github.com/${res.authorGithub})`;
                    author += "\r\n\r\n"

                    newText += author;
                })

        }

    }
    return (text + newText);
}

function finishText(text) {
    newText =
        `## Questions
${answers.questionsGithub}
${answers.questionsEmail} \r\n\r\n`;

    return text + newText;
}

async function createLicense(text) {

    let newText = `## License \r\n\r\n`
    newText += `![GitHub](https://img.shields.io/github/license/${answers.questionsGithub}/${answers.projectTitle}) \r\n\r\n`;

    if (answers.license === "MIT") {
        newText += licenses.MIT;
    } else if (answers.license === "GNU GPLv3") {
        newText += licenses.GNU
    } /* else {
        await inquirer
            .prompt([
                {
                    type: "confirm",
                    message: "Do you already have a license file from Github?",
                    name: "preexistingLicense"
                },
                {
                    type: "input",
                    when: (res) => !res.preexistingLicense,
                    message: "Please enter the text of the license you wish to use",
                    name: "licenseText"
                }
            ]).then(function (res) {
                if (res.preexistingLicense) {
                    fs.readFile('LICENSE', "utf8", function (err, data) {
                        if (err) errHandler(err);
                        else {
                            newText += data;
                            return (text + newText)
                        }
                    })
                } else {

                    let uniqueLicense = res.licenseText;
                    uniqueLicense += "\r\n\r\n"

                    newText += uniqueLicense;
                    return (text + newText);
                }
            })
    }*/
    0
    return text + newText;
}

function writeReadme(text) {
    fs.writeFile("test.md", text, errHandler);
}
