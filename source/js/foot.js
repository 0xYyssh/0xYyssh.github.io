// 确保 DOM 加载完成后再执行  
document.addEventListener('DOMContentLoaded', function () {
  // footer 运行时间（右侧）  
  function updateFooterRuntime() {
    const footerRuntime = document.querySelector('.footer-runtime');
    if (!footerRuntime) return;

    const BirthDay = new Date("12/30/2025 01:39:42");
    const now = new Date();
    const diff = now - BirthDay;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const mins = Math.floor(diff / (1000 * 60)) % 60;
    const secs = Math.floor(diff / 1000) % 60;

    footerRuntime.innerHTML = `大脑已过载 <span style="color:#afb4db">${days}</span> 天 <span style="color:#f391a9">${hours}</span> 时 <span style="color:#fdb933">${mins}</span> 分 <span style="color:#a3cf62">${secs}</span> 秒`;
  }

  updateFooterRuntime();
  setInterval(updateFooterRuntime, 1000);
});