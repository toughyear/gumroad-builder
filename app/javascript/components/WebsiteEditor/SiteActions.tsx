// components/SiteActions.tsx
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { ExternalLink, Settings } from "lucide-react";
import { Website } from "../../types/website";
import { useWebsitesStore } from "../../store/useWebsitesStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useUserProfile from "../../hooks/useUserProfile";
import { useToast } from "../../hooks/useToast";
import { generateSlug } from "random-word-slugs";
import { getDeploymentLinkFromSiteUrl } from "../../utils/formats";

type SiteActionsProps = {
  siteInfo: Website;
  setSiteInfo: React.Dispatch<React.SetStateAction<Website | null>>;
};

const SiteActions = ({ siteInfo, setSiteInfo }: SiteActionsProps) => {
  const { updateWebsite } = useWebsitesStore();
  const { products } = useProducts();
  const { profile } = useUserProfile();
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);
  const [refetchingGumroadUserInfo, setRefetchingGumroadUserInfo] =
    useState(false);
  // state to track when toggling publish status
  const [togglingPublishStatus, setTogglingPublishStatus] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteInfo({ ...siteInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    if (!siteInfo.id) return;
    try {
      await updateWebsite(siteInfo.id, siteInfo);

      toast({
        title: "Website updated",
        description: "Your website has been updated successfully",
      });
    } catch (error: any) {
      const errorMessage =
        error.message.split(": ")[1] || "An unexpected error occurred"; // Fallback error message
      toast({
        title: "Failed to update website",
        description: errorMessage,
      });
    } finally {
      setUpdating(false);
    }
  };

  const togglePublishStatus = async () => {
    if (!siteInfo.id) return;
    setTogglingPublishStatus(true);
    try {
      siteInfo.url = siteInfo.url || generateSlug();
      await updateWebsite(siteInfo.id, {
        published: !siteInfo.published,
        url: siteInfo.url,
      });
      setSiteInfo({
        ...siteInfo,
        published: !siteInfo.published,
        url: siteInfo.url,
      });
    } catch (error) {
    } finally {
      setTogglingPublishStatus(false);
    }
  };

  const refetchGumroadUserInfo = async () => {
    if (products === null || profile === null) {
      toast({
        title: "Something went wrong!",
        description: "You need to be logged in to refetch Gumroad user info",
      });
      return;
    }

    setRefetchingGumroadUserInfo(true);
    try {
      if (!siteInfo.id) return;

      const contentParsed = JSON.parse(siteInfo.content);
      const updatedContent = {
        ...contentParsed,
        common: {
          userProfile: profile,
          products: products,
        },
      };

      await updateWebsite(siteInfo.id, {
        content: JSON.stringify(updatedContent),
      });

      // refresh page
      window.location.reload();
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Failed to refetch Gumroad user info",
      });
    } finally {
      setRefetchingGumroadUserInfo(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className='fixed top-5 left-20 elevate-outline !p-2 group z-10'>
        <Settings className='stroke-[1.5]  group-hover:rotate-90 transition-transform' />
      </SheetTrigger>
      <SheetContent className='text-black flex flex-col'>
        <SheetHeader>
          <SheetTitle>Manage Website</SheetTitle>
        </SheetHeader>
        <div className='flex items-center my-5'>
          {siteInfo?.published ? (
            <a
              className='elevate-brand mr-2 flex items-center'
              href={getDeploymentLinkFromSiteUrl(siteInfo.url || "")}
              target='_blank'
              rel='noreferrer'
            >
              <ExternalLink className='mr-2 stroke-[1]' /> Visit
            </a>
          ) : null}
          <button
            onClick={togglePublishStatus}
            className={
              siteInfo?.published ? "elevate-outline" : "elevate-brand"
            }
            disabled={togglingPublishStatus}
          >
            {togglingPublishStatus
              ? "Updating..."
              : siteInfo?.published
              ? "Unpublish"
              : "Publish"}
          </button>
        </div>
        <p>Refetch Gumroad User Info</p>
        <button
          disabled={updating}
          className='elevate-brand'
          onClick={refetchGumroadUserInfo}
        >
          {refetchingGumroadUserInfo ? "Refetching..." : "Refetch"}
        </button>
        <p>Title</p>
        <Input
          name='title'
          value={siteInfo.title ?? ""}
          onChange={handleChange}
        />
        <p>Subdomain</p>
        <Input name='url' value={siteInfo.url ?? ""} onChange={handleChange} />
        <p>Theme</p>
        <Select value='default'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='default'>Default Theme</SelectItem>
          </SelectContent>
        </Select>

        <Link className='elevate-outline mt-auto text-center' to={"/"}>
          Home
        </Link>
        <button
          disabled={updating}
          className='elevate-brand'
          onClick={handleUpdate}
        >
          {updating ? "Updating..." : "Save Changes"}
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default SiteActions;
