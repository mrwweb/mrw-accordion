=== MRW Accordion Block ===
Contributors:      mrwweb
Tags:              block
Requires at least: 5.8
Requires PHP:	   7.0
Tested up to:      5.8.0
Stable tag:        0.4.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Tags: Accordion, Expand, Collapse, FAQ

An accessible accordion block that's a joy to edit.

== Description ==

Use one or more accordion blocks to let visitors expand and collapse information. Great for FAQs, complex instructions, and auxiliary information.

This plugin creates a single "Accordion" block that can be used alone or in groups.

= Block Options =

- Heading level
- Primary color (heading background and accordion border)
- Heading text color
- CSS classes
- HTML anchor

= When to Use Accordions =

Accordions are incredibly common, and for good reason! In many cases, they can take overwhelming content and make it easier to take in. However, accordions are not always the right choice and come with downsides. Consider whether creating additional pages or using headings is a better solution. Learn more: ["Accordions Are Not Always the Answer for Complex Content on Desktops"](Accordions Are Not Always the Answer for Complex Content on Desktops)

= About Accessibility & Progressive Enhancement =

Web accessibility is the critical—and often overlooked—practice that ensures a website can be used by any person on any device. Unlike almost all other accordion blocks, this one follows the [WAI-ARIA authoring practices pattern for accordions](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion). Scott O'Hara's [article on the subject](https://www.scottohara.me/blog/2017/10/25/accordion-release.html) walks through the basics.

Specifically, each accordion item is represented by a heading so screen reader users and search engines can quickly understand the page outline. A button in each heading ensures that the accordion item can be expanded and collapsed with a keyboard, and the button correctly communicates whether the accordion is open or closed both visually and to assistive technology.

In addition, this block uses "progressive enhancement" so that it can work without JavaScript. In the case thta a visitor has disabled JavaScript or another script has broken, all content will be visible.

== Changelog ==

= 0.5.0 =
* Thanks for the Consortium for Service Innovation for a small sponsorhip and user testing!

= 0.4.0 =
* Refactor icons to use real SVGs and use a chevron icon by default
* Add accordion title heading to saved markup to improve plugin deactivation
* Dev: Add block.json schema, fix build process to avoid losing front-end script

= 0.3.0 =
* Font size setting for headings
* Color options for accordion background and heading text color
* Ensure there is always an ID for each accordion
* Fix bug with accordion expand/collapse icon squishing. Thanks for catching that, @drivendevelopment!

= 0.2.0 =
* Single block version. This one should work!

= 0.1.0 =
* Failed first attempt due to [nested `templateLock` bug](https://github.com/WordPress/gutenberg/issues/11681#issuecomment-884532810). I learned something. Let's try this again!
