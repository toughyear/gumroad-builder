import React, { useRef } from "react";
import { PlusCircle } from "lucide-react";
import {
  FooterSectionData,
  NavbarSectionData,
  ProductSection,
  RichTextSection,
  Section,
  SectionType,
} from "../../../types/website";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../ui/Select";
import useProducts from "../../../hooks/useProducts";

type AddSectionProps = {
  sectionId: string;
  addSection: (sectionId: string, section: Section) => Promise<void>;
};

function AddSection({ sectionId, addSection }: AddSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { products } = useProducts();

  const handleAddSection = (type: SectionType) => {
    const newSection: Section = {
      id: uuidv4(),
      type: type,
      data: {}, // Default data for each section type
    };

    // Customize the default data for each section type
    switch (type) {
      case SectionType.navbar:
        newSection.data = {
          heading: "New Navbar",
          showAvatar: false,
          captureEmail: true,
        } as NavbarSectionData;
        break;
      case SectionType.footer:
        newSection.data = {
          text: "New Footer",
          showPoweredBy: true,
          showCopyright: true,
        } as FooterSectionData;
        break;
      case SectionType.rich_text:
        (
          newSection as RichTextSection
        ).data.dom = `<h1 class="text-4xl font-bold" dir="ltr"><span style="white-space: pre-wrap;">New Rich Text</span></h1><p dir="ltr"><span style="white-space: pre-wrap;">Write anything you want! </span></p>`;
        break;
      case SectionType.product:
        if (products === null || products.length === 0) {
          alert(
            "You need to have at least one product on your Gumroad account."
          );
          return;
        }

        (newSection as ProductSection).data = {
          selectedProductId: products[0].id,
          showPrice: true,
          showDescription: true,
          showThumbnail: true,
        };
        break;
      default:
        break;
    }

    addSection(sectionId, newSection);
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
          <SelectItem value={SectionType.product}>Product</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default AddSection;
