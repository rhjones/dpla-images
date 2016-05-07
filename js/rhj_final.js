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

    button.click(function(){

        // hide any outstanding errors
        $('#error').hide();

        // get and validate the search term
        var searchterm = $('#searchterm').val();

        // regular expression matching alphanumeric characters, underscores, and spaces
        var re = /^[a-z\d ]+$/;

        if(re.test(searchterm)) {
            // query the DPLA API for images matching the search term        
            var query = 'http://api.dp.la/v2/items?q=' + searchterm + '&sourceResource.type=image&api_key=5a573c1768acfa5a1af77a9fee15e89b';
            console.log(query);
            $.ajax({
                url: query,
                dataType: 'jsonp',
                })
                .done(function(data){
                    console.log(data);

                    // clear the output
                    $('#output').empty();

                    // display each image
                    $.each(data.docs, function (i, item) {
                        var img = document.createElement('img');
                        img.src = item.object;
                        $('#output').append(img);
                    }) 
                    
                })
                .fail(function(data){
                    console.log('failed!');
                });
        } else {
            $('#error').show();
        }

        

        // prevents page from reloading, which causes a flash
        return false;
        
    });

})();
