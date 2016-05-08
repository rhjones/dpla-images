/* Rebekah Heacock Jones
 * rebekah.heacock@gmail.com
 * https://github.com/rebekahheacock/
 * CSCI E-3, Spring 2016
 * Final Project: DPLA Images
 * dpla_images.js 
 */
"use strict";

// set up jQuery plugin to toggle background opacity
(function($){
    $.fn.toggleBackgroundOpacity = function(){
        var oldColor = $(this).css('background-color');
        if (oldColor.substring(0,4) === 'rgba') {
            var newColor = oldColor.substring(0, oldColor.lastIndexOf(' '));
            var newColor = newColor + ' 1.0)';
            return $(this).css('background-color', newColor);
        } else if (oldColor.substring(0,4) === 'rgb(') {
            var newColor = oldColor.substring(3, oldColor.lastIndexOf(')'));
            var newColor = 'rgba' + newColor + ', 0.5)';
            return $(this).css('background-color', newColor);
        }
     };
})(jQuery);

// Self-invoking function so that nothing is exposed to the global scope
(function(){

    $('#about-link').click(function(e) {
        if ($('#credits').is(':visible')) {
            $('#credits').slideToggle('fast');
        }
        $('#about').slideToggle('slow');
        return false;
    });

    $('#credits-link').click(function(e) {
        if ($('#about').is(':visible')) {
            $('#about').slideToggle('fast');
        }
        $('#credits').slideToggle('slow');
        return false;
    });

    $('#buttons').click(function(e){

        e.preventDefault();

        // hide any outstanding errors
        $('#error').hide();
        $('#dataError').hide();

        if (event.target === document.getElementById('doit')) {
            // get and validate the search term
            // only A-Z, a-z, 0-9, and spaces allowed
            var searchInput = $('#searchterm').val();
        }
        else if (event.target === document.getElementById('surprise')) {
            var surprises = [
                'zebra',
                'penguin',
                'jazz',
                'unicorn',
                'daisy',
                'red sox',
                'yellow',
                'hippies',
                'illman brothers',
                'earhart',
                'mountain',
                'bagpipes',
                'cake',
                'stuff'
            ];
            var searchInput = surprises[Math.floor(Math.random()*surprises.length)];
            $('#searchterm').val(searchInput);
        }

        // if search term validates
        var re = /^[A-Za-z\d ]+$/;
        if(re.test(searchInput)) {

            var searchTerm = searchInput.replace(/ /g, '+');

            // query the DPLA API for images matching the search term        
            var query = 'http://api.dp.la/v2/items?q=' + searchTerm + '&sourceResource.type=image&page_size=25&api_key=5a573c1768acfa5a1af77a9fee15e89b';
            $.ajax({
                url: query,
                dataType: 'jsonp',
                })
                .done(function(data){

                    // var data = peacocks;

                    // console.log(data);

                    // clear any preexisting output
                    $('#output').empty();
                    $('#output').append('<div class="grid-sizer"></div>');

                    // show message if query returns no results
                    if (data.count === 0) {
                        $('#dataError').html('No results found.').show();
                    }

                    // display each image
                    $.each(data.docs, function (i, item) {
                        
                        // set up outer div for grid display
                        var outerDiv = document.createElement('div');
                        $(outerDiv).addClass('grid-item');

                        // set up inner div to hold item information 
                        var innerDiv = document.createElement('div');
                        $(innerDiv).addClass('grid-item-content');

                        // create image and add to innerDiv
                        var img = document.createElement('img');
                        img.src = item.object;
                        $(innerDiv).append(img);

                        // function to check for item metadata and add to innerDiv
                        function checkMetadata(metadata) {
                            if (metadata ==='title' && item.hasOwnProperty('admin') && item.admin.sourceResource.hasOwnProperty('title')) {
                                var datum = document.createTextNode(item.admin.sourceResource.title);
                            }
                            else if (item.sourceResource.hasOwnProperty(metadata)) {
                                if (metadata === 'date') {
                                    var datum = document.createTextNode(item.sourceResource[metadata].displayDate ? item.sourceResource[metadata].displayDate : item.sourceResource[metadata][0].displayDate);
                                }
                                else {
                                    var datum = document.createTextNode(item.sourceResource[metadata]);
                                }
                            } 
                            else {
                                // if there's no metadata, return without adding a span
                                return;
                            }
                            if (datum.length > 175) {
                                var extraDatum = datum.splitText(175);
                                datum.textContent += '. . .';
                            }
                            var span = document.createElement('span');
                            $(span).addClass('item-' + metadata);
                            $(span).append(datum);
                            $(innerDiv).append(span);
                        }

                        checkMetadata('title');
                        checkMetadata('creator');
                        checkMetadata('date');
                        checkMetadata('description');

                        // add link back to item on DPLA website
                        var link = document.createElement('a');
                        $(link).attr('href','http://dp.la/item/' + item.id);
                        $(link).attr('target', '_blank');
                        $(link).text('View on DPLA');
                        $(link).append('<i class="fa fa-external-link" aria-hidden="true"></i>');
                        $(innerDiv).append(link);
                        
                        // append everything to DOM 
                        $(outerDiv).append(innerDiv);
                        $('#output').append(outerDiv);

                    });

                    // assign background colors to item divs
                    $('.grid-item-content').each(function(index) {
                        var bgColors = ['green', 'yellow', 'blue', 'aqua', 'gray', 'red'];
                        $(this).addClass(bgColors[index%6]);
                    });

                    // toggle opacity of background color on hover
                    $('.grid-item-content').hover(
                        $(this).toggleBackgroundOpacity,
                        $(this).toggleBackgroundOpacity
                    );

                    // apply Masonry after images are loaded for prettier layout and UI  
                    var $grid = $('.grid').masonry({
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-sizer',
                        percentPosition: true,
                    });
                    $grid.imagesLoaded().progress( function() {
                        $grid.masonry('layout');
                    });

                    // clicking on an item expands it
                    // .off() removes any existing click handlers to prevent event from firing multiple times
                    // see: http://stackoverflow.com/questions/14969960/jquery-click-events-firing-multiple-times
                    $grid.off().on( 'click', '.grid-item-content', function(event) {
                        $(event.currentTarget).parent().toggleClass('is-expanded');
                        $grid.masonry();
                    });

                })
                .fail(function(data){
                    $('#dataError').html('Error querying the database. Please try again.').show();
                });
        } else { // if search term fails validation
            $('#error').show();
        }

        // after the ajax call is complete, reload masonry
        // this ensures that masonry continue to be applied to new sets of images after the first ajax call
        // see: http://stackoverflow.com/questions/6490633/jquery-masonry-multiple-ajax-call-issue
        $(document).ajaxComplete(function() {
            // use reloadItems to force a reload
            $('.grid').masonry('reloadItems').masonry();
        })
        
    });

})();
