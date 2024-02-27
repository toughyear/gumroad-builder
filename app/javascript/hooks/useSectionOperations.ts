import { useState } from "react";
import { useWebsitesStore } from "../store/useWebsitesStore";
import { useToast } from "./useToast";
import { ContentParsed, Section, Website } from "../types/website";

export const useSectionOperations = (
  siteInfo: Website,
  content: ContentParsed,
  section: Section
) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateWebsite } = useWebsitesStore();
  const { toast } = useToast();

  const handleUpdateSection = async (updatedSection: Section) => {
    setIsUpdating(true);
    const newSections = content.sections.map((s) =>
      s.id === updatedSection.id ? updatedSection : s
    );

    const newContentParsed = { ...content, sections: newSections };
    const newSiteInfo = {
      ...siteInfo,
      content: JSON.stringify(newContentParsed),
    };

    try {
      await updateWebsite(siteInfo.id, newSiteInfo);
      toast({ title: "Section updated successfully!" });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "We couldn't update the section.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteSection = async () => {
    setIsDeleting(true);
    const newSections = content.sections.filter((s) => s.id !== section.id);
    const newContentParsed = { ...content, sections: newSections };
    const newSiteInfo = {
      ...siteInfo,
      content: JSON.stringify(newContentParsed),
    };

    try {
      await updateWebsite(siteInfo.id, newSiteInfo);
      toast({ title: "Section deleted successfully!" });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "We couldn't delete the section.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isUpdating,
    isDeleting,
    handleUpdateSection,
    handleDeleteSection,
  };
};
