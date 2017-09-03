$( function() {

    var $sortable = $(".sortable");

    var _position = "position:absolute;";

    var _clientX;
    var _clientY;

    var canDrag = true;

    var _input;

    $( ".content_item" ).draggable({
        cursor: "move",
        helper: "clone",
        stop: function(event, ui) {
            _clientX = event.clientX - 370;
            _clientY = event.clientY - 50;
            $itemHtml = $(getItemHtml($(this), event));

            $itemHtml.addClass("created_item");
            $(".created_item").removeClass("active");
            $itemHtml.addClass("active");

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

        // text
        if(item.attr("id") === "item_text"){
            _html = "<div class='textform' style='"+ _style +"'>text</div>";
        } else if(item.attr("id") === "item_image"){ // image
            // _style += "width:99;height:99;";
            _html = "<input type='file' class='imageDrop' style='"+ _style +"'><img style='position:absolute' class='noimage' src='' /></input>";
        }
        return _html;
    }

    $(document).on("click", ".created_item", function(){
      $(".created_item").removeClass("active");
      $(this).addClass("active");
    });

    $(window).keydown(function(event){
      if (event.keyCode === 8 || event.keyCode === 46) {
        $(".active").remove();
      }
    });

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

    // inputからfileを取得して画像を表示
    $(document).on("change", ".imageDrop", function(){
        if (this.files.length > 0) {
            // 選択されたファイル情報を取得
            var file = this.files[0];

            // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function() {
                var $noimage = $('.noimage').attr('src', reader.result );
                $noimage.addClass("thumbnail");
                $noimage.css("border", "none");
                $noimage.removeClass("noimage");
            }
            $(this).remove();
        }
    });

    $(document).on("dblclick", ".thumbnail", function(){
        canDrag = !canDrag;
        if(canDrag){
            $(this).draggable("enable");
            $(this).funcResizeBox({
                isWidthResize:false, // 水平方向のリサイズのON/OFF
                isHeightResize:false // 垂直方向のリサイズのON/OFF
            });
        } else {
            $(this).draggable("disable");
            $(this).funcResizeBox({
                minWidth: 0,        // リサイズ可能な最少の幅(px)
                minHeight: 0,       // リサイズ可能な最少の高さ(px)
                maxWidth: 10000,    // リサイズ可能な最大の幅(px)
                maxHeight: 10000,   // リサイズ可能な最大の高さ(px)
                mouseRange: 20,     // リサイズイベントを取得する範囲(px)
                isWidthResize:true, // 水平方向のリサイズのON/OFF
                isHeightResize:true // 垂直方向のリサイズのON/OFF
            });
        }

    });
} );
