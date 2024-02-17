import useAuthStore from "../store/useAuthStore";

const useUpdateAccessToken = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");

  if (accessToken) {
    setAccessToken(accessToken);

    // Optionally, clear the access token from the URL
    window.history.pushState({}, document.title, "/");
  }
};

export default useUpdateAccessToken;
