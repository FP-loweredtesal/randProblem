var problems;
const gogogo = document.getElementById('problem-display');
gogogo.innerHTML = `Waiting`;
$.get("https://codeforces.com/api/problemset.problems", function (problemList) {
  problems = problemList.result.problems;
  gogogo.innerHTML = `OK`;
});
function randomNum(minNum,maxNum){
    const a = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    return a;
}
function check(requirements, prob) {
  var res = true;
  if (prob.rating < requirements.L || prob.rating > requirements.R) {
    return false;
  }
  if (prob.contestId < requirements.L_id || prob.contestId > requirements.R_id) {
    return false;
  }
  var m = requirements.tags.length;
  var k = prob.tags.length;
  var flg = false;
  for (var i = 0; i < m; i ++) {
    flg = false;
    for (var j = 0; j < k; j ++) {
      if (prob.tags[j] == requirements.tags[i])
        flg = true;
    }
    if (flg == false) {
      return false;
    }
  }
  m = requirements.ban.length;
  for (i = 0; i < m; i ++) {
    flg = true;
    for (j = 0; j < k; j ++) {
      if (prob.tags[j] == requirements.ban[i])
        flg = false;
    }
    if (flg == false) {
      return false;
    }
  }
  return true;
}
document.getElementById('fetch-problem').addEventListener('click', async () => {
  const L_id = parseInt(document.getElementById('minimum_id').value);
  const R_id = parseInt(document.getElementById('maximum_id').value);
  const L = parseInt(document.getElementById('minimum').value);
  const R = parseInt(document.getElementById('maximum').value);
  const tags = [...window.positive];
  const ban = [...window.negative];
  const requirements = {
    L_id,
    R_id,
    L,
    R,
    diff: true,
    tags,
    ban
  };
  // console.log(requirements);
  var lst = [];
  // console.log(requirements);
  for (var i = 0; i < problems.length; i ++) {
    if (check(requirements, problems[i])) {
      lst.push(i);
    }
  }
  if (lst.length == 0) {
    const display = document.getElementById('problem-display');
    display.innerHTML = "No such Problem!";
    throw new Error(`Error: No such problem`);
  } else {
    var wjc = problems[lst[randomNum(0, lst.length - 1)]];
    console.log(wjc);
    displayProblem(wjc);
  }
});

function displayProblem(problem) {
  const display = document.getElementById('problem-display');
  display.innerHTML = `Go:${problem.contestId}${problem.index}`;
}
