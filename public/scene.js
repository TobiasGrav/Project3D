import * as THREE from "./build/three.module.js";
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let object_AK47;

const gltfLoader = new GLTFLoader();
gltfLoader.load('/AK47/scene.gltf', function(gltf) {
    object_AK47 = gltf;
    scene.add(gltf.scene);
})

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
scene.add(directionalLight);

camera.position.z = 10;

function animate() {
	
    if(object_AK47) {
        object_AK47.scene.scale.set(1,1,1)
        object_AK47.scene.rotation.y += 0.01;
        //object_AK47.scene.rotation.y += 0.01;
    }
    
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
