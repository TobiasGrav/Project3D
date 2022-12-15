import * as THREE from "three";
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "./OrbitControls.js";
import { VertexNormalsHelper } from './jsm/helpers/VertexNormalsHelper.js';
import { PlaneGeometry } from "three";

//When the window size changes the renderer gets re-adjusted to fit the window
window.addEventListener('resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

//Constructs the renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Constructs the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);



//Objects gets constructed below:

//Constructs the camera and camera controls
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.x = -50;
camera.position.y = 20;
camera.lookAt(0,0,0);

//Constructs the GLTF model loader
const gltfLoader = new GLTFLoader();

//Lighting objects constructed:
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // soft white light
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight(0xffDDCC, 1);
scene.add(directionalLight);

//Defined the variables belonging to the parkPlane mesh
let parkGeometry, parkMaterial, parkPlane, parkLength, parkHeight, parkLengthVertices, parkHeightVertices;

function createScene() {
    const cityPlaneGeometry = new THREE.PlaneGeometry(100, 100);
    const cityPlaneMaterial = new THREE.MeshBasicMaterial({color: 0x209920});
    const cityPlane = new THREE.Mesh(cityPlaneGeometry, cityPlaneMaterial);
    cityPlane.rotation.x = -Math.PI/2;
    scene.add(cityPlane);

    //GLTF model of the road constructed in the scene
    gltfLoader.load('/Models/Road/Road.glb', function(gltf) {
    const road = gltf.scene;
    road.scale.set(1.5, 1.5, 1.5);
    road.position.z;

    scene.add(road);
    });
    
    //GLTF model of the darkBlueFlat constructed in the scene
    gltfLoader.load('/Models/DarkBlueFlat/DarkBlueFlat.glb', function(gltf) {
    const darkBlueFlat = gltf.scene;
    darkBlueFlat.scale.set(5, 5, 5);
    darkBlueFlat.position.x = 28;
    darkBlueFlat.position.z = 7.5;
    darkBlueFlat.rotation.y = Math.PI;

    
    scene.add(darkBlueFlat);
    });

    //GLTF model of the Bank constructed in the scene
    gltfLoader.load('/Models/Bank/Bank.glb', function(gltf) {
        const bank = gltf.scene;
        bank.scale.set(5, 5, 5);
        bank.position.x = 13;
        bank.position.z = 28;
        bank.rotation.y = Math.PI/2;
    
        
        scene.add(bank);
        });

    //GLTF model of the PoliceStation constructed in the scene
    gltfLoader.load('/Models/PoliceStation/PoliceStation.glb', function(gltf) {
        const policeStation = gltf.scene;
        policeStation.scale.set(5, 5, 5);
        policeStation.position.x = -1;
        policeStation.position.z = 27;
        policeStation.rotation.y = Math.PI/2;
    
        
        scene.add(policeStation);
        });

        //GLTF model of the AsianSupermarket constructed in the scene
        gltfLoader.load('/Models/AsianSupermarket/AsianSupermarket.glb', function(gltf) {
            const asianSupermarket = gltf.scene;
            asianSupermarket.scale.set(5, 5, 5);
            asianSupermarket.position.x = -17;
            asianSupermarket.position.z = 27;

            scene.add(asianSupermarket);
            });

    //GLTF model of the Hospital constructed in the scene
    gltfLoader.load('/Models/Hospital/Hospital.glb', function(gltf) {
        const hospital = gltf.scene;
        hospital.scale.set(5, 5, 5);
        hospital.position.x = -32;
        hospital.position.z = 0;
    
        
        scene.add(hospital);
        });

    //GLTF model of the LargeBuilding constructed in the scene
    gltfLoader.load('/Models/LargeBuilding/LargeBuilding.glb', function(gltf) {
        const largeBuilding = gltf.scene;
        largeBuilding.scale.set(5, 5, 5);
        largeBuilding.position.x = -15;
        largeBuilding.position.z = -21;
        largeBuilding.rotation.y = -Math.PI/2;
        
        scene.add(largeBuilding);
        });

    //GLTF model of the GreenHouse constructed in the scene
    gltfLoader.load('/Models/GreenHouse/GreenHouse.glb', function(gltf) {
        const greenHouse = gltf.scene;
        greenHouse.scale.set(5, 5, 5);
        greenHouse.position.x = 8;
        greenHouse.position.z = -25;
        greenHouse.rotation.y = Math.PI/2;
        
        scene.add(greenHouse);
        });
    
    //GLTF model of the BlueHouse constructed in the scene
    gltfLoader.load('/Models/BlueHouse/BlueHouse.glb', function(gltf) {
        const blueHouse = gltf.scene;
        blueHouse.scale.set(5, 5, 5);
        blueHouse.position.x = 20;
        blueHouse.position.z = -25;
        blueHouse.rotation.y = Math.PI/2;
        
        scene.add(blueHouse);
        });

    //GLTF model of the OrangeHouse constructed in the scene
    gltfLoader.load('/Models/OrangeHouse/OrangeHouse.glb', function(gltf) {
        const orangeHouse = gltf.scene;
        orangeHouse.scale.set(5, 5, 5);
        orangeHouse.position.x = 32;
        orangeHouse.position.z = -25;
        //orangeHouse.rotation.y = Math.PI/2;
        
        scene.add(orangeHouse);
        });

    //GLTF model of the LightRedFlat constructed in the scene
    gltfLoader.load('/Models/LightRedFlat/LightRedFlat.glb', function(gltf) {
        const lightRedFlat = gltf.scene;
        lightRedFlat.scale.set(5, 5, 5);
        lightRedFlat.position.x = 29;
        lightRedFlat.position.z = -8;
        lightRedFlat.rotation.y = Math.PI;
        
        scene.add(lightRedFlat);
        });

    //GLTF model of the Cat constructed in the scene
    gltfLoader.load('/Models/Cat/Cat.glb', function(gltf) {
        const cat = gltf.scene;
        cat.scale.set(0.5, 0.5, 0.5);
        cat.position.x = 7;
        cat.position.z = 2;
        cat.rotation.y = Math.PI/4;
        
        scene.add(cat);
        });

    //GLTF model of the Trees constructed in the scene
    gltfLoader.load('/Models/LargeTree/LargeTree.glb', function(gltf) {
        const largeTree = gltf.scene;
        largeTree.scale.set(5, 5, 5);

        const largeTree1 = largeTree.clone();
        largeTree1.position.x = 8;
        largeTree1.position.z = -20;
        largeTree1.rotation.y = 0;
        const largeTree2 = largeTree.clone();
        largeTree2.position.x = 16;
        largeTree2.position.z = -20;
        largeTree2.rotation.y = Math.PI/2;
        const largeTree3 = largeTree.clone();
        largeTree3.position.x = 24;
        largeTree3.position.z = -20;
        largeTree3.rotation.y = -Math.PI/4;
        
        scene.add(largeTree1);
        scene.add(largeTree2);
        scene.add(largeTree3);
        });
    
};

//Function responsible for initilizing the variables defined above
function createParkPlaneGeometry(length, height, verLen, verHei) {
    parkLength = length;
    parkHeight = height;
    parkLengthVertices = verLen + 1;
    parkHeightVertices = verHei + 1;
    parkGeometry = new THREE.PlaneBufferGeometry(parkLength, parkHeight, verLen, verHei);
    const count = parkGeometry.attributes.position.count;
    const colors = [];

    //creates a list of 1's to apply the rgb value of each vertice to (1,1,1) (white)
    for ( let i = 0; i < count; i ++ ) {
        colors.push(1);
        colors.push(1);
        colors.push(1);
    }

    parkGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); //lets us manipulate the color of each vertex.
    const parkMaterial = new THREE.MeshBasicMaterial( {wireframe: false, vertexColors: true} );

    parkPlane = new THREE.Mesh(parkGeometry, parkMaterial);
    parkPlane.rotation.x = -Math.PI/2;
    parkPlane.position.y = 0.01;
    scene.add(parkPlane);
};

//Just a sun simulating the presence of the sun, doesnt actually have a function in the simulation.
function createSun() {
    const sunGeometry = new THREE.SphereGeometry(5,10,10);
    const sunMaterial = new THREE.MeshBasicMaterial( {color: 0xffEE00} );
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.z = 200;
    scene.add(sun);
}


//GLTF model of the fountain constructed in the park
gltfLoader.load('/Models/Fountain/Fountain.glb', function(gltf) {
    const fountain = gltf.scene;
    fountain.scale.set(3, 3, 3);

    scene.add(fountain);
})

//GLTF model of the trees constructed in the park
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

//GLTF model of the benches constructed in the park
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

//GLTF model of the rock constructed in the park
gltfLoader.load('/Models/Rock/Rock.glb', function(gltf) {
    const rock = gltf.scene;
    scene.add(rock);
    rock.position.x = -9;
    rock.position.z = 7;
})

//define variables
var sun, degrees, sunAngleTick, sunAngle, sunAngleSin, sunAngleCos, sunTick;

function init() {
    createSun();
    createScene();
    createParkPlaneGeometry(30, 20, 30, 20);
    getWorldVerticesPoints();
    degrees = 90;
    sunAngleTick = Math.PI/degrees;
    sunAngle = sunAngleTick;
    sunAngleSin = Math.sin(sunAngle);
    sunAngleCos = Math.cos(sunAngle);
    sunTick = 0;
}

// gets the points of all the vertices in the world position
let worldVertexPoints;
function getWorldVerticesPoints() {
    worldVertexPoints = []
    for(let i = 0; i < parkGeometry.attributes.position.count; i++) {
        const vertexPosition = parkGeometry.attributes.position;
        const LocalVertexIndexPoint = new THREE.Vector3(vertexPosition.getX(i), vertexPosition.getY(i), vertexPosition.getZ(i));
        const worldVertexIndexPoint = LocalVertexIndexPoint.applyQuaternion(parkPlane.quaternion) //applies the quaternion from the world object to the vertex point, so that we get the correct rotation of the vertex
        worldVertexPoints.push(worldVertexIndexPoint);
    };
};

//Function which makes the vertex red, by first decreasing the B value then the G value
function tickHeat(vertexIndex) {
    const heatTickValue = 0.04 // value which the color of the vertex will be changed by.
    const vertexColor = parkGeometry.attributes.color;
    const vertexCurrentColor = [vertexColor.getX(vertexIndex), vertexColor.getY(vertexIndex), vertexColor.getZ(vertexIndex)];
    
    if(vertexCurrentColor[2] > 0) {
        vertexColor.setZ(vertexIndex, vertexCurrentColor[2] - heatTickValue);
        
    } else if(vertexCurrentColor[1] > 0) {
        vertexColor.setY(vertexIndex, vertexCurrentColor[1] - heatTickValue);
    };
};

///////////////simulation logic///////////////

//Updates the position of the fake sun.
function updateSunPosition() {
    sun.position.y = sunAngleSin * 200;
    sun.position.z = sunAngleCos * 200;
}

//Creates a ray to check if it collides with any objects
//It is calculated by using trigonometry from 0 to pi;
function checkForSun(vertexIndex) {
    const vertexPoint = worldVertexPoints[vertexIndex];
    const rayVector = new THREE.Vector3(0, sunAngleSin, sunAngleCos);
    const rayCaster = new THREE.Raycaster(vertexPoint, rayVector, 0, 50);
    const intersects = rayCaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        tickHeat(vertexIndex);
    }
};

function updateVariables() {
    sunTick++;
    sunAngle += sunAngleTick;
    sunAngleSin = Math.sin(sunAngle);
    sunAngleCos = Math.cos(sunAngle);
    console.log(sunAngle);
    rowIndex = 0;
}

function resetVariables() {
    sunTick = 0;
    sunAngle = 0;
    animateSun = false;
}



let animateSun; //A boolean that checks if the sun should be simulating.
var rowIndex = 0; // value which seperates the calculation into chuncks so the framerate doesnt suffer too bad, but it will slow the simulation time.

function startAnimateSun() {
    if(animateSun && rowIndex<parkHeightVertices) {
        for(let i = parkLengthVertices*rowIndex; i < parkLengthVertices*(rowIndex+1); i++) {
            checkForSun(i);
        };
        rowIndex++;
    } else {
        updateVariables();
        updateSunPosition();
        updateBackgroundColor();
        directionalLight.position.y = sunAngleSin*25;
        directionalLight.position.z = sunAngleCos*25;
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

    if(sunTick < degrees-2 && animateSun) {
        startAnimateSun();
    } else {
        resetVariables();
    }

	renderer.render( scene, camera );
}

init();
animateSun = true;
animate();
