import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";
import { SAVING_ERROR, DELETING_ERROR,EMPTY,SHOW } from "helpers/constants";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  const updateDataFromDb = () => {
    return Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then(all => {
      const [days, appointments, interviewers] = all;

      return setState(prev => ({
        ...prev,
        days: [...days.data],
        appointments: { ...appointments.data },
        interviewers: { ...interviewers.data }
      }));
    })
    .catch(err => alert(err))
  };

  useEffect(() => {
    updateDataFromDb();
  }, []);

  const { day, days } = state;

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, { ...appointment })
      .then(res => {
        updateDataFromDb();
        setState(prev => ({ ...prev, appointments }));
        return SHOW;
      })
      .catch(err => {
        console.error(err);
        return SAVING_ERROR;
      });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        updateDataFromDb();
        setState(prev => ({ ...prev, appointments }));
        return EMPTY;
      })
      .catch(err => {
        console.error(err);
        return DELETING_ERROR;
      });
  };

  const appointments = getAppointmentsForDay(state, day).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, day);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        onCreate={bookInterview}
        onDelete={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
