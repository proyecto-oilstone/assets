import React, { useState,  useContext } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import axios from "../../../helpers/axios";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import LoadingSmall from "../../Loaders/LoadingSmall";
import  CarContext  from "../../../contexts/cars/CarContext";


const PostImageModal = (props) => {
    const { getCarById } = useContext(CarContext);
  const { show, toggle, car } = props;
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  const resetFields = () => {
    setFile(null);
  }

  const handleOnClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('CarId', car.id);
    formData.append("file", file);
    await axios.post('/files/files/img', formData);
    setIsLoading(false)
    toggle();
    getCarById(car.id);
    resetFields();
  };

  

  return (
    <CustomModal show={show} toggle={toggle} title="Subir Archivos">
      <Form >
        <Form.Label htmlFor="files">Archivos</Form.Label>
        <Form.Control type="file" id="file" onChange={handleChange}  />

        <div className="d-flex align-items-center">
          <ButtonPrimary className="mt-4" onClick={handleOnClick}>Subir</ButtonPrimary>
          <div className="mt-4 ms-3">
            <LoadingSmall isLoading={isLoading}/>
          </div>
        </div>
      </Form>
    </CustomModal>
  );
}

export default PostImageModal;