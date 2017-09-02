$( function() {

    var $sortable = $(".sortable");

    var _position = "position:absolute;";

    var _clientX;
    var _clientY;

    $( ".content_item" ).draggable({
        cursor: "move",
        helper: "clone",
        stop: function(event, ui) {
            // var text = $(".sortable").append('<p>テスト</p>');
            // ui.item.css("display", "block");

            // $sortable.apped();
            _clientX = event.clientX - 370;
            _clientY = event.clientY;
            $sortable.append(getItemHtml($(this), event)); // html取得

            console.log(event);
        }
    });
    $sortable.droppable({
        tolerance: "intersect",
        drop: function( event, ui ) {
            // $( this )
            // .addClass( "ui-state-highlight" )
            // .find( "p" )
            // .html( "Dropped!" );
            // console.log(ui.draggable.text());

        }
    });

    var getItemHtml = function(item, _event){
        var _html;
        var _left = "left:" + _clientX + "px;";
        var _top = "top:" + _clientY + "px;";
        var _style =  _position + _left + _top;
        if(item.attr("id") === "item_text"){
            _html = "<p class='textform' style='"+ _style +"'>text</p>";
        }
        return _html;
    }

    // p -> input
    $(document).on("click", ".textform", function(){
        // var offset =  $(this).offset();
        _clientX = $(this).css("left");
        _clientY = $(this).css("top");

        var text = $(this).text();
        var _left = "left:" + _clientX + ";";
        var _top = "top:" + _clientY + ";";
        var _style =  _position + _left + _top;
        $(this).replaceWith("<input class='_textform' value='"+ text +"' style='"+ _style +"''></input>");
    });

    // input -> p
    $(document).on("focusout", "._textform", function(){
        // var offset =  $(this).offset();
        _clientX = $(this).css("left");
        _clientY = $(this).css("top");
        console.log(123);
        var text = $(this).val();
        var _left = "left:" + _clientX + ";";
        var _top = "top:" + _clientY + ";";
        var _style =  _position + _left + _top;
        $(this).replaceWith("<p class='textform' style='"+ _style +"'>"+ text +"</p>");
    });



} );
