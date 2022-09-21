import React from "react";
import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";

const NewPost = ({ image }) => {
  const { url, width, height } = image;
  const imageRef = useRef();
  const canvasRef = useRef();

  const handelImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
      imageRef.current
    );
    faceapi.matchDimensions(canvasRef.current, {
      width,
      height
    });

    const resized = faceapi.resizeResults(detections, {
      width,
      height,
    });
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);

  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./models"),
        faceapi.nets.ageGenderNet.loadFromUri("./models"),
      ])
        .then(handelImage)
        .catch((e) => console.log(e));
    };

    imageRef.current && loadModels();
  }, []);
  return (
    <div className="contanier">
      <div className="left" style={{ width, height }}>
        <img ref={imageRef} crossOrigin="anonymous" src={url} alt=" " />
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </div>
  );
};

export default NewPost;
