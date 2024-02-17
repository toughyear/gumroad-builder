import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { UseUserProfileResult, UserProfile } from "../types/gumroad";

const useUserProfile = (): UseUserProfileResult => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve the access token directly from the store
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // clear any previous errors
      setError(null);

      if (!accessToken) {
        setLoading(false);
        setError("Access token is required.");
        return;
      }

      const url = new URL("https://api.gumroad.com/v2/user");
      url.searchParams.append("access_token", accessToken);

      try {
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile.");
        }

        const data = await response.json();

        if (data.success) {
          setProfile(data.user);
        } else {
          throw new Error(data.message || "Unknown error occurred.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [accessToken]); // Dependency array ensures the effect runs when accessToken changes

  return { loading, error, profile };
};

export default useUserProfile;
