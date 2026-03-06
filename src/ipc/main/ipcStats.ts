import { ipcMain } from "electron";
import { exec } from "child_process";

ipcMain.handle("get-wg-stats", async () => {
  return new Promise((resolve) => {
    let command: string;

    if (process.platform === "darwin") {
      // macOS : sudo via sudoers NOPASSWD (patché séparément)
      command = "PATH=/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin sudo wg show";
    } else {
      // Linux (Debian, Fedora, Arch...) : setcap cap_net_admin appliqué au postinstall
      command = "PATH=/usr/local/bin:/usr/bin:/bin wg show";
    }

    exec(command, (error, stdout) => {
      if (error) {
        resolve({ error: error.message });
        return;
      }
      resolve({ data: stdout });
    });
  });
});
