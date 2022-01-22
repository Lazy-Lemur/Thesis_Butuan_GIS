$(document).ready(function () {
    $('.yearPicker').yearpicker({
        year: 2015,
        startYear: 1930,
        endYear: 2050
    });

    var loadForm = function () {
        var btn = $(this);
        $('#addGeodataModal').modal("show");
    }

    var load_delete_modal = function () {
        var btn = $(this);
        $('#deleteDataModal').modal("show");
    }

    /** Binding */
    $('.js-add-geodata').click(loadForm);

    /**Update Geodata */
    $('#data-table').on('click', '.js-update-geo', loadForm);

    /** Delete Geodata */
    $('#data-table').on('click', '.js-delete-geo', load_delete_modal);

    /** Delete All */
    $('.js-delete-geodata').click(load_delete_modal);
});