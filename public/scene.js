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
camera.position.x = 50;
camera.position.y = 20;
camera.lookAt(0,0,0);

//Constructs the GLTF loader
const gltfLoader = new GLTFLoader();

//Objects gets constructed below:

//Lighting objects constructed:
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

//Plane object constructed
const geometry = new THREE.PlaneGeometry(50,50);
const material = new THREE.MeshBasicMaterial( {color: 0x008000} );
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI/2;
scene.add(plane);


//GLTF model of the Building1 constructed
let building1;
gltfLoader.load('/Models/Building1/Building1.gltf', function(gltf) {
    building1 = gltf.scene;
    scene.add(building1);
})

//GLTF model of the Building1 constructed
let building2;
gltfLoader.load('/Models/Hospital/Hospital.glb', function(gltf) {
    building2 = gltf.scene;
    building2.position.x = 23.5;
    building2.position.z = 20;
    scene.add(building2);
})

//GLTF model of building 1
let hospital;
gltfLoader.load('/Models/Hospital/Hospital.glb', function(gltf){
    hospital = gltf.scene;
    hospital.position.x = 10;
    hospital.position.z = 22;
    scene.add(hospital);
})

let Bank;
gltfLoader.load('/Models/Bank/Bank.glb', function(gltf){
    Bank = gltf.scene;
    Bank.position.x = 17;
    scene.add(Bank);
})

let LightRedFlat;
gltfLoader.load('/Models/LightRedFlat/LightRedFlat.glb', function(gltf){
    LightRedFlat = gltf.scene;
    LightRedFlat.position.x = 15;
    scene.add(LightRedFlat);
})

let OrangeHouse;
gltfLoader.load('/Models/OrangeHouse/OrangeHouse.glb', function(gltf){
    OrangeHouse = gltf.scene;
    OrangeHouse.position.x = 20;
    scene.add(OrangeHouse);
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

    /*if(building1) {
        building1.rotation.y += 0.01;
    }
    if(building2) {
        building2.rotation.y += 0.01;
    }*/

    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
