import React from "react";
import useWebsites from "../hooks/useWebsites";
import { DateTime } from "luxon";

function WebsiteList() {
  const { websites } = useWebsites();

  return (
    <div className='grid grid-cols-3 gap-4 py-5'>
      {websites &&
        websites.map((website) => (
          <div
            key={website.id}
            className='p-4 border-2 border-black flex flex-col'
          >
            <h1 className='font-bold text-2xl'>{website.title}</h1>
            <div className='mt-5 mb-2 self-start'>
              {website.published ? (
                <p className='p-2 bg-bubble-gum text-black font-bold border-2 border-black self-start rounded-md'>
                  Published
                </p>
              ) : (
                <p className='p-2 bg-black text-white font-bold self-start rounded-md'>
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
              <a className='elevate self-end'>Edit</a>
            </div>
          </div>
        ))}
    </div>
  );
}

export default WebsiteList;
