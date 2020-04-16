import { useState, useEffect } from "react";
import axios from "axios";
import { SHOW, EMPTY, SAVING_ERROR, DELETING_ERROR } from "helpers/constants";

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

  const updateSpotsFromDb = () => {
    return axios.get("/api/days")
    .then(days => {
      setState(prev => ({
        ...prev,days: [...days.data]
      }))
    })
  }

  useEffect(() => {
    getDataFromDb();
  }, []);

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
        updateSpotsFromDb()
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
        updateSpotsFromDb();
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
