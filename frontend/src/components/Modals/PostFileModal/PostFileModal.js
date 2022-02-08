import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import axios from "../../../helpers/axios";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import LoadingSmall from "../../Loaders/LoadingSmall";

const PostFileModal = (props) => {
  const { show, toggle, car } = props;
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const files = [];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      files.push({ file, expirationDate: "" });
    }

    setFiles(files);
  }

  const resetFields = () => {
    setFiles([]);
  }

  const handleOnClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('CarId', car.id);
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i].file);
      formData.append("expirationDate", files[i].expirationDate);
    }
    
    await axios.post('/files/files', formData);
    setIsLoading(false)
    toggle();
    resetFields();
  };

  const handleChangeExpirationDate = (indexFile, e) => {
    let newFiles = Array.from(files);
    newFiles = newFiles.map((file, index) => {
      if (index === indexFile) {
        file.expirationDate = e.target.value;
        return file;
      } else {
        return file;
      }
    });
    setFiles(newFiles);
  };
  

  return (
    <CustomModal show={show} toggle={toggle} title="Subir Archivos">
      <Form >
        <Form.Label htmlFor="files">Archivos</Form.Label>
        <Form.Control type="file" id="file" onChange={handleChange} multiple />

        <div className={`mt-4 ${(files.length === 0) && "d-none"}`}>
          {files.map((file, index) => 
            <Row className="my-2 d-flex align-items-center" key={index}>
              <Col sm="6">{file.file.name}</Col>
              <Col sm="6">
                <Form.Control type="date" value={file.expirationDate} onChange={(e) => handleChangeExpirationDate(index, e)}/>
              </Col>
            </Row>
          )}
        </div>
        
        <div className="d-flex align-items-center">
          <ButtonPrimary className="mt-4" onClick={handleOnClick} disabled={files.length === 0}>Subir</ButtonPrimary>
          <div className="mt-4 ms-3">
            <LoadingSmall isLoading={isLoading}/>
          </div>
        </div>

      </Form>
    </CustomModal>
  );
}

export default PostFileModal;