$( function() {
    //表示させたい場所
    var $sortable = $(".sortable");

    var _position = "position:absolute;";

    var _clientX;
    var _clientY;

    var canDrag = true;

    var _input;

    var url = " ";

    //item_をドラックできるようにしている
    $( ".content_item" ).draggable({
        cursor: "move",
        helper: "clone",
        stop: function (event, ui) {
            _clientX = event.clientX - 370;
            _clientY = event.clientY - 50;
          //下に飛ぶ(thisの中にid,classとかが入っている)
            $itemHtml = $(getItemHtml($(this), event));
            $itemHtml.addClass("created_item");
            $(".created_item").removeClass("active");
            $itemHtml.addClass("active");
            $itemHtml.draggable({
                stop: function() {
                    history.stack_push(); // 移動時プッシュ
                }
            });

            history.stack_push(); // 生成時プッシュ

            $sortable.append($itemHtml);
            //console.log(event);
        }
    });
    $sortable.droppable({
        tolerance: "intersect",
        drop: function (event, ui) {

        }
    });

    /**
    * 画面左側の要素のidを取得して、それに応じたhtmlタグを返す
    * @param  {[type]} item   左側の項目の名前
    * @param  {[type]} _event dragイベント
    * @return {[string]}      html
    */
    var getItemHtml = function (item, _event) {
        var _html;
        var _left = "left:" + _clientX + "px;";
        var _top = "top:" + _clientY + "px;";
        var _style =  _position + _left + _top;
        // text
        if (item.attr("id") === "item_text") {
            _html = "<div class='textform' style='" + _style + "'>text</div>";
        } else if (item.attr("id") === "item_image") { // image
            // _style += "width:99;height:99;";
            _html = "<input type='file' class='imageDrop' style='" + _style + "'><img style='position:absolute' class='noimage' src='' /></input>";
        } else if(item.attr("id") === "item_button"){
            url=prompt("urlを入力して下さい", "https://");
            var buttonName = prompt("ボタン名を入力して下さい", "ボタン名");
            _style += "padding: 12px; padding-right:100px; padding-left:100px; display:block; text-decoraion:none; border:1px solid #333;";
            _html = "<a href='"+ url +"' class='button' target='_blank' style='"+ _style +"'>"+ buttonName +"</a>";
        }
        //socialのアイコンを追加
        else if(item.attr("id") === "item_social"){
            console.log(_clientY);
            var twitterUrl = prompt("twitterのurlを指定してください", "https://");
            var facebookUrl = prompt("facebookのurlを指定してください", "https://");
            var googlePlusUrl = prompt("google plusのurlを指定してください", "https://");
            _html = "<div style='"+ _style +"'><a href='"+twitterUrl+"' target = '_blank' style='margin-right:1px'> <img src='image/twitter.png' alt='twitter_icon' border='0' width = '20' height = '20'></a><a href='"+ facebookUrl +"' target = '_blank' style='margin'> <img src='image/facebook.png' alt='facebook_icon' border='0' width = '28' height = '28'></a><a href='"+googlePlusUrl+"' target = '_blank' style='margin-left:1px'> <img src='image/google_plus.png' alt='googleplus_icon' border='0' width = '20' height = '20'></a></div>"
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
        history.stack_push(); // 削除時プッシュ
      }
    });

    /**
    * サマーノートを開く、saveButtonの作成
    * @return {[type]} [description]
    */
    $(document).on("click", ".textform", function () {

        if (!_input) {
            _input = $(this).summernote({ focus: true });
            // _input = $(this);
            var saveButton = "<div class='formSave' style='display:block;padding-top:15px;padding-bottom:15px;background-color:#4499ff;width:70px;text-align:center;border:1px solid #2222ff'>save</div>"
            $sortable.append(saveButton);
        }
    });

    $(document).on("click", ".formSave", function () {
        _input.summernote('destroy');
        $(this).remove();
        _input = undefined;
    });

    // inputからfileを取得して画像を表示
    $(document).on("change", ".imageDrop", function () {
        if (this.files.length > 0) {
            // 選択されたファイル情報を取得
            var file = this.files[0];

            // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function () {
                var $noimage = $('.noimage').attr('src', reader.result);
                $noimage.addClass("thumbnail");
                $noimage.css("border", "none");
                $noimage.removeClass("noimage");
            }
            $(this).remove();
        }
    });

    $(document).on("dblclick", ".thumbnail", function () {
        canDrag = !canDrag;
        if (canDrag) {
            $(this).draggable("enable");
            $(this).funcResizeBox({
                isWidthResize: false, // 水平方向のリサイズのON/OFF
                isHeightResize: false // 垂直方向のリサイズのON/OFF
            });
        } else {
            $(this).draggable("disable");
            $(this).funcResizeBox({
                minWidth: 0,        // リサイズ可能な最少の幅(px)
                minHeight: 0,       // リサイズ可能な最少の高さ(px)
                maxWidth: 10000,    // リサイズ可能な最大の幅(px)
                maxHeight: 10000,   // リサイズ可能な最大の高さ(px)
                mouseRange: 20,     // リサイズイベントを取得する範囲(px)
                isWidthResize: true, // 水平方向のリサイズのON/OFF
                isHeightResize: true // 垂直方向のリサイズのON/OFF
            });
        }
    });

    // 履歴関連
    var history = new History();

    $(document).on('click', '#undo', function () {
        history.undo();
    });
    $(document).on('click', '#redo', function () {
        history.redo();
    });

    $(window).keydown(function(e){
        if(event.ctrlKey){
          if(e.keyCode === 90){
            history.undo();
            return false;
          }
        }
    });
    $(window).keydown(function(e){
        if(event.ctrlKey){
          if(e.keyCode === 89){
            history.redo();
            return false;
          }
        }
    });
});
