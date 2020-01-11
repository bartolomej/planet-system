import "./style.css"
import Simulation from "./simulation";

// TODO: zoom in/out feature

window.addEventListener('load', onLoad);
getById('open-menu').addEventListener('click', openMenu);
getById('start-simulation').addEventListener('click', startSimulation);

// params input change events
getById('gravity-const').addEventListener('input', onInputChange);
getById('speed-const').addEventListener('input', onInputChange);
getById('planets-count').addEventListener('input', onInputChange);
getById('show-path').addEventListener('input', onShowPathChange);

function onLoad () {
  openMenu();
  updateViewElements();
  startSimulation();
}

let simulation = null;
let params = {
  speedC: 0.1,
  gravityC: 0.002,
  showPath: true,
  planetsCount: 10,
};

function onInputChange () {
  let planetsCInput = Number.parseFloat(getById('planets-count').value);
  if (!isNaN(planetsCInput)) params.planetsCount = planetsCInput;

  let gravityCInput = Number.parseFloat(getById('gravity-const').value);
  if (!isNaN(gravityCInput)) params.gravityC = gravityCInput;

  let speedCInput = Number.parseFloat(getById('speed-const').value);
  if (!isNaN(speedCInput)) params.speedC = speedCInput;

  params.showPath = getById('show-path').checked;

  startSimulation();
}

function onShowPathChange () {
  // if show-path input changes don't reinitialize simulation
  params.showPath = getById('show-path').checked;
  simulation.params.showPath = params.showPath;
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