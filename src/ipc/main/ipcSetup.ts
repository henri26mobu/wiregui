import { ipcMain, dialog } from "electron";
import { exec } from "child_process";
import * as fs from "fs";

export function checkSudoersSetup(mainWindow: Electron.BrowserWindow): void {
  if (process.platform !== "darwin") return;

  const sudoersFile = "/etc/sudoers.d/wiregui";
  const wgPath = "/usr/local/bin/wg";

  if (!fs.existsSync(sudoersFile)) {
    mainWindow.webContents.send("setup-required");
  }
}

ipcMain.handle("install-sudoers-macos", async () => {
  return new Promise((resolve) => {
    const script = `
      do shell script "echo 'ALL ALL=(ALL) NOPASSWD: /usr/local/bin/wg' > /etc/sudoers.d/wiregui && chmod 0440 /etc/sudoers.d/wiregui" with administrator privileges
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
