import * as THREE from "three";
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "./OrbitControls.js";

//Constructs the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Constructs the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('gray');

//Constructs the camera and camera controls
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls(camera, renderer.domElement);

//Constructs the GLTF loader
const gltfLoader = new GLTFLoader();

//Objects gets constructed below:

//Lighting objects constructed:
const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
scene.add(directionalLight);

//GLTF model of the AK47 constructed
let object_AK47;
gltfLoader.load('/Models/AK47/scene.gltf', function(gltf) {
    object_AK47 = gltf;
    scene.add(gltf.scene);
})

//Other logic

//When the window size changes the renderer gets re-adjusted to fit the window
window.addEventListener('resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

camera.position.x = 10;

function animate() {
	
    if(object_AK47) {
        object_AK47.scene.scale.set(1,1,1)
    }

    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
