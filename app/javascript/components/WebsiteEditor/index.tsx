import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Website } from "../../types/website";
import { useWebsitesStore } from "../../store/useWebsitesStore";
import SiteActions from "./SiteActions";
import ContentEditor from "./ContentEditor";

function WebsiteEditor() {
  const { siteId } = useParams<{ siteId: string }>();
  const [siteInfo, setSiteInfo] = useState<Website | null>(null);
  const { websites } = useWebsitesStore();

  useEffect(() => {
    const currentSite = websites?.find((site) => site.id === siteId);
    if (currentSite) {
      setSiteInfo(currentSite);
    }
  }, [siteId, websites]);

  // update document title with site title
  useEffect(() => {
    if (siteInfo?.title) {
      document.title = `Editing ${siteInfo.title}`;
    }
  }, [siteInfo]);

  if (!siteInfo)
    return (
      <div className='max-w-5xl mx-auto flex items-center flex-col w-full my-10 animate-bounce'>
        ...
      </div>
    );

  return (
    <div className='flex flex-col w-full mb-5'>
      <SiteActions setSiteInfo={setSiteInfo} siteInfo={siteInfo} />
      <ContentEditor siteInfo={siteInfo} />
    </div>
  );
}

export default WebsiteEditor;
