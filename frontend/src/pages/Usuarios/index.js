import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/Common/Layout/Layout';
import UserList from '../../components/UserList';

const Usuarios = () => {
  return (
    <Layout>
      <Container>
        <div className="mt-4">
          <UserList/>
        </div>
      </Container>
    </Layout>
  );
};

export default Usuarios;
