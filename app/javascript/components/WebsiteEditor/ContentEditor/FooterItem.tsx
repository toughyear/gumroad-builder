// FooterItem.tsx
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
import { FooterSection, ContentParsed, Website } from "../../../types/website";
import { useSectionOperations } from "../../../hooks/useSectionOperations";
import FooterView from "../Views/FooterView";

interface FooterSectionProps {
  content: ContentParsed;
  section: FooterSection;
  siteInfo: Website;
}

const FooterItem: React.FC<FooterSectionProps> = ({
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
        <SheetContent className='text-black flex flex-col'>
          <SheetHeader>
            <SheetTitle>Edit Footer Section</SheetTitle>
          </SheetHeader>
          {isSectionUpdated && (
            <p className='text-sm bg-bubble-gum text-black border border-black py-1 px-2 rounded-full self-start'>
              You have unsaved changes
            </p>
          )}
          <div className='flex flex-col gap-4'>
            <p>Footer Text</p>
            <Input
              name='text'
              value={localSection.data.text || ""}
              onChange={handleChange}
            />
            <div className='flex items-center justify-between'>
              <p>Show Powered By</p>
              <Switch
                checked={localSection.data.showPoweredBy || false}
                onCheckedChange={(checked) =>
                  setLocalSection({
                    ...localSection,
                    data: { ...localSection.data, showPoweredBy: checked },
                  })
                }
              />
            </div>
            <div className='flex items-center justify-between'>
              <p>Show Copyright</p>
              <Switch
                checked={localSection.data.showCopyright || false}
                onCheckedChange={(checked) =>
                  setLocalSection({
                    ...localSection,
                    data: { ...localSection.data, showCopyright: checked },
                  })
                }
              />
            </div>
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
      <FooterView content={content} section={localSection} />
    </div>
  );
};

export default FooterItem;
