import * as React from "react";
import * as THREE from "three";

import { OrbitControls } from "../../OrbitControls.js";

interface Props {}

interface State {}

class Coin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 800);

    const controls = new OrbitControls(camera, renderer.domElement);

    const box = document.getElementById("box");
    if (box) {
      box.appendChild(renderer.domElement);
    }

    const ambLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambLight);

    const pointLightLeft = new THREE.PointLight(0x77aa88, 1);
    pointLightLeft.position.set(-2, -1, 10);
    scene.add(pointLightLeft);

    const pointLightRight = new THREE.PointLight(0xff8833, 1);
    pointLightRight.position.set(2, -1, 2);
    scene.add(pointLightRight);

    const whitePointLight = new THREE.PointLight(0xffffff, 0.3);
    whitePointLight.position.set(0, 2, 1);
    scene.add(whitePointLight);

    const dirLight = new THREE.DirectionalLight(0xff8833, 1);
    dirLight.position.z = 2;
    scene.add(dirLight);

    const texture = new THREE.TextureLoader().load("src/assets/bit2.png");
    const geom = new THREE.CylinderGeometry(3, 3, 0.4, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: texture,
      // metalness: 0.9,
      // roughness: 0.3,
    });
    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);
    camera.position.set(0, 0, 7);

    mesh.rotation.x = 2;
    mesh.rotation.y = 1.5;

    function animate() {
      mesh.rotation.x += 0.01;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
  }

  render() {
    return (
      <div
        id="box"
        style={{ width: 800, height: 800 }}
        className="box-container"
      ></div>
    );
  }
}

export default Coin as React.ComponentType;
