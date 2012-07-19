$(document).ready(function() {
    $.get('/js/templates/product.mustache', function(response) {
        var product_template = response

        $.getJSON('/products', function(products) {
            $.each(JSON.parse(products), function(index, product) {
                var html = Mustache.to_html(product_template, product);
                $("#product_container").append(html);
            });
        });
    }, "html");
});
