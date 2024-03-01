// hooks/useFetchWebsite.js
import { useState, useEffect } from "react";
import { Website } from "../types/website";

const useFetchWebsite = (subdomain: string) => {
  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/websites/${subdomain}`);
        if (!response.ok) {
          throw new Error("Website not found");
        }
        const data = await response.json();
        setWebsite(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (subdomain) {
      fetchWebsite();
    }
  }, [subdomain]);

  return { website, loading, error };
};

export default useFetchWebsite;
