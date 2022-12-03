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
camera.position.x = 10;
camera.position.y = 5;
camera.lookAt(0,0,0);

//Constructs the GLTF loader
const gltfLoader = new GLTFLoader();

//Objects gets constructed below:

//Lighting objects constructed:
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

//Plane object constructed
const geometry = new THREE.PlaneGeometry(100,100);
const material = new THREE.MeshBasicMaterial( {color: 0x008000} );
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI/2;
scene.add(plane);


//GLTF model of the AK47 constructed
let building1;
gltfLoader.load('/Models/Building1/Building1.gltf', function(gltf) {
    building1 = gltf.scene;
    scene.add(building1);
})

//Other logic

//When the window size changes the renderer gets re-adjusted to fit the window
window.addEventListener('resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {

    if(building1) {
        building1.rotation.y += 0.01;
    }

    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
