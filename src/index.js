import "./style.css"
import Simulation from "./simulation";

// TODO: implement stable orbits examples: https://math.stackexchange.com/questions/1613765/simple-stable-n-body-orbits-in-the-plane-with-some-fixed-bodies-allowed

let simulation = null;
let params = {
  speedC: 0.1,
  gravityC: 0.002,
  showPath: true,
  planetsCount: 10,
};

window.addEventListener('load', onLoad);
getById('open-menu').addEventListener('click', openMenu);
getById('start-simulation').addEventListener('click', startSimulation);

// params input change events
getById('gravity-const').addEventListener('input', onInputChange);
getById('speed-const').addEventListener('input', onSpeedChange);
getById('planets-count').addEventListener('input', onInputChange);
getById('show-path').addEventListener('input', onShowPathChange);
getById('show-v-vectors').addEventListener('input', onShowVelocityVectorsChange);
getById('show-a-vectors').addEventListener('input', onShowAccVectorsChange);

function onLoad () {
  openMenu();
  updateViewElements();
  startSimulation();
}


function onInputChange () {
  let planetsCInput = Number.parseFloat(getById('planets-count').value);
  if (!isNaN(planetsCInput)) params.planetsCount = planetsCInput;

  let gravityCInput = Number.parseFloat(getById('gravity-const').value);
  if (!isNaN(gravityCInput)) params.gravityC = gravityCInput;

  params.showPath = getById('show-path').checked;

  startSimulation();
}

function onSpeedChange () {
  let speedCInput = Number.parseFloat(getById('speed-const').value);
  if (!isNaN(speedCInput)) params.speedC = speedCInput;
  simulation.params.speedC = params.speedC;
}

function onShowPathChange () {
  // if show-path input changes don't reinitialize simulation
  params.showPath = getById('show-path').checked;
  simulation.params.showPath = params.showPath;
}

function onShowVelocityVectorsChange () {
  params.showVelocityVectors = getById('show-v-vectors').checked;
  simulation.params.showVelocityVectors = params.showVelocityVectors;
}

function onShowAccVectorsChange () {
  params.showAccVectors = getById('show-a-vectors').checked;
  simulation.params.showAccVectors = params.showAccVectors;
}

function startSimulation () {
  if (simulation) {
    simulation.destroy();
    simulation = new Simulation(params);
    simulation.start();
  } else {
    simulation = new Simulation(params);
    simulation.start();
  }
}

function updateViewElements () {
  getById('gravity-const').value = params.gravityC;
  getById('speed-const').value = params.speedC;
  getById('planets-count').value = params.planetsCount;
  getById('show-path').checked = params.showPath;
}

function openMenu () {
  $("#intro-modal").modal({
    fadeDuration: 100
  });
}

function getById (id) {
  return document.getElementById(id);
}