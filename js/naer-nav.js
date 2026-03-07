/* 學術資料建檔下拉選單（共用） */
(function() {
    function initNavDropdown() {
        if (typeof jQuery === 'undefined') return;
        jQuery('#dropdownAcademicToggle').off('click.naer').on('click.naer', function(e) {
            e.preventDefault();
            var menu = jQuery('#dropdownAcademicMenu');
            var isOpen = menu.hasClass('show');
            jQuery('.header-main-nav .dropdown-menu').removeClass('show');
            if (!isOpen) menu.addClass('show');
        });
        jQuery(document).off('click.naerNav').on('click.naerNav', function(e) {
            if (!jQuery(e.target).closest('.header-main-nav .dropdown').length) {
                jQuery('.header-main-nav .dropdown-menu').removeClass('show');
            }
        });
    }
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(initNavDropdown);
    } else {
        document.addEventListener('DOMContentLoaded', initNavDropdown);
    }
})();
