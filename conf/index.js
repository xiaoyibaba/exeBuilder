const fs = require('fs');
const exec = require('child_process').execSync;
const yaml = require('js-yaml');
const inquirer = require('inquirer');

const exeConf = {
	appId: "com.innodev.app",
	copyright: "Copyright © wuqiong",
	asar: false,
	directories: {
		output: "./out"
	},
	electronDownload: {
		mirror: "https://npm.taobao.org/mirrors/electron/"
	},
	win: {
		icon: "app.ico",
		target: ["nsis"]
	},
	nsis: {
		oneClick: false,
		perMachine: true,
		allowToChangeInstallationDirectory: true
	}
}

// 检查是否存在elctron-builder.yml文件
const checkFile = () => {
  const ymlStats = fs.statSync('electron-builder.yml', { throwIfNoEntry: false });
  const jsonStats = fs.statSync('win-conf.json', { throwIfNoEntry: false });
  if (ymlStats && ymlStats.isFile()) {
    fs.unlinkSync('electron-builder.yml');
  }
  if (jsonStats && jsonStats.isFile()) {
    fs.unlinkSync('win-conf.json');
  }
}

// 命令行方式确定程序包配置
const genConf = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'productName',
      message: '请输入安装包名称：'
    },
    {
      type: 'confirm',
      message: '是否显示在副屏：',
      name: 'otherDisplay',
      default: false
    },
    {
      type: 'confirm',
      message: '是否生成32位程序：',
      name: 'bit',
      default: false
    },
    {
      type: 'checkbox',
      name: 'packageList',
      message: '请选择操作系统：',
      choices: [
        { name: 'Windows', value: 'exe', checked: true },
        new inquirer.Separator('--待开发，暂时不要选择--'),
        { name: 'Linux', value: 'deb' },
        { name: 'mac', value: 'dmg' },
      ]
    }
  ])

  if (answers.productName) {
    const ymlFile = yaml.dump({
      productName: answers.productName || '未命名',
      ...exeConf
    });
    fs.writeFileSync('electron-builder.yml', ymlFile, 'utf-8');
  }

  fs.writeFileSync('win-conf.json', JSON.stringify({
    otherDisplay: answers.otherDisplay,
    title: answers.productName || '未命名'
  }))

  if (answers.bit) {
    exec('electron-builder --win --ia32', { stdio: 'inherit' });
  } else {
    exec('electron-builder', { stdio: 'inherit' });
  }
}

checkFile();
genConf();