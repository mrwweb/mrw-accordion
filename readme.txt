=== MRW Accordion Block ===
Contributors:      mrwweb
Tags:              block
Requires at least: 5.9
Requires PHP:	   7.0
Tested up to:      6.5
Stable tag:        0.7.1
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Tags: Accordion, Expand, Collapse, FAQ

An accessible accordion block that's a joy to edit.

== Description ==

Use one or more accordion blocks to let visitors expand and collapse information. Great for FAQs, complex instructions, and auxiliary/aside information within a long post.

This plugin creates a single "Accordion" block that can be used alone or in groups.

= Block Options =

- Heading level
- Primary color (heading background and accordion border)
- Heading text color
- "Plain" block style (no background, border, or padding)
- CSS classes
- HTML anchor

= When to Use Accordions =

Accordions are incredibly common, and for good reason! In many cases, they can take overwhelming content and make it easier to take in. However, accordions are not always the right choice and come with downsides. Consider whether creating additional pages or using headings is a better solution. For guidelines and usability research, read ["Accordions Are Not Always the Answer for Complex Content on Desktops"](https://www.nngroup.com/articles/accordions-complex-content/) from the Nielsen Norman Group.

= About Accessibility & Progressive Enhancement =

Web accessibility is the critical—and often overlooked—practice that ensures a website can be used by any person on any device. Unlike almost all other accordion blocks, this one follows the [WAI-ARIA authoring practices pattern for accordions](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion). Scott O'Hara's [article on the subject](https://www.scottohara.me/blog/2017/10/25/accordion-release.html) walks through the basics.

Specifically, each accordion item is represented by a heading so screen reader users and search engines can quickly understand the page outline. A button in each heading ensures that the accordion item can be expanded and collapsed with a keyboard, and the button correctly communicates whether the accordion is open or closed both visually and to assistive technology.

In addition, this block uses "progressive enhancement" so that it can work without JavaScript. In the case that a visitor has turned off JavaScript or another script has broken, all content will be visible.

== Frequently Asked Questions ==

= Why not using the `summary` and `details` elements? =

Those are valid and accessible HTML elements but you can't use headings in a `summary` element. For more information, see ["Details / Summary Are Not [insert control here]"](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html) from Adrian Roselli.

= What happens when I uninstall the plugin/block? =

The block content will be left in the page source where the accordion toggle is a heading and all the contained content follows it.

= How can I customize the default accordion settings? =

Use a block variation!

== Changelog ==

= 0.7.1 (January 31, 2025) =

* Fix deprecated `${var}` with `{$var}` in PHP heading tag replacement

= 0.7.0 (April 11, 2024) =

* Refactor sidebar settings to be more like default WordPress, especially the colors
* Add basic Color Contrast checks that work in most cases

= 0.6.0 (April 7, 2024) =

* Use custom properties for easier styling
* Fix icon setting in block editor
* Bump @wordpress/scripts and all other packages

= 0.5.0 =
* Thanks for the Consortium for Service Innovation for a small sponsorhip and user testing!
* Expand/Collapse now works in the editor (all block still open-by-default in the editor)
* Upgrade block to use `useInnerBlocksProps()`. WP minimum version bumped to 5.9
* Merge settings panels into one for easier editing
* Add style to force heading text and icon to honor heading color setting more freuqently
* Adjust how theme color and font-sizes are accessed so the plugin works with PHP or `theme.json` settings
* Fixes: Wrap long headings, show icon in open state in editor, strip fallback heading's with inline formatting from accordion content, fix accordions with removed custom IDs, don't show block if heading and content are empty

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
