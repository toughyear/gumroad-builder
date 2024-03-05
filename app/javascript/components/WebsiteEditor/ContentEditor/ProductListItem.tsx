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
import {
  ProductListSection,
  ContentParsed,
  Website,
} from "../../../types/website";
import { useSectionOperations } from "../../../hooks/useSectionOperations";
import ProductListView from "../Views/ProductListView";
import { Input } from "../../ui/Input";

interface ProductListSectionProps {
  content: ContentParsed;
  section: ProductListSection;
  siteInfo: Website;
}

const ProductListItem: React.FC<ProductListSectionProps> = ({
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
            <SheetTitle>Edit ProductList Section</SheetTitle>
          </SheetHeader>
          {isSectionUpdated && (
            <p className='text-sm bg-bubble-gum text-black border border-black py-1 px-2 rounded-full self-start'>
              You have unsaved changes
            </p>
          )}
          <div className='flex flex-col gap-4'>
            <p className='font-bold'>Title</p>
            <Input
              type='text'
              value={localSection.data.title}
              onChange={(e) =>
                setLocalSection({
                  ...localSection,
                  data: { ...localSection.data, title: e.target.value },
                })
              }
            />

            <p className='font-bold'>Select What Products to Show</p>
            <div className='flex items-center justify-between'>
              {content.common?.products.map((product) => {
                return (
                  <React.Fragment>
                    <p>{product.name}</p>
                    <Switch
                      checked={localSection.data.selectedProductIds.includes(
                        product.id
                      )}
                      onCheckedChange={(checked) =>
                        setLocalSection({
                          ...localSection,
                          data: {
                            ...localSection.data,
                            selectedProductIds: checked
                              ? [
                                  ...localSection.data.selectedProductIds,
                                  product.id,
                                ]
                              : localSection.data.selectedProductIds.filter(
                                  (id) => id !== product.id
                                ),
                          },
                        })
                      }
                    />
                  </React.Fragment>
                );
              })}
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
      <ProductListView section={localSection} common={content.common} />
    </div>
  );
};

export default ProductListItem;
