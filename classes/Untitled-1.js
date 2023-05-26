jQuery(($) => {
    $('body').on('click', '#removeFile', () => {
        bootbox.confirm('Bạn chắc chắn muốn xoá file này?', function (result) {
            if (result) {
                $.ajax({
                    url: '{$this->getAbsPath()}/{$this->getController()}/{$this->getAction()}',
                    type: 'POST',
                    data: {
                        id: $('#id').val()
                    },
                    beforeSend: function () {
                        disableEditDeleteButtons();
                    },
                    success: function (res) {
                        $('#confirmDeleteModal').modal('hide');
                        $('#confirmDeleteModalBody').html(res);
                        $('#confirmDeleteModal').modal('show');
                        disableEditDeleteButtons();
                        bootstrap.Modal.getOrCreateInstance($('#confirmDeleteModal')).show();
                        $('#btnConfirmDeleteOK').on('click', function (e) {

                        })
                        $('#btnConfirmDeleteCancel').on('click', function (e) {
                            disableEditDeleteButtons();
                        })
                    }
                });
            }
        });
    })
});

//upload file
jQuery(($) => {
    $('body').on('change', '#uploadFile', () => {
        $(document).on('change','#examination_file', function() {
            let property = document.getElementById('examination_file').files[0];
            let fileName = property.name;
            let fileExtension = fileName.split('.').pop().toLowerCase();

            if(jQuery.inArray(fileExtension, ['pdf', '']) == -1) {
                alert("Vui lòng chọn PDF !");
            }
            exit();
            if($.trim($('#examination_file').val()).length == 0 ){
                alert('Chưa có dữ liệu, vui lòng chọn file !');
            }
            exit();

            let form_data = new FormData();
            form_data.append("file", property);
            $.ajax({
                url:'/index.php?page=datamanagement&action=upload',
                method:'POST',
                data:form_data,
                contentType:false,
                cache:false,
                processData:false,
                beforeSend:function(){
                $('#msg').html('Loading......');
                },
                success:function(data){
                console.log(data);
                $('#msg').html(data);
                }
            });
        });
    });
});


// $(document).ready(function() {
//     $("#formUploadFile").on('submit', (function(e) {
//         e.preventDefault();
//         $.ajax({
//             url: 'index.php?page=datamanagement&action=upload',
//             type: "POST",
//             data: new FormData(this),
//             contentType: false,
//             cache: false,
//             processData: false,
//             success: function(response) {
//                 $("#formUploadFile").trigger("reset"); // to reset form input fields
//             },
//             error: function(e) {
//                 console.log(e);
//             }
//         });
//     }));
// });
