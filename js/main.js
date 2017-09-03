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
            _clientX = event.clientX - 370;
            _clientY = event.clientY - 50;
            $itemHtml = $(getItemHtml($(this), event));
            $itemHtml.draggable();
            $sortable.append($itemHtml);
            console.log(event);
        }
    });
    $sortable.droppable({
        tolerance: "intersect",
        drop: function( event, ui ) {

        }
    });

    /**
     * 画面左側の要素のidを取得して、それに応じたhtmlタグを返す
     * @param  {[type]} item   左側の項目の名前
     * @param  {[type]} _event dragイベント
     * @return {[string]}      html
     */
    var getItemHtml = function(item, _event){
        var _html;
        var _left = "left:" + _clientX + "px;";
        var _top = "top:" + _clientY + "px;";
        var _style =  _position + _left + _top;
        if(item.attr("id") === "item_text"){
            _html = "<div class='textform' style='"+ _style +"'>text</div>";
        }
        return _html;
    }


    /**
     * サマーノートを開く、saveButtonの作成
     * @return {[type]} [description]
     */
    $(document).on("click", ".textform", function(){

        if(!_input){
            _input = $(this).summernote({focus: true});
            // _input = $(this);
            var saveButton = "<div class='formSave' style='display:block;padding-top:15px;padding-bottom:15px;background-color:#4499ff;width:70px;text-align:center;border:1px solid #2222ff'>save</div>"
            $sortable.append(saveButton);
        }
    });

    $(document).on("click", ".formSave", function(){
        _input.summernote('destroy');
        $(this).remove();
        _input = undefined;
    });

    var observer = new MutationObserver(function(record, _observer){
      alert("muted!")
    })

    observer.observe($("#workspace")[0], {childList: true, attributes: false, characterData: true})

} );
