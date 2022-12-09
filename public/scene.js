import * as THREE from "three";
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "./OrbitControls.js";
import { VertexNormalsHelper } from './jsm/helpers/VertexNormalsHelper.js';
import { PlaneGeometry } from "three";

//Constructs the renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Constructs the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xBBDDFF);

//Constructs the camera and camera controls
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.x = 50;
camera.position.y = 20;
camera.lookAt(0,0,0);

const rayCaster = new THREE.Raycaster();

//Constructs the GLTF loader
const gltfLoader = new GLTFLoader();

//Objects gets constructed below:

//Lighting objects constructed:
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

//Defined the objects belonging to the parkPlane mesh
let parkGeometry, parkMaterial, parkPlane;

//Function responsible for initilizing the variables defined above
function createParkPlaneGeometry() {
    parkGeometry = new THREE.PlaneBufferGeometry(10,15, 100, 150);
    const count = parkGeometry.attributes.position.count;
    const colors = [];

    for ( let i = 0; i < count; i ++ ) {
        colors.push(1);
        colors.push(1);
        colors.push(1);
    }

    parkGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const parkMaterial = new THREE.MeshBasicMaterial( {wireframe: false, vertexColors: true} );

    parkPlane = new THREE.Mesh(parkGeometry, parkMaterial);
    parkPlane.rotation.x = -Math.PI/2;
    scene.add(parkPlane);
};

//initializes the parkPlane
createParkPlaneGeometry();

//Function which gets a list of numbers and rearanges them into a list that consists of multiple (x,y,z) values
function getPoints(mesh) {
    const points = [];
    for ( let i = 0; i < count; i ++ ) {
        const point = [];
        point.push(PlaneGeometry.attributes.position.getX(i));
        point.push(PlaneGeometry.attributes.position.getY(i));
        point.push(PlaneGeometry.attributes.position.getZ(i));
        points.push(point);
    }
    return points;
}

//Red box object constructed
const redBoxGeometry = new THREE.BoxGeometry(1,1);
const redMeshMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
const redBox = new THREE.Mesh(redBoxGeometry, redMeshMaterial);
redBox.position.x = 25;
scene.add(redBox);

//Blue box object constructed
const blueBoxGeometry = new THREE.BoxGeometry(1,1);
const blueMeshMaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
const blueBox = new THREE.Mesh(blueBoxGeometry, blueMeshMaterial);
blueBox.position.y = 25;
scene.add(blueBox);

//green box object constructed
const greenBoxGeometry = new THREE.BoxGeometry(1,1);
const greenMeshMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const greenBox = new THREE.Mesh(greenBoxGeometry, greenMeshMaterial);
greenBox.position.z = 25;
scene.add(greenBox);



    /*
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

*/

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
