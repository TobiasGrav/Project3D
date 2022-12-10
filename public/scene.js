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
let parkGeometry, parkMaterial, parkPlane, parkLength, parkHeight;

//Function responsible for initilizing the variables defined above
function createParkPlaneGeometry(length, height) {
    parkLength = length;
    parkHeight = height;
    parkGeometry = new THREE.PlaneBufferGeometry(parkLength, parkHeight, 3, 2);
    const count = parkGeometry.attributes.position.count;
    const colors = [];

    for ( let i = 0; i < count; i ++ ) {
        colors.push(1);
        colors.push(1);
        colors.push(1);
    }

    parkGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const parkMaterial = new THREE.MeshBasicMaterial( {wireframe: true, vertexColors: true} );

    parkPlane = new THREE.Mesh(parkGeometry, parkMaterial);
    parkPlane.rotation.x = -Math.PI/2;
    scene.add(parkPlane);
};

//initializes the parkPlane
createParkPlaneGeometry(30, 20);

//Function which gets a list of numbers and rearanges them into a list that consists of multiple (x,y,z) values
function getPoints(geometry) {
    const points = [];
    for ( let i = 0; i < count; i ++ ) {
        const point = [];
        point.push(geometry.attributes.position.getX(i));
        point.push(geometry.attributes.position.getY(i));
        point.push(geometry.attributes.position.getZ(i));
        points.push(point);
    }
    return points;
}

function tickHeat(vertexIndex) {
    const heatTickValue = 0.0027778 //2 / (12*60); // this is the value which will tick the rgb value, why 2 / (12*60)? this is the amount of minutes in a day.
    const vertexColor = parkGeometry.attributes.color;
    const vertexCurrentColor = [vertexColor.getX(vertexIndex), vertexColor.getY(vertexIndex), vertexColor.getZ(vertexIndex)];
    
    if(vertexCurrentColor[2] > 0) {
        vertexColor.setZ(vertexIndex, vertexCurrentColor[2] - heatTickValue);
        
    } else {
        vertexColor.setY(vertexIndex, vertexCurrentColor[1] - heatTickValue);
    }

    if(vertexColor.getZ(vertexIndex) < 0) {
        vertexColor.setZ(vertexIndex, 0);
    }
    if(vertexColor.getY(vertexIndex) < 0) {
        vertexColor.setY(vertexIndex, 0);
    }
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

// gets the points of all the vertices in the world position
function getWorldVerticesPoints() {

}

function checkForSun(vertexIndex) {
    const vertexPosition = parkGeometry.attributes.position;
    const LocalVertexIndexPoint = new THREE.Vector3(vertexPosition.getX(vertexIndex), vertexPosition.getY(vertexIndex), vertexPosition.getZ(vertexIndex));
    const WorldVertexIndexPoint = LocalVertexIndexPoint.applyQuaternion(parkPlane.quaternion) //applies the quaternion from the world object to the vertex point, so that we get the correct rotation of the vecore
    const rayVector = new THREE.Vector3(0, Math.sin(sunAngle), -Math.cos(sunAngle));

    const rayCaster = new THREE.Raycaster();
    rayCaster.set(WorldVertexIndexPoint, rayVector, 0, 10);
    parkGeometry.attributes.color.setY(vertexIndex, 0);
    parkGeometry.attributes.color.setZ(vertexIndex, 0);
    scene.add(new THREE.ArrowHelper(rayVector, WorldVertexIndexPoint, 10, 0xff0000));
}

//When the window size changes the renderer gets re-adjusted to fit the window
window.addEventListener('resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var sunAngle = 0;
var sunTick = 0;

//tickHeat(Math.floor(Math.random() * parkGeometry.attributes.position.count));

window.setTimeout(function(){
    for(;sunTick < 720;) {
    for(let i = 0; i < parkGeometry.attributes.position.count; i++) {
        checkForSun(i);
    }
    sunAngle += Math.PI/720;
    sunTick++;
};
}, 1000);

function animate() {

    parkGeometry.attributes.color.needsUpdate = true;

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
