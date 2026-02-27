import { app, autoUpdater, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import * as fs from "fs";
import { TrayMenu } from "./main/TrayMenu";
import { MenuBar } from "./main/MenuBar";
import { getIconsPath } from "./utils";
import "./ipc/main";
import "./ipc/main/ipcStats";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

ipcMain.on("export-config", async (event, { fileName, content }: { fileName: string; content: string }) => {
  const result = await dialog.showSaveDialog({
    title: "Export tunnel configuration",
    defaultPath: `${fileName}.conf`,
    filters: [{ name: "WireGuard Config", extensions: ["conf"] }],
  });
  if (result.canceled || !result.filePath) {
    event.reply("export-config-reply", { success: false });
    return;
  }
  try {
    fs.writeFileSync(result.filePath, content, "utf-8");
    event.reply("export-config-reply", { success: true, filePath: result.filePath });
  } catch (e) {
    event.reply("export-config-reply", { success: false, error: e.message });
  }
});

try { require("update-electron-app")(); } catch(e) { console.log("update-electron-app skipped:", e.message); }// eslint-disable-line @typescript-eslint/no-var-requires

if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
  app.quit();
}

const isDevelopement = (process.env.NODE_ENV !== "production");

const createWindow = (): void => {
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
    return;
  }

  const mainWindow = new BrowserWindow({
    height: 850,
    width: 1200,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    icon: getIconsPath("icon.png", isDevelopement),
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDevelopement) {
    mainWindow.webContents.openDevTools();
  }

  const trayMenu = new TrayMenu(mainWindow, isDevelopement);
  const menuBar = new MenuBar(mainWindow, trayMenu);
  const template = menuBar.generateTemplate();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("second-instance", (event, commandLine, workingDirectory) => {
  const mainWindow = BrowserWindow.getAllWindows()[0];
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
  }
});

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Update", "Later"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "A new version has been downloaded. Restart the application to apply the updates."
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});
