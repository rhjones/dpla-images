/* Rebekah Heacock Jones
 * rebekah.heacock@gmail.com
 * CSCI E-3, Spring 2016
 * Final Project
 * rhj_final.js 
 */
"use strict";

// Self-invoking function so that nothing is exposed to the global scope
(function(){

    var button = $('#doit');
    var output = $('#output');
    var $grid = $('.grid');

    button.click(function(){

        // hide any outstanding errors
        $('#error').hide();
        $('#noResults').hide();

        // initialize masonry
        // var $grid = $('.grid').masonry({
        //     itemSelector: '.grid-item',
        //     columnWidth: 100,
        // });

        // get and validate the search term
        var searchterm = $('#searchterm').val();

        // regular expression matching alphanumeric characters, underscores, and spaces
        var re = /^[A-Za-z\d ]+$/;

        // if search term validates
        if(re.test(searchterm)) {
            // query the DPLA API for images matching the search term        
            var query = 'http://api.dp.la/v2/items?q=' + searchterm + '&sourceResource.type=image&page_size=24&api_key=5a573c1768acfa5a1af77a9fee15e89b';
            $.ajax({
                url: query,
                dataType: 'jsonp',
                })
                .done(function(data){
                    console.log(data);

                    // clear any preexisting output
                    $('#output').empty();

                    // show message if query returns no results
                    if (data.count === 0) {
                        $('#dataError').html('No results found.').show();
                    }

                    // display each image
                    $.each(data.docs, function (i, item) {
                        
                        // set up outer div for grid display
                        var outerDiv = document.createElement('div');
                        outerDiv.className = 'grid-item';

                        // set up inner div to hold item information 
                        var innerDiv = document.createElement('div');
                        innerDiv.className = 'grid-item-content';

                        // check for item metadata and add to innerDiv
                        function checkMetadata(metadata) {
                            if (metadata == 'title' && item.hasOwnProperty('admin') && item.admin.sourceResource.hasOwnProperty('title')) {
                                var datum = document.createTextNode(item.admin.sourceResource.title);
                            }
                            else if (item.sourceResource.hasOwnProperty(metadata)) {
                                var datum = document.createTextNode(item.sourceResource[metadata]);
                            } 
                            else {
                                var datum = document.createTextNode('No ' + metadata + ' given');
                            }
                            var span = document.createElement('span');
                            span.className = 'item-' + metadata;
                            span.appendChild(datum);
                            innerDiv.appendChild(span);
                        }

                        checkMetadata('title');
                        checkMetadata('creator');
                        checkMetadata('date');
                        checkMetadata('description');
                        
                        // create image
                        var img = document.createElement('img');
                        img.src = item.object;

                        // append everything to DOM 
                        innerDiv.appendChild(img);
                        outerDiv.appendChild(innerDiv);
                        $('#output').append(outerDiv);

                    });

                    // make the display pretty with masonry
                    // after images have loaded
                    var $grid = $('.grid').masonry({
                        itemSelector: '.grid-item',
                        columnWidth: 300
                    });
                    $grid.imagesLoaded().progress( function() {
                        $grid.masonry('layout');
                    });

                    // use reloadItems to force a reload after a new ajax call is made
                    $grid.masonry('reloadItems');
                })
                .fail(function(data){
                    $('#dataError').html('Error querying the database. Please try again.').show();
                });
        } else { // if search term fails validation
            $('#error').show();
        }

        

        // prevents page from reloading, which causes a flash
        return false;
        
    });

})();
