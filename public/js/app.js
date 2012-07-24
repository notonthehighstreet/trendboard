$(document).ready(function() {
    var templates = [];
    var partner_ready = false;
    var products_ready = false;
    var timeframe = "today";

    $.get('/js/templates/product.mustache', function(response) {
        templates.product = response;
        create_module("product");
    }, "html");

    $.get('/js/templates/partner.mustache', function(response) {
        templates.partner = response;
        create_module("partner");
    }, "html");

    function create_module(module_type) {
        $("#" + module_type + "_container").empty();

        $.getJSON('/' + module_type + '?timeframe=' + timeframe, function(modules_ajax) {
            var module_array = [];

            $.each(JSON.parse(modules_ajax), function(index, module_ajax) {
                module_ajax.index = index + 1;
                var $module = $(Mustache.to_html(templates[module_type], module_ajax));
                module_array.push($module);

                $module.data('moduleId', module_ajax.id);
                $module.data('moduleType', module_type);
                $module.css("opacity", 0);

                $("#" + module_type + "_container").append($module);

                display_modules(module_array);

                if (module_type == "partner") {
                    partner_ready = true;
                } else {
                    product_ready = true;
                }

                // Hide ajax loader
                ajax_loader_display(false);
            });
        });
    }

    function display_modules(module_array) {
        var delay_offset = 0;
        $.each(module_array, function(i,item) {
            item.delay(delay_offset).animate({
                opacity: 1
            });

            delay_offset += 100;
        });
    }

    function ajax_loader_display(display) {
        if (display) {
                var ajax_loader = $("<div>").addClass("well ajax-loader");
                ajax_loader.appendTo("body");
        } else {
            if (partner_ready && products_ready) {
                $(".ajax-loader").remove();
            }
        }
    }

    function showGraph(d, module) {
        var table = new google.visualization.DataTable();
        table.addColumn('string','Date');
        table.addColumn('number','Sales');
        table.addColumn('number','Units');
        table.addRows(d);
        var options = {
            hAxis: {title: 'Date',  titleTextStyle: {color: 'red'}},
            width: module.width(),
            height: module.width() * 0.3,
            series: [{},{targetAxisIndex:1}]
        };

        var chart = new google.visualization.AreaChart(module.find('.trend-chart')[0]);
        chart.draw(table, options);
    }

    // Toggle the container of the chart and do the ajax call
    function module_chart_toggle() {
        $("#page_wrapper").on("click", ".show-chart", function() {
            var module = $(this).closest(".module");
            var trend_chart = module.find(".trend-chart");
            trend_chart.slideToggle();

            $(this).find("i").toggleClass('icon-arrow-down').toggleClass('icon-arrow-up');

            $.getJSON('/' + module.data("moduleType") + '/' + module.data("moduleId") + '?timeframe=' + timeframe, function(product_details) {
                data = JSON.parse(product_details);

                showGraph(data, module);
            });
        });
    }
    module_chart_toggle();

    function time_frame_buttons() {
        $(".timeframe-button").click(function() {
            timeframe = $(this).attr("id")
            create_module("product");
            create_module("partner");
        });
    }
    time_frame_buttons();
});
