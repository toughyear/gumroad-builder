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
      RichTextView: {dom}
    </div>
  );
}

export default RichTextView;
