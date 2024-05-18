const token = useCookie("XSRF-TOKEN");
const config = useRuntimeConfig();

export default () => {
  return $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": token.value,
    },
  });
};
