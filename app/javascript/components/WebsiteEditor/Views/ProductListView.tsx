import React from "react";
import {
  ContentParsedCommon,
  ProductListSection,
} from "../../../types/website";

type ProductListViewProps = {
  section: ProductListSection;
  common: ContentParsedCommon | undefined;
};

const ProductListView: React.FC<ProductListViewProps> = ({
  section,
  common,
}) => {
  const products = common?.products;
  const { data } = section;

  if (!products) return <div>ProductList Not Found.</div>;

  return (
    <div className='border-b border-black w-full'>
      <div className='max-w-5xl mx-auto py-10 w-full px-5 md:px-0'>
        {section.data.title && (
          <h1 className='text-4xl font-black mt-5 mb-3'>
            {section.data.title}
          </h1>
        )}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {products.map((product) => {
            if (!data.selectedProductIds.includes(product.id)) return null;
            return (
              <div className='p-5 border border-black elevate-outline'>
                <img
                  src={product.preview_url ?? "https://via.placeholder.com/150"}
                  alt={product?.name}
                />
                <h1 className='text-4xl font-black mt-5'>{product?.name}</h1>
                <div className='flex items-center justify-between my-5'>
                  <p className='text-lg'>{product?.formatted_price}</p>
                  <a
                    target='_blank'
                    href={product?.short_url}
                    className='elevate-brand'
                  >
                    I want this!
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
