$(document).ready(function() {

    // Loading the product feed
    var product_template;

    $.get('/js/templates/product.mustache', function(response) {
        product_template = response;
        create_products();
    }, "html");

    function create_products() {
        $.getJSON('/products', function(products) {
            $.each(JSON.parse(products), function(index, product) {
                product.index = index;
                var html = Mustache.to_html(product_template, product);
                $("#product_container").append(html);
            });
        });
    }

    function product_toggles() {
        $("#page_wrapper").on("click", ".show-chart", function() {
            var product_module = $(this).closest(".product-module");
            var trend_chart = product_module.find(".trend-chart");
            trend_chart.slideToggle();
            $(this).find("i").toggleClass('icon-arrow-down').toggleClass('icon-arrow-up');
        });
    }
    product_toggles();
});
