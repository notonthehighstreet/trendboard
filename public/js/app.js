$(document).ready(function() {

    // Loading the product feed
    var product_template;

    $.get('/js/templates/product.mustache', function(response) {
        product_template = response;
        create_products();
    }, "html");

    function create_products() {
        $("#product_container").empty();

        $.getJSON('/products', function(products) {
            $.each(JSON.parse(products), function(index, product) {
                product.index = index;
                var $html = $(Mustache.to_html(product_template, product));
                $html.data('productId', product.id);
                $("#product_container").append($html);
            });
        });
    }

    function showGraph(d, inserted_product) {
        var table = new google.visualization.DataTable();
        table.addColumn('string','Date');
        table.addColumn('number','Sales');
        table.addColumn('number','Units');
        table.addRows(d);
        var options = {
            hAxis: {title: 'Date',  titleTextStyle: {color: 'red'}},
            width: inserted_product.width(),
            height: inserted_product.width() * 0.3
        };

        var chart = new google.visualization.AreaChart(inserted_product.find('.trend-chart')[0]);
        chart.draw(table, options);
    }

    // Toggle the container of the chart and do the ajax call
    function product_toggles() {
        $("#page_wrapper").on("click", ".show-chart", function() {
            var product_module = $(this).closest(".product-module");
            var trend_chart = product_module.find(".trend-chart");
            trend_chart.slideToggle();

            $(this).find("i").toggleClass('icon-arrow-down').toggleClass('icon-arrow-up');

            $.getJSON('/product/' + product_module.data("productId"), function(product_details) {
                data = JSON.parse(product_details)[product_module.data("productId")];
                showGraph(data, product_module);
            });
        });
    }
    product_toggles();
});
