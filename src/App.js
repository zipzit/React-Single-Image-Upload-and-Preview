// info from https://stackoverflow.com/a/57781164/2487730
import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [previewImage, setpreviewImage] = useState();

  // create a previewImage as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setpreviewImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setpreviewImage(objectUrl);

    console.log("selectedFile: ", selectedFile, "  objectUrl: ", objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <h2>React Single Image Upload & preview</h2>
      <div>
        <input type="file" onChange={onSelectFile} />
        {selectedFile && (
          <img
            src={previewImage}
            alt=""
            style={{ height: "25vh", display: "block" }}
          />
        )}
      </div>
    </>
  );
};

export default App;
