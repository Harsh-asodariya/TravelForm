import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const style = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

const Dropzone = (props) => {
    const onDrop = useCallback(
        (acceptedFile) => {
            props.onsubmit(acceptedFile)
        }
    )

    const {acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

    const files = acceptedFiles.map(file => (
        <li key={file.name}>
          {file.name}
        </li>
      ));

    return (
        <section>
            <label className='Label'>{props.label}</label>
            <div {...getRootProps({ style, className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <p>{files ? files : null}</p>
            </div>
        </section>
    );
}

export default Dropzone;
