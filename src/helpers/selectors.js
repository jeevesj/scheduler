export function getAppointmentsForDay(state, day) {
  // Find the day object in the state.days array that matches the provided day
  const foundDay = state.days.find((dayObj) => dayObj.name === day);

  // If the day is not found or there are no appointments, return an empty array
  if (!foundDay || !foundDay.appointments || foundDay.appointments.length === 0) {
    return [];
  }

  // Iterate through the appointments array, look up the appointment objects in state.appointments, and return the array of those objects
  const appointmentsForDay = foundDay.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );

  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];

  return {
    ...interview,
    interviewer,
  };
}