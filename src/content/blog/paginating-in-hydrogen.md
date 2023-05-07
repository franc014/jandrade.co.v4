---
title: Paginating Resources in Shopify Hydrogen
tags: ["shopify", "hydrogen"]
---

# Paginating Resources in Shopify Hydrogen

As in any Web application, paginating the data we're fetching from the backend is crucial for its performance. In a Hydrogen application, there's no exception to this pattern, but we need to rely on the Storefront Graphql API. In this post, I'm going to describe the steps that could be considered to paginate products, collections or any other resource in Shopify, and how to create the User Interface that uses that pagination.

## Paginating in the Server Side with Graphql

It should be always a requirement to paginate results in the Server Side. That's why the majority of API's in frameworks like Hydrogen, already include in their data schemas a mechanism to extract paginated rows from the database. This implementation is a **cursor-based** pagination; the Shopify Engineering team has adpted this paradigm over **offset-based** pagination because it improves the performance of queries, and of course our applications.

Our queries that fetch data such as products or collections, should have the next parts:

1. A **first** parameter: the number of items we want to get on each page.
2. A **after** paramter: corresponding to the **cursor** we need for the next round of paginated results
3. Besides the resurces we'are fetching; products, for example, we need to query the **pageInfo** field which is present on all **connections**. When you get that list of products, you will notice that you need to specify the **edges** field. The list of edges you get back, is the connection.

**Note:** With the paramters first and after, we'll be building a **forward** pagination. If you need implement a backwards pagination mechanism, you can alter your query using the **last** and **before** parameters instead of **first** and **after**.

For the first paginated results, you don't need to specify the cursor. For the next paginated results, you should use the cursor that is extracted in the pageInfo field. Let's see what I mean:

### First paginated results

**ALL_PRODUCTS_QUERY** in index.server.jsx

Note that by the **pageInfo** field, you get the **hasNextPage** and **endCursor** properties. The **hasNextPage** property, is of a boolean type that tells you if there are more pages to fetch and the encCursor is the actual cursor you'll need to use in the next iteration. If you need a backwards pagination, you can use **hasPreviousPage** and **startCursor** fields. A pagination query would be similar to:

### Next paginated results

**PAGINATED_PRODUCTS_QUERY** in index.server.jsx

This time we do use the after parameter, which receives the cursor we fetch in the previous fetch in the pageInfo field. Everytime we hit a **Load More** or **Next** button, we will pass the cursor to the pagination query to extract the next paginated items.

All right, we now have the graphql ready to paginate the products, so it's time to define where we should place these queries to build the pagination interface.

## Rendering the initial paginated items

I created an index.server.jsx file under the products folder. This will be route or page that will list all the paginated products:

function ProductsPage() in index.server.jsx

The ProductsList.client.jsx component will render the first results, but also a "**Load More**" button that when clicked will call an API route to fetch the next paginated results:

Markup of **ProductsList.client.jsx** component

# The API route we use to fetch the next paginated items

You might've noticed that the ProductsList is a client component, which means we can't use the useShopQuery hook as we did in the index.server.jsx file. To retrieve the next paginated items, when the Load More button is hit, we have to rely on an API route.
We can define the index.server.jsx file as the API route and for that we should export a function called **api()**:

`export async function api(request, { queryShop }) {`

The queryShop is a function we employ to query the Shopify store the paginated products. We pass the cursor from the previous pagination in the payload from the client:

const payload = await request.json();

In fact, in the ProductsList component, the function **fetchProducts** (we employ a useCallback() hook) fetches the results from the route api (/products) in index.server.jsx, passing the cursor in the body. This function is called every time the More Button is clicked.
Another advantage of using a client component is that the useState hook is available to us to be able to update the pagination data and information (to see if there are more pages coming in the next iteration) and use it to display the actual product items and setting up a "loading" message in the Load More button.

## Using useCallback to improve performance

Generally, fetching data is an operation that drains the resources, making an application not only work poorly but perform totally unresponsive. useCallback is a hook that allows us to "momoize" a heavy load operation; in this case is the fetching of products. Of course paginating items is the first strategy to improve its performance, but memoizing it should give us an optimisation boost.

## Fetching while scrolling using Intersection Observer

Another interesting feature to try is to render the paginated results while the user scrolls down the page. My example uses Intersection Observer to call the fetchProducts function, every time the screen "intersects" with the Load More button div wrapper, for which a moreButtonRef was created. This ref is used inside a useEffect hook, where the Intersection Observer is set up to observe it.

# Links

https://www.shopify.com/partners/blog/graphql-pagination
