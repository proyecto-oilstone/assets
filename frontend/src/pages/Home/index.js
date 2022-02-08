import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Layout from "../../components/Common/Layout/Layout";
import ReactBigCalendar from "../../components/ReactBigCalendar";
import EventContext from "../../contexts/events/EventContext";
import CarContext from "../../contexts/cars/CarContext";

const Home = () => {
  const { getAllEvents, events } = useContext(EventContext);

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_HOST);
    console.log(process.env.REACT_APP_BACKEND_PORT);
    getAllEvents();
  },[]);

  return (
    <Layout activeSection="home">
      <Container className="mt-5">
        <ReactBigCalendar events={events}/>
      </Container>
    </Layout>
  );
};

export default Home;
