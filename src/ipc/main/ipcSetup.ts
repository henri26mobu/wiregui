import { ipcMain } from "electron";
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

  // AppImage sur Linux : tester réellement si sudo -n wg fonctionne sans mot de passe
  if (process.env.APPIMAGE) {
    exec("sudo -n /usr/bin/wg show 2>&1", (error, stdout, stderr) => {
      const output = stderr || "";
      // Si "password is required" → sudoers pas configuré
      if (output.includes("password is required") || output.includes("a password is required")) {
        mainWindow.webContents.send("setup-required");
      }
      // Sinon (vide ou liste interfaces) → sudoers OK, pas de popup
    });
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
