---
title: What is The Accessibility Tree?
tags:
  [
    "A11y",
    "Accessbility tree",
    "DOM",
    "Accessibility API",
    "Accessibility API Mappings",
  ]
excerpt: "Have you wondered how people with disabilities get to interact with the browser when they may not be able to see the graphical features? In this post we'll discover what the Accessibility tree is, and how Assistive technologies use it to expose the interface features to people with disabilities. "
pubDate: 2023-07-20 00:00
---

We know that HTML code is parsed by the browser into a Document Object Model (DOM) that it uses to paint the UI; a VISUAL software with which SIGHTED people can interact. But, have you wondered how people with disabilities get to interact with the same interface when they may not be able to see the graphical features? In this post, we'll discover what the Accessibility tree is, and how Assistive technologies use it to expose the interface features to people with disabilities.

## What is the DOM?

We may already know that the Document Object Model is a tree representation of the HTML elements and their relationships. This tree and the presentation styles given by stylesheets (CSS) are then used by the browser to paint the User Interface which sighted users use to navigate and interact with the content.

But not all users can see what's on the screen and they need an alternative representation, which contains accessibility information of the HTML elements, so they can navigate the content via assistive technologies.

As not all elements carry useful information for assistive technologies, browsers expose the relevant parts in a separate structure called the Accessibility Tree.

## The Accessibility Tree

Similar to the DOM, The Accessibility tree exposes relevant information about each HTML element to assistive technologies. This information includes:

- what the element is
- its properties
- how it relates to other elements on the page

> The accessibility tree is a structure parallel to the DOM tree. “Parallel” **does not necessarily mean there is a 1:1 match between the nodes of these two trees**

The accessibility tree is typically **a subset of the DOM tree**, because (as we mentioned earlier) not all elements in the DOM carry information that is relevant to accessibility.

For example: `<div>` and `<span>` are generic elements, which **by default**, don't carry meaningful semantics that assistive technologies users need to understand the page.

Also, certain elements might not appear in the accessibility tree as they have intentionally been hidden through the use of HTML, CSS, or ARIA.

The accessibility tree does not manifest as a visual user interface. Assistive technologies such as screen readers utilize the data from the accessibility tree to comprehend and present interface elements to their users, employing methods such as **Text-to-Speech or braille display**.

The following diagram shows the DOM and Accessibility trees. As I said, both are parallel structures, but the Accessibility tree may be different depending on the information that is just useful for Assistive Technologies' users.

![Diagram showing the DOM representation of any HTML document and its parallelism with the Accessibility tree, which may be different](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1689886043/jandrade.co.v4/Pasted_image_20230720154657.png)

## Information that the Accessibility Tree contains

First, let's discover, as developers, how to inspect the Accessibility tree of a Web document and then understand the information it has for us.

In the Developer Tools, there's a tab labeled **Accessibility**. Under this tab, we find the information the Accessibility tree exposes to assistive technology. The following is a screen capture of the MDN Website Accessibility tree in Chrome:

<div class="card article-image">
<img src="https://res.cloudinary.com/dfpkdo5tf/image/upload/v1689882825/jandrade.co.v4/acc-tree.png" alt="Screen capture of the Accessibility Tree in Chrome Dev Tools">
</div>

If we activate the checkbox "Enable full page accessibility tree", we have a new presentation of it (first we have to click the button "Reload DevTools"):

<div class="card article-image">
<img src="https://res.cloudinary.com/dfpkdo5tf/image/upload/v1689883262/jandrade.co.v4/Screen_Shot_2023-06-22_at_13.04.31.png" alt="Screen capture of the Accessibility Tree in Chrome Dev Tools that shows the A11y button to activate full page Accessibility Tree">
</div>

An A11y icon appears in the top, right side of the HTML inspector. If we click it, another view of the accessibility tree is displayed:

<div class="card article-image">
<img src="https://res.cloudinary.com/dfpkdo5tf/image/upload/v1689883442/jandrade.co.v4/Screen_Shot_2023-06-22_at_13.08.30.png" alt="Screen capture of the Full page Accessibility Tree">
</div>

Usually, the browser provides four primary details regarding an element in the accessibility tree:

### Role

It lets a screen reader user know **what an element is, which is also an indication of how it has to be used.** It typically comes from an HTML element’s semantics. It's also called **_implicit_** role.
You can override an element’s implicit role by *explicitly* defining a new role using ARIA (using the **_role_** attribute)

<div class="card article-image">
<img src="https://res.cloudinary.com/dfpkdo5tf/image/upload/v1689883595/jandrade.co.v4/Screen_Shot_2023-06-22_at_13.17.10.png" alt="Screen capture showing the role of an element in the Accessibility Tree">
</div>

### Name

The **accessible name *(accName)* identifies an element within an interface**. For example, the name of a link will be its text content. The accessible name identifies the link and helps to indicate what it does.

<div class="card article-image">
<img src="https://res.cloudinary.com/dfpkdo5tf/image/upload/v1689883766/jandrade.co.v4/Screen_Shot_2023-06-22_at_13.27.33.png" alt="Screen capture showing the Accessible Name of an element in the Accessibility Tree">
</div>

If an accessible name is not provided for a UI element or control in our markup, it won't be exposed to screen readers, leaving the element unidentified and its purpose unknown to users.

### Description

Sometimes an element may have a short description that provides more useful information to the user.
Accessible descriptions, like accessible names, are only included in the accessibility tree when we explicitly provide them in our markup.

### State

States are typically dynamic and react to user interactions, triggering announcements to inform the user when a state change occurs.

### Object Properties

For example, if an element is focusable

### Object Relationships

It let us know, for example, if an element is tied to another or if it's part of a group, as well as if it is labeled or described by another element.

Some CSS properties can also affect accessibility information. For example, you can hide the presence of an element altogether from the accessibility tree using `display: none`.

In summary, the accessibility information provided in the accessibility tree is affected by:

1. the semantics of the HTML elements used
2. the styles applied to those elements
3. any ARIA attributes used on those elements

You might have already observed that the data accessible through the browser's accessibility tree corresponds to the data received by screen readers. Screen readers engage with the relevant accessibility-related data, not the complete DOM, which the browser presents to them via the accessibility tree.

## Accessibility APIs and Accessibility API mappings.

Accessibility APIs (AAPI) are native software components within operating systems that convey accessibility information about a user interface to screen readers.

Accessibility API Mappings define which ARIA role each HTML element is mapped to.

In general, a contemporary web browser usually incorporates support for one or more Accessibility APIs available on the underlying platform. When a browser implements support for an Accessibility API, it consults the corresponding accessibility mappings for that API and generates a distinct accessibility tree based on the role mappings

![Diagram that illustrates the relationship between Accessibility APIs and Assistive Technologies](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1689896976/jandrade.co.v4/Pasted_image_20230720184802.png)

## HTML elements that are included in the accessibility tree

In order for an element to be included in the accessibility tree, two conditions must be met:

1. The element must have a relevant role assigned to it.
2. The element should not be hidden in a manner that it's removed from the accessibility tree.

On the other hand, an element will be excluded from the accessibility tree if:

1. It lacks a meaningful role assignment.
2. It has been intentionally removed from the accessibility tree using HTML, CSS, or ARIA directives.

# Conclusion

As crucial as understanding the DOM is for building visual UIs, learning about the Accessibility Tree will expand our capabilities to make those UI's more accessible to users who need to have other means to perceive the web content, and interact with it. It's also important to emphasize that while we can adopt several strategies to make the content accessible; for example using ARIA to set up elements' roles, names, descriptions, and properties, the most appropriate way is to resort to the semantics of each of the elements we use in our markup, leaving the rest of techniques as progressive enhancements.
