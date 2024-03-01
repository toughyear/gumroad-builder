import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/Sheet";
import { Input } from "../../ui/Input";
import { Switch } from "../../ui/Switch";
import { Pencil } from "lucide-react";
import {
  RichTextSection,
  ContentParsed,
  Website,
} from "../../../types/website";
import { useSectionOperations } from "../../../hooks/useSectionOperations";
import RichTextView from "../Views/RichTextView";
import LexicalEditor from "./LexicalEditor/index";

interface RichTextSectionProps {
  content: ContentParsed;
  section: RichTextSection;
  siteInfo: Website;
}

const RichTextItem: React.FC<RichTextSectionProps> = ({
  section,
  content,
  siteInfo,
}) => {
  const [localSection, setLocalSection] = useState(section);
  const { isUpdating, isDeleting, handleUpdateSection, handleDeleteSection } =
    useSectionOperations(siteInfo, content, section);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSection({
      ...localSection,
      data: { ...localSection.data, [e.target.name]: e.target.value },
    });
  };
  const isSectionUpdated =
    JSON.stringify(section) !== JSON.stringify(localSection);

  return (
    <div className='w-full relative'>
      <Sheet>
        <SheetTrigger className='absolute top-5 left-5 elevate-outline !p-2'>
          <Pencil className='stroke-[1.5]' />
        </SheetTrigger>
        <SheetContent className='text-black flex flex-col h-screen overflow-y-scroll w-full sm:max-w-2xl'>
          <SheetHeader>
            <SheetTitle>Edit RichText Section</SheetTitle>
          </SheetHeader>
          {isSectionUpdated && (
            <p className='text-sm bg-bubble-gum text-black border border-black py-1 px-2 rounded-full self-start'>
              You have unsaved changes
            </p>
          )}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <p>Hide Border at bottom of section</p>
              <Switch
                checked={localSection.data.hideBottomBorder || false}
                onCheckedChange={(checked) =>
                  setLocalSection({
                    ...localSection,
                    data: { ...localSection.data, hideBottomBorder: checked },
                  })
                }
              />
            </div>
          </div>
          <div>
            <LexicalEditor
              setSection={setLocalSection}
              initialDOMString={localSection.data.dom}
            />
          </div>
          <button
            disabled={isUpdating}
            className='elevate-brand mt-auto'
            onClick={async () => await handleUpdateSection(localSection)}
          >
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
          <button
            className='elevate-outline mt-2'
            onClick={handleDeleteSection}
          >
            {isDeleting ? "Deleting..." : "Delete Section"}
          </button>
        </SheetContent>
      </Sheet>
      <RichTextView section={localSection} />
    </div>
  );
};

export default RichTextItem;
