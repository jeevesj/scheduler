import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const newDays = updateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const newDays = updateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  }

  function updateSpots(dayName, days, appointments) {
  
    const day = days.find(d => d.name === dayName);
  
    const spots = day.appointments.filter(appointmentId => !appointments[appointmentId].interview).length;
  
    const newDays = days.map(d => {
      if (d.name === dayName) {
        return { ...d, spots };
      }
      return d;
    });
  
    return newDays;
  }
  






  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
