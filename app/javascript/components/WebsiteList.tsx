import React, { useState } from "react";
// import useWebsites from "../hooks/useWebsites";
import { DateTime } from "luxon";
import { Plus } from "lucide-react";
import { useWebsitesStore } from "../store/useWebsitesStore";
import { ContentParsed, SectionType, Website } from "../types/website";
import { v4 as uuidv4 } from "uuid";
import useUserProfile from "../hooks/useUserProfile";
import useProducts from "../hooks/useProducts";
import { useToast } from "../hooks/useToast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/Dialog";
import { Input } from "./ui/Input";

function WebsiteList() {
  const { websites, createWebsite } = useWebsitesStore();
  const { toast } = useToast();
  const { profile } = useUserProfile();
  const { products } = useProducts();

  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newSiteTitle, setNewSiteTitle] = useState("My New Website");

  const handleCreateWebsite = async () => {
    if (!profile || !products) {
      toast({
        description: "You need to be logged in to create a website",
      });
      return;
    }

    setCreating(true);

    const startingContent: ContentParsed = {
      sections: [
        {
          id: uuidv4(),
          type: SectionType.navbar,
          data: {
            heading: "My Website Heading",
            subheading: "Subheading goes here...",
            showAvatar: true,
            captureEmail: true,
            captureEmailText: "Subscribe",
          },
        },
        {
          id: uuidv4(),
          type: SectionType.footer,
          data: {
            text: "This is the footer",
            twitterUrl: "https://twitter.com/elonmusk/",
            showPoweredBy: true,
            showCopyright: true,
          },
        },
      ],
      common: {
        userProfile: profile,
        products: products,
      },
    };

    const newWebsite: Partial<Website> = {
      title: newSiteTitle,
      content: JSON.stringify(startingContent),
    };

    const result = await createWebsite(newWebsite);

    // redirect to the new website
    window.location.href = `/edit/${result.id}`;
  };

  return (
    <div className='grid grid-cols-3 gap-4 py-5'>
      <Dialog>
        <DialogTrigger asChild>
          <div className='elevate !p-4 flex flex-col'>
            <h1 className='font-bold text-2xl'>Create A Website</h1>
            <div className='h-full flex items-center justify-center'>
              <Plus />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create A New Website</DialogTitle>
            <DialogDescription>
              You can change most of this later. You will be redirected to the
              website builder after creating.
            </DialogDescription>
          </DialogHeader>
          <label htmlFor='title'>Website Name</label>
          <Input
            value={newSiteTitle}
            onChange={(e) => setNewSiteTitle(e.target.value)}
            name='title'
            placeholder='label for your website'
          />
          <button
            onClick={handleCreateWebsite}
            className='elevate-brand'
            disabled={creating}
          >
            {creating ? (
              <span className='animate-pulse'>Creating...</span>
            ) : (
              "Create"
            )}
          </button>
        </DialogContent>
      </Dialog>

      {websites &&
        websites.map((website) => (
          <div
            key={website.id}
            className='p-4 border-2 border-black flex flex-col rounded-md'
          >
            <h1 className='font-bold text-2xl'>{website.title}</h1>
            <div className='mt-5 mb-2 self-start'>
              {website.published ? (
                <p className='p-2 bg-bubble-gum text-black font-bold border-2 border-black self-start rounded-md'>
                  Published
                </p>
              ) : (
                <p className='p-2 bg-white border-2 border-black text-black font-bold self-start rounded-md'>
                  Draft
                </p>
              )}
            </div>
            <a
              className='font-mono hover:underline underline-offset-2 mb-5 self-start'
              href={`https://${website.url}`}
              target='_blank'
              rel='noreferrer'
            >
              {website.url}
            </a>
            <div className='mt-auto flex justify-between items-end'>
              <p className='text-xs text-zinc-500'>
                Last updated:{" "}
                {DateTime.fromISO(website.updated_at).toRelativeCalendar()}
              </p>
              <a className='elevate self-end' href={`/edit/${website.id}`}>
                Edit
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}

export default WebsiteList;
