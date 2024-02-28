import React, { useRef } from "react";
import { PlusCircle } from "lucide-react";
import {
  FooterSectionData,
  NavbarSectionData,
  Section,
  SectionType,
} from "../../../types/website";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";

type AddSectionProps = {
  sectionId: string;
  addSection: (sectionId: string, section: Section) => Promise<void>;
};

function AddSection({ sectionId, addSection }: AddSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddSection = (type: SectionType) => {
    const newSectionData: Section = {
      id: uuidv4(),
      type: type,
      data: {}, // Default data for each section type
    };

    // Customize the default data for each section type
    switch (type) {
      case SectionType.navbar:
        newSectionData.data = {
          heading: "New Navbar",
          showAvatar: false,
          captureEmail: true,
        } as NavbarSectionData;
        break;
      case SectionType.footer:
        newSectionData.data = {
          text: "New Footer",
          showPoweredBy: true,
          showCopyright: true,
        } as FooterSectionData;
        break;
      case SectionType.rich_text:
        newSectionData.data = {
          content: "New Rich Text Section",
        };
        break;
      default:
        break;
    }

    addSection(sectionId, newSectionData);
  };

  return (
    <div ref={containerRef} className='w-full h-full relative'>
      <Select
        onValueChange={(value) => handleAddSection(value as SectionType)}
        value='none'
      >
        <SelectTrigger
          aria-label='Add section'
          hideChevron
          className='flex items-center z-10 hover:bg-black hover:text-white absolute h-8 w-8 rounded-md cursor-pointer bg-white border border-black aspect-square p-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'
        >
          <PlusCircle className='h-4 w-4' />
        </SelectTrigger>
        <SelectContent className='shadow-md rounded-md bg-white border border-gray-200'>
          <SelectItem value={SectionType.navbar}>Navbar</SelectItem>
          <SelectItem value={SectionType.footer}>Footer</SelectItem>
          <SelectItem value={SectionType.rich_text}>Rich Text</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default AddSection;
