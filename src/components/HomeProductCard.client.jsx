import {
  Link,
  Image,
  Money,
  AddToCartButton,
  ProductOptionsProvider,
  useProductOptions,
  ProductPrice,
} from "@shopify/hydrogen";
import { useRef, useState } from "react";
import { Drawer, useDrawer } from "./Drawer.client";
import { CartDetails } from "./CartDetails.client";
import Modal from "./Modal.client";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function HomeProductCard({ product }) {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const { options, selectedVariant } = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice?.amount > price?.amount;
  const [isProductHover, setIsProductHover] = useState(false);

  return (
    <div className="flex flex-col">
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div className="grid">
          <Drawer.Title>
            <h2 className="sr-only">Cart Drawer</h2>
          </Drawer.Title>
          <CartDetails onClose={closeDrawer} />
        </div>
      </Drawer>
      <Link
        to={`/products/${product.handle}`}
        onMouseEnter={() => setIsProductHover(true)}
        onMouseLeave={() => setIsProductHover(false)}
      >
        <div className="grid gap-6">
          <div className="shadow-sm rounded relative">
            {isDiscounted && (
              <label className="subpixel-antialiased absolute top-0 right-0 p-2 bg-red-600 text-right text-notice text-white text-xs font-bold">
                SALE
              </label>
            )}
            {/* Product Secondary Image on hover */}
            <Image
              className={`aspect-[5/5] ${
                product.images.nodes[1] && isProductHover && "hidden"
              }`}
              data={product.images.nodes[0]}
              alt="Alt Tag"
            />
            {product.images.nodes[1] && (
              <Image
                className={`secondaryImage aspect-[5/5] ${
                  !isProductHover && "hidden"
                } `}
                data={product.images.nodes[1]}
                alt="Alt Tag"
              />
            )}
            {/* End Product Secondary Image on hover */}
          </div>
          <div className="grid gap-1">
            <h3 className="max-w-prose text-copy w-max overflow-hidden whitespace-nowrap text-ellipsis ">
              {product.title}
            </h3>
            <div className="flex gap-4">
              <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
                <ProductPrice
                  className="text-gray-900 text-lg font-semibold"
                  variantId={selectedVariant.id}
                  data={product}
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
      <form className="mt-auto">
        {options.map(({ name, values }) => {
          // console.log(values.length);
          return values.length == 1 ? null : (
            <ProductGridOptions name={name} values={values} />
          );
        })}

        <AddToCartButton
          variantId={selectedVariant.id}
          quantity={1}
          accessibleAddingToCartLabel="...."
          className={`bg-rose-600 text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full uppercase ${
            isOutOfStock && "opacity-50"
          }`}
          onClick={
            !isOutOfStock &&
            (() => {
              setTimeout(() => openDrawer(), 1000);
            })
          }
          disabled={isOutOfStock}
        >
          add to cart
        </AddToCartButton>
      </form>
      {!isOutOfStock && <Modal product={product}/>}
    </div>
  );
}
function ProductGridOptions({ name, values }) {
  // console.log("====", values);
  const { selectedOptions, setSelectedOption } = useProductOptions();
  return name != "Color" ? (
    <select
      name={name}
      onChange={(e) => setSelectedOption(name, e.target.value)}
      style={{ height: "35px" }}
      className="inline-block mx-3 my-2 bg-transparent"
    >
      {values.map(function (value) {
        const selected = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;
        return (
          <option value={value} defaultValue={selectedOptions[name]} id={id}>
            {value}
          </option>
        );
      })}
    </select>
  ) : (
    values.map((value) => {
      const checked = selectedOptions[name] === value;
      const id = `option-${name}-${value}`;
      return (
        <label key={id} htmlFor={id} className="inline-block mx-3 my-2">
          <input
            className="sr-only w-auto"
            type="radio"
            id={id}
            name={`option[${name}]`}
            value={value}
            checked={checked}
            onChange={() => setSelectedOption(name, value)}
          />
          <div
            className={`rounded-full leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 border-2 ${
              checked ? "border-black" : "border-transparent"
            }`}
            style={{ backgroundColor: value, width: "35px", height: "35px" }}
          ></div>
        </label>
      );
    })
  );
}
