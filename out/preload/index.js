"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  setMatchData: (data) => electron.ipcRenderer.send("set-match", data),
  getMatchData: async () => await electron.ipcRenderer.invoke("get-match-information"),
  setPoints: (data) => electron.ipcRenderer.send("points-updated", data),
  getPoints: async (data) => await electron.ipcRenderer.invoke("get-points", data),
  setRoundInfo: (data) => electron.ipcRenderer.send("set-round-info", data),
  getRoundInfo: async (data) => await electron.ipcRenderer.invoke("get-round-information", data),
  setComments: (data) => electron.ipcRenderer.send("set-comments", data),
  getComments: async (data) => await electron.ipcRenderer.invoke("get-comments", data),
  setAthleteScore: (data) => electron.ipcRenderer.send("set-athlete-score", data),
  getAthleteScore: async (data) => await electron.ipcRenderer.invoke("get-athlete-score", data),
  setOpponentScore: (data) => electron.ipcRenderer.send("set-opponent-score", data),
  getOpponentScore: async (data) => await electron.ipcRenderer.invoke("get-opponent-score", data),
  setData: (data) => electron.ipcRenderer.send("set-data", data),
  //TODO: CHANGE??
  getData: async (data) => await electron.ipcRenderer.invoke("get-data", data),
  getAllRounds: async () => await electron.ipcRenderer.invoke("get-all-rounds"),
  getAthlAllScores: async () => await electron.ipcRenderer.invoke("get-athl-scores"),
  getOppAllScores: async () => await electron.ipcRenderer.invoke("get-opp-scores"),
  convertToPdf: () => electron.ipcRenderer.send("print-to-pdf"),
  resetData: async () => await electron.ipcRenderer.invoke("reset-data")
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
