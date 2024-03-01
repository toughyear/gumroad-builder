import React from "react";

type SiteProps = {
  subdomain: string;
};

function Site(props: SiteProps) {
  return <div>Site {props.subdomain}</div>;
}

export default Site;
