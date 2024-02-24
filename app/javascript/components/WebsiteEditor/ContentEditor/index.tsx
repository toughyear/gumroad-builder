import React, { useState } from "react";
import {
  ContentParsed,
  SectionType,
  Website,
  isNavbarSection,
} from "../../../types/website";
import { useWebsitesStore } from "../../../store/useWebsitesStore";
import { useToast } from "../../../hooks/useToast";
import { Input } from "../../ui/Input";

type ContentEditorProps = {
  siteInfo: Website;
};

function ContentEditor({ siteInfo }: ContentEditorProps) {
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

  return (
    <React.Fragment>
      {content.sections.map((section, index) => {
        if (isNavbarSection(section)) {
          return (
            <div className='w-full border-b border-black '>
              <div className='max-w-5xl mx-auto py-5 w-full flex justify-between content-center'>
                <div>
                  {section.data.heading && (
                    <h1 className='text-3xl font-bold'>
                      {section.data.heading}
                    </h1>
                  )}
                  {section.data.subheading && (
                    <h2>{section.data.subheading}</h2>
                  )}
                </div>
                {section.data.captureEmail && (
                  <form
                    className='flex items-center'
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Email captured!",
                        description: "We have captured your email.",
                      });
                    }}
                  >
                    <Input
                      type='email'
                      placeholder='your email'
                      className='mr-2'
                      name='email'
                      required
                    />
                    <button className='elevate-brand' type='submit'>
                      {section.data.captureEmailText || "Subscribe"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          );
        }

        return (
          <div>
            <p>{section.id}</p>
            <p>{section.type}</p>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default ContentEditor;