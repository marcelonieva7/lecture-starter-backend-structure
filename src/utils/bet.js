const getWinner = (score) => {
  const [w1, w2] = score.split(":");
  if(+w1 > +w2) {
    return "w1";
  } else if(+w2 > +w1) {
    return "w2";
  } else {
    return "x";
  }
}

const getMultiplier = (prediction, odds) => {
  const oddsMap = {
    w1: odds.homeWin,
    w2: odds.awayWin,
    x: odds.draw
  }

  return oddsMap[prediction];
}

module.exports = { getWinner, getMultiplier };
