export const getAppointmentsForDay = (state, day) => {
  if (state.days.length === 0) return [];
  const currentDay = state.days.filter(obj => obj.name === day);
  return currentDay.length === 0
    ? []
    : currentDay[0].appointments.map(appoId => state.appointments[appoId]);
};
