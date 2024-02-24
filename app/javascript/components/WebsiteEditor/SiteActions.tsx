// components/SiteActions.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWebsitesStore } from "../../store/useWebsitesStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { CornerRightDown, ExternalLink, SquarePen } from "lucide-react";
import { Website } from "../../types/website";

const SiteActions = () => {
  const [open, setOpen] = useState(false);
  const [updatingTitle, setUpdatingTitle] = useState(false);

  const { siteId } = useParams<{ siteId: string }>();
  const { websites, updateWebsite } = useWebsitesStore();
  const [siteInfo, setSiteInfo] = useState<Partial<Website> | undefined>();

  useEffect(() => {
    const currentSite = websites?.find((site) => site.id === siteId);
    setSiteInfo(currentSite);
  }, [siteId, websites]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteInfo({ ...siteInfo, [e.target.name]: e.target.value });
  };

  const handleTitleUpdate = async () => {
    setUpdatingTitle(true);
    if (!siteInfo || !siteInfo.id) return;
    await updateWebsite(siteInfo.id, {
      title: siteInfo.title,
    });

    setUpdatingTitle(false);
    setOpen(false);
  };

  const togglePublishStatus = async () => {
    if (!siteInfo || !siteInfo.id) return;
    setSiteInfo({ ...siteInfo, published: !siteInfo.published });
    await updateWebsite(siteInfo.id, {
      published: !siteInfo.published,
    });
  };

  if (!siteInfo) return null;

  return (
    <div className='mb-5  border-b border-black border-dashed w-full '>
      <div className='max-w-5xl mx-auto flex justify-between items-center py-5'>
        <div className='flex items-center'>
          <h1 className='text-3xl font-bold'>{siteInfo?.title}</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button>
                <SquarePen className='ml-4' />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change the Title of the website</DialogTitle>
                <DialogDescription>
                  The title is shown at the top of your browser tab and also
                  helps in easy identification for you.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={siteInfo?.title || ""}
                onChange={handleChange}
                name='title'
              />
              <button
                onClick={handleTitleUpdate}
                className='elevate-brand'
                disabled={updatingTitle}
              >
                {updatingTitle ? (
                  <span className='animate-pulse'>Updating...</span>
                ) : (
                  "Update"
                )}
              </button>
            </DialogContent>
          </Dialog>
        </div>
        <div className='flex items-center'>
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
          >
            {siteInfo?.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
      <p className='flex w-full max-w-5xl mx-auto items-end'>
        This is how your website looks like when published.{" "}
        <CornerRightDown className='h-4 w-4' />
      </p>
    </div>
  );
};

export default SiteActions;
