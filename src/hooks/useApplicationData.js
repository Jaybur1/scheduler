import { useState, useEffect } from "react";
import axios from "axios";
import {
  SHOW,
  EMPTY,
  SAVING_ERROR,
  DELETING_ERROR,
  SET_INTERVIEW
} from "helpers/constants";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const getDataFromDb = () => {
    return Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then(all => {
        const [days, appointments, interviewers] = all;
        return setState(prev => ({
          ...prev,
          days: [...days.data],
          appointments: { ...appointments.data },
          interviewers: { ...interviewers.data }
        }));
      })
      .catch(err => alert(err));
  };

  const updateSpots = action => {
    const currentDay = state.days.filter(day => day.name === state.day)[0];
    const days = [...state.days];
    if (action === "add") currentDay.spots += 1;
    if (action === "subtract") currentDay.spots -= 1;

    const updatedDays = days.map(day => {
      if (day.id === currentDay.id) {
        return { ...currentDay };
      }
      return day;
    });

    setState(prev => ({ ...prev, days: [...updatedDays] }));
  };

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.type === SET_INTERVIEW) {
        // return getDataFromDb();
      }
    };
    getDataFromDb();
    return () => webSocket.close();
  }, []);

  const bookInterview = (id, interview) => {
    const status = !state.appointments[id].interview && "subtract";
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
        updateSpots(status);
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
        updateSpots("add");
        setState(prev => ({ ...prev, appointments }));
        return EMPTY;
      })
      .catch(err => {
        console.error(err);
        return DELETING_ERROR;
      });
  };
  return { state, setDay, bookInterview, cancelInterview };
}
