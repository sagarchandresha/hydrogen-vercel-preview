import {
  useLoadScript,
  useRouteParams,
  useShop,
  useUrl,
  useCart,
} from "@shopify/hydrogen";

// Client component
export default function Test() {
  const { handle } = useRouteParams();
  return (
    <>
      <h1>useRouteParams() = {handle}</h1>
      useLoadScript() = <LoadScript />
      <MyPage />
      <CurrentPage />
      <Cart />
    </>
  );
}

export function LoadScript() {
  const scriptStatus = useLoadScript(
    "https://cdn.shopify.com/shopifycloud/shop-js/v0.1/client.js"
  );

  if (scriptStatus === "loading") {
    return <div>loading...</div>;
  }

  if (scriptStatus === "error") {
    return <div>error...</div>;
  }

  // shop-pay-button custom element is available to use
  return <shop-pay-button />;
}

export function MyPage() {
  const { storeDomain } = useShop();

  return <h1>useShop() = {storeDomain}</h1>;
}
export function CurrentPage() {
  const url = useUrl();
  console.log(url);
  return <>Current Page is : {url.href}</>;
}

export function Cart() {
  return <CartLineItems />;
}

export function CartLineItems() {
  const { totalQuantity, status } = useCart();
  // console.log("=", cart);

  return (
    <>
      <br />
      <span>Cart totalQuantity : {totalQuantity}</span>
      {/* {lines.map((line) => {
        return <p></p>;
      })} */}
    </>
  );
}
