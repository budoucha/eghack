// 動作確認用demoなので確認できたら消しちゃって構いません
$(document).on('click','#workspace',function(){
   var hoge = getCurrentContentHTML(); 
   console.log(hoge); //動作確認したらここは消して構いません      
});