import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const IMAGE_URL = "./sitebackground.webp";

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Scene + ortho camera (no perspective distortion)
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
camera.position.z = 1;

// Fullscreen textured plane
const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial();
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

let imgAspect = 1; // width/height after texture load

const loader = new THREE.TextureLoader();
loader.load(
  IMAGE_URL,
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    material.map = texture;
    material.needsUpdate = true;

    imgAspect = texture.image.width / texture.image.height;

    resize();     // fit to viewport
    renderOnce(); // draw once (static background)
  },
  undefined,
  (err) => console.error("Texture load failed:", err)
);

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const viewAspect = w / h;

  renderer.setSize(w, h);

  // Camera view: height is 2 units; width is 2*viewAspect units
  camera.left = -viewAspect;
  camera.right = viewAspect;
  camera.top = 1;
  camera.bottom = -1;
  camera.updateProjectionMatrix();

  // "cover" scaling (like CSS background-size: cover)
  const viewW = 2 * viewAspect;
  const viewH = 2;

  let scaleX, scaleY;
  if (viewAspect > imgAspect) {
    // viewport wider than image -> match width, crop height
    scaleX = viewW;
    scaleY = viewW / imgAspect;
  } else {
    // viewport taller than image -> match height, crop width
    scaleY = viewH;
    scaleX = viewH * imgAspect;
  }

  plane.scale.set(scaleX, scaleY, 1);
}

function renderOnce() {
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  resize();
  renderOnce();
});
