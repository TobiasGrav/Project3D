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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // soft white light
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight(0xffDDCC, 1);
scene.add(directionalLight);

//Defined the objects belonging to the parkPlane mesh
let parkGeometry, parkMaterial, parkPlane, parkLength, parkHeight, parkLengthVertices, parkHeightVertices;

//Function responsible for initilizing the variables defined above
function createParkPlaneGeometry(length, height, verLen, verHei) {
    parkLength = length;
    parkHeight = height;
    parkLengthVertices = verLen + 1;
    parkHeightVertices = verHei + 1;
    parkGeometry = new THREE.PlaneBufferGeometry(parkLength, parkHeight, verLen, verHei);
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
createParkPlaneGeometry(30, 20, 30, 20);

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
    const heatTickValue = 0.04 //2 / (12*60); // this is the value which will tick the rgb value, why 2 / (12*60)? this is the amount of minutes in a day.
    const vertexColor = parkGeometry.attributes.color;
    const vertexCurrentColor = [vertexColor.getX(vertexIndex), vertexColor.getY(vertexIndex), vertexColor.getZ(vertexIndex)];
    
    if(vertexCurrentColor[2] > 0) {
        vertexColor.setZ(vertexIndex, vertexCurrentColor[2] - heatTickValue);
        
    } else if(vertexCurrentColor[1] > 0) {
        vertexColor.setY(vertexIndex, vertexCurrentColor[1] - heatTickValue);
    };
};

////Red box object constructed
//const redBoxGeometry = new THREE.BoxGeometry(1,1);
//const redMeshMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
//const redBox = new THREE.Mesh(redBoxGeometry, redMeshMaterial);
//redBox.position.x = 25;
//scene.add(redBox);
//
////Blue box object constructed
//const blueBoxGeometry = new THREE.BoxGeometry(15,5,5);
//const blueMeshMaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
//const blueBox = new THREE.Mesh(blueBoxGeometry, blueMeshMaterial);
//blueBox.position.y = 25;
//scene.add(blueBox);
//
////green box object constructed
//const greenBoxGeometry = new THREE.BoxGeometry(1,1);
//const greenMeshMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
//const greenBox = new THREE.Mesh(greenBoxGeometry, greenMeshMaterial);
//greenBox.position.z = 25;
//scene.add(greenBox);

//Constructing a sun didnt work since it gets detected by the ray casted.
const sunGeometry = new THREE.SphereGeometry(5,10,10);
const sunMaterial = new THREE.MeshBasicMaterial( {color: 0xffEE00} );
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.z = 50;
scene.add(sun);

//GLTF model of the Building1 constructed
gltfLoader.load('/Models/Fountain/Fountain.glb', function(gltf) {
    const fountain = gltf.scene;
    fountain.scale.set(3, 3, 3);
    console.log(fountain.scale);

    scene.add(fountain);
})

gltfLoader.load('/Models/MiddleTree/MiddleTree.glb', function(gltf) {
    const middleTree1 = gltf.scene;
    middleTree1.scale.set(6, 6, 6);
    const middleTree2 = middleTree1.clone();

    middleTree1.position.x = 5.5;
    middleTree1.position.z = -8;

    middleTree2.position.x = -5.5;
    middleTree2.position.z = -8;

    scene.add(middleTree1);
    scene.add(middleTree2);
})

gltfLoader.load('/Models/Bench/Bench.glb', function(gltf) {
    const bench1 = gltf.scene;
    bench1.scale.set(0.9, 0.9, 0.9);
    console.log(bench1.scale);
    const bench2 = bench1.clone();
    const bench3 = bench1.clone();
    
    bench1.rotation.y = Math.PI/2;
    bench1.position.x;
    bench1.position.z = -8;
    
    bench2.rotation.y = Math.PI/2;
    bench2.position.x = 10;
    bench2.position.z = -8;

    bench3.rotation.y = Math.PI/2;
    bench3.position.x = -10;
    bench3.position.z = -8;

    scene.add(bench1);
    scene.add(bench2);
    scene.add(bench3);
})

gltfLoader.load('/Models/Rock/Rock.glb', function(gltf) {
    const rock = gltf.scene;
    scene.add(rock);
    rock.position.x = -9;
    rock.position.z = 7;
})

//Other logic

function updateSunPosition() {
    sun.position.y = sunAngleSin * 200;
    sun.position.z = sunAngleCos * 200;
}

// gets the points of all the vertices in the world position
let worldVertexPoints;
function getWorldVerticesPoints() {
    worldVertexPoints = []
    for(let i = 0; i < parkGeometry.attributes.position.count; i++) {
        const vertexPosition = parkGeometry.attributes.position;
        const LocalVertexIndexPoint = new THREE.Vector3(vertexPosition.getX(i), vertexPosition.getY(i), vertexPosition.getZ(i));
        const worldVertexIndexPoint = LocalVertexIndexPoint.applyQuaternion(parkPlane.quaternion) //applies the quaternion from the world object to the vertex point, so that we get the correct rotation of the vecore
        worldVertexPoints.push(worldVertexIndexPoint);
    };
};
getWorldVerticesPoints();

//const rayCaster = new THREE.Raycaster();

function checkForSun(vertexIndex) {
    const vertexPoint = worldVertexPoints[vertexIndex];
    const rayVector = new THREE.Vector3(0, sunAngleSin, sunAngleCos);
    //const ArrowVertexPointX = worldVertexPoints[vertexIndex].x + 1;
    //const ArrowVertexPointY = worldVertexPoints[vertexIndex].y + 0;
    //const ArrowVertexPointZ = worldVertexPoints[vertexIndex].z;
    //const ArrowVertexPoint = new THREE.Vector3(ArrowVertexPointX, ArrowVertexPointY, ArrowVertexPointZ);

    //console.log(ArrowVertexPoint);

    const rayCaster = new THREE.Raycaster(vertexPoint, rayVector, 0, 50);
    const intersects = rayCaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        //console.log(intersects);
        tickHeat(vertexIndex);
        //const arrowPointList = [];
        //arrowPointList.push(vertexPoint.x + rayVector.x + 15);
        //arrowPointList.push(vertexPoint.y + rayVector.y + 1);
        //arrowPointList.push(vertexPoint.z + rayVector.z);
        //const arrowPoint = new THREE.Vector3(arrowPointList[0], arrowPointList[1], arrowPointList[2]);
        //scene.add(new THREE.ArrowHelper(rayVector, arrowPoint, 1, 0xff0000, 0, 0));
    }
    //scene.add(new THREE.ArrowHelper(rayVector, vertexPoint, 10, 0xff0000)); visualizes the rays casted
};

//When the window size changes the renderer gets re-adjusted to fit the window
window.addEventListener('resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var degrees = 90;
var sunAngleTick = Math.PI/degrees;
var sunAngle = sunAngleTick;
var sunAngleSin = Math.sin(sunAngle);
var sunAngleCos = Math.cos(sunAngle);
var sunTick = 0;

//tickHeat(Math.floor(Math.random() * parkGeometry.attributes.position.count));

let animateSun;
var rowIndex = 0;
function startAnimateSun() {
    if(animateSun && rowIndex<parkHeightVertices) {
        for(let i = parkLengthVertices*rowIndex; i < parkLengthVertices*(rowIndex+1); i++) {
            console.log(i);
            checkForSun(i);
        };
        rowIndex++;
    } else {
        sunTick++;
        sunAngle += sunAngleTick;
        sunAngleSin = Math.sin(sunAngle);
        sunAngleCos = Math.cos(sunAngle);
        console.log(sunAngle);
        rowIndex = 0;
    }
};

function updateBackgroundColor() {
    const red = 182 * sunAngleSin / 255;
    const green = 221 * sunAngleSin / 255;
    const blue = 255 * sunAngleSin / 255;
    ambientLight.intensity = sunAngleSin;
    console.log(scene.background);
    scene.background = new THREE.Color(red, green, blue);
}

function animate() {
    parkGeometry.attributes.color.needsUpdate = true;
    
    requestAnimationFrame( animate );

    console.log('new frame');

    if(sunTick < degrees-2 && animateSun) {
        startAnimateSun();
        updateSunPosition();
        updateBackgroundColor();
        directionalLight.position.y = sunAngleSin*25;
        directionalLight.position.z = sunAngleCos*25;
    } else {
        sunTick = 0;
        sunAngle = 0;
        animateSun = false;
    }

	renderer.render( scene, camera );
}

console.log(parkGeometry.attributes.position.count);
animateSun = true;
animate();
