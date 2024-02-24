import React from "react";
// import useWebsites from "../hooks/useWebsites";
import { DateTime } from "luxon";
import { Plus } from "lucide-react";
import { useWebsitesStore } from "../store/useWebsitesStore";

function WebsiteList() {
  const { websites } = useWebsitesStore();

  return (
    <div className='grid grid-cols-3 gap-4 py-5'>
      <div className='elevate !p-4 flex flex-col'>
        <h1 className='font-bold text-2xl'>Create A Website</h1>
        <div className='h-full flex items-center justify-center'>
          <Plus />
        </div>
      </div>
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
