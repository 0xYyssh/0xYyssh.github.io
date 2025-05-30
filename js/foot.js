// 页脚养鱼
fish();
function fish() {
  return (
    $("#footer-wrap").css({
      position: "absolute",
      "text-align": "center",
      top: -55,
      right: 0,
      left: 0,
      bottom: 0,
    }),
    $("footer").append(
      '<div class="container" id="jsi-flying-fish-container"></div>'
    ),
    $("body").append(
      '<script src="https://fastly.jsdelivr.net/gh/xiabo2/CDN@latest/fish.js"></script>'
    ),
    this
  );
}


// 动态心跳，更改自己的名称
$(document).ready(function (e) {
  $('.copyright').html('©2024-2025 <i class="fa-fw fas fa-heartbeat card-announcement-animation cc_pointer"></i>0xYyssh心脏滴血');
})

$(document).ready(function (e) {
  show_date_time();
})

//本站运行时间，更改自己建立站点的时间
function show_date_time() {
  $('.framework-info').html('大脑已过载<span id="span_dt_dt" style="color: #fff;"></span>');
  window.setTimeout("show_date_time()", 1000);
  BirthDay = new Date("11/20/2024 01:39:42");
  today = new Date();
  timeold = (today.getTime() - BirthDay.getTime());
  sectimeold = timeold / 1000
  secondsold = Math.floor(sectimeold);
  msPerDay = 24 * 60 * 60 * 1000
  e_daysold = timeold / msPerDay
  daysold = Math.floor(e_daysold);
  e_hrsold = (e_daysold - daysold) * 24;
  hrsold = Math.floor(e_hrsold);
  e_minsold = (e_hrsold - hrsold) * 60;
  minsold = Math.floor((e_hrsold - hrsold) * 60);
  seconds = Math.floor((e_minsold - minsold) * 60);
  span_dt_dt.innerHTML = '<font style=color:#afb4db>' + daysold + '</font> 天 <font style=color:#f391a9>' + hrsold + '</font> 时 <font style=color:#fdb933>' + minsold + '</font> 分 <font style=color:#a3cf62>' + seconds + '</font> 秒';
}
