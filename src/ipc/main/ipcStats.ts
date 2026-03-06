import { ipcMain } from "electron";
import { exec } from "child_process";

ipcMain.handle("get-wg-stats", async () => {
  return new Promise((resolve) => {
    let command: string;

    if (process.platform === "darwin") {
      // macOS : sudo via sudoers NOPASSWD
      command = "PATH=/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin sudo wg show";
    } else if (process.env.APPIMAGE) {
      // AppImage (Arch, Manjaro...) : sudo via sudoers NOPASSWD, setcap non disponible
      command = "PATH=/usr/local/bin:/usr/bin:/bin sudo wg show";
    } else {
      // Linux .deb / .rpm : setcap cap_net_admin appliqué au postinstall
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
