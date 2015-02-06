---
layout: post
title: Goodbye WordPress, Hello Jekyll
uuid: 2676a77d-8b23-4a4c-ae6d-7ef2779acb8f
date: 2015-01-24T20:46:51+01:00
tags:
- Blog
- Jekyll
- WordPress
---
I have switch my blog from using [WordPress](https://wordpress.org){:target="_blank"} to using [Jekyll](http://jekyllrb.com){:target="_blank"} instead. Jekyll is a site generator, that builds a static website from "templates" and plain text files (usually [Markdown](http://daringfireball.net/projects/markdown/){:target="_blank"} files)<!--break-->.

## Reasons for switching to Jekyll

* Speed – (Because Jekyll is static HTML files, the speed is top-notch)
* Easier backup — (Just flat files, so a simple copy will do)
* Flexibility – (I better understand HTML and CSS, than PHP which WordPress is built with, so easier for me to modify)
* Back to basics – (Remove all the extra features/bloat from a WordPress driven site)
* Wanting to try something new

## Inspiration and resources

The Jekyll setup I am using is primarily based on [Jekyll Now](http://www.jekyllnow.com){:target="_blank"}, although I have modified a bit.
I have modified the navigation bar, to be placed between two lines and I have also split the navigation bar in two, floating left and right.

I have added pagination with inspiration from the [Lanyon Theme](http://lanyon.getpoole.com){:target="_blank"} of the [Poole Jekyll setup](http://getpoole.com){:target="_blank"}.

I have added Tags and a Archive page, with great inspiration from [Scott S. Lowe's blog](http://blog.scottlowe.org){:target="_blank"}. In general I have look a lot at Scott's source code on [GitHub](https://github.com/lowescott/lowescott.github.io){:target="_blank"}, to see how to do things in Jekyll.

I am using the [Jekyll-Lunr-JS-Search](https://github.com/slashdotdash/jekyll-lunr-js-search){:target="_blank"} project for my search page.

For "Continue reading" links, I am using this [spilt filter technique](http://mikeygee.com/blog/truncate.html){:target="_blank"} by Michael "Mikey" Gee.

I am also using a [Image.html](http://codingtips.kanishkkunal.in/image-caption-jekyll/){:target="_blank"} file in my _includes folder, for centering images in my blogpost and also added a small shadow to them.

## Source Code

The source code for this blog is available on GitHub:
[https://github.com/hazenet/hazenetdk](https://github.com/hazenet/hazenetdk){:target="_blank"}
