import { ipcMain } from "electron";
import { exec } from "child_process";

ipcMain.handle("get-wg-stats", async () => {
  return new Promise((resolve) => {
    exec("sudo wg show", (error, stdout) => {
      if (error) {
        resolve({ error: error.message });
        return;
      }
      resolve({ data: stdout });
    });
  });
});
