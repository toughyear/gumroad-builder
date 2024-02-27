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
import { useToast } from "../../../hooks/useToast";

type NavbarSectionProps = {
  content: ContentParsed;
  section: NavbarSection;
  siteInfo: Website;
};

const NavbarItem = ({ section, content, siteInfo }: NavbarSectionProps) => {
  const userProfile = content.common?.userProfile;
  const { toast } = useToast();

  const [localSection, setLocalSection] = useState(section);
  const { isUpdating, isDeleting, handleUpdateSection, handleDeleteSection } =
    useSectionOperations(siteInfo, content, section);

  const handleChange = (e) => {
    setLocalSection({
      ...localSection,
      data: { ...localSection.data, [e.target.name]: e.target.value },
    });
  };

  return (
    <div
      className={clsx(
        "w-full border-b border-black relative",
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
      <div className='max-w-5xl mx-auto py-5 w-full flex justify-between content-center'>
        <div>
          {section.data.showAvatar && userProfile && (
            <div className='flex items-center mb-2'>
              <img
                src={userProfile.profile_url}
                alt='avatar'
                className='rounded-full aspect-square h-7 border border-black mr-2'
              />
              <p className='text-lg'>{userProfile.display_name}</p>
            </div>
          )}
          {section.data.heading && (
            <h1 className='text-3xl font-bold'>{section.data.heading}</h1>
          )}
        </div>
        {section.data.captureEmail && (
          <form
            className='flex items-end'
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
            <button
              className='elevate-brand text-sm whitespace-nowrap'
              type='submit'
            >
              {section.data.captureEmailText || "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NavbarItem;
