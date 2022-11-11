import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Fragment, useRef } from "react";
import { ReactSketchCanvas } from 'react-sketch-canvas';



const Home = () => {

  // const [canvas, setCanvas] = useState(null);
  const canvas = useRef(null);

  const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };

  const exportImage = async () => {
    const dataURL = await canvas.current.exportImage('png')
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err.message))
  };


  return (
    <Fragment>
      <h1>Home</h1>
      <p>Home Page</p>

      <ReactSketchCanvas
        ref={canvas}
        style={styles}
        width="50%"
        height="50%"
        strokeWidth={4}
        strokeColor="black"
      />
      <button onClick={exportImage}>Get Image</button>


    </Fragment>
  );
};

export default Home;
