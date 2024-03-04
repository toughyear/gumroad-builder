export const getDeploymentLinkFromSiteUrl = (siteUrl: string) => {
  return `${window.location.protocol}//site-${siteUrl}.${window.location.host}`;
};

export const getReadableLinkFromSiteUrl = (siteUrl: string) => {
  return `site-${siteUrl}.${window.location.host}`;
};
