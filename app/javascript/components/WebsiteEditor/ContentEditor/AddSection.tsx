import { PlusCircle } from "lucide-react";
import React from "react";
import { Section, SectionType } from "../../../types/website";
import { v4 as uuidv4 } from "uuid";

type AddSectionProps = {
  sectionId: string;
  addSection: (sectionId: string, section: Section) => Promise<void>;
};

function AddSection({ sectionId, addSection }: AddSectionProps) {
  return (
    <div className='w-full h-full relative'>
      <div
        onClick={() =>
          addSection(sectionId, {
            id: uuidv4(),
            type: SectionType.navbar,
            data: {
              heading: "New Section",
              captureEmail: false,
              showAvatar: false,
            },
          })
        }
        className='absolute rounded-md cursor-pointer hover:border-2 bg-white border border-black aspect-square p-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'
      >
        <PlusCircle className='stroke-[1.5]' />
      </div>
    </div>
  );
}

export default AddSection;
