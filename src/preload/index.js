import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  setMatchData: (data) => ipcRenderer.send('set-match', data),
  getMatchData: async () => await ipcRenderer.invoke('get-match-information'),
  setPoints: (data) => ipcRenderer.send('points-updated', data),
  getPoints: async (data) => await ipcRenderer.invoke('get-points', data),
  setRoundInfo: (data) => ipcRenderer.send('set-round-info', data),
  getRoundInfo: async (data) => await ipcRenderer.invoke('get-round-information', data),
  setComments: (data) => ipcRenderer.send('set-comments', data),
  getComments: async (data) => await ipcRenderer.invoke('get-comments', data),
  setAthleteScore: (data) => ipcRenderer.send('set-athlete-score', data),
  getAthleteScore: async (data) => await ipcRenderer.invoke('get-athlete-score', data),
  setOpponentScore: (data) => ipcRenderer.send('set-opponent-score', data),
  getOpponentScore: async (data) => await ipcRenderer.invoke('get-opponent-score', data),
  setData: (data) => ipcRenderer.send('set-data', data), //TODO: CHANGE??
  getData: async (data) => await ipcRenderer.invoke('get-data', data),
  getAllRounds: async () => await ipcRenderer.invoke('get-all-rounds'),
  getAthlAllScores: async () => await ipcRenderer.invoke('get-athl-scores'),
  getOppAllScores: async () => await ipcRenderer.invoke('get-opp-scores'),
  convertToPdf: () => ipcRenderer.send('print-to-pdf'),
  resetData: async () => await ipcRenderer.invoke('reset-data'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
