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
    comments: ''
  };
}

const matchData = { athlete: '', opponent: '', competition: '', division: 0 };
const round1Data = initializeRoundData();
const round2Data = initializeRoundData();
const round3Data = initializeRoundData();
const rounds = [ round1Data, round2Data, round3Data ];
const opponentScores = { 1: 0, 2: 0, 3: 0 }

export { matchData, rounds, opponentScores, initializeRoundData };

// Data saved for the session