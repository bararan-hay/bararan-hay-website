export const useQuery = () => {
  return new URLSearchParams(window.location.search);
};
