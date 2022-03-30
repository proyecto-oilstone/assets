import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import Event from "./Event.js";
import Filters from './Filters.js';
import CarContext from '../../contexts/cars/CarContext.js';
import { getShortDescriptionEvent } from '../../helpers/utils.js';

const localizer = momentLocalizer(moment);

/**
 * @params
 * - Events (required) {Array} of objects, each object must be one {Event} or have the same keys that one event
 * - expandEvents (optional default false) if is true, then the events will be expanded to the start of another event
 * - duration (optional default 0) only if expandEvents is false, you can set the duration of each event. Put it in seconds
 */
const ReactBigCalendar = (props) => {
  const { events, expandEvents = false, duration = 0, withFilters = false, linkeableEvents = false } = props;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const { selectedCar } = useContext(CarContext);
  const twoDays = new Date(tomorrow);
  twoDays.setDate(twoDays.getDate() +1);
  const [modifiedEvents, setModifiedEvents] = useState([]);
  const [activeFilters, setActiveFilters] = useState([{
    label: "Vencimiento seguro",
    value: "SEGURO",
    checked: true,
  },
  {
    label: "Vencimiento VTV",
    value: "VTV",
    checked: true,
  },
  {
    label: "Vencimiento papeles",
    value: "EXPIRATION_FILE",
    checked: true,
  },
  {
    label: "Almacenado en taller",
    value: "WORKSHOP",
    checked: false,
  },
  {
    label: "Problema reportado",
    value: "REPORT_PROBLEM",
    checked: false,
  },
  {
    label: "Pedido de reparacion",
    value: "REPAIR_REQUEST",
    checked: false,
  },
  {
    label: "Conductor",
    value: "DRIVER",
    checked: false,
  },
  {
    label: "Creacion de vehiculo",
    value: "NEW_CAR",
    checked: false,
  },
  {
    label: "Baja de vehiculo",
    value: "DISCHARGED_CAR",
    checked: false,
  },]);
  
  const isExpirationEvent = (event) => {
    const expirationEvents = ["VTV", "SEGURO", "EXPIRATION_FILE"];
    return expirationEvents.some(type => event.type === type);
  }

  const getNextEventDifferent = (typeEvents, arrayEvents, index) => {
    while (index < arrayEvents.length) {
      const event = arrayEvents[index];
      if (typeEvents.some(type => type === event.type)) {
        index++;
      } else {
        return event;
      }
    }
    return null;
  };

  const applyFilters = (event) => {
    const filter = activeFilters.find(f => f.value === event.type);
    if (filter) {
      return filter.checked;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const sortByDate = (a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (dateA > dateB) {
        return 1;
      }
      if (dateA < dateB) {
        return -1;
      }
      return 0;
    };

    let modifiedEvents = JSON.parse(JSON.stringify(events));
    modifiedEvents = modifiedEvents.sort(sortByDate);

    for (let i = 0; i < modifiedEvents.length; i++) {
      const skipEvents = ["VTV", "SEGURO", "EXPIRATION_FILE"];
      const currentEvent = modifiedEvents[i];
      if (skipEvents.some(type => type === currentEvent.type)) {
        currentEvent.start = new Date(currentEvent.expirationDate);
        currentEvent.end = currentEvent.start;
        currentEvent.end.setSeconds(currentEvent.end.getSeconds() + duration);
      } else {
        const nextEvent = getNextEventDifferent(skipEvents, modifiedEvents, i+1);
        currentEvent.title = getShortDescriptionEvent(currentEvent);
        if (isExpirationEvent(currentEvent.type)) {
          currentEvent.start = new Date(currentEvent.expirationDate);
        } else {
          currentEvent.start = new Date(currentEvent.createdAt);
        }

        if (expandEvents) {
          if (nextEvent) {
            if (isExpirationEvent(nextEvent)) {
              currentEvent.end = new Date(nextEvent.expirationDate);
            } else {
              currentEvent.end = new Date(nextEvent.createdAt);
            }
          } else {
            currentEvent.end = new Date();
          }
        } else {
          currentEvent.end = currentEvent.start;
          currentEvent.end.setSeconds(currentEvent.end.getSeconds() + duration);
        }
      }
    }

    if (withFilters) {
      modifiedEvents = modifiedEvents.filter(applyFilters);
    }
    setModifiedEvents(modifiedEvents);
  }, [events, activeFilters]);

  const translatedMessages = {
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    allDay: "Todo el dia",
    week: "Semana",
    work_week: "Semana de trabajo",
    day: "Dia",
    month: "Mes",
    previous: "Anterior",
    next: "Siguiente",
    yesterday: "Ayer",
    tomorrow: "Mañana",
    today: "Hoy",
    agenda: "Agenda",
    showMore: (amount) => `Mostrar ${amount} mas`,
    noEventsInRange: "No hay eventos en este rango",
  }
  const EventWithProps = (props) => {
    const car = linkeableEvents ? props.event.car : selectedCar;
    return <Event {...props} car={car} linkeableEvent={linkeableEvents}/>;
  }

  return (<>
    {withFilters && <Filters filters={activeFilters} setFilters={setActiveFilters}/>}
    <Calendar
      popup
      localizer={localizer}
      rowL
      components={{event: EventWithProps}}
      events={modifiedEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      timeslots={10}
      culture={"es"}
      messages={translatedMessages}
    />
  </>);
};



export default ReactBigCalendar;
