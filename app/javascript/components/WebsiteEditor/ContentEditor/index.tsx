import React, { useState, useEffect } from "react";
import {
  ContentParsed,
  Section,
  SectionType,
  Website,
  isFooterSection,
  isNavbarSection,
  isRichTextSection,
} from "../../../types/website";
import { useWebsitesStore } from "../../../store/useWebsitesStore";
import { useToast } from "../../../hooks/useToast";

import NavbarItem from "./NavbarItem";
import FooterItem from "./FooterItem";
import AddSection from "./AddSection";

type ContentEditorProps = {
  siteInfo: Website;
  setSiteInfo: React.Dispatch<React.SetStateAction<Website | null>>;
};

function ContentEditor({ siteInfo, setSiteInfo }: ContentEditorProps) {
  const { updateWebsite } = useWebsitesStore();
  const { toast } = useToast();
  const [content, setContent] = useState<ContentParsed>(() => {
    try {
      if (!siteInfo.content) {
        toast({
          title: "No content found!",
          description:
            "There was no website content. We have reset it for you locally.",
        });
        return { sections: [] };
      }

      const parsedContent = JSON.parse(siteInfo.content);

      return parsedContent;
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description:
          "The site content was invalid. We have reset it for you locally.",
      });
      return { sections: [] };
    }
  });

  useEffect(() => {
    try {
      if (siteInfo.content) {
        const parsedContent = JSON.parse(siteInfo.content);
        setContent(parsedContent);
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description:
          "The site content was invalid. We have reset it for you locally.",
      });
      setContent({ sections: [] });
    }
  }, [siteInfo.content]);

  const addSectionHandler = async (sectionId: string, newSection: Section) => {
    // keep record of unmodified content
    const oldContent = content;

    const sectionIndex = content.sections.findIndex(
      (section) => section.id === sectionId
    );

    // insert new section after the sectionId

    const newSections = [
      ...content.sections.slice(0, sectionIndex + 1),
      newSection,
      ...content.sections.slice(sectionIndex + 1),
    ];

    // update locally optimistically, ordered next to sectionId
    setContent({ ...content, sections: newSections });

    // update on the server
    try {
      await updateWebsite(siteInfo.id, {
        ...siteInfo,
        content: JSON.stringify({ ...content, sections: newSections }),
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "We couldn't add the section.",
      });

      // revert locally
      setContent(oldContent);
    }
  };

  return (
    <React.Fragment>
      {content.sections.map((section, index) => {
        if (isNavbarSection(section)) {
          return (
            <React.Fragment key={section.id}>
              <NavbarItem
                content={content}
                section={section}
                siteInfo={siteInfo}
              />
              <AddSection
                sectionId={section.id}
                addSection={addSectionHandler}
              />
            </React.Fragment>
          );
        }
        if (isFooterSection(section)) {
          return (
            <FooterItem
              siteInfo={siteInfo}
              content={content}
              section={section}
              key={section.id}
            />
          );
        }

        if (isRichTextSection(section)) {
          return <>{section.data}</>;
        }

        return (
          <div key={section.id}>
            <p>{section.id}</p>
            <p>{section.type}</p>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default ContentEditor;
