/**
 * 挑選本院人員 / 國教院單位 模態框：確保右上角 X 與右下角「取消」可關閉視窗
 * 相容 Bootstrap 4、Bootstrap 5 及無 Bootstrap 的 fallback
 */
(function () {
    function hideModal(modalId) {
        var el = document.getElementById(modalId);
        if (!el) return;
        try {
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                var m = bootstrap.Modal.getInstance(el);
                if (m) m.hide(); else bootstrap.Modal.getOrCreateInstance(el).hide();
            } else if (typeof $ !== 'undefined' && $.fn.modal) {
                $(el).modal('hide');
            } else {
                $(el).removeClass('show').css('display', 'none');
                $('body').removeClass('modal-open').css('padding-right', '');
                $('.modal-backdrop').remove();
            }
        } catch (err) {
            $(el).removeClass('show').css('display', 'none');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
        }
    }
    $(document).ready(function () {
        $(document).on('click', '#naerMemberModal .btn-close, #naerMemberModal .modal-footer .btn-secondary', function (e) {
            e.preventDefault();
            hideModal('naerMemberModal');
        });
        $(document).on('click', '#naerUnitModal .btn-close, #naerUnitModal .modal-footer .btn-secondary', function (e) {
            e.preventDefault();
            hideModal('naerUnitModal');
        });
    });
})();
