/**
 * Format number to VND
 * @param number - The number to format
 * @returns The formatted number
 */
export const formatNumberToVND = (number: number) => {
  if (number === 0) return "0 đ";
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
