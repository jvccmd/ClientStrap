const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('clientstrap', {
  launchRoblox: () => ipcRenderer.invoke('clientstrap:open-roblox'),
  launchStudio: () => ipcRenderer.invoke('clientstrap:open-studio'),
  openUrl: (url) => ipcRenderer.invoke('clientstrap:open-url', url)
});
