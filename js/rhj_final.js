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
                    if (data.count === 0) {
                        $('#noResults').show();
                    }
                    // add a "no images found" message
                    // clear the output
                    $('#output').empty();

                    // display each image
                    $.each(data.docs, function (i, item) {
                        var outerDiv = document.createElement('div');

                        var img = document.createElement('img');
                        img.src = item.object;

                        var div = document.createElement('div');
                        div.className = 'grid-item-content';

                        if(item.hasOwnProperty('admin')) {
                            if (item.admin.sourceResource.hasOwnProperty('title')) {
                                var title = document.createTextNode(item.admin.sourceResource.title);
                            } 
                        } else {
                            var title = document.createTextNode('No title given');
                        }

                        if (item.sourceResource.hasOwnProperty('creator')) {
                            var creator = document.createTextNode(item.sourceResource.creator[0]);
                        } else {
                            var creator = document.createTextNode('No creator given');
                        }

                        if (item.sourceResource.hasOwnProperty('date')) {
                            var date = document.createTextNode(item.sourceResource.date['displayDate']);
                        } else {
                            var date = document.createTextNode('No date given');
                        }

                        if (item.sourceResource.hasOwnProperty('description')) {
                            var description = document.createTextNode(item.sourceResource.description);
                        } else {
                            var description = document.createTextNode('No description given');
                        }


                        var titleSpan = document.createElement('span');
                        titleSpan.className = 'item-title';
                        titleSpan.appendChild(title);

                        var creatorSpan = document.createElement('span');
                        creatorSpan.className = 'item-creator';
                        creatorSpan.appendChild(creator);

                        var dateSpan = document.createElement('span');
                        dateSpan.className = 'item-date';
                        dateSpan.appendChild(date);

                        var descriptionSpan = document.createElement('span');
                        descriptionSpan.className = 'item-description';
                        descriptionSpan.appendChild(description);

                        outerDiv.appendChild(titleSpan);
                        outerDiv.appendChild(creatorSpan);
                        outerDiv.appendChild(dateSpan);
                        outerDiv.appendChild(descriptionSpan);
                        
                        outerDiv.className = 'grid-item';

                        div.appendChild(img);
                        
                        outerDiv.appendChild(div);

                        $('#output').append(outerDiv);

                    });

                    var $grid = $('.grid').masonry({
                        // options
                        itemSelector: '.grid-item',
                        columnWidth: 300
                    });

                    // make the display pretty with masonry
                    // after images have loaded
                    $grid.imagesLoaded().progress( function() {
                        $grid.masonry('layout');
                    });

                    // use reloadItems to force a reload after a new ajax call is made
                    $grid.masonry('reloadItems');
                })
                .fail(function(data){
                    console.log('failed!');
                });
        } else { // if search term fails validation
            $('#error').show();
        }

        

        // prevents page from reloading, which causes a flash
        return false;
        
    });

})();
