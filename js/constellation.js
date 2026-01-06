import * as THREE from 'three';

// Orion Constellation Data
// Star positions are normalized to fit within a reasonable 3D space
// Colors match spectral classifications

export const ORION_STARS = [
    // Major stars with accurate colors and positions
    {
        name: 'Betelgeuse',
        position: [2.5, 3.5, 0], // Upper right (shoulder)
        color: 0xff6b35, // Reddish-orange (M1-2 Ia-ab)
        magnitude: 0.5,
        size: 0.15
    },
    {
        name: 'Rigel',
        position: [2.0, -3.0, 0.5], // Lower right (foot)
        color: 0x9bb0ff, // Blue-white (B8 Ia)
        magnitude: 0.18,
        size: 0.12
    },
    {
        name: 'Bellatrix',
        position: [-2.5, 3.0, 0], // Upper left (shoulder)
        color: 0xb8c5ff, // Blue-white (B2 III)
        magnitude: 1.64,
        size: 0.08
    },
    {
        name: 'Mintaka',
        position: [1.8, 0.2, 0], // Right belt star
        color: 0xffffff, // White (O9.5 II)
        magnitude: 2.23,
        size: 0.07
    },
    {
        name: 'Alnilam',
        position: [0, 0, 0], // Center belt star
        color: 0xa0b0ff, // Blue-white (B0 Ia)
        magnitude: 1.69,
        size: 0.09
    },
    {
        name: 'Alnitak',
        position: [-1.8, 0.2, 0], // Left belt star
        color: 0x9bb0ff, // Blue-white (O9.7 Ib)
        magnitude: 1.77,
        size: 0.08
    },
    {
        name: 'Saiph',
        position: [-2.0, -3.0, 0.5], // Lower left (knee)
        color: 0xa0b0ff, // Blue-white (B0.5 Ia)
        magnitude: 2.07,
        size: 0.08
    },
    // Orion's Sword stars
    {
        name: 'Iota Orionis',
        position: [0.3, -1.5, 0.2],
        color: 0xffffff,
        magnitude: 2.75,
        size: 0.06
    },
    {
        name: 'Theta Orionis',
        position: [0.5, -2.0, 0.3], // Trapezium cluster
        color: 0xa0b0ff,
        magnitude: 3.7,
        size: 0.05
    },
    {
        name: '42 Orionis',
        position: [0.2, -2.5, 0.2],
        color: 0xffffff,
        magnitude: 4.6,
        size: 0.04
    },
    // Additional bright stars
    {
        name: 'Pi3 Orionis',
        position: [-3.5, 1.5, 0],
        color: 0xfff5e1,
        magnitude: 3.19,
        size: 0.06
    },
    {
        name: 'Eta Orionis',
        position: [0.5, 1.8, 0],
        color: 0xb8c5ff,
        magnitude: 3.35,
        size: 0.05
    },
    {
        name: 'Sigma Orionis',
        position: [1.2, 0.8, 0],
        color: 0x9bb0ff,
        magnitude: 3.8,
        size: 0.04
    }
];

// Constellation lines connecting major stars
export const ORION_LINES = [
    // Belt
    ['Mintaka', 'Alnilam'],
    ['Alnilam', 'Alnitak'],
    // Body outline
    ['Betelgeuse', 'Mintaka'],
    ['Betelgeuse', 'Bellatrix'],
    ['Bellatrix', 'Alnitak'],
    ['Mintaka', 'Rigel'],
    ['Alnitak', 'Saiph'],
    ['Saiph', 'Rigel'],
    // Sword
    ['Alnilam', 'Iota Orionis'],
    ['Iota Orionis', 'Theta Orionis'],
    ['Theta Orionis', '42 Orionis']
];

// Generate background starfield
export function generateBackgroundStars(count = 2000) {
    const stars = [];
    for (let i = 0; i < count; i++) {
        // Random positions in a sphere around the constellation
        const radius = 15 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        // Random brightness (most stars are dim)
        const brightness = Math.random();
        const size = 0.01 + brightness * 0.02;
        
        stars.push({
            position: [x, y, z],
            color: 0xffffff,
            size: size,
            brightness: brightness
        });
    }
    return stars;
}

// Create star geometry and material
export function createStarGeometry(size) {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([0, 0, 0]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return geometry;
}

// Create glowing star material
export function createStarMaterial(color, size) {
    return new THREE.PointsMaterial({
        color: color,
        size: size * 100, // Scale up for visibility
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
}

// Create constellation line geometry
export function createConstellationLines(stars, lines) {
    const starMap = {};
    stars.forEach(star => {
        starMap[star.name] = star.position;
    });
    
    const lineGeometry = new THREE.BufferGeometry();
    const positions = [];
    
    lines.forEach(([start, end]) => {
        if (starMap[start] && starMap[end]) {
            positions.push(...starMap[start]);
            positions.push(...starMap[end]);
        }
    });
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4a5568,
        transparent: true,
        opacity: 0.3,
        linewidth: 1
    });
    
    return new THREE.LineSegments(lineGeometry, lineMaterial);
}
