import React from "react";
import { useParams } from "react-router-dom";

function Index() {
  const { siteId } = useParams<{ siteId: string }>();

  return <div>Site ID: {siteId}</div>;
}

export default Index;
