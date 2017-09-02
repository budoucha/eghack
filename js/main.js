$( function() {

    var $sortable = $(".sortable");

    var _position = "position:absolute;";

    var _clientX;
    var _clientY;

    var _input;

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
        _clientX = $(this).css("left");
        _clientY = $(this).css("top");

        var text = $(this).text();
        var _left = "left:" + _clientX + ";";
        var _top = "top:" + _clientY + ";";
        var _style =  _position + _left + _top;
        $(this).replaceWith("<div class='textform' style='"+ _style +"'>"+text+"</div>");

        _input = $(".textform").summernote({focus: true});
        // _input = $(this);
        var saveButton = "<div class='formSave' style='display:block;padding-top:15px;padding-bottom:15px;background-color:#4499ff;width:70px;text-align:center;border:1px solid #2222ff'>save</div>"
        $sortable.append(saveButton);
    });

    // text click時の処理
    // $(document).on("click", "._textform", function(){
    //     $(this).summernote({focus: true});
    //
    //     _input = $(this);
    //     var saveButton = "<div class='formSave' style='display:block;padding-top:15px;padding-bottom:15px;background-color:#4499ff;width:70px;text-align:center;border:1px solid #2222ff'>save</div>"
    //     $sortable.append(saveButton);
    // });

    $(document).on("click", ".formSave", function(){
        _input.summernote('destroy');
        $(this).remove();
    });



} );
