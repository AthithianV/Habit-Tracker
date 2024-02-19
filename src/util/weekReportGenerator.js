// Function for generating weekly report
export default function currentWeekStatus(habits) {
  const currentDate = new Date();

  // Find starting date of current week.
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  // Find ending date of current week.
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Finds last 7 days from the daily record of habit.
  const last7Days = habits.dailyRecords.slice(-7);

  // The object maps the date and status
  const Last7status = {};
  last7Days.forEach((day) => {
    Last7status[day.date.getDate()] = day.status;
  });

  // Array for storing result.
  const result = [];

  // For each day in the week, date and the status of that date is pushed to the result.
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(startOfWeek);
    newDate.setDate(startOfWeek.getDate() + i);

    if (Last7status[newDate.getDate()]) {
      result.push({
        date: newDate,
        status: Last7status[newDate.getDate()],
      });
    } else {
      result.push({
        date: newDate,
        status: "NONE",
      });
    }
  }

  return result;
}
