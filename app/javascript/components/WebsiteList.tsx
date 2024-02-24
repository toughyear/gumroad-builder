import React, { useState } from "react";
import { DateTime } from "luxon";
import { MoreHorizontal, Plus } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/Dropdown";
import clsx from "clsx";

function WebsiteList() {
  const { websites, createWebsite, deleteWebsite } = useWebsitesStore();
  const { toast } = useToast();
  const { profile } = useUserProfile();
  const { products } = useProducts();

  const [creating, setCreating] = useState(false);
  const [newSiteTitle, setNewSiteTitle] = useState("My New Website");
  const [deletingSiteId, setDeletingSiteId] = useState<string | null>(null);

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

  const handleDeleteWebsite = async (id: string) => {
    try {
      setDeletingSiteId(id);
      await deleteWebsite(id);

      toast({
        title: "Deleted Successfully",
        description: "Your website has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting your website",
      });
    } finally {
      setDeletingSiteId(null);
    }
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
            className={clsx(
              "p-4 border-2 border-black flex flex-col rounded-md",
              website.id === deletingSiteId && "animate-pulse bg-red-100"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger className='self-end cursor-pointer'>
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    toast({
                      description: "Feature Coming Soon",
                    });
                  }}
                >
                  Duplicate Site
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-red-700'
                  onClick={() => handleDeleteWebsite(website.id)}
                >
                  Permanently Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
