$( function() {
    $( ".content_item" ).draggable({
        cursor: "move",
        helper: "clone",
        stop: function(event, ui) {
            // var text = $(".sortable").append('<p>テスト</p>');
            // ui.item.css("display", "block");
            console.log(event);
        }
    });
    $(".sortable").droppable({
        tolerance: "intersect",
        drop: function( event, ui ) {
            // $( this )
            // .addClass( "ui-state-highlight" )
            // .find( "p" )
            // .html( "Dropped!" );
            // console.log(ui.draggable.text());
        }
    });

} );
