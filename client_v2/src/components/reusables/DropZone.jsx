import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import styles from "../styles/DropImage.module.css"

export function DropZone(props) {

  const images = props.files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))

  return (
    <div className={styles.App}>
      <div {...props.func[1]()}>
        <input {...props.func[0]()} />
        <p>Drop files here</p>
      </div>
      <div>{images}</div>
    </div>
  )
}

