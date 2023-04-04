import "./style.css";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const clock = new THREE.Clock();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141414);

const loader = new OBJLoader();
loader.load(
  "models/editeded.obj",
  (object) => {
    object.position.set(20, 0, 20);
    object.scale.set(1.6, 1.6, 1.6);
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function () {
    console.log("An error happened");
  }
);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg") as HTMLCanvasElement,
});
const radius = 30;
const initAngle = 20;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TetrahedronGeometry(10, 3);
const torus = new THREE.Mesh(geometry);
torus.material = new THREE.MeshStandardMaterial({
  transparent: true,
  opacity: 0,
  color: 0x00ff00,
});

camera.position.set(
  radius * Math.cos(initAngle),
  40,
  radius * Math.sin(initAngle)
);
camera.lookAt(torus.position);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(torus, ambientLight, camera);

function rotateCam() {
  clock.getDelta();

  const rotationSpeed = 0.025;
  let angle = Math.atan2(
    camera.position.z - torus.position.z,
    camera.position.x - torus.position.x
  );
  angle += rotationSpeed;

  camera.position.x = torus.position.x + radius * Math.cos(angle);
  camera.position.z = torus.position.z + radius * Math.sin(angle);
  camera.lookAt(torus.position);
}
document.body.onscroll = rotateCam;

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
