const token = useCookie("XSRF-TOKEN");

export default () => {
  return $fetch.create({
    baseURL: "http://localhost:9000",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": token.value,
    },
  });
};
