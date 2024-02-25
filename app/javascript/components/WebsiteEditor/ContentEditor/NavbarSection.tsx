import React from "react";
import { ContentParsed, NavbarSection } from "../../../types/website";
import { Input } from "../../ui/Input";
import { useToast } from "../../../hooks/useToast";

type NavbarSectionProps = {
  content: ContentParsed;
  section: NavbarSection;
};

const NavbarSection: React.FC<NavbarSectionProps> = ({ section, content }) => {
  const userProfile = content.common?.userProfile;
  const { toast } = useToast();

  return (
    <div className='w-full border-b border-black'>
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
            <button className='elevate-brand text-sm' type='submit'>
              {section.data.captureEmailText || "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NavbarSection;
