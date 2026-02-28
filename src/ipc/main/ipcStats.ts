import { ipcMain } from "electron";
import { exec } from "child_process";

ipcMain.handle("get-wg-stats", async () => {
  return new Promise((resolve) => {
    // Linux : sudoers NOPASSWD, macOS : sudoers NOPASSWD aussi
    const command = process.platform === "win32"
      ? "wireguard /dumplog"
      : "sudo wg show";

    exec(command, (error, stdout) => {
      if (error) {
        resolve({ error: error.message });
        return;
      }
      resolve({ data: stdout });
    });
  });
});
