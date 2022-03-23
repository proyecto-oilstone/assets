import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Layout from "../../components/Common/Layout/Layout";
import DashboardCards from "../../components/DashboardCards";
import ReactBigCalendar from "../../components/ReactBigCalendar";
import EventContext from "../../contexts/events/EventContext";

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
        <h2 className="mb-3">Gestion de taller</h2>
        <DashboardCards/>
        <div className="mt-5 bg-white p-4 rounded shadow-sm hover-shadow">
          <ReactBigCalendar events={events} withFilters linkeableEvents/>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
