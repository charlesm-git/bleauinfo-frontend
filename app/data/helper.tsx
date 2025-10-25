// Adds a space every 3 digits to make number more readable
export const formatNumber = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}