import React, { useState } from "react";
import { useSectionOperations } from "../../../hooks/useSectionOperations";
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
import clsx from "clsx";
import { ContentParsed, NavbarSection, Website } from "../../../types/website";
import NavbarView from "../Views/NavbarView";

type NavbarSectionProps = {
  content: ContentParsed;
  section: NavbarSection;
  siteInfo: Website;
};

const NavbarItem = ({ section, content, siteInfo }: NavbarSectionProps) => {
  const [localSection, setLocalSection] = useState(section);
  const { isUpdating, isDeleting, handleUpdateSection, handleDeleteSection } =
    useSectionOperations(siteInfo, content, section);

  const handleChange = (e) => {
    setLocalSection({
      ...localSection,
      data: { ...localSection.data, [e.target.name]: e.target.value },
    });
  };

  // memoized state to check if section and localSection are different
  const isSectionUpdated =
    JSON.stringify(section) !== JSON.stringify(localSection);

  return (
    <div
      className={clsx(
        "w-full relative",
        isDeleting && "animate-pulse bg-red-200"
      )}
    >
      <Sheet>
        <SheetTrigger className='absolute top-5 left-5 elevate-outline !p-2'>
          <Pencil className='stroke-[1.5]' />
        </SheetTrigger>
        <SheetContent className='text-black flex flex-col'>
          <SheetHeader>
            <SheetTitle>Edit Navbar Section</SheetTitle>
          </SheetHeader>
          {isSectionUpdated && (
            <p className='text-sm bg-bubble-gum text-black border border-black py-1 px-2 rounded-full self-start'>
              You have unsaved changes
            </p>
          )}
          <p>Heading</p>
          <Input
            name='heading'
            value={localSection.data.heading}
            onChange={handleChange}
          />
          <div className='flex items-center justify-between'>
            <p>Capture Emails</p>
            <Switch
              checked={localSection.data.captureEmail}
              onCheckedChange={(checked) =>
                setLocalSection({
                  ...localSection,
                  data: { ...localSection.data, captureEmail: checked },
                })
              }
            />
          </div>
          {localSection.data.captureEmail && (
            <>
              <p>Capture Email Text</p>
              <Input
                name='captureEmailText'
                value={localSection.data.captureEmailText}
                onChange={handleChange}
              />
            </>
          )}
          <div className='flex items-center justify-between'>
            <p>Show Avatar</p>
            <Switch
              checked={localSection.data.showAvatar}
              onCheckedChange={(checked) =>
                setLocalSection({
                  ...localSection,
                  data: { ...localSection.data, showAvatar: checked },
                })
              }
            />
          </div>

          <button
            disabled={isUpdating}
            className='elevate-brand mt-auto'
            onClick={() => handleUpdateSection(localSection)}
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
      <NavbarView common={content.common} section={localSection} />
    </div>
  );
};

export default NavbarItem;
