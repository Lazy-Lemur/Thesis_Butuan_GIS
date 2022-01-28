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

    var save_create_form = function () {
        var form = $(this);
        var brgy = $('#addGeodataModal #brgy').val();
        var population = parseInt($('#addGeodataModal #populate').val());
        var employed = parseInt($('#addGeodataModal #employ').val());
        var unemployed = parseInt($('#addGeodataModal #unemploy').val());
        var underemployed = parseInt($('#addGeodataModal #underemploy').val());
        var hectares = parseFloat($('#addGeodataModal #hectares').val());
        var sqkm = parseFloat($('#addGeodataModal #sqkm').val());
        var year = parseInt($('#addGeodataModal #year').val());
        var class_br = $('#addGeodataModal #class option:selected').text();

        console.log(brgy);
        console.log(population);
        console.log(employed);
        console.log(unemployed);
        console.log(underemployed);
        console.log(hectares);
        console.log(sqkm);
        console.log(year);
        console.log(class_br);

        data = {
            brgy: brgy,
            population: population,
            employed: employed,
            unemployed: unemployed,
            underemployed: underemployed,
            hectares: hectares,
            sqkm: sqkm,
            year: year,
            class: class_br
        }
        // $.post('static/dbase/insert_geodata.jsp', data, function (res) {
        //     console.log(res);
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: {
                brgy: $('#addGeodataModal #brgy').val(),
                population: $('#addGeodataModal #populate').val(),
                employed: $('#addGeodataModal #employ').val(),
                unemployed: $('#addGeodataModal #unemploy').val(),
                underemployed: $('#addGeodataModal #underemploy').val(),
                hectares: $('#addGeodataModal #hectares').val(),
                sqkm: $('#addGeodataModal #sqkm').val(),
                year: $('#addGeodataModal #year').val(),
                class: $('#addGeodataModal #class option:selected').text()
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#addGeodataModal').modal('hide');
                form[0].reset();

                if (data[0].success == 'True') {
                    $('#promptModal #message').html("Geodata added successfully.");
                    $('#promptModal .modal-title').html("Addition Success");
                } else {
                    $('#promptModal #message').html("Failed to add geodata");
                    $('#promptModal .modal-title').html("Addition Failed");
                }
                setTimeout($("#promptModal").modal('show'), 700);
                setTimeout(location.reload.bind(location), 2800);
            }
        });
        return false;
    }

    var load_update_form = function () {
        var btn = $(this);
        var gid = btn.attr('data-url');
        // $.ajax({
        //     url: "/static/dbase/fetch_geodata_for_update.jsp",
        //     type: "POST",
        //     data: {
        //         id: gid
        //     },
        //     dataType: 'json',
        //     beforeSend: function () {
        //         $('#updateGeodataModal').modal("show");
        //         $('#updateGeodataModal .modal-title').html("Update Existing Geodata");
        //     },
        //     success: function (data) {
        //         console.log(data);
        //     }
        // });
        var url_fetch = "static/dbase/fetch_geodata_for_update.jsp";
        url_fetch += "?id=" + gid;
        $.getJSON(url_fetch, function (data) {
            $('#updateGeodataModal').modal("show");
            $('#updateGeodataModal .modal-title').html("Update Existing Geodata");

            console.log(data);
            $('#updateGeodataModal #hd_id').attr('name', gid);
            $('#updateGeodataModal #brgy').val(data[0].brgy);
            $('#updateGeodataModal #populate').val(data[0].population);
            $('#updateGeodataModal #employ').val(data[0].employed);
            $('#updateGeodataModal #unemploy').val(data[0].unemployed);
            $('#updateGeodataModal #underemploy').val(data[0].underemployed);
            $('#updateGeodataModal #hectares').val(data[0].hectares);
            $('#updateGeodataModal #sqkm').val(data[0].sqkm);
            $('#updateGeodataModal #year').val(data[0].year);
            $("#updateGeodataModal #class option[value='" + data[0].class + "']").prop('selected', true);

        });
        console.log($('#data-' + gid).val());
    }

    var save_update_form = function () {
        var form = $(this);
        var gid = $('#updateGeodataModal #hd_id').attr('name');
        var brgy = $('#updateGeodataModal #brgy').val();
        var population = parseInt($('#updateGeodataModal #populate').val());
        var employed = parseInt($('#updateGeodataModal #employ').val());
        var unemployed = parseInt($('#updateGeodataModal #unemploy').val());
        var underemployed = parseInt($('#updateGeodataModal #underemploy').val());
        var hectares = parseFloat($('#updateGeodataModal #hectares').val());
        var sqkm = parseFloat($('#updateGeodataModal #sqkm').val());
        var year = parseInt($('#updateGeodataModal #year').val());
        var class_br = $('#updateGeodataModal #class option:selected').text();

        console.log(gid);
        console.log(brgy);
        console.log(population);
        console.log(employed);
        console.log(unemployed);
        console.log(underemployed);
        console.log(hectares);
        console.log(sqkm);
        console.log(year);
        console.log(class_br);

        data = {
            id: gid,
            brgy: brgy,
            population: population,
            employed: employed,
            unemployed: unemployed,
            underemployed: underemployed,
            hectares: hectares,
            sqkm: sqkm,
            year: year,
            class: class_br
        }
        // $.post(form.attr('action'), data, function (res) {
        //     console.log(res);
        // });
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: {
                id: $('#updateGeodataModal #hd_id').attr('name'),
                brgy: $('#updateGeodataModal #brgy').val(),
                population: $('#updateGeodataModal #populate').val(),
                employed: $('#updateGeodataModal #employ').val(),
                unemployed: $('#updateGeodataModal #unemploy').val(),
                underemployed: $('#updateGeodataModal #underemploy').val(),
                hectares: $('#updateGeodataModal #hectares').val(),
                sqkm: $('#updateGeodataModal #sqkm').val(),
                year: $('#updateGeodataModal #year').val(),
                class: $('#updateGeodataModal #class option:selected').text()
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#updateGeodataModal').modal('hide');
                form[0].reset();

                if (data[0].success == 'True') {
                    $('#promptModal #message').html("Geodata updated successfully.");
                    $('#promptModal .modal-title').html("Update Success");
                } else {
                    $('#promptModal #message').html("Failed to update geodata");
                    $('#promptModal .modal-title').html("Update Failed");
                }
                setTimeout($("#promptModal").modal('show'), 700);
                setTimeout(location.reload.bind(location), 2800);
            }
        });
        return false;
    }

    var load_delete_modal = function () {
        var btn = $(this);
        var brgy = btn.attr('data-url').split('&')[0];
        var year = btn.attr('data-url').split('&')[1];
        $('#deleteDataModal .modal-body #confirm_delete').html("Delete <b>Brgy. " + brgy + " of " + year + "</b> geodata?");
        $('#deleteDataModal #hd_brgy').attr('name', brgy);
        $('#deleteDataModal #hd_year').attr('name', year);
        $('#deleteDataModal').modal("show");
    }

    var save_delete_form = function () {
        var form = $(this);
        console.log($('#deleteDataModal #hd_brgy').attr('name'))
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: {
                brgy: $('#deleteDataModal #hd_brgy').attr('name'),
                year: $('#deleteDataModal #hd_year').attr('name'),
            },
            dataType: 'json',
            success: function (data) {
                console.log(data[0].success);
                $('#deleteDataModal').modal('hide');
                if (data[0].success == 'True') {
                    $('#promptModal #message').html("Geodata deleted successfully.");
                    $('#promptModal .modal-title').html("Delete Success");
                } else {
                    $('#promptModal #message').html("Failed to delete geodata");
                    $('#promptModal .modal-title').html("Delete Failed");
                }
                setTimeout($("#promptModal").modal('show'), 700);
                setTimeout(location.reload.bind(location), 2000);
            }
        });
        return false;
    }
    var path = ""
    var load_upload_modal = function () {
        var btn = $(this);
        $('#uploadDataModal').modal("show");
        $('#uploadDataModal input[type=file]').change(function (event) {
            path = event.target.files[0].name;
            // console.log(event);
            console.log(path);
        });
        var data = ['log', 'leg'];
        var i = 0;
        console.log(data[i + 1]);
    }

    var read_csv = function (e) {
        e.preventDefault();
        // var tmppath = URL.createObjectURL(e.target.files[0]);
        // console.log(tmppath);
        $('#chooseFile').parse({
            config: {
                delimiter: "auto",
                header: false,
                complete: upload_csv,
            },
            before: function (file, inputElem) {
                //console.log("Parsing file...", file);
            },
            error: function (err, file) {
                //console.log("ERROR:", err, file);
            },
            complete: function () {
                //console.log("Done with all files");
            },
        });
    }

    function upload_csv(results) {
        console.log(results.data);
        var data = results.data;
        console.log(data.length);
        console.log("path: " + path);
        // console.log(data[84]);
        dynamic_upload(path);
        // for (i = 1; i < data.length; i++) {
        //     var row = data[i];
        //     var cells = row.join(",").split(",");
        //     existing_dataset_interval(cells);
        // }
    }

    function dynamic_upload(path) {
        $.ajax({
            url: "static/dbase/upload_geodata.jsp",
            type: "POST",
            data: {
                path: path
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#uploadDataModal').modal('hide');
                if (data[0].success) {
                    $('#promptModal #message').html("Geodata CSV uploaded successfully.");
                    $('#promptModal .modal-title').html("Upload Success");
                } else {
                    $('#promptModal #message').html("Failed to upload geodata CSV.");
                    $('#promptModal .modal-title').html("Upload Failed");
                }
                setTimeout($("#promptModal").modal('show'), 700);
                setTimeout(location.reload.bind(location), 2000);
            }
        });
    }

    function new_dataset_interval(cells) {

        cells[0] = cells[0].replace(/"/g, "");
        cells[1] = cells[1].replace(/"/g, "");
        cells[2] = cells[2].replace(/"/g, "");
        cells[3] = cells[3].replace(/"/g, "");
        cells[4] = cells[4].replace(/"/g, "");
        cells[5] = cells[5].replace(/"/g, "");
        cells[6] = cells[6].replace(/"/g, "");
        cells[7] = cells[7].replace(/"/g, "");
        cells[8] = cells[8].replace(/"/g, "");
        cells[9] = cells[9].replace(/"/g, "");
        // cells[10] = cells[10].replace(/"/g, "");
        console.log(cells[0]);
        console.log(cells[1]);
        console.log(cells[2]);
        console.log(cells[3]);
        console.log(cells[4]);
        console.log(cells[5]);
        console.log(cells[6]);
        console.log(cells[7]);
        console.log(cells[8]);
        console.log(cells[9]);
        $.ajax({
            url: "static/dbase/insert_new_data_csv.jsp",
            type: "POST",
            data: {
                id: cells[0],
                brgy: cells[1],
                population: cells[2],
                employed: cells[3],
                unemployed: cells[4],
                underemployed: cells[5],
                hectares: cells[6],
                sqkm: cells[7],
                year: cells[8],
                class: cells[9]
                // geom: cells[10]
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data[0].success) {
                    $('#uploadDataModal').modal('hide');
                    if (data[0].success == 'True') {
                        $('#promptModal #message').html("Geodata CSV uploaded successfully.");
                        $('#promptModal .modal-title').html("Upload Success");
                    } else {
                        window.stop();
                        $('#promptModal #message').html("Failed to upload geodata CSV.");
                        $('#promptModal .modal-title').html("Upload Failed");
                    }
                    setTimeout($("#promptModal").modal('show'), 700);
                    // setTimeout(location.reload.bind(location), 2800);
                }
            }
        });
    }

    function existing_dataset_interval(cells) {

        cells[0] = cells[0].replace(/"/g, "");
        cells[1] = cells[1].replace(/"/g, "");
        cells[2] = cells[2].replace(/"/g, "");
        cells[3] = cells[3].replace(/"/g, "");
        cells[4] = cells[4].replace(/"/g, "");
        cells[5] = cells[5].replace(/"/g, "");
        cells[6] = cells[6].replace(/"/g, "");
        cells[7] = cells[7].replace(/"/g, "");
        cells[8] = cells[8].replace(/"/g, "");
        cells[9] = cells[8].replace(/"/g, "");
        console.log(cells[0]);
        console.log(cells[1]);
        console.log(cells[2]);
        console.log(cells[3]);
        console.log(cells[4]);
        console.log(cells[5]);
        console.log(cells[6]);
        console.log(cells[7]);
        console.log(cells[8]);
        console.log(cells[9]);
        $.ajax({
            url: "static/dbase/insert_geodata.jsp",
            type: "POST",
            data: {
                id: cells[0],
                brgy: cells[1],
                population: cells[2],
                employed: cells[3],
                unemployed: cells[4],
                underemployed: cells[5],
                hectares: cells[6],
                sqkm: cells[7],
                year: cells[8],
                class: cells[9]
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data[0].success) {
                    $('#uploadDataModal').modal('hide');
                    if (data[0].success == 'True') {
                        $('#promptModal #message').html("Geodata CSV uploaded successfully.");
                        $('#promptModal .modal-title').html("Upload Success");
                    } else {
                        window.stop();
                        $('#promptModal #message').html("Failed to upload geodata CSV.");
                        $('#promptModal .modal-title').html("Upload Failed");
                    }
                    setTimeout($("#promptModal").modal('show'), 700);
                    // setTimeout(location.reload.bind(location), 2800);
                }
            }
        });
    }

    var load_delete_all = function () {
        var btn = $(this);
        // $('#deleteAllDataModal .modal-body #confirm_delete').html("Delete <b>Brgy. " + brgy + " of " + year + "</b> geodata?");
        $('#deleteAllDataModal').modal("show");
    }

    var save_delete_all = function () {
        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            dataType: 'json',
            success: function (data) {
                console.log(data[0].success);
                $('#deleteAllDataModal').modal('hide');
                if (data[0].success == 'True') {
                    $('#promptModal #message').html("All geodata deleted successfully.");
                    $('#promptModal .modal-title').html("Delete All Success");
                } else {
                    $('#promptModal #message').html("Failed to delete all geodata");
                    $('#promptModal .modal-title').html("Delete All Failed");
                }
                setTimeout($("#promptModal").modal('show'), 700);
                setTimeout(location.reload.bind(location), 2800);
            }
        });
        return false;
    }

    /** Binding */
    $('.js-add-geodata').click(loadForm);
    $('#addGeodataModal .js-add-geodata-form').on('submit', save_create_form);
    // $('#addGeodataModal #add-submit').click(save_create_form);

    /**Update Geodata */
    $('#data-table').on('click', '.js-update-geo', load_update_form);
    $('#updateGeodataModal').on('submit', '.js-update-geodata-form', save_update_form);

    /** Delete Geodata */
    $('#data-table').on('click', '.js-delete-geo', load_delete_modal);
    $('#deleteDataModal').on('submit', '.js-geodata-delete-form', save_delete_form);

    /** Delete All */
    $('.js-delete-geodata').click(load_delete_all);
    $('#deleteAllDataModal').on('submit', '.js-geodata-delete-all-form', save_delete_all);

    /** Upload CSV */
    $('.js-upload-csv-geodata').click(load_upload_modal);
    $('#uploadDataModal #upload-submit').on('click', read_csv);
});