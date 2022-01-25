import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/Common/Layout/Layout';
import AuthContext from '../../contexts/auth/AuthContext';

const Perfil = () => {
  const { session } = useContext(AuthContext);

  return (
    <Layout>
      <Container>
        {session && <>
          <div>{session.nombre} {session.apellido}</div>
          <div>{session.mail}</div>
          <div>{session.telefono}</div>
        </>}
      </Container>
    </Layout>
  );
};

export default Perfil;
