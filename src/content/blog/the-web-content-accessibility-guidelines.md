---
title: The Web Content Accessibility Guidelines (WCAG)
tags: ["A11y", "WCAG"]
excerpt: "In this post, we'll learn about the WCAG specification, what is aimed at, its importance for accessibility assessments, and finally, we'll conclude if it guarantees having a thorough accessible experience for our audience. "
pubDate: 2023-07-11 00:00
---

The [WCAG, Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21/) is a standard developed by the Web accessibility initiative of the W3C.
Using this standard, businesses and organizations have measurable criteria to validate if their web products are accessible by people with disabilities and of course by those who don't but can benefit from a better and thorough user experience.
They can also comply with state or local regulations about Web accessibility.

WCAG is aimed at design, content, and code, so it's recommendable for a whole product team to be familiarized with the standard. The WCAG 2.1 is the version that can be used, but the recent 2.2 can also have newly added criteria that could be necessary or additional for a product evaluation.

Each WCAG guideline is organized under 4 principles and in each guideline we can find testable success criteria which are at three conformance levels: A, AA, and AAA. Take a look at the following diagram that shows the WCAG structure:

![Diagram showing the structure of WCAG documents including principles, guidelines and success criteria](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1689098852/jandrade.co.v4/Pasted_image_20230711130702.png)

## Principles

The four [principles "P.O.U.R"](https://www.w3.org/TR/WCAG21/#perceivable) underlying WCAG are:

### Perceivable

It means that the users can perceive the Web content with one or more senses. It can't be invisible to all senses.

### Operable

Users can control UI elements such as buttons, links, accordions, tabs, etc, with different kinds of devices such as mice, keyboards, voice commands, among others. The user interface cannot require interaction that a user cannot perform.

### Understandable

Content and the user interface should be easy to understand, with clear language, logical organization, and helpful instructions.

### Robust

The content should be compatible with different technologies and devices, ensuring reliable interpretation by assistive technologies and avoiding reliance on specific technologies.

Some key facts about the WCAG:

- The guidelines focus on the previous principles and not a specific technology, emphasizing the need to think about the various ways that people interact with content
- They aim at being inclusive for the benefit of people with or without disabilities; this includes users with impairments to their: **vision**, **hearing**, **mobility**, **speaking**, or **cognition (thinking and understanding)**.
- The guidelines apply to mobile content, too.

## The guidelines

Under each of the four principles, there's a list of guidelines that address that principle.
WCAG 2.1 has 13 guidelines spread through the 4 principles. The following is a top-level description of the [WCAG guidelines under each principle](https://www.w3.org/TR/WCAG21/#later-versions-of-accessibility-guidelines):

### Perceivable

**1.1 – Text Alternatives:** 
Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols, or more straightforward language.

**1.2 – Time-based Media:** 
Provide alternatives for time-based media.

**1.3 – Adaptable:** 
Create content that can be presented in different ways (for example more straightforward layout) without losing information or structure.

**1.4 – Distinguishable:** 
Make it easier for users to see and hear content including separating foreground from background.

### Operable

**2.1 – Keyboard Accessible:** Make all functionality available from a keyboard.

**2.2 – Enough Time:** Provide users with enough time to read and use content.

**2.3 – Seizures and Physical Reactions:** Do not design content in a way that is known to cause seizures or physical reactions.

**2.4 – Navigable:** Provide ways to help users navigate, find content, and determine where they are.

**2.5 – Input Modalities:** Make it easier for users to operate functionality through various inputs beyond the keyboard.

### Understandable

**3.1 – Readable:** Make text content readable and understandable.

**3.2 – Predictable:** Make Web pages appear and operate in predictable ways.

**3.3 – Input Assistance:** Help users avoid and correct mistakes.

### Robust

**4.1 – Compatible:** Maximize compatibility with current and future user agents, including assistive technologies.

## The success criteria

In order to ensure that the guidelines have been followed, WCAG divides each guideline into specific and predominantly technical requirements to make them **actionable**, **measurable**, and testable. **Adhering** to these requirements, also called **success criteria**, is crucial for enhancing the accessibility of service.

The **13 guidelines** are broken down into **78 success criteria** (SC)

A success criterion targets one or more *specific* accessibility issues. For example:

> Success Criterion 1.3.4 Orientation:
> Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

## The three levels of conformance: A, AA, AAA

Each success criterion is given a conformance level A, AA, or AAA. It marks the level of accessibility that the success criterion certifies.

78 success criteria are encompassed in WCAG 2.1, each categorized into one of the three conformance levels. There are 30 success criteria rated at level A, 20 success criteria at level AA, and 28 success criteria at level AAA.

### LEVEL A

Level A plays an imperative role in ensuring the accessibility of web content. Failing to meet this level of accessibility can make it impossible for people with disabilities to access it.

### LEVEL AA

Level AA criteria focus on addressing additional barriers to access and providing necessary accessibility requirements for a wider range of disabilities. It represents an indispensable level of accessibility.

While satisfying Level AA covers a wide range of disabilities, significant barriers could remain for some people.

### LEVEL AAA

Level AAA, the highest accessibility conformance level, may not always be attainable and is not universally advocated by the W3C. However, achieving Level AAA would significantly benefit your site’s users.

For Level AAA conformance, your content must satisfy **all the Level A, Level AA, and Level AAA Success Criteria**.

It is recommended to strive for satisfying as many success criteria as possible in order to ensure a high level of accessibility, by addressing as many accessibility barriers as feasible.

## Why applying WCAG doesn't guarantee a thorough accessible experience

So, after knowing WCAG and reviewing deeply its structure, you may think that applying the criteria could be enough to guarantee the accessibility of your Website or Web application. But, accessibility goes beyond satisfying this standard. You may follow and conform to every single criterion, but that doesn't mean there are no more barriers to accessing your content.

> Even content that conforms at the highest level (AAA) will not be accessible to individuals with all types, degrees, or combinations of disability, particularly in the cognitive language and learning areas.

The following are examples of the previous statement:

- Guidance and requirements for expected keyboard combinations and interactions are not included in WCAG.
- Using poor heading hierarchy, non-descriptive link text, a confusing layout, or complex tables that are challenging for screen reader users can make your content difficult, if not impossible, to use.

So, when you’re building for accessibility the real question isn’t "Does it conform to WCAG?" but rather "Is it usable by people?",
including users is the only way to get confidence a thing works.
The need for usability testing arises to ensure both accessibility and usability of the content.

Other reasons why WCAG is not enough:

### Assistive Technologies and browser bugs are not mitigated by WCAG

If the ARIA attributes you rely on to create a custom interactive component lack sufficient support, it can exclude many of your users, rendering your website or app inaccessible to them.

### The conformance to WCAG represents the minimum level of compliance.

Rather than considering WCAG as a final objective, it is more appropriate to view its requirements as a fundamental baseline for preventing accessibility issues.

You want to meet the minimum requirements to be legally compliant and go a step further to **make your products inclusive**.

## Conclusion

I trust that this summary of WCAG has provided you with an understanding of its framework and how the success criteria can establish a foundation for enhancing the accessibility of our services. It is important to remember that our objective extends beyond mere legal compliance; we should strive to enhance usability and eliminate barriers that hinder access to our content.
