# stash-context-menu

![alt text](https://i.ibb.co/jb1C5s4/promo.png)
Experimental

This plugin adds a context menu to some of stash pages (you can right click now)
the available options will be the same options you have in your filter toolbar except now you can continue scrolling without loosing your spot by having to scroll to the very top of the page.

# Installation

Copy the folder ` stash-context-menu` from the ` dist/` directory to your `/plugins` in your stash installation
go to `/settings?tab=plugins` and reload your plugins
after a page refresh youll be able to press "cmd" + "/" to open the omnisearch
hit esc or click on the backdrop to exit

# Usage

go to any index page (/scenes, /images, /tags, /performers... etc)
right click or press "cmd" + "." (or use ctrl on windows)
yayy

# For devs

This project is using Bun, TypeScript, and Sass

The build in `/dist` is ready for install
If you want a minified version run `npm run build-minified`
