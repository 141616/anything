import * as React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/ll.json";

interface Props {}

interface State {}

class Ani extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="page-container">
        <Lottie
          isStopped={false}
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    );
  }
}

export default Ani as React.ComponentType;
