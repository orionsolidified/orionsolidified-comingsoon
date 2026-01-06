import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Setup OrbitControls for interactive camera
export function setupControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 25;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.enablePan = false;
    return controls;
}

// Setup animation loop with twinkling and rotation
export function setupAnimation(starObjects, constellationGroup, controls, renderer, scene, camera) {
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Update controls
        controls.update();
        
        // Slow rotation of constellation
        constellationGroup.rotation.y += 0.001;
        
        // Twinkling effect on stars
        starObjects.forEach((starObj, index) => {
            const twinkle = Math.sin(time * 2 + index) * 0.3 + 0.7;
            starObj.point.material.opacity = starObj.originalOpacity * twinkle;
            starObj.point.material.size = starObj.originalSize * 100 * (0.8 + twinkle * 0.2);
        });
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
}
