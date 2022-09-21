import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function App() {
  const [file, setfile] = useState();
  const [image, setimage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setimage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };

    file && getImage();
  }, [file]);

  const handleChange = (file) => {
    setfile(file);
  };

  return (
    <div className="App">
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
        <div className="Droparea">
            <div className="DropBox">
              <FileUploader
                handleChange={handleChange}
                id="file"
                name="file"
                types={fileTypes}
              />
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
