$("#save").on("click", function() {
  var blob = new Blob([ getCurrentContentHTML() ], { "type" : "text/html" });

  if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, "mail.html");

      // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
      window.navigator.msSaveOrOpenBlob(blob, "mail.html");
  } else {
      document.getElementById("save").href = window.URL.createObjectURL(blob);
  }
});
