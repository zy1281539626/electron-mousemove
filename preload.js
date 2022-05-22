const { contextBridge } = require("electron");
const { mouse, screen, left, right } = require("@nut-tree/nut-js");

const distance = 2; // 每次移动2px
const defaultMoveTime = 5; // 默认执行move间隔时间，可以传入

const move = async () => {
  let w = await screen.width();
  // let h = await screen.height();
  let point = await mouse.getPosition();
  if (point.x + distance >= w) {
    await mouse.move(left(distance));
  } else {
    await mouse.move(right(distance));
  }
};

const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");
const scheduler = new ToadScheduler();
// 鼠标移动任务
const task = new Task("mouse move", () => {
  console.log(new Date());
  (async () => {
    await move();
  })();
});
//

contextBridge.exposeInMainWorld("electronAPI", {
  start: (time) => {
    // console.log(time);
    console.log("start...");
    scheduler.removeById("moveId");

    const job = new SimpleIntervalJob(
      { seconds: time || defaultMoveTime },
      task,
      "moveId"
    );
    scheduler.addSimpleIntervalJob(job);
  },
  stop: () => {
    console.log("stop...");
    // scheduler.stop();
    scheduler.stopById("moveId");
  },
});
