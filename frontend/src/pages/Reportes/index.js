import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import ReportList from "../../components/ReportList";

const Reportes = () => {
  return (
    <Layout>
      <Container>
        <div className="mt-5">
          <ReportList/>
        </div>
      </Container>
    </Layout>
  );
};

export default Reportes;
