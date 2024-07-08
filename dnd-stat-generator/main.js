const $generate_score_form = document.getElementById('score_generate')

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

$generate_score_form.addEventListener('submit', function (event) {
  event.preventDefault();
  let scoreArray = createAbilityScores('random');
  console.log(scoreArray);
  const $abilityScoresP = document.getElementById("ability_scores");
  let modsArray = generateAbilityMods(scoreArray);
  console.log(modsArray);
  $abilityScoresP.innerHTML = printAbilityScores(scoreArray, modsArray);
});

function createAbilityScores(method) {
  let tempScoreArray = [];
  if (method === 'random') {
    for (let i = 0; i < 6; i++) {
      let tempStatNums = [];
      for (let y = 0; y < 4; y++) {
        tempStatNums.push(getRandInt(1, 6));
      }
      tempStatNums.sort();
      tempStatNums.shift();
      // console.log(tempStatNums);
      let tempScoreTotal = tempStatNums[0] + tempStatNums[1] + tempStatNums[2];
      tempScoreArray.push(tempScoreTotal);
    }
    tempScoreArray.sort(function(a, b) {
      return b - a;
    });
    // console.log(tempScoreArray);
    return tempScoreArray;
  }
}

function generateAbilityMods(_scores) {
  let tempModsArray = [];
  for (let i = 0; i < _scores.length; i++) {
    const tempMod = Math.floor((_scores[i] - 10) / 2);
    tempModsArray.push(tempMod);
  }
  return tempModsArray;
}

function printAbilityScores(_scores, _mods) {
  let message = "";
  for (let i = 0; i < 6; i++) {
    if (_mods[i] >= 0) {
      message += String(_scores[i]) + " (+" + String(_mods[i]) + ")<br>";
    } else {
      message += " " + String(_scores[i]) + " (" + String(_mods[i]) + ")<br>";
    }
  }
  return message;
}