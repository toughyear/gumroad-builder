import React, { useEffect } from "react";
import useFetchWebsite from "../hooks/useFetchWebsite";
import {
  ContentParsed,
  isFooterSection,
  isNavbarSection,
  isProductSection,
  isRichTextSection,
} from "../types/website";
import NavbarView from "./WebsiteEditor/Views/NavbarView";
import FooterView from "./WebsiteEditor/Views/FooterView";
import RichTextView from "./WebsiteEditor/Views/RichTextView";
import ProductView from "./WebsiteEditor/Views/ProductView";

type SiteProps = {
  subdomain: string;
};

function Site(props: SiteProps) {
  const { subdomain } = props;

  const { website, loading, error } = useFetchWebsite(subdomain);

  // update document title with site title
  useEffect(() => {
    document.title = website?.title || "Gumroad Pages";
  }, [website]);

  if (loading) return <div>Loading...</div>;
  if (error || !website) return <div>Error: {error}</div>;

  const contentParsed: ContentParsed = JSON.parse(website.content);

  const { sections, common } = contentParsed;

  return (
    <>
      {sections?.map((section: any, index: number) => {
        if (isNavbarSection(section)) {
          return (
            <NavbarView key={section.id} section={section} common={common} />
          );
        } else if (isFooterSection(section)) {
          return <FooterView key={section.id} section={section} />;
        } else if (isRichTextSection(section)) {
          return <RichTextView key={section.id} section={section} />;
        } else if (isProductSection(section)) {
          return (
            <ProductView key={section.id} section={section} common={common} />
          );
        } else {
          return <div key={index}>Unknown section type</div>;
        }
      })}
    </>
  );
}

export default Site;
