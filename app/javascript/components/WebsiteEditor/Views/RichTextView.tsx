import React from "react";
import { RichTextSection } from "../../../types/website";
import clsx from "clsx";

interface RichTextViewProps {
  section: RichTextSection;
}

function RichTextView({ section }: RichTextViewProps) {
  const { dom, hideBottomBorder } = section.data;
  return (
    <div
      className={clsx(
        "my-2 min-h-12",
        !hideBottomBorder && "border-black border-b"
      )}
    >
      <div
        id='rich-text-view'
        dangerouslySetInnerHTML={{ __html: dom }}
        className='max-w-5xl mx-auto py-5 w-full flex flex-col px-5 md:px-0'
      />
    </div>
  );
}

export default RichTextView;
