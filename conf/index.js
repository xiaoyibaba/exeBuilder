const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'preset',
      message: 'please pick a preset:',
      choices: [
        { name: '测试', value: '测试' },
        { name: '测试2', value: '测试2' },
        { name: '测试3', value: '测试3' },
      ]
    },
    {
      type: 'input',
      name: 'product name',
      message: 'please input your product name'
    }
  ])
  .then((answers) => {
    console.log(answers)
  })
