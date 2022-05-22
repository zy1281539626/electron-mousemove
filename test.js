var robot = require("robotjs");
var screenSize = robot.getScreenSize();
console.log(screenSize);

robot.moveMouseSmooth(screenSize.width - 140, screenSize.height - 20);
robot.mouseClick(); //鼠标点击
