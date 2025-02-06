import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

// Get the container element.
const container = document.getElementById('three-container');

// Create a new scene.
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xFFFFFF, 100, 1000);

// Set up a perspective camera.
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

// Create a WebGL renderer with alpha enabled.
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
container.appendChild(renderer.domElement);

// Create PMREMGenerator for environment maps.
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// Create OrbitControls.
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;
controls.minDistance = 1;
controls.maxDistance = 20;

// Add lights.
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffff33, 1);
directionalLight2.position.set(0, 0, 0);
scene.add(directionalLight2);

// Load the glTF diamond model.
let model; // will hold our 3D object
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  '/models/diamond/scene.gltf',
  function (gltf) {
    model = gltf.scene;
    // (Optional) Override model materials if you want to force a certain look:
    model.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        // For example, force the use of an environment map:
        obj.material.envMap = scene.environment;
        obj.material.envMapIntensity = 1.0;
        obj.material.needsUpdate = true;
      }
    });
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error('Error loading glTF model:', error);
  }
);

// Load an environment texture and set it as the scene’s environment.
const textureLoader = new THREE.TextureLoader();
textureLoader.load('/models/diamond/env/rustig_koppie_puresky.jpg', (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  scene.environment = envMap;
  // If you want the background to be visible as well:
  // scene.background = envMap;
 // Option 1: White background
scene.background = new THREE.Color(0xF0F0F0);
renderer.setClearColor(0xFFFFFF, 0);
scene.background = null;
  texture.dispose();
  pmremGenerator.dispose();
});

// Handle window resize.
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Orbit speed adjustment.
const baseSpeed = 0.01;
let additionalSpeed = 0;
window.addEventListener('wheel', function (event) {
  const sensitivity = 0.0005;
  additionalSpeed += event.deltaY * sensitivity;
  additionalSpeed = Math.max(-0.05, Math.min(0.05, additionalSpeed));
}, false);

// POST-PROCESSING: Bloom
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const bloomParams = { strength: 1.25, radius: 0.4, threshold: 0.75 };
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(container.clientWidth, container.clientHeight),
  bloomParams.strength,
  bloomParams.radius,
  bloomParams.threshold
);
composer.addPass(bloomPass);

// Animation loop.
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  additionalSpeed *= 0.68;
  const currentSpeed = baseSpeed + additionalSpeed;
  if (model) {
    model.rotation.y += currentSpeed;
    model.rotation.x += currentSpeed / 100;
    model.rotation.z += currentSpeed * Math.cos(delta) / 100;
  }
  controls.update();
  composer.render();
}
animate();