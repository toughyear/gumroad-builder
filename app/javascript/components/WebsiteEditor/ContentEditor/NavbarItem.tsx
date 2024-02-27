import React, { useState } from "react";
import { ContentParsed, NavbarSection, Website } from "../../../types/website";
import { Input } from "../../ui/Input";
import { Switch } from "../../ui/Switch";
import { useToast } from "../../../hooks/useToast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/Sheet";
import { useWebsitesStore } from "../../../store/useWebsitesStore";
import { Pencil } from "lucide-react";
import clsx from "clsx";

type NavbarSectionProps = {
  content: ContentParsed;
  section: NavbarSection;
  siteInfo: Website;
};

const NavbarItem: React.FC<NavbarSectionProps> = ({
  section,
  content,
  siteInfo,
}) => {
  const userProfile = content.common?.userProfile;

  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);
  const { updateWebsite } = useWebsitesStore();
  const [deletingSection, setDeletingSection] = useState(false);

  const [localSection, setLocalSection] = useState<NavbarSection>(section);

  const handleUpdate = async () => {
    if (!localSection.id) return;
    setUpdating(true);
    const newSections = content.sections.map((s) =>
      s.id === localSection.id ? localSection : s
    );

    const newContentParsed = {
      ...content,
      sections: newSections,
    };

    const newSiteInfo = {
      ...siteInfo,
      content: JSON.stringify(newContentParsed),
    };

    try {
      await updateWebsite(siteInfo.id, newSiteInfo);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "We couldn't update the section.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteSection = async () => {
    setDeletingSection(true);
    const newSections = content.sections.filter((s) => s.id !== section.id);
    const newContentParsed = {
      ...content,
      sections: newSections,
    };

    const newSiteInfo = {
      ...siteInfo,
      content: JSON.stringify(newContentParsed),
    };

    try {
      await updateWebsite(siteInfo.id, newSiteInfo);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "We couldn't delete the section.",
      });
    } finally {
      setDeletingSection(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSection({
      ...localSection,
      data: { ...localSection.data, [e.target.name]: e.target.value },
    });
  };

  return (
    <div
      className={clsx(
        "w-full border-b border-black relative",
        deletingSection && "animate-pulse bg-red-200"
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
            disabled={updating}
            className='elevate-brand mt-auto'
            onClick={handleUpdate}
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
          <button
            className='elevate-outline mt-2'
            onClick={handleDeleteSection}
          >
            {deletingSection ? "Deleting..." : "Delete Section"}
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
