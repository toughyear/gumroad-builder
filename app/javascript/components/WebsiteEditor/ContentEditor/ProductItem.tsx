import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/Sheet";
import { Switch } from "../../ui/Switch";
import { Pencil } from "lucide-react";
import { ProductSection, ContentParsed, Website } from "../../../types/website";
import { useSectionOperations } from "../../../hooks/useSectionOperations";
import ProductView from "../Views/ProductView";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";

interface ProductSectionProps {
  content: ContentParsed;
  section: ProductSection;
  siteInfo: Website;
}

const ProductItem: React.FC<ProductSectionProps> = ({
  section,
  content,
  siteInfo,
}) => {
  const [localSection, setLocalSection] = useState(section);
  const { isUpdating, isDeleting, handleUpdateSection, handleDeleteSection } =
    useSectionOperations(siteInfo, content, section);

  const isSectionUpdated =
    JSON.stringify(section) !== JSON.stringify(localSection);

  return (
    <div className='w-full relative'>
      <Sheet>
        <SheetTrigger className='absolute top-5 left-5 elevate-outline !p-2'>
          <Pencil className='stroke-[1.5]' />
        </SheetTrigger>
        <SheetContent className='text-black flex flex-col'>
          <SheetHeader>
            <SheetTitle>Edit Product Section</SheetTitle>
          </SheetHeader>
          {isSectionUpdated && (
            <p className='text-sm bg-bubble-gum text-black border border-black py-1 px-2 rounded-full self-start'>
              You have unsaved changes
            </p>
          )}
          <div className='flex flex-col gap-4'>
            <Select
              onValueChange={(value) =>
                setLocalSection({
                  ...localSection,
                  data: { ...localSection.data, selectedProductId: value },
                })
              }
              value={localSection.data.selectedProductId}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select Product' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Products</SelectLabel>

                  {/* <SelectItem value='pineapple'>Pineapple</SelectItem> */}
                  {content.common?.products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='flex items-center justify-between'>
              <p>Show Product Description</p>
              <Switch
                checked={localSection.data.showDescription || false}
                onCheckedChange={(checked) =>
                  setLocalSection({
                    ...localSection,
                    data: { ...localSection.data, showDescription: checked },
                  })
                }
              />
            </div>
            <div className='flex items-center justify-between'>
              <p>Show Price</p>
              <Switch
                checked={localSection.data.showPrice || false}
                onCheckedChange={(checked) =>
                  setLocalSection({
                    ...localSection,
                    data: { ...localSection.data, showPrice: checked },
                  })
                }
              />
            </div>
            <div className='flex items-center justify-between'>
              <p>Show Thumbnail</p>
              <Switch
                checked={localSection.data.showThumbnail || false}
                onCheckedChange={(checked) =>
                  setLocalSection({
                    ...localSection,
                    data: { ...localSection.data, showThumbnail: checked },
                  })
                }
              />
            </div>
          </div>
          <button
            disabled={isUpdating}
            className='elevate-brand mt-auto'
            onClick={async () => await handleUpdateSection(localSection)}
          >
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
          <button
            className='elevate-outline mt-2'
            onClick={handleDeleteSection}
          >
            {isDeleting ? "Deleting..." : "Delete Section"}
          </button>
        </SheetContent>
      </Sheet>
      <ProductView section={localSection} common={content.common} />
    </div>
  );
};

export default ProductItem;
