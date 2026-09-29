const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1120,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#080811',
    title: 'ClientStrap',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('clientstrap:open-roblox', async () => {
  await shell.openExternal('roblox://');
  return true;
});
ipcMain.handle('clientstrap:open-studio', async () => {
  await shell.openExternal('roblox-studio://');
  return true;
});
ipcMain.handle('clientstrap:open-url', async (_event, url) => {
  const allowed = new Set([
    'https://www.roblox.com/',
    'https://create.roblox.com/',
    'https://devforum.roblox.com/'
  ]);
  if (!allowed.has(url)) throw new Error('URL not allowed');
  await shell.openExternal(url);
  return true;
});
