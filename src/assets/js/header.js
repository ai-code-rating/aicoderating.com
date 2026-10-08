// Publishes the sticky header's height as --header-h, so anchor jumps (scroll-padding-top)
// and other sticky elements sit below it. It's 0 when the header isn't sticky (phones).
(function () {
    var header = document.querySelector('.top');
    if (!header) return;

    function update() {
        var sticky = getComputedStyle(header).position === 'sticky';
        document.documentElement.style.setProperty('--header-h', sticky ? header.offsetHeight + 'px' : '0px');
    }

    update();
    if (window.ResizeObserver) new ResizeObserver(update).observe(header);
    window.addEventListener('resize', update);
})();
