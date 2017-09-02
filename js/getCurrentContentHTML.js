$(function(){
    function getCurrentContentHTML(){ // #workspace要素以下を取得
        var page = $("#workspace").html(); // 型はstring
        // console.log(page);
        return page;
    }

    // 動作確認用demoなので確認できたら消しちゃって構いません
    $(document).on('click','#save',function(){
       var hoge = getCurrentContentHTML();
       console.log(hoge); //動作確認したらここは消して構いません
    });
});
