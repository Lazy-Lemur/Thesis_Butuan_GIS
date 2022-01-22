$(document).ready(function () {
    $('.yearPicker').yearpicker({
        year: 2015,
        startYear: 1930,
        endYear: 2050
    });

    // Activate tooltip
    $('[data-bs-toggle="tooltip"]').tooltip();
    // var editTool = document.getElementById('edit-tool');
    // var editTooltip = new bootstrap.Tooltip(editTool, {
    //   boundary: document.body
    // });

    // Select/Deselect choiceboxes
    var checkbox = $('table tbody input[type=checkbox]');
    $('#selectAll').click(function () {
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
            });
        }
        else {
            checkbox.each(function () {
                this.checked = false;
            });
        }
    });

    checkbox.click(function () {
        if (!this.checked) {
            $('#selectAll').prop("checked", false);
        }
    });


    var loadForm = function () {
        var btn = $(this);
        $('#addGeodataModal').modal("show");
    }

    var load_update_form = function () {
        var btn = $(this);
        $('#addGeodataModal').modal("show");
        $('#addGeodataModal .modal-title').html("Update Existing Geodata");
    }

    var load_delete_modal = function () {
        var btn = $(this);
        $('#deleteDataModal').modal("show");
    }

    var load_upload_modal = function () {
        var btn = $(this);
        $('#uploadDataModal').modal("show");
    }

    /** Binding */
    $('.js-add-geodata').click(loadForm);

    /**Update Geodata */
    $('#data-table').on('click', '.js-update-geo', load_update_form);

    /** Delete Geodata */
    $('#data-table').on('click', '.js-delete-geo', load_delete_modal);

    /** Delete All */
    $('.js-delete-geodata').click(load_delete_modal);

    /** Upload CSV */
    $('.js-upload-csv-geodata').click(load_upload_modal);
});