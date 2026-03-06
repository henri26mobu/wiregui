import { ipcMain, dialog } from "electron";
import { exec } from "child_process";
import * as fs from "fs";

export function checkSudoersSetup(mainWindow: Electron.BrowserWindow): void {
  // macOS : vérifier sudoers pour wg
  if (process.platform === "darwin") {
    const sudoersFile = "/etc/sudoers.d/wiregui";
    if (!fs.existsSync(sudoersFile)) {
      mainWindow.webContents.send("setup-required");
    }
    return;
  }

  // AppImage sur Linux : vérifier sudoers pour wg
  if (process.env.APPIMAGE) {
    const sudoersFile = "/etc/sudoers.d/wiregui";
    if (!fs.existsSync(sudoersFile)) {
      mainWindow.webContents.send("setup-required");
    }
  }
}

// macOS : installation sudoers via osascript
ipcMain.handle("install-sudoers-macos", async () => {
  return new Promise((resolve) => {
    const script = `
      do shell script "echo 'ALL ALL=(ALL) NOPASSWD: /usr/bin/wg' > /etc/sudoers.d/wiregui && chmod 0440 /etc/sudoers.d/wiregui" with administrator privileges
    `;
    exec(`osascript -e "${script.replace(/\n/g, '').replace(/"/g, '\\"')}"`, (error) => {
      if (error) {
        resolve({ success: false, error: error.message });
      } else {
        resolve({ success: true });
      }
    });
  });
});

// AppImage Linux : installation sudoers via pkexec
ipcMain.handle("install-sudoers-appimage", async () => {
  return new Promise((resolve) => {
    const cmd = `pkexec bash -c "echo 'ALL ALL=(ALL) NOPASSWD: /usr/bin/wg' > /etc/sudoers.d/wiregui && chmod 0440 /etc/sudoers.d/wiregui"`;
    exec(cmd, (error) => {
      if (error) {
        resolve({ success: false, error: error.message });
      } else {
        resolve({ success: true });
      }
    });
  });
});
