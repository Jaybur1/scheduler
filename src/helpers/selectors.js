export const getAppointmentsForDay = (state, day) => {
  if (state.days.length === 0) return [];
  const currentDay = state.days.filter(obj => obj.name === day);
  return currentDay.length === 0
    ? []
    : currentDay[0].appointments.map(appoId => state.appointments[appoId]);
};

export const getInterview = (state, interview) => {
  if (!interview) return null;
  const { student, interviewer } = interview;
  return { student, interviewer: state.interviewers[interviewer] };
};

export const getInterviewersForDay = (state, day) => {
  if (state.days.length === 0) return [];
  const currentDay = state.days.filter(obj => obj.name === day);
  return currentDay.length === 0
    ? []
    : currentDay[0].interviewers.map(appoId => state.interviewers[appoId]);
}