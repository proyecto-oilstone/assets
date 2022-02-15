import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from "../../helpers/axios";

const DashboardCards = () => {
  const amountDays = 15;
  const [dashboardData, setDashboardData] = useState(null);
  const [amountEvents, setAmountEvents] = useState(0);

  const Card = ({ children }) => (
    <Col sm="3">
      <div className="bg-white shadow-sm hover-shadow p-4 rounded h-100">
        {children}
      </div>
    </Col>
  );

  const fetchDashboard = async () => {
    let today = new Date();
    let endDate = new Date();
    endDate.setDate(today.getDate() + amountDays);
    endDate = endDate.toISOString().split('T')[0];
    const response = await axios.get(`/cars/dashboard?endDate=${endDate}`);
    const data = response.data;
    let total = 0;
    Object.values(data.total).forEach(amount => total = total + amount);
    data.total.TOTAL = total;
    setAmountEvents(data.events.vtv.length + data.events.seguro.length);
    setDashboardData(data);
    return data;
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <Row>
      <Card>
        <div className="h6">Vehiculos</div>
        <div className="fw-bold h3">{dashboardData ? dashboardData.total.TOTAL : 0}</div>
        <span className="text-sm">Total de vehiculos</span>
      </Card>

      <Card>
        <div className="h6">Vehiculos en uso</div>
        <div className="fw-bold h3">{dashboardData ? dashboardData.total.IN_USE : 0}</div>
      </Card>

      <Card>
        <div className="h6">Vehiculos disponibles</div>
        <div className="fw-bold h3">{dashboardData ? dashboardData.total.AVAILABLE : 0}</div>
      </Card>

      <Card>
        <div className="h6">Vencimientos</div>
        <div className="fw-bold h3">{amountEvents}</div>
        <span className="text-sm">Vencimientos en los proximos {amountDays} dias</span>
      </Card>
    </Row>
  )
}

export default DashboardCards;