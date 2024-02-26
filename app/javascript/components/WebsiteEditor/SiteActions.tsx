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
} from "../ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Link } from "react-router-dom";

type SiteActionsProps = {
  siteInfo: Website;
  setSiteInfo: React.Dispatch<React.SetStateAction<Website | null>>;
};

const SiteActions = ({ siteInfo, setSiteInfo }: SiteActionsProps) => {
  const { updateWebsite } = useWebsitesStore();
  const [updating, setUpdating] = useState(false);
  // state to track when toggling publish status
  const [togglingPublishStatus, setTogglingPublishStatus] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteInfo({ ...siteInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    if (!siteInfo.id) return;
    await updateWebsite(siteInfo.id, siteInfo);
    setUpdating(false);
  };

  const togglePublishStatus = async () => {
    if (!siteInfo.id) return;
    setTogglingPublishStatus(true);
    try {
      await updateWebsite(siteInfo.id, {
        published: !siteInfo.published,
      });
      setSiteInfo({ ...siteInfo, published: !siteInfo.published });
    } catch (error) {
    } finally {
      setTogglingPublishStatus(false);
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
              href={`https://${siteInfo.url}`}
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

        <p>Title</p>
        <Input name='title' value={siteInfo.title} onChange={handleChange} />
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
