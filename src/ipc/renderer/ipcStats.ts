import { ipcRenderer } from "electron";

export const getWgStats = () => ipcRenderer.invoke("get-wg-stats");
