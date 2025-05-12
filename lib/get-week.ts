export const getWeekDates = (date: Date): Date[] => {
  const dayOfWeek = date.getDay(); // 0 = Dimanche, 6 = Samedi

  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0); // Dimanche 00:00

  const weekDates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(startOfWeek);
    current.setDate(startOfWeek.getDate() + i);

    if (i === 6) {
      current.setHours(23, 59, 59, 999); // Samedi 23:59
    }

    weekDates.push(current);
  }

  return weekDates;
};
