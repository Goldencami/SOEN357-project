import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import fs from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import Store from 'electron-store';
import { matchData, rounds, opponentScores, initializeRoundData } from '../shared/data.js'
import icon from '../../resources/icon.png?asset'

// const store = new Store();

var mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // width < 1200 buttons overlap
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    icon: process.platform === 'darwin' 
      ? join(__dirname, '../icons/icon.icns') // Use .icns for macOS
      : join(__dirname, '../icons/icon.png') // Use .ico for Windows
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Save analysis page into PDF
ipcMain.on('print-to-pdf', async () => {
  const pdfPath = await dialog.showSaveDialog(mainWindow, {
    title: 'Save PDF',
    defaultPath: 'match_results.pdf',
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
  });

  if (!pdfPath.canceled) {
    mainWindow.webContents.printToPDF({
      printBackground: true,
      pageSize: 'A4',
      landscape: false,
      marginsType: 0,
    }).then(data => {
      fs.writeFile(pdfPath.filePath, data, (err) => {
        if (err) {
          console.error('Failed to save PDF:', err);
        } else {
          console.log('PDF saved successfully at', pdfPath.filePath);
        }
      });
    }).catch(err => console.error('Failed to create PDF:', err));
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('set-match', (event, data) => {
  const { athlete, opponent, competition, division } = data;
  
  matchData.athlete = athlete;
  matchData.opponent = opponent;
  matchData.competition = competition;
  matchData.division = division;
});

ipcMain.handle('get-match-information', (event) => {
  return matchData;
});

ipcMain.on('points-updated', (event, data) => {
  const { round, attack, info, points } = data;
  const selectedRound = rounds[round-1];
  selectedRound[attack][info] = points;
});

ipcMain.handle('get-points', (event, data) => {
  const { round } = data;
  return rounds[round-1];
});

ipcMain.on('set-round-info', (event, data) => {
  const { round, intensity, gamjeoms } = data;
  rounds[round-1].intensity = intensity;
  rounds[round-1].gamjeoms = gamjeoms;
});

ipcMain.handle('get-round-information', (event, data) => {
  const { round } = data;
  return { intensity: rounds[round-1].intensity, gamjeoms: rounds[round-1].gamjeoms };
});

ipcMain.on('set-comments', (event, data) => {
  const { round, comments } = data
  rounds[round-1].comments = comments;
});

ipcMain.handle('get-comments', (event, data) => {
  const { round } = data;
  return rounds[round-1].comments;
});

ipcMain.on('set-athlete-score', (event, data) => {
  const { round, athletePoints } = data;
  rounds[round-1].totalScore = athletePoints;
});

ipcMain.handle('get-athlete-score', (event, data) => {
  const { round } = data;
  return rounds[round-1].totalScore;
});

ipcMain.on('set-opponent-score', (event, data) => {
  const { round, opponentPoints } = data;
  opponentScores[round] = opponentPoints;
});

ipcMain.handle('get-opponent-score', (event, data) => {
  const { round } = data;
  return opponentScores[round];
});

ipcMain.on('set-data', (event, data) => {
  //TODO  
});

ipcMain.handle('get-data', (event, data) => {
  const { round } = data;
  return rounds[round-1];
});

ipcMain.handle('get-all-rounds', (event) => {
  return { round1: rounds[0], round2: rounds[1], round3: rounds[2] };
});

ipcMain.handle('get-athl-scores', (event) => {
  return { round1: rounds[0].totalScore, round2: rounds[1].totalScore, round3: rounds[2].totalScore };
});

ipcMain.handle('get-opp-scores', (event) => {
  return opponentScores;
});

ipcMain.handle('reset-data', (event) => {
  matchData.athlete = '';
  matchData.opponent = '';
  matchData.competition = '';
  matchData.division = 0;

  rounds[0] = initializeRoundData();
  rounds[1] = initializeRoundData();
  rounds[2] = initializeRoundData();

  opponentScores[1] = 0;
  opponentScores[2] = 0;
  opponentScores[3] = 0;

  return true; // Succesfully reseted data
});