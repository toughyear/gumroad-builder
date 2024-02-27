import React from "react";
import { ContentParsedCommon, NavbarSection } from "../../../types/website";
import { useToast } from "../../../hooks/useToast";
import { Input } from "../../ui/Input";

type NavbarViewProps = {
  section: NavbarSection;
  common: ContentParsedCommon | undefined;
};

const NavbarView: React.FC<NavbarViewProps> = ({ section, common }) => {
  const { toast } = useToast();
  const userProfile = common?.userProfile;

  return (
    <div className='border-b border-black w-full'>
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

export default NavbarView;
