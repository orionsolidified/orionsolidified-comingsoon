import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
    ORION_STARS,
    ORION_LINES,
    generateBackgroundStars,
    createStarGeometry,
    createStarMaterial,
    createConstellationLines
} from './constellation.js';
import { setupAnimation, setupControls } from './controls.js';

// Scene setup
const scene = new THREE.Scene();
const container = document.getElementById('canvas-container');

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 12);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Background gradient (night sky colors)
const backgroundGradient = new THREE.Color(0x0a0e27);
scene.background = backgroundGradient;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Add point lights for major stars
ORION_STARS.forEach(star => {
    if (star.magnitude < 2.0) { // Only brightest stars
        const light = new THREE.PointLight(star.color, 0.5, 50);
        light.position.set(...star.position);
        scene.add(light);
    }
});

// Create constellation group
const constellationGroup = new THREE.Group();

// Add constellation lines
const lines = createConstellationLines(ORION_STARS, ORION_LINES);
constellationGroup.add(lines);

// Add major stars
const starObjects = [];
ORION_STARS.forEach(star => {
    const geometry = createStarGeometry(star.size);
    const material = createStarMaterial(star.color, star.size);
    const starPoint = new THREE.Points(geometry, material);
    starPoint.position.set(...star.position);
    constellationGroup.add(starPoint);
    starObjects.push({ point: starPoint, originalSize: star.size, originalOpacity: material.opacity });
});

// Add background starfield
const backgroundStars = generateBackgroundStars(2000);
const bgStarPositions = [];
const bgStarColors = [];
const bgStarSizes = [];

backgroundStars.forEach(star => {
    bgStarPositions.push(...star.position);
    // Convert hex color to RGB (0xffffff = white)
    const color = new THREE.Color(star.color);
    bgStarColors.push(color.r, color.g, color.b);
    bgStarSizes.push(star.size * 50);
});

const bgStarGeometry = new THREE.BufferGeometry();
bgStarGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bgStarPositions, 3));
bgStarGeometry.setAttribute('color', new THREE.Float32BufferAttribute(bgStarColors, 3));
bgStarGeometry.setAttribute('size', new THREE.Float32BufferAttribute(bgStarSizes, 1));

const bgStarMaterial = new THREE.PointsMaterial({
    size: 1,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const bgStarField = new THREE.Points(bgStarGeometry, bgStarMaterial);
constellationGroup.add(bgStarField);

scene.add(constellationGroup);

// Setup controls
const controls = setupControls(camera, renderer);

// Setup animation
setupAnimation(starObjects, constellationGroup, controls, renderer, scene, camera);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
