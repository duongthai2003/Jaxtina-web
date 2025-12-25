export const getCircularProgress = (percentage: number) => {
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percentage / 100);
    return { circumference, offset };
  };