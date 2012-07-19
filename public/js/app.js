$(document).ready(function() {

    // Loading the product feed
    var product_template;
    var partner_template;

    $.get('/js/templates/product.mustache', function(response) {
        product_template = response;
        create_products();
    }, "html");

    $.get('/js/templates/partner.mustache', function(response) {
        partner_template = response;
        create_partners();
    }, "html");


    function create_products(timeframe) {
        timeframe = typeof timeframe !== 'undefined' ? timeframe : "today";

        $("#product_container").empty();

        $.getJSON('/products?timeframe=' + timeframe, function(products) {
            $.each(JSON.parse(products), function(index, product) {
                product.index = index + 1;
                var $html = $(Mustache.to_html(product_template, product));

                $html.data('moduleId', product.id);
                $html.data('moduleType', "product");
                $html.css("opacity", 0);

                $("#product_container").append($html);

                var delay_offset = 0;
                $(".module").each(function() {
                    $(this).delay(delay_offset).animate({
                        opacity: 1
                    });

                    delay_offset += 100;
                });
            });
        });
    }

    function create_partners(timeframe) {
        timeframe = typeof timeframe !== 'undefined' ? timeframe : "today";

        $("#partner_container").empty();

        $.getJSON('/partner?timeframe=' + timeframe, function(partners) {
            $.each(JSON.parse(partners), function(index, partner) {
                partner.index = index + 1;
                var $html = $(Mustache.to_html(partner_template, partner));

                $html.data('moduleId', partner.id);
                $html.data('moduleType', "partner");
                $html.css("opacity", 0);

                $("#partner_container").append($html);

                var delay_offset = 0;
                $(".module").each(function() {
                    $(this).delay(delay_offset).animate({
                        opacity: 1
                    });

                    delay_offset += 100;
                });
            });
        });
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

            $.getJSON('/' + module.data("moduleType") + '/' + module.data("moduleId"), function(product_details) {
                data = JSON.parse(product_details)[module.data("moduleId")];
                showGraph(data, module);
            });
        });
    }
    module_chart_toggle();

    function time_frame_buttons() {
        $(".timeframe-button").click(function() {
            create_products($(this).attr("id"));
            create_partners($(this).attr("id"));
        });
    }
    time_frame_buttons();
});
