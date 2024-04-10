export const TABLE_HEAD = ['Created', 'Images', 'Model', 'Available', 'Price', 'Shipping', 'Action'];

export const daysAgo = (date: string) => {
  const currentDate = new Date();
  const pastDate = new Date(date);
  const differenceInTime = currentDate.getTime() - pastDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  if (differenceInDays < 1) {
    return 'Today';
  }
  return differenceInDays;
};
