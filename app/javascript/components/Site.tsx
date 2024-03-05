import React, { useEffect } from "react";
import useFetchWebsite from "../hooks/useFetchWebsite";
import {
  ContentParsed,
  isFooterSection,
  isNavbarSection,
  isProductListSection,
  isProductSection,
  isRichTextSection,
} from "../types/website";
import NavbarView from "./WebsiteEditor/Views/NavbarView";
import FooterView from "./WebsiteEditor/Views/FooterView";
import RichTextView from "./WebsiteEditor/Views/RichTextView";
import ProductView from "./WebsiteEditor/Views/ProductView";
import ProductListView from "./WebsiteEditor/Views/ProductListView";

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

  if (loading)
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        ...
      </div>
    );
  if (error || !website)
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='border border-black py-2 px-5 flex flex-col rounded-lg font-mono'>
          <p className='text-xl font-bold'>
            {" "}
            <span className='text-red-500'>404:</span> Deployment Not Found
          </p>
          <hr />
          <p className='mt-2 max-w-sm'>
            {error}. Either the URL is incorrect or the deployment has been
            unpublished by owner.
          </p>
        </div>
      </div>
    );

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
        } else if (isProductListSection(section)) {
          return (
            <ProductListView
              key={section.id}
              section={section}
              common={common}
            />
          );
        } else {
          return <div key={index}>Unknown section type</div>;
        }
      })}
    </>
  );
}

export default Site;
