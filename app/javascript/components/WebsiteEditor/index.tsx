import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Website } from "../../types/website";
import { useWebsitesStore } from "../../store/useWebsitesStore";
import SiteActions from "./SiteActions";

function Index() {
  const { siteId } = useParams<{ siteId: string }>();
  const [siteInfo, setSiteInfo] = useState<Partial<Website>>({});
  const { websites, updateWebsite } = useWebsitesStore();

  useEffect(() => {
    const currentSite = websites?.find((site) => site.id === siteId);
    if (currentSite) {
      setSiteInfo(currentSite);
    }
  }, [siteId, websites]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteInfo({ ...siteInfo, [e.target.name]: e.target.value });
  };

  const handleModify = async () => {
    if (!siteInfo.id) return; // Ensure we have a site ID
    await updateWebsite(siteInfo.id, {
      title: siteInfo.title,
    });
  };

  if (!siteInfo)
    return (
      <div className='max-w-5xl mx-auto flex items-center flex-col w-full my-10 animate-bounce'>
        ...
      </div>
    );

  return (
    <div className='flex flex-col w-full mb-5'>
      <SiteActions />
      <div>Site ID: {siteId}</div>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          id='title'
          name='title'
          value={siteInfo.title || ""}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleModify}>Modify</button>
    </div>
  );
}

export default Index;
