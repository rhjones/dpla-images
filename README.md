# DPLA Images

Final Project for CSCI E-3 Introduction to Web Programming Using JavaScript, Spring 2016

Queries the [DPLA API](http://dp.la/info/developers/codex/) for images and displays them.

## Essential Features
- ~~accept some form of user input (choosing a state from a dropdown menu, entering text, etc.)~~
- ~~use DPLA API to search DPLA for related images~~
- ~~display images on page~~
- ~~display select metadata on page~~
- ~~link back to DPLA item record~~

## Requirements (at least 4)
- ~~DOM element creation, deletion or modification~~
	- add new divs, images, spans, and links for each search result
- ~~DOM traversal~~
	- applying background colors to each .grid-item-content div
- ~~Capturing and handling events (beyond just a “Do it!” button)~~
	- clicking on .grid-item-content to expand
	- click on "about" and "credits" links to toggle display of relevant text
	- surprise me button
- Creating and handling a data structure (JSON, custom objects, etc)
- ~~Form validation~~
	- validate user input to be alphanumeric
- Closures
- ~~AJAX~~
	- DPLA API

## Outside Sources
- [Masonry](http://masonry.desandro.com/)
	- [animating item size](http://masonry.desandro.com/extras.html#animating-item-size)
- [imagesLoaded](http://imagesloaded.desandro.com/)
- [jQuery](https://jquery.com/)
- [Google Fonts](https://www.google.com/fonts)
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
- [Normalize.css](https://necolas.github.io/normalize.css/)

## Future ideas
- more inventive way of searching: click on a map? use a datalist to allow for text entry/autocomplete?
- more metadata
- pagination/more results?
- comparison: pit two search terms against each other & return metadata
	- # of images
	- # of videos
	- # of audio files
	- # of text items
- turn into a bookmarklet? select something on a webpage and click the DPLA image search bookmarklet, and get a new page w/results 
