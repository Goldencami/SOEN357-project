"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs");
const utils = require("@electron-toolkit/utils");
function initializeRoundData() {
  return {
    apal: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    side: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    roundHouse: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    backKick: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    hook: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    spinHook: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    axe: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    crescent: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    twist: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    double: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    360: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    punch: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    cut: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    cancel: { open_left: 0, open_right: 0, closed_left: 0, closed_right: 0, trunk: 0, head: 0, hasScored: 0 },
    totalScore: 0,
    intensity: 0,
    gamjeoms: 0,
    comments: ""
  };
}
const matchData = { athlete: "", opponent: "", competition: "", division: 0 };
const round1Data = initializeRoundData();
const round2Data = initializeRoundData();
const round3Data = initializeRoundData();
const rounds = [round1Data, round2Data, round3Data];
const opponentScores = { 1: 0, 2: 0, 3: 0 };
const icon = path.join(__dirname, "../../resources/icon.png");
var mainWindow;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    // width < 1200 buttons overlap
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    },
    icon: process.platform === "darwin" ? path.join(__dirname, "../icons/icon.icns") : path.join(__dirname, "../icons/icon.png")
    // Use .ico for Windows
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.ipcMain.on("print-to-pdf", async () => {
  const pdfPath = await electron.dialog.showSaveDialog(mainWindow, {
    title: "Save PDF",
    defaultPath: "match_results.pdf",
    filters: [{ name: "PDF Files", extensions: ["pdf"] }]
  });
  if (!pdfPath.canceled) {
    mainWindow.webContents.printToPDF({
      printBackground: true,
      pageSize: "A4",
      landscape: false,
      marginsType: 0
    }).then((data) => {
      fs.writeFile(pdfPath.filePath, data, (err) => {
        if (err) {
          console.error("Failed to save PDF:", err);
        } else {
          console.log("PDF saved successfully at", pdfPath.filePath);
        }
      });
    }).catch((err) => console.error("Failed to create PDF:", err));
  }
});
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.on("set-match", (event, data) => {
  const { athlete, opponent, competition, division } = data;
  matchData.athlete = athlete;
  matchData.opponent = opponent;
  matchData.competition = competition;
  matchData.division = division;
});
electron.ipcMain.handle("get-match-information", (event) => {
  return matchData;
});
electron.ipcMain.on("points-updated", (event, data) => {
  const { round, attack, info, points } = data;
  const selectedRound = rounds[round - 1];
  selectedRound[attack][info] = points;
});
electron.ipcMain.handle("get-points", (event, data) => {
  const { round } = data;
  return rounds[round - 1];
});
electron.ipcMain.on("set-round-info", (event, data) => {
  const { round, intensity, gamjeoms } = data;
  rounds[round - 1].intensity = intensity;
  rounds[round - 1].gamjeoms = gamjeoms;
});
electron.ipcMain.handle("get-round-information", (event, data) => {
  const { round } = data;
  return { intensity: rounds[round - 1].intensity, gamjeoms: rounds[round - 1].gamjeoms };
});
electron.ipcMain.on("set-comments", (event, data) => {
  const { round, comments } = data;
  rounds[round - 1].comments = comments;
});
electron.ipcMain.handle("get-comments", (event, data) => {
  const { round } = data;
  return rounds[round - 1].comments;
});
electron.ipcMain.on("set-athlete-score", (event, data) => {
  const { round, athletePoints } = data;
  rounds[round - 1].totalScore = athletePoints;
});
electron.ipcMain.handle("get-athlete-score", (event, data) => {
  const { round } = data;
  return rounds[round - 1].totalScore;
});
electron.ipcMain.on("set-opponent-score", (event, data) => {
  const { round, opponentPoints } = data;
  opponentScores[round] = opponentPoints;
});
electron.ipcMain.handle("get-opponent-score", (event, data) => {
  const { round } = data;
  return opponentScores[round];
});
electron.ipcMain.on("set-data", (event, data) => {
});
electron.ipcMain.handle("get-data", (event, data) => {
  const { round } = data;
  return rounds[round - 1];
});
electron.ipcMain.handle("get-all-rounds", (event) => {
  return { round1: rounds[0], round2: rounds[1], round3: rounds[2] };
});
electron.ipcMain.handle("get-athl-scores", (event) => {
  return { round1: rounds[0].totalScore, round2: rounds[1].totalScore, round3: rounds[2].totalScore };
});
electron.ipcMain.handle("get-opp-scores", (event) => {
  return opponentScores;
});
electron.ipcMain.handle("reset-data", (event) => {
  matchData.athlete = "";
  matchData.opponent = "";
  matchData.competition = "";
  matchData.division = 0;
  rounds[0] = initializeRoundData();
  rounds[1] = initializeRoundData();
  rounds[2] = initializeRoundData();
  opponentScores[1] = 0;
  opponentScores[2] = 0;
  opponentScores[3] = 0;
  return true;
});
