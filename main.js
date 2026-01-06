import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Optional: make it a true background layer
renderer.domElement.style.position = "fixed";
renderer.domElement.style.inset = "0";
renderer.domElement.style.zIndex = "-1";

const scene = new THREE.Scene();

// Orthographic camera (we'll treat world units as screen units)
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
camera.position.z = 1;

// Plane
const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let imgAspect = 1; // will be set after texture loads

const loader = new THREE.TextureLoader();
loader.load("/sitebackground.webp", (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  material.map = texture;
  material.needsUpdate = true;

  // Read image dimensions once available
  const { width, height } = texture.image;
  imgAspect = width / height;

  resize();     // fit correctly
  renderOnce(); // draw
});

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);

  // Set camera bounds to match viewport aspect in "world units"
  const viewAspect = w / h;
  camera.left = -viewAspect;
  camera.right = viewAspect;
  camera.top = 1;
  camera.bottom = -1;
  camera.updateProjectionMatrix();

  // Cover logic: scale plane so it fully covers camera view
  // Camera view size: width = 2*viewAspect, height = 2
  const viewW = 2 * viewAspect;
  const viewH = 2;

  // Plane base size is 1x1, but texture aspect matters.
  // We'll scale X and Y so the textured plane covers the view.
  const planeAspect = imgAspect;

  let scaleX, scaleY;
  if (viewAspect > planeAspect) {
    // viewport wider -> match width, crop height
    scaleX = viewW;
    scaleY = viewW / planeAspect;
  } else {
    // viewport taller -> match height, crop width
    scaleY = viewH;
    scaleX = viewH * planeAspect;
  }

  mesh.scale.set(scaleX, scaleY, 1);
}

function renderOnce() {
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  resize();
  renderOnce();
});
