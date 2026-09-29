const toast = document.getElementById('toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
}

document.getElementById('launch-roblox').addEventListener('click', async () => {
  try { await window.clientstrap.launchRoblox(); notify('Sent launch request to Roblox.'); }
  catch { notify('Could not open Roblox. Make sure the official Roblox app is installed.'); }
});
document.getElementById('launch-studio').addEventListener('click', async () => {
  try { await window.clientstrap.launchStudio(); notify('Sent launch request to Roblox Studio.'); }
  catch { notify('Could not open Studio. Make sure Roblox Studio is installed.'); }
});
document.querySelectorAll('[data-url]').forEach(button => {
  button.addEventListener('click', async () => {
    try { await window.clientstrap.openUrl(button.dataset.url); }
    catch { notify('Could not open that page.'); }
  });
});
document.getElementById('help').addEventListener('click', async () => {
  try { await window.clientstrap.openUrl('https://www.roblox.com/'); }
  catch { notify('Could not open help.'); }
});

const dialog = document.getElementById('settings-dialog');
document.getElementById('configure').addEventListener('click', () => dialog.showModal());
document.getElementById('close-settings').addEventListener('click', () => dialog.close());
document.getElementById('save-settings').addEventListener('click', () => {
  document.getElementById('client-version').hidden = !document.getElementById('show-version').checked;
  dialog.close();
  notify('Preferences applied for this session.');
});
