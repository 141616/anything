import * as React from "react";
import * as THREE from "three";

import { OrbitControls } from "../../OrbitControls.js";
import { Button, Col, Row } from "antd";
import { CaretRightOutlined, RightOutlined } from "@ant-design/icons";

interface Props {}

interface State {
  animate: boolean;
}

const WIDTH = 8;
const HEIGHT = 6;

const BOX_WIDTH = window.innerWidth || 375;
// const BOX_HEIGHT = 500;

const genPictureBaseFrameMesh = () => {
  var length = WIDTH;
  var width = HEIGHT;

  var shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(length, width);
  shape.lineTo(length, 0);
  shape.lineTo(0, 0);

  var extrudeSettings = {
    steps: 2,
    depth: 0.61,
    bevelEnabled: true,
    bevelThickness: -0.3,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  // const texture = new THREE.TextureLoader().load("src/assets/top.jpeg");
  const material = new THREE.MeshStandardMaterial({
    color: 0x151d1a,
    // map: texture,
    metalness: 0.01,
    roughness: 0.8,
  });
  var mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(-(WIDTH / 2), -(HEIGHT / 2), 0);

  return mesh;
};

const genPictureFlame = (width: number, height: number) => {
  const texture = new THREE.TextureLoader().load("src/assets/flame.png");
  const geometry = new THREE.PlaneGeometry(width, height);
  // var material = new THREE.MeshStandardMaterial({
  var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    map: texture,
    // metalness: 0.01,
    // roughness: 0.8,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0.32);

  return mesh;
};

const genLights = () => {
  const ambLight = new THREE.AmbientLight(0xffffff, 1);

  // const pointLightLeft = new THREE.PointLight(0x77aa88, 1);
  // pointLightLeft.position.set(-2, -1, 10);
  // scene.add(pointLightLeft);

  // const pointLightRight = new THREE.PointLight(0xff8833, 1);
  // pointLightRight.position.set(2, -1, 2);
  // scene.add(pointLightRight);

  const whitePointLight = new THREE.PointLight(0xffffff, 1);
  whitePointLight.position.set(-6, 5, 15);

  // const dirLight = new THREE.DirectionalLight(0xff8833, 1);
  // dirLight.position.z = 2;
  // scene.add(dirLight);

  return [ambLight, whitePointLight];
};

class Coin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      animate: false,
    };
  }

  group: any = null;

  componentDidMount() {
    // 新建场景
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xcccccc);
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 7);

    // 渲染
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(BOX_WIDTH, BOX_WIDTH);

    // 添加控制
    const controls = new OrbitControls(camera, renderer.domElement);

    const box = document.getElementById("box");
    if (box) {
      box.appendChild(renderer.domElement);
    }

    // 光源
    const lights = genLights();
    lights.forEach((light) => scene.add(light));

    // 新建组
    this.group = new THREE.Group();

    // 画框
    const pictureFrameMesh = genPictureBaseFrameMesh();
    this.group.add(pictureFrameMesh);
    // scene.add(m2);

    // 添加艺术画
    const texture = new THREE.TextureLoader().load("src/assets/top.jpeg");
    var pictureMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(WIDTH - 0.5, HEIGHT - 0.5),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        map: texture,
      })
    );
    pictureMesh.position.set(0, 0, 0.32);
    this.group.add(pictureMesh);

    // 画框白色底
    var whitePlaneMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(WIDTH, HEIGHT),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
      })
    );
    whitePlaneMesh.position.set(0, 0, 0.319);
    this.group.add(whitePlaneMesh);

    // 画框背部灰底
    var greyPlaneMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(WIDTH, HEIGHT),
      new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide,
      })
    );
    greyPlaneMesh.position.set(0, 0, 0.2);
    this.group.add(greyPlaneMesh);

    // 添加画框
    const flameBottom = genPictureFlame(WIDTH + 1, 0.71);
    flameBottom.rotation.x = -0.54;
    flameBottom.position.set(0, -(HEIGHT / 2 + 0.2), 0.431);
    this.group.add(flameBottom);

    const flameTop = genPictureFlame(WIDTH + 1, 0.71);
    flameTop.rotation.x = Math.PI + 0.54;
    flameTop.position.set(0, HEIGHT / 2 + 0.2, 0.431);
    this.group.add(flameTop);

    const flameRight = genPictureFlame(HEIGHT + 1, 0.71);
    flameRight.rotation.y = -0.54;
    flameRight.rotation.z = 1.571;
    flameRight.position.set(WIDTH / 2 + 0.2, 0, 0.431);
    this.group.add(flameRight);

    const flameLeft = genPictureFlame(HEIGHT + 1, 0.71);
    flameLeft.rotation.y = 3.681;
    flameLeft.rotation.z = 1.571;
    flameLeft.position.set(-(WIDTH / 2 + 0.2), 0, 0.431);
    this.group.add(flameLeft);

    scene.add(this.group);

    const animate = () => {
      // plane.rotation.y += 0.01;
      // m2.rotation.y += 0.01;
      if (this.state.animate) {
        this.group.rotateY(0.01);
      }
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }

  handleMoveGroup = (x: number, y: number) => {
    this.group.position.x += x;
    this.group.position.y += y;
  };

  render() {
    return (
      <div>
        <div
          id="box"
          style={{
            width: BOX_WIDTH,
            height: BOX_WIDTH,
            position: "absolute",
            left: 0,
            top: 0,
          }}
          className="box-container"
        ></div>

        <div style={{ position: "fixed", bottom: 100, right: 130 }}>
          <Controller
            onMove={(x, y) => this.handleMoveGroup(x, y)}
            onClickPlay={() => {
              this.setState({
                animate: !this.state.animate,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Coin as React.ComponentType<Props>;

const Controller = ({
  onClickPlay,
  onMove,
}: {
  onClickPlay: () => void;
  onMove: (x: number, y: number) => void;
}) => {
  return (
    <div>
      <Row align="middle" justify="center">
        <Button
          type="primary"
          icon={<RightOutlined rotate={-90} />}
          onClick={() => onMove(0, 1)}
        />
      </Row>
      <Row gutter={[10, 10]} align="middle">
        <Col>
          <Button
            type="primary"
            icon={<RightOutlined rotate={180} />}
            onClick={() => onMove(-1, 0)}
          />
        </Col>
        <Col>
          <Button
            style={{ margin: "10px 0" }}
            type="primary"
            icon={<CaretRightOutlined />}
            onClick={onClickPlay}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<RightOutlined />}
            onClick={() => onMove(1, 0)}
          />
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Button
          type="primary"
          icon={<RightOutlined rotate={90} />}
          onClick={() => onMove(0, -1)}
        />
      </Row>
    </div>
  );
};
