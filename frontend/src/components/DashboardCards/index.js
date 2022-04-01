import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from "../../helpers/axios";
import { carStatusBackgroundColors, carStatusTextColors } from "../../helpers/constants";
import { useNavigate } from "react-router-dom";

const DashboardCards = () => {
  const navigate = useNavigate();
  const amountDays = 15;
  const [dashboardData, setDashboardData] = useState(null);
  const [amountEvents, setAmountEvents] = useState(0);

  const Card = ({ children, status }) => (
    <Col sm="3">
      <div role="button" onClick={() => handleOnClickCard(status)} className={`shadow-sm cursor-pointer hover-shadow p-4 rounded h-100 ${!status && "bg-white"}`}  style={{ backgroundColor: carStatusBackgroundColors[status], color: carStatusTextColors[status] }}>
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

  const handleOnClickCard = (status) => {
    navigate(`/vehiculos?status=${status}`);
  }

  return (
    <Row>
      <Card status="EXPIRED_DOCUMENTATION">
        <div className="h6">Vencimientos</div>
        <div className="fw-bold h3">{amountEvents}</div>
        <span className="text-sm">Vencimientos en los proximos {amountDays} dias</span>
      </Card>

      <Card status="REPAIR">
        <div className="h6">Vehiculos en reparacion</div>
        <div className="fw-bold h3">{dashboardData ? dashboardData.total.REPAIR : 0}</div>
      </Card>

      <Card status="INFORMED">
        <div className="h6">Vehiculos informados</div>
        <div className="fw-bold h3">{dashboardData ? dashboardData.total.INFORMED : 0}</div>
      </Card>

      <Card status="IN_USE">
        <div className="h6">Vehiculos en uso</div>
        <div className="fw-bold h3">{dashboardData ? dashboardData.total.IN_USE : 0}</div>
      </Card>
    </Row>
  )
}

export default DashboardCards;