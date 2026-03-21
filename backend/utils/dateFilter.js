const getDateRange = (range, baseDate = new Date()) => {
  const targetDate = new Date(baseDate);
  let start, end;

  switch (range) {
    case "daily":
      start = new Date(targetDate.setHours(0, 0, 0, 0));
      end = new Date(targetDate.setHours(23, 59, 59, 999));
      break;
    case "weekly":
      const first = targetDate.getDate() - targetDate.getDay();
      start = new Date(targetDate.setDate(first));
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    case "monthly":
      start = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        1,
        0,
        0,
        0,
        0,
      );
      end = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );
      break;
    case "yearly":
      start = new Date(targetDate.getFullYear(), 0, 1, 0, 0, 0, 0);
      end = new Date(targetDate.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    default:
      start = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        1,
        0,
        0,
        0,
        0,
      );
      end = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );
  }

  return { start, end };
};

export default getDateRange;
