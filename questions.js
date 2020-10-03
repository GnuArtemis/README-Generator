const questions = [
    {
        type: "input",
        message: "What is the Github Repository title of your project? Please use dashes.",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "Please enter a basic description of your project.",
        name: "description"
    },
    {
        type: "number",
        message: "How many technologies were used?",
        name: "technologies"
    },
    {
        type: "input",
        message: "Please enter installation instructions for others to use this project.",
        name: "installation"
    },
    {
        type: "input",
        message: "What is the usage policy for your project?",
        name: "usage"
    },
    {
        type: "input",
        message: "What is the contribution policy for your project",
        name: "contributing"
    },
    {
        type: "confirm",
        message: "Are there any tests for your project?",
        name: "tests"
    },
    {
        type: "input",
        message: "Please enter your Github username, for the sake of directing questions.",
        name: "questionsGithub"
    },
    {
        type: "input",
        message: "Please enter your email address, for the sake of directing questions.",
        name: "questionsEmail"
    },
    {
        type: "list",
        message: "What license are you using?",
        name: "license",
        choices : [
            'MIT',
            'GNU GPLv3',
            // 'More Options'
        ]
    },
    {
        type: "number",
        message: "How many images do you want to add? Enter 0 if you do not want to add images.",
        name: "images"
    },
    {
        type: "number",
        message: "How many other authors contributed?",
        name: "otherAuthors"
    },
    

];

module.exports = {
    questions
}