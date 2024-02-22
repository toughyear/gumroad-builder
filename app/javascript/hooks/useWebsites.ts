import { useState, useEffect, useCallback } from "react";
import useAuthStore from "../store/useAuthStore";
import { Website } from "../types/website"; // Assuming you have a type definition for Website

type UseWebsitesResult = {
  loading: boolean;
  error: string | null;
  websites: Website[] | null;
  fetchWebsites: () => Promise<void>;
  createWebsite: (websiteData: Partial<Website>) => Promise<void>;
  updateWebsite: (id: string, websiteData: Partial<Website>) => Promise<void>;
  deleteWebsite: (id: string) => Promise<void>;
};

const useWebsites = (): UseWebsitesResult => {
  const [websites, setWebsites] = useState<Website[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useAuthStore((state) => state.accessToken);

  const fetchWebsites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/websites", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch websites.");
      }
      const data = await response.json();
      setWebsites(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const createWebsite = async (websiteData: Partial<Website>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/websites", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ website: websiteData }),
      });
      if (!response.ok) {
        throw new Error("Failed to create website.");
      }
      await fetchWebsites(); // Refresh list after creating
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateWebsite = async (id: string, websiteData: Partial<Website>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/websites/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ website: websiteData }),
      });
      if (!response.ok) {
        throw new Error("Failed to update website.");
      }
      await fetchWebsites(); // Refresh list after updating
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteWebsite = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/websites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete website.");
      }
      await fetchWebsites(); // Refresh list after deleting
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  return {
    loading,
    error,
    websites,
    fetchWebsites,
    createWebsite,
    updateWebsite,
    deleteWebsite,
  };
};

export default useWebsites;
