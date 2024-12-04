export const toRupiah = (value) => {
  if (!value) return "-";
  value = Number(value);
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
};
