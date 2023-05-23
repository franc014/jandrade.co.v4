---
title: Working with React Context in Shopify Hydrogen
tags: ["shopify", "shopify cli", "GitHub", "shopify theme development"]
excerpt: "Shopify Hydrogen has many components that help us to build user experiences faster and allow us to focus on better user experiences. There is a special type of component called the Context component which allows us to keep the state of the different parts of the App in just one place and be available in lower children components. Let´s see how convenient are the Providers and how to work with them, in some examples."
pubDate: 2022-10-11 00:00
---

Shopify Hydrogen implements React Server Side Components throughout its architecture. This gives developers a powerful opinionated way to work with Graphql queries (API calls to Shopify Storefront API) and other benefits. But, as with any technology, we have to consider its restrictions and the right way to use it in our custom Storefronts, and this is the case when we want to use React Context. In this post, we are going to clarify this exciting aspect of the Hydrogen framework.

## The right way to use Context in Server Components

I was trying to use Context in the "standard" way in Hydrogen. For a cart UI implementation, I needed to create a context that is available throughout the application, so its state, changing from open to closed, can be accessed from any page. This is a common pattern in this kind of e-commerce application.

!['Gif image showing an slide-in ecommerce cart component'](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684842661/jandrade.co.v4/ezgif.com-optimize.gif)

I created the Context for this behavior like so:

```javascript
import { useContext, createContext, useState } from "react";
const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
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
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
```

This Javascript file is a convenient way to create the context and expose its provider and a Custom Hook called `useCart()`. We can import the Provider into the **App.server.jsx** file, and use it after the Shopify Provider:

```javascript
import renderHydrogen from "@shopify/hydrogen/entry-server";
import { Router, FileRoutes, ShopifyProvider } from "@shopify/hydrogen";
import { Suspense } from "react";
import { CartStateProvider } from "./lib/cartState";

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <CartStateProvider>
          <Router>
            <FileRoutes />
          </Router>
        </CartStateProvider>
      </ShopifyProvider>
    </Suspense>
  );
}
export default renderHydrogen(App);
```

Everything looks so simple, right? But the compiler yells like this:

![Error using a Cart UI Context as a Server Component](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684843008/jandrade.co.v4/Screen_Shot_2022-09-16_at_12.20.37_PM.png)

It's a Server Side Rendering error having its origins in the application root file we finished editing an instant ago. If we investigate this error, there's not a lot of quick information about it. Like me, you may be spending a considerable time looking for a guide to solve this problem. It was the official Hydrogen documentation that helped me to understand it:

> Currently, you can't use "Context" inside server components because server context isn't yet available in React. However, you can use "Context" inside client components.

So, the way to solve it is to make that context Client side. Let's decouple the **cartState.js** contents into their own files like so:

## Creating the context: CartUIContext.client.jsx

Now, the first step is to create the context for our Cart State:

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

We should name this file with a **.client.jsx** extension because is a Client Side Context. Note that this file exports the created context and also a custom hook called **useCartUIContext** that will be used in children components.

The next step is to create the Provider we will use as a wrapper for the whole application, as we saw in the previous section. This time, as you might have guessed, this should also be a Client Side Component:

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

This Provider exposes the Cart State and functions that will change it whenever an action in a child component is triggered. For example, on the navigation, we might have a button to open the Cart UI Component, where we might call toggleCart(), closeCart(), or openCart(), when clicking that button. The new Cart State will be preserved throughout the Website client navigation.

As this is a Client Component, we can now use it in the App.server.jsx file:

```javascript
import CartUIProvider from "./components/CartUIProvider.client";
import { CartProvider } from "@shopify/hydrogen";

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <CartUIProvider>
          <CartProvider>
            <Router>
              <FileRoutes />
            </Router>
          </CartProvider>
        </CartUIProvider>
      </ShopifyProvider>
    </Suspense>
  );
}
```

Note that I'm using a CartProvider from the **hydrogen** library and it exposes other state and functions to children components. What we recently have defined is a Provider to work on the Cart State related to the User Interface.

## Using the Context inside children components

Now, it's time to use this context in our children components. My e-commerce example for the present article has a Cart component, which is actually the drawer at the right of the screen that expands and contracts to show the products ready for checkout. It uses CSS to translate the Cart drawer from a hidden state to its full appearance using translate transforms. The change on this CSS property value to open or close the Cart drawer, depends on its state given by the CartUIProvider, and this is when we should use the hook **useCartUIContext()**, like so:

```javascript
export function Cart() {

const { cartOpen, closeCart } = useCartUIContext();

return (

<div

className={`p-5 fixed bg-white h-full top-0 right-0 w-1/2

bottom-0 shadow-2xl z-10 grid cart ${

cartOpen

? "bg-neutral-100 translate-x-0"

: "bg-orange-200 translate-x-full"

}`}

>

<header className="border-b border-stone-700 mb-8 pb-8">

<h3 className="bg-red-600 text-white inline-block px-1 py-2 -skew-x-3 m-0 text-7xl">

Your Cart

</h3>

</header>
```

This CartUI component is a Client Side Component, which uses the Provider state **cartOpen** to keep the drawer open or closed (`translate-x-0` or `translate-x-full` ).

Another example of using the CartUIContext is a Close Button (a Client Component, of course) Component. We can expose the method `closeCart()` to make the drawer hide the Cart Product contents:

```javascript
export function Cart() {

const { cartOpen, closeCart } = useCartUIContext();

const { lines, id } = useCart();



return (

<div

className={`p-5 fixed bg-white h-full top-0 right-0 w-1/2

bottom-0 shadow-2xl z-10 grid cart ${

cartOpen

? "bg-neutral-100 translate-x-0"

: "bg-orange-200 translate-x-full"

}`}

>

<header className="border-b border-stone-700 mb-8 pb-8">

{/* <Supreme>{me.name}'s Cart</Supreme> */}

<h3 className="bg-red-600 text-white inline-block px-1 py-2 -skew-x-3 m-0 text-7xl">

Your Cart

</h3>

</header>

{/* <CloseButton onClick={closeCart} type="button">

&times;

</CloseButton> */}

<CloseButton closeCart={closeCart} />
```

```javascript
function CloseButton({ closeCart }) {
  return (
    <button
      onClick={closeCart}
      type="button"
      className="bg-stone-700 text-white text-5xl border-0 absolute z-10 right-0"
    >
      &times;
    </button>
  );
}

export default CloseButton;
```

And finally, to open the cart, we can use it inside a button component placed on the navigation:

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

```javascript
import { Link } from "@shopify/hydrogen";

import OpenCartButton from "./OpenCartButton.client";

export function Nav() {
  return (
    <nav className="m-0 p-0 flex items-center justify-self-end fs-xl">
      <Link
        to="/products"
        className="py-2 px-4 flex align-center relative uppercase font-bold bg-transparent border-0 cursor-pointer"
      >
        Products
      </Link>

      <Link
        to="/orders"
        className="py-2 px-4 flex align-center relative uppercase font-bold bg-transparent border-0 cursor-pointer"
      >
        Orders
      </Link>

      <OpenCartButton />
    </nav>
  );
}
```

Notice that the navigation is a Server Component, but we can still use the OpenCartButton component (a Client Component) inside it. This type of composition is indeed allowed in React and we can use it seamlessly throughout the Storefront. In fact, this is how we could use the CartUIProvider in App.server.jsx which of course is a Server Component.

This is all for now. I hope you have found this article useful in your journey developing with Hydrogen. In the following article about Shopify, I'll be covering the steps to create a full Cart functionality which will use all the information learned today. See you then :-)
