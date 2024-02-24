import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useWebsitesStore } from "../store/useWebsitesStore";

function useInitWebsites() {
  const { accessToken } = useAuthStore();

  const { fetchWebsites } = useWebsitesStore();

  // whenever the accessToken changes, fetch the websites
  useEffect(() => {
    fetchWebsites();
  }, [accessToken, fetchWebsites]);
}

export default useInitWebsites;
