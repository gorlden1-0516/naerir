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

/* 進階檢索頁 (03search.html) */
(function () {
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function initAdvancedSearch() {
        // 回到最上：滾動時顯示/隱藏
        try {
            var gototop = document.getElementById('gototop');
            if (gototop) {
                window.addEventListener('scroll', function () {
                    if (window.scrollY > window.innerHeight) {
                        gototop.classList.remove('d-none');
                        gototop.classList.add('d-flex');
                    } else {
                        gototop.classList.remove('d-flex');
                        gototop.classList.add('d-none');
                    }
                });
            }
        } catch (_e) {}

        // 左側篩選：桌面版預設展開（需要 bootstrap.bundle）
        try {
            if (window.matchMedia && window.matchMedia('(min-width: 768px)').matches) {
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    var collapseEls = document.querySelectorAll('#collapseOption');
                    var collapseList = Array.prototype.slice.call(collapseEls).map(function (el) {
                        return new bootstrap.Collapse(el);
                    });
                    collapseList.forEach(function (collapse) { collapse.show(); });
                }
            }
        } catch (_e) {}

        // 全選：連動每筆勾選
        var checkall = document.getElementById('checkall');
        var listEl = document.querySelector('.searchList');
        if (!checkall || !listEl) return;

        function itemCheckboxes() {
            return listEl.querySelectorAll('input[type=\"checkbox\"][id^=\"checkList\"]');
        }
        function syncSelectAllState() {
            var items = itemCheckboxes();
            if (!items.length) {
                checkall.checked = false;
                checkall.indeterminate = false;
                return;
            }
            var n = 0;
            for (var i = 0; i < items.length; i++) {
                if (items[i].checked) n++;
            }
            checkall.checked = n === items.length;
            checkall.indeterminate = n > 0 && n < items.length;
        }

        checkall.addEventListener('change', function () {
            checkall.indeterminate = false;
            itemCheckboxes().forEach(function (cb) {
                cb.checked = checkall.checked;
            });
        });

        listEl.addEventListener('change', function (e) {
            var t = e.target;
            if (t && t.matches && t.matches('input[type=\"checkbox\"][id^=\"checkList\"]')) {
                syncSelectAllState();
            }
        });

        syncSelectAllState();
    }

    onReady(initAdvancedSearch);
})();

/* 詳細頁 (04details.html)：依「報告全文」欄位切換預覽顯示 */
(function () {
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function normalizeText(t) {
        return (t || '').replace(/\s+/g, ' ').trim();
    }

    function initDetailsPreview() {
        var preview = document.querySelector('.detailsPreview');
        if (!preview) return;

        // 依表格欄位「報告全文」判斷是否有全文檔案（示例：PDF 全文檔）
        var table = document.querySelector('.detailsDataTable');
        if (!table) return;

        var hasFile = false;
        var rows = table.querySelectorAll('tbody tr');
        for (var i = 0; i < rows.length; i++) {
            var th = rows[i].querySelector('th');
            var td = rows[i].querySelector('td');
            if (!th || !td) continue;

            if (normalizeText(th.textContent) === '報告全文') {
                var v = normalizeText(td.textContent);
                if (!v || v === '-' || v === '無') {
                    hasFile = false;
                } else if (v.indexOf('尚無') !== -1 || v.indexOf('無全文') !== -1 || v.indexOf('未提供') !== -1) {
                    hasFile = false;
                } else {
                    hasFile = true;
                }
                break;
            }
        }

        if (hasFile) {
            preview.classList.add('is-has-file');
            preview.classList.remove('is-no-file');
        } else {
            preview.classList.add('is-no-file');
            preview.classList.remove('is-has-file');
        }
    }

    onReady(initDetailsPreview);
})();
