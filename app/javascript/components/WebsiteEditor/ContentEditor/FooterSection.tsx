import React from "react";
import { ContentParsed, FooterSection } from "../../../types/website";
import { Input } from "../../ui/Input";
import { useToast } from "../../../hooks/useToast";

type FooterSectionProps = {
  content: ContentParsed;
  section: FooterSection;
};

const FooterSection: React.FC<FooterSectionProps> = ({ section, content }) => {
  const { showCopyright, showPoweredBy, text } = section.data;
  const { toast } = useToast();

  return (
    <div className='w-full'>
      <div className='max-w-5xl mx-auto py-5 w-full flex justify-between content-center'>
        {showPoweredBy && (
          <p>
            Powered By <span className='font-semibold'>Gumroad</span>
          </p>
        )}

        {showCopyright && <p>© {new Date().getFullYear()}</p>}
        {text && <p>{text}</p>}
      </div>
    </div>
  );
};

export default FooterSection;
