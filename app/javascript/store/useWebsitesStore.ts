// store/useWebsitesStore.ts
import { create } from "zustand";
import { Website } from "../types/website";
import useAuthStore from "../store/useAuthStore";

interface WebsitesState {
  websites: Website[] | null;
  loading: boolean;
  error: string | null;
  fetchWebsites: () => Promise<void>;
  createWebsite: (websiteData: Partial<Website>) => Promise<Website>;
  updateWebsite: (id: string, websiteData: Partial<Website>) => Promise<void>;
  deleteWebsite: (id: string) => Promise<void>;
}

export const useWebsitesStore = create<WebsitesState>((set, get) => ({
  websites: null,
  loading: false,
  error: null,
  fetchWebsites: async () => {
    set({ loading: true, error: null });
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      set({ loading: false, error: "No access token found.", websites: null });
      return;
    }

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
      const data: Website[] = await response.json();
      set({ websites: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  createWebsite: async (websiteData: Partial<Website>) => {
    set({ loading: true, error: null });
    const accessToken = useAuthStore.getState().accessToken;
    try {
      const response = await fetch("/websites", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(websiteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create website.");
      }
      await get().fetchWebsites(); // Refresh list after creating

      return response.json();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  updateWebsite: async (id: string, websiteData: Partial<Website>) => {
    set({ loading: true, error: null });
    const accessToken = useAuthStore.getState().accessToken;
    console.log("websiteData", websiteData);
    try {
      const response = await fetch(`/websites/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(websiteData),
      });
      if (!response.ok) {
        throw new Error("Failed to update website.");
      }
      await get().fetchWebsites(); // Refresh list after updating
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteWebsite: async (id: string) => {
    set({ loading: true, error: null });
    const accessToken = useAuthStore.getState().accessToken;
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
      await get().fetchWebsites(); // Refresh list after deleting
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
