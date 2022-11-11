import React, { Component, useState } from "react";
import { FilePond } from "react-filepond";
import "./index.css";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import zhCN from "filepond/locale/zh-cn.js";

const Upload = () => {
  const [files, setFiles] = useState([]);

  return (
    <>
      <FilePond
        {...zhCN}
        files={files}
        allowMultiple={true}
        server={{
          // fake server to simulate loading a 'local' server file and processing a file
          process: (fieldName, file, metadata, load) => {
            // simulates uploading a file
            setTimeout(() => {
              load(Date.now());
            }, 1500);
          },
          load: (source, load) => {
            // simulates loading a file from the server
            fetch(source)
              .then((res) => res.blob())
              .then(load);
          },
        }}
        onupdatefiles={(fileItems) => {
          // Set currently active file objects to this.state
          setFiles(fileItems.map((fileItem) => fileItem.file));
        }}
        allowRevert={false}
        allowRemove={true}
        instantUpload={false}
        maxParallelUploads={1}
        maxFileSize="5MB"
        acceptedFileTypes={["image/png", "image/jpeg"]}
      ></FilePond>
    </>
  );
};

export default Upload;
