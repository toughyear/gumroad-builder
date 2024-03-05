import React from "react";
import { ContentParsedCommon, ProductSection } from "../../../types/website";

type ProductViewProps = {
  section: ProductSection;
  common: ContentParsedCommon | undefined;
};

const ProductView: React.FC<ProductViewProps> = ({ section, common }) => {
  const product = common?.products.find(
    (product) => product.id === section.data.selectedProductId
  );

  if (!product) return <div>Product Not Found.</div>;

  return (
    <div className='border-b border-black w-full'>
      <div className='max-w-xl mx-auto py-10 w-full px-5 md:px-0'>
        {section.data.showThumbnail && product?.preview_url && (
          <img
            src={product.preview_url}
            alt={product?.name}
            className='elevate-outline !p-0'
          />
        )}
        <h1 className='text-4xl font-black mt-5'>{product?.name}</h1>
        <div className='flex items-center justify-between my-5'>
          {section.data.showPrice && (
            <p className='text-lg'>{product?.formatted_price}</p>
          )}
          <a
            target='_blank'
            href={product?.short_url}
            className='elevate-brand'
          >
            I want this!
          </a>
        </div>
        <hr className='border-black border-dashed my-2' />
        {section.data.showDescription && (
          <div
            id='product-description'
            dangerouslySetInnerHTML={{ __html: product?.description || "" }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductView;
