import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/ShaderPass.js';

// --- SET UP THE SCENE, CAMERA, RENDERER ---

const container = document.getElementById('three-container');

const scene = new THREE.Scene();
// Set fog (background color is a solid color that won’t be bloomed)
scene.fog = new THREE.Fog(0xF0F0F0, 10, 100);
scene.background = new THREE.Color(0xF0F0F0);

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(-2.805097861019983, -0.4373773903776227, 2.83441);
// Update camera rotation to match provided values:
camera.rotation.set(0.15545968759966916, -0.8687119579533478, 0.11909239365298799);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
container.appendChild(renderer.domElement);

// PMREMGenerator is used to convert equirectangular images to environment maps.
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// --- SET UP ORBIT CONTROLS ---

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;
controls.minDistance = 1;
controls.maxDistance = 20;

// --- ADD LIGHTING ---

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffff33, 1);
directionalLight2.position.set(0, 0, 0);
scene.add(directionalLight2);

// --- ADD SPARKLE PARTICLES ---
// These particles will "twinkle" based on additionalSpeed (which increases during scrolling)
const sparkleCount = 200;
const positions = new Float32Array(sparkleCount * 3);
const sparkleRange = 3; // adjust as desired for distribution area
for (let i = 0; i < sparkleCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * sparkleRange;
  positions[i * 3 + 1] = (Math.random() - 0.5) * sparkleRange;
  positions[i * 3 + 2] = (Math.random() - 0.5) * sparkleRange;
}
const sparkleGeometry = new THREE.BufferGeometry();
sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const sparkleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.05,
  transparent: true,
  opacity: 0.0, // start invisible
  depthWrite: false,
});
const sparkleParticles = new THREE.Points(sparkleGeometry, sparkleMaterial);
scene.add(sparkleParticles);

// --- SET UP SELECTIVE BLOOM PARAMETERS ---

// Define two layers: the default layer (0) and the bloom layer (1).
const ENTIRE_SCENE = 0;
const BLOOM_SCENE = 1;
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

// We'll use a dark material to temporarily hide non‐bloom objects during the bloom render.
const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
const materials = {}; // To store original materials

function darkenNonBloomed(obj) {
  if (obj.isMesh && (obj.layers.test(bloomLayer) === false)) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

// --- LOAD THE ENVIRONMENT TEXTURE ---
const textureLoader = new THREE.TextureLoader();
textureLoader.load('/models/diamond/env/galaxyblue.png', (texture) => {
  // Convert the equirectangular texture to an environment map.
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  scene.environment = envMap;

  if (model) {
    // Update model position and rotation to match provided values:
    model.position.set(0, 0, 0);
    model.rotation.set(0.5456394889839064, 0.9563948898391167, 0.01912789779678262);
  }
  // Background remains solid (#F0F0F0) because we do not assign it the envMap.
  texture.dispose();
  pmremGenerator.dispose();
});

// --- LOAD THE DIAMOND MODEL (glTF) ---

let model; // to hold the loaded model
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  '/models/diamond/scene.gltf',
  (gltf) => {
    model = gltf.scene;
    // Set model rotation to the provided values instead of the default rotation.
    model.rotation.set(0.5456394889839064, 0.9563948898391167, 0.01912789779678262);
    // Enable bloom only on the diamond by setting its layer to BLOOM_SCENE.
    model.traverse((obj) => {
      if (obj.isMesh) {
        obj.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        obj.layers.enable(BLOOM_SCENE);

        obj.material.roughness = 0.3;
        obj.material.metalness = 1;
      }
      // For glTF you might already have the correct settings, but in case not:
      // obj.material.transparent = true;
      // If the glTF uses transmission, you can also set:
      // obj.material.transmission = 1.0; 
      // obj.material.refractionRatio = 10;
    });
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('Error loading glTF model:', error);
  }
);

// --- HANDLE WINDOW RESIZE ---

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
  bloomComposer.setSize(container.clientWidth, container.clientHeight);
  finalComposer.setSize(container.clientWidth, container.clientHeight);
}

// --- SET UP POST-PROCESSING ---

// First, create a RenderPass for the scene.
const renderPass = new RenderPass(scene, camera);

// Then, create the bloom pass.
const bloomParams = { strength: 1.25, radius: 0.6, threshold: 0.65 };
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(container.clientWidth, container.clientHeight),
  bloomParams.strength,
  bloomParams.radius,
  bloomParams.threshold
);

// Create a composer for rendering the bloom.
const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderPass);
bloomComposer.addPass(bloomPass);

// Next, create a final shader pass to composite the bloom over the scene.
const finalShader = {
  uniforms: {
    baseTexture: { value: null },
    bloomTexture: { value: bloomComposer.renderTarget2.texture }
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D baseTexture;
    uniform sampler2D bloomTexture;
    varying vec2 vUv;
    void main() {
      gl_FragColor = texture2D(baseTexture, vUv) + texture2D(bloomTexture, vUv);
    }
  `
};

const finalPass = new ShaderPass(new THREE.ShaderMaterial(finalShader), 'baseTexture');
finalPass.needsSwap = true;

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderPass);
finalComposer.addPass(finalPass);

// --- ORBIT SPEED AND SCROLL-BASED SPARKLE INTENSITY ---

let additionalSpeed = 0;
// Define the wheel event listener as a separate function.
const wheelListener = function (event) {
  const sensitivity = 0.001;
  additionalSpeed += event.deltaY * sensitivity;
  additionalSpeed = Math.max(-0.05, Math.min(0.05, additionalSpeed));
};

// Use an IntersectionObserver to activate the wheel listener only when the parent section is visible.
let wheelActive = false;
const parentSection = container.parentElement;
const observerOptions = {
  root: null,
  threshold: 0.1, // Adjust the threshold as needed
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!wheelActive) {
        window.addEventListener('wheel', wheelListener, false);
        wheelActive = true;
      }
    } else {
      if (wheelActive) {
        window.removeEventListener('wheel', wheelListener, false);
        wheelActive = false;
      }
    }
  });
}, observerOptions);

if (parentSection) {
  observer.observe(parentSection);
} else {
  // Fallback: If no parent section is found, add the listener by default.
  window.addEventListener('wheel', wheelListener, false);
}

// --- ANIMATION LOOP ---

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  additionalSpeed *= 0.98; // decay the additional speed gradually
  const currentSpeed = 0.001 + additionalSpeed;
  
  if (model) {
    model.rotation.y += currentSpeed;
    // (Optional extra rotations)
    model.rotation.x += currentSpeed / 100;
    model.rotation.z += currentSpeed / 50;
  }
  controls.update();
  
  // --- Update Sparkle Particle Effect ---
  // The sparkle intensity is linked to the absolute value of additionalSpeed.
  // Maximum additionalSpeed (0.05) scaled by a factor (20) gives an intensity up to 1.
  if (sparkleParticles) {
    const intensityFactor = Math.min(1.0, Math.abs(additionalSpeed) * 5);
    // Add a twinkling effect with a sine modulation.
    const twinkle = 0.8 + 0.2 * Math.sin(clock.elapsedTime * 10);
    sparkleParticles.material.opacity = intensityFactor * twinkle;
    // Optionally, add a slight rotation linked to scrolling.
    sparkleParticles.rotation.y += additionalSpeed * 0.5;
  }
  
  // --- RENDER BLOOM PASS WITHOUT THE BACKGROUND ---
  const currentBackground = scene.background;
  scene.background = null;

  // Darken all non-bloom objects.
  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.traverse(restoreMaterial);

  // Restore the scene background for the final composite.
  scene.background = currentBackground;
  // console.log(model?.position);
  // console.log(camera.position);
  // console.log(model?.rotation);
  // console.log(camera.rotation);

  // --- RENDER FINAL COMPOSITE (bloom + normal scene) ---
  finalComposer.render();
}

animate();