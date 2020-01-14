import "./style.css"
import Simulation from "./simulation";

// TODO: implement stable orbits examples: https://math.stackexchange.com/questions/1613765/simple-stable-n-body-orbits-in-the-plane-with-some-fixed-bodies-allowed

let simulation = null;
let params = {
  speedC: 0.1,
  gravityC: 0.0004,
  planetsCount: 10,
};

window.addEventListener('load', onLoad);
getById('open-menu').addEventListener('click', openMenu);

// params input change events
getById('gravity-const').addEventListener('input', onGChange);
getById('speed-const').addEventListener('input', onSpeedChange);
getById('planets-count').addEventListener('input', onPlanetsChange);

function onLoad () {
  openMenu();
  updateViewElements();
  startSimulation();
}

function onPlanetsChange () {
  let planetsCInput = Number.parseFloat(getById('planets-count').value);
  if (!isNaN(planetsCInput)) params.planetsCount = planetsCInput;

  startSimulation();
}

function onSpeedChange () {
  let speedCInput = Number.parseFloat(getById('speed-const').value);
  if (!isNaN(speedCInput)) params.speedC = speedCInput;
  simulation.params.speedC = params.speedC;
}

function onGChange () {
  let gravityInput = Number.parseFloat(getById('gravity-const').value);
  if (!isNaN(gravityInput)) params.gravityC = gravityInput;
  simulation.params.gravityC = params.gravityC;
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
  document.getElementById('btn-container').classList.add('animate-in');
}

function getById (id) {
  return document.getElementById(id);
}