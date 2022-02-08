import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import Event from "./Event.js";

const localizer = momentLocalizer(moment);

/**
 * @params
 * - Events (required) {Array} of objects, each object must be one {Event} or have the same keys that one event
 * - expandEvents (optional default false) if is true, then the events will be expanded to the start of another event
 * - duration (optional default 0) only if expandEvents is false, you can set the duration of each event. Put it in seconds
 */
const ReactBigCalendar = (props) => {
  const { events, expandEvents = false, duration = 0 } = props;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const twoDays = new Date(tomorrow);
  twoDays.setDate(twoDays.getDate() +1);
  const [modifiedEvents, setModifiedEvents] = useState([]);

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
      const currentEvent = modifiedEvents[i];
      const nextEvent = modifiedEvents[i+1];
      currentEvent.title = currentEvent.id;
      if (currentEvent.type === "EXPIRATION_FILE") {
        currentEvent.start = new Date(currentEvent.expirationDate);
      } else {
        currentEvent.start = new Date(currentEvent.createdAt);
      }

      if (expandEvents) {
        if (nextEvent) {
          if (nextEvent.type === "EXPIRATION_FILE") {
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

    setModifiedEvents(modifiedEvents);
  }, [events]);

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
  return <Calendar
    localizer={localizer}
    components={{event:Event}}
    events={modifiedEvents}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
    rtl={false}
    culture={"es"}
    messages={translatedMessages}
  />;
};



export default ReactBigCalendar;
