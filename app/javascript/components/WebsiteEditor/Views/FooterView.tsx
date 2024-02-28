import React from "react";
import { FooterSection } from "../../../types/website";

interface FooterViewProps {
  section: FooterSection;
}

const FooterView: React.FC<FooterViewProps> = ({ section }) => {
  const { showPoweredBy, showCopyright, text } = section.data;

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

export default FooterView;
