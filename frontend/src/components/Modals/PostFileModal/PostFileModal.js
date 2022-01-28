import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";

import axios from "../../../helpers/axios";

const PostFileModal = (props) => {
    const { show, toggle, car } = props;
  

    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        setFiles(e.target.files);

    }
        
    const resetFields = () => {
        setFiles([]);
    }
   const handleOnClick = (e) => {
        toggle()
        const formData = new FormData();
        formData.append('CarId', car.id);
        for(let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
        }
        axios.post('/files/files', formData).then(res => {
         console.log(res)   
        })
        
        resetFields();
    };
        

return(
    <CustomModal show={show} toggle={toggle} title="Subir Archivos">
        <Form >
            <label htmlFor="files">Archivos</label>
            <input type="file" id="file" onChange={handleChange} multiple />
            <Button onClick={handleOnClick}>Subir</Button>
        </Form>
     </CustomModal>

)


}

export default PostFileModal;