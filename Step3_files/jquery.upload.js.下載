$(document).ready(function () {
    // 上傳多檔案
    $('.upload').on('change', function () {
        var theid = this.id;
        var form_data = new FormData();
        for (const key in this.files) {
            if (Object.hasOwnProperty.call(this.files, key)) {
                const fileobj = this.files[key];
                var ext = fileobj.name.split('.').pop().toLowerCase();
                if (jQuery.inArray(theid, ['Fimage5_0', 'Faudio5_0']) != -1 && jQuery.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                    alert(fileobj.name + "檔案格式不符合限制");
                }
                else if (jQuery.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf']) == -1) {
                    alert(fileobj.name + "檔案格式不符合限制");
                }
                else {
                    var f = fileobj;
                    var fsize = f.size || f.fileSize;
                    if (fsize <= 10.5 * 1024 * 1024) {
                        form_data.append("file[]", fileobj);
                    } else {
                        alert(fileobj.name + " 超過 10MB 上傳失敗.");
                    }
                }
            }
        }
        form_data.append("updateName", theid);
        $.ajax({
            url: "multiupload.php",
            method: "POST",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                $('#'+theid+'_uploading').html("<label class='text-success'>File Uploading...</label>");
            },
            success: function (data) {
                var newcontent = $('#'+theid+'_uploadresult').html();
                newcontent += data;
                $('#'+theid+'_uploadresult').html(newcontent);
                $('#'+theid+'_uploading').html("");
                $('#titlepage').val('');
                $('#'+theid).val('');
            }
        });
    });
    // 下面目前沒使用 20250314
    // 電子書批次上傳,因上傳可以是壓縮檔（格式是ZIP）
    // 處理好後上傳的zip檔不保留，
    $('.epub_upload').on('change', function () {
        var theid = this.id;
        var form_data = new FormData();
        for (const key in this.files) {
            if (Object.hasOwnProperty.call(this.files, key)) {
                const fileobj = this.files[key];
                var ext = fileobj.name.split('.').pop().toLowerCase();
                // 需與 epub_multiupload.php 允許的類型相同
                if (jQuery.inArray(ext, ['zip', 'gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf','xls','xlsx']) == -1) {
                    alert(fileobj.name + "檔案格式不符合限制");
                }
                else {
                    var f = fileobj;
                    var fsize = f.size || f.fileSize;
                    if (fsize <= 10.5 * 1024 * 1024) {
                        form_data.append("file[]", fileobj);
                    } else {
                        alert(fileobj.name + " 超過 10MB 上傳失敗.");
                    }
                }
            }
        }
        form_data.append("updateName", theid);
        $.ajax({
            url: "epub_multiupload.php",
            method: "POST",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                $('#'+theid+'_uploading').html("<label class='text-success'>File Uploading...</label>");
            },
            success: function (data) {
                var newcontent = $('#'+theid+'_uploadresult').html();
                newcontent += data;
                $('#'+theid+'_uploadresult').html(newcontent);
                $('#'+theid+'_uploading').html("");
                $('#titlepage').val('');
                $('#'+theid).val('');
            }
        });
    });
});

//刪除檔案
function DeleteClose(filename){
    $('#'+filename).remove();
}
