---
title: Building Cart functionality in Shopify Hydrogen
tags: ["shopify", "ecommerce", "cart", "hydrogen"]
excerpt: "In this post, I will show you how my journey was in building a Shopify Cart. I start by creating the Cart UI and then using the Shopify Cart components that help you build this functionality really fast. "
pubDate: 2022-10-18 00:00
---

Hydrogen comes with many prebuilt components you can plug into your Store and make it live quickly. One of those components is the **CartProvider** component which exposes via the **useCart()** hook the different pieces you need to put together to create your own Cart features. Yet another piece, is the Cart UI itself and you have to figure out how to integrate them into one working solution. In this post, we're going to learn the process to accomplish it.

## Building the CartUI

Of course, the first requirement is that you already have your Shopify Store up and running; you have created collections, products, variants, and all the data you will be working with Hydrogen. Then, you also need to have a product listing and product detail pages built with this framework, so you can have products to add and remove from the cart.
This article showcases an example I've been working on, using a demo store called Virtual Fits. Feel free to clone it and make the pull requests you believe could improve this demo.

Let's create the Cart User Interface first. It'll be a Drawer pattern, as you can see in the picture below.

![Cart UI I built for example ecommerce site](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684854691/jandrade.co.v4/cart-ui.png)

The Hydrogen tutorial uses a `Dialog.Panel` component built in the Headless UI library. You may use this library too; it will depend on the project you're working on and the tools your company and team are using. But, it's also possible you build your own. That's the case with the example I'm using for this post which is pure CSS (of course powered by Tailwind) and the toggle mechanism is all about React state.
The html corresponding to the `Cart Drawer` looks like this:

```javascript
<div
  className={`border-l border-zinc-200 p-5 fixed bg-white h-full top-0 right-0 w-1/2

bottom-0 shadow-2xl z-10 grid cart ${
    cartOpen ? "bg-zinc-100 translate-x-0" : "bg-orange-200 translate-x-full"
  }`}
>
  <header className="border-b border-stone-700 mb-8 pb-8">
    <h3 className="bg-red-600 text-white inline-block px-1 py-2 -skew-x-3 m-0 text-7xl">
      Your Cart
    </h3>
  </header>

  {/* <CloseButton onClick={closeCart} type="button">

&times;

</CloseButton> */}

  <CloseButton closeCart={closeCart} />

  <ul className="m-0 p-0 list-none overflow-scroll">
    {lines.map((line) => {
      return (
        <CartLineProvider key={line.id} line={line}>
          <CartLine />
        </CartLineProvider>
      );
    })}
  </ul>

  <footer
    className="border-t-2 border-stone-400 border-dashed

mt-8 pt-8 items-center text-4xl font-bold flex justify-between"
  >
    {/* {cost && `$`} {cost?.totalAmount?.amount} */}

    <CartCost className="m-0 text-2xl" amountType="total" />

    {/* <CheckoutButton /> */}

    <CartCheckoutButton className="text-xl w-52 font-bold shadow-xl shadow-zinc-300 bg-red-600 py-3 px-2 text-white">
      Checkout
    </CartCheckoutButton>
  </footer>
</div>
```

This is the HTML markup that describes the Cart UI. Don't worry about any other components you see along this markup, because you'll be discovering them as you keep reading this article.
Looking at the tailwind classes, I've defined this Cart UI drawer as a rectangle, fixed to the top, right corner. Its width is half the screen size.
As this Cart Drawer has to be present on each of the Website pages, its toggling mechanism is defined in the `CartUIProvider`. This component has a `cartOpen` state, which is a boolean that will inform any part of our Website, that the cart is open or closed and of course, will expose methods (**toggleCart(), openCart(), closeCart()**) to open or close it whenever and wherever necessary.

```javascript
import CartContext from "./CartUIContext.client";

import { useState } from "react";

export default function CartUIProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <CartContext.Provider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
```

You can see that this Provider, is defined as part of the `CartUIContext`. This context exports a custom hook called `useCartUIContext()`, a convenient utility that will help us when we want to access the Cart Provider state.

```javascript
import { createContext, useContext } from "react";

const CartUIContext = createContext();

export default CartUIContext;

export function useCartUIContext() {
  const context = useContext(CartUIContext);

  if (!context) {
    throw new Error("No cart context found");
  }

  return context;
}
```

The `CartUIProvider` has to be used in the root of our Website, which is **App.server.jsx**, and placed as a descendant of **ShopifyProvider**:

```javascript
import renderHydrogen from "@shopify/hydrogen/entry-server";

import { Router, FileRoutes, ShopifyProvider } from "@shopify/hydrogen";

import { CartProvider } from "@shopify/hydrogen";

import CartUIProvider from "./components/CartUIProvider.client";

function App() {
  return (
    <ShopifyProvider>
      <CartUIProvider>
        <CartProvider>
          <Router>
            <FileRoutes />
          </Router>
        </CartProvider>
      </CartUIProvider>
    </ShopifyProvider>
  );
}

export default renderHydrogen(App);
```

Now, we can access our Cart throughout the Website. In fact, the initial state (openCart) is false, meaning the cart is closed by default. How do we reflect this state in the cart visualization? The answer is in these lines of code in the CartUI (`CartUI.client.jsx`) component:

```javascript

export function Cart() {

const { cartOpen, closeCart } = useCartUIContext();

const { lines } = useCart();

return (<div

className={`border-l border-zinc-200 p-5 fixed bg-white top-0 right-0 w-1/2

bottom-0 shadow-2xl z-10 grid cart ${

cartOpen ? "bg-zinc-100 translate-x-0" : "bg-orange-200 translate-x-full"

}`}>
```

This is the open div of the Cart component, or the Cart drawer itself. the conditional statement shows that when cartOpen is true, a translate transformation is applied to it to reveal its contents. if not, the opposite translate transformation is applied to hide them.
We can access the cartOpen state from the `CartUIProvider` via the `useCartUIContext` hook.

The `CloseButton` component also uses this hook to get the closeCart function and called it when the user hits the X button.

```javascript
function CloseButton({ closeCart }) {
  return (
    <button
      onClick={closeCart}
      type="button"
      className="bg-stone-800 text-white text-2xl

flex items-center justify-center border-0 absolute

z-10 right-0 p-2 "
    >
      <span className="hover:rotate-[360deg] transition-transform">
        &times;
      </span>
    </button>
  );
}

export default CloseButton;
```

And the opposite is performed by the OpenCartButton.client.jsx component which accesses the openCart function to show the Cart content.

```javascript
import { useCartUIContext } from "./CartUIContext.client";

function OpenCartButton() {
  const { openCart } = useCartUIContext();

  return (
    <button type="button" onClick={openCart}>
      Cart
    </button>
  );
}

export default OpenCartButton;
```

## The Cart functionality

Now that we have our Cart UI set up, it's time to add products, calculate product totals and remove products from the Cart. Let's remember that Shopify has many prebuild components and Providers we can use to make our work faster and easier.
There are three Providers that are necessary to make our Cart work appropriately: **ProductOptionsProvider**, **CartProvider**, and **CartLineProvider**.

### Using the ProductOptionsProvider

In my example, I created a Product page in the route **/products/[handle].server.jsx**
The **ProductOptionsProvider** wraps a Product card component called **SingleProduct**, so any descendant component can access functionality related to the product the user is going to buy, for example, the **selected product variant**.

```javascript
export default function Product() {
  const { handle } = useRouteParams();

  const result = useShopQuery({
    query: PRODUCT_BY_HANDLE_QUERY,

    variables: {
      handle,
    },
  });

  return (
    <Layout>
      <Suspense fallback={<SingleProductFallback />}>
        <ProductOptionsProvider data={result.data.product}>
          <SingleProduct product={result.data.product}></SingleProduct>
        </ProductOptionsProvider>
      </Suspense>
    </Layout>
  );
}
```

In the **SingleProduct** component, the hook `useProductOptions`, exposes the variants and the selectedVariant data. The selected variant corresponds to the variant the user chooses to buy, and will be added to the Cart.

### Using the CartProvider

The `CartProvider` allows us to use data and functions related to Cart functionality. This component should also be placed in the App.server.jsx file, after the `ShopifyProvider`, so that we have access to its context throughout the Website, as we did with the `CartUIProvider`.

For the example of this post, in the SingleProduct component, you can identify the useCart() hook that allows us to access the CartProvider context. We have all the information about the Cart and its functions to control its behavior. In the example, the function `linesAdd()` is used to manually add the selected product variant to the Cart.

```javascript
const { linesAdd } = useCart();

function handleAddToCart(e) {
  e.preventDefault();

  const lines = [
    {
      merchandiseId: selectedVariant.id,

      quantity: 1,
    },
  ];

  linesAdd(lines);
}
```

Note that The Shopify Hydrogen API, calls lines to the items in the Cart. So you'll find the different components, hooks, and cart functions with names that are composed with the work line or lines, as the previous example showcases it.

### Displaying Lines in the Cart component with CartLineProvider

The **CartUI.client.jsx** component shows all related information about the Cart using the lines Array given to us by the useCart() hook. Remember that we can use this hook in any client descendant component to the CartProvider, and this is one of them.

```javascript
export function Cart() {

const { cartOpen, closeCart } = useCartUIContext();

const { lines } = useCart();
```

This lines are displayed as unordered list items like so:

```html
<ul className="m-0 p-0 list-none overflow-scroll">
  {lines.map((line) => { return (

  <CartLineProvider key="{line.id}" line="{line}">
    <CartLine />
  </CartLineProvider>

  ); })}
</ul>
```

Those items are represented by the component CartLine and each line is surrounded by the `CartLineProvider`. Again, this will allow us to access information related to the individual product that has been added to the Cart and now is a line in it.

```javascript
function CartLine() {

const { cost, merchandise, quantity, id } = useCartLine();
```

The merchandise is the selected product variant the user added to the cart at the previous step and it's an object that has all the information needed to display.

## Other Cart Components that are worth knowing about and actually using.

One thing that really called my attention is that Hydrogen has many cart components that can be used as a quick way to build a full Cart system.
In the CartLine component, I use the **CartLineQuantityAdjustButton** to increment and decrement the number of products in the cart and the **CartLineImage** to display the item image.

Another component I use is the **CartCost**, to show the formatted total money of the added products, and, the **CartCheckoutButton** to display a Checkout button that includes the link to the Checkout page and that you may want to style via tailwind utility classes

```javascript
<footer
  className="border-t-2 border-stone-400 border-dashed

mt-8 pt-8 items-center text-4xl font-bold flex justify-between"
>
  {/* {cost && `$`} {cost?.totalAmount?.amount} */}

  <CartCost className="m-0 text-2xl" amountType="total" />

  {/* <CheckoutButton /> */}

  <CartCheckoutButton className="text-xl w-52 font-bold shadow-xl shadow-zinc-300 bg-red-600 py-3 px-2 text-white">
    Checkout
  </CartCheckoutButton>
</footer>
```

## Conclusions

To wrap this post up, to build your cart with Shopify Hydrogen, and indeed, any other feature in your Custom Storefront, don't forget to think in terms of the User Interface and the API calls you will need to make that interface actually work. Hydrogen has already come with many prebuilt providers, hooks, and components to accelerate the development process, but you're also free to make your own customizations, which means we're using a great framework, not only opinionated but also very flexible.
