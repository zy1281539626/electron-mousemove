const { app, BrowserWindow } = require("electron");
const path = require("path");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    // x: 0,
    // y: 0,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    resizable: false,
    autoHideMenuBar: true,
    // frame: false,
  });

  // win.webContents.openDevTools();

  // 显示在顶层
  win.setAlwaysOnTop(true);

  win.loadFile("index.html");
});

app.allowRendererProcessReuse = true;
