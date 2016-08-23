# DPLA Images

Queries the [DPLA API](http://dp.la/info/developers/codex/) for images and displays them.

Entering an alphanumeric search term and clicking "Find Images" will return 25 image records from the DPLA. Clicking "Surprise Me" will return 25 images on a 'surprise' topic (selected at random from an array of possibilities).

Image records are displayed as "tiles" containing the record title, creator, and date (where available). Clicking on an image record expands the record to include the description (where available) and a link to the original record on the DPLA website. Clicking the record again collapses it.

Image record tiles reflow smoothly thanks to [Masonry](http://masonry.desandro.com/).

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
