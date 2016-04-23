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

        var searchterm = $('#searchterm').val();
        console.log(searchterm);
        var query = 'http://api.dp.la/v2/items?sourceResource.title=' + searchterm + '&sourceResource.type=image&fields=object&api_key=5a573c1768acfa5a1af77a9fee15e89b';

        console.log(query);
        // AJAX stuff

        $.ajax({
            url: query,
            dataType: 'jsonp',
            })
            .done(function(data){
                console.log(data);

                $.each(data.docs, function (i, item) {
                    var img = document.createElement('img');
                    img.src = item.object;
                    $('#output').append(img);
                })
                
                
            })
            .fail(function(data){
                console.log('failed!');
            });

        // prevents page from reloading, which causes a flash
        return false;
        
    });

})();
