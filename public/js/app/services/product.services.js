app.service('productService',  function($resource) {
    var apiLink = '/api/products/:id';

    var resource = $resource(apiLink, { Id: "@Id" },
        {
            'query':  {
                method:'GET',
                isArray:true}
        });
    return resource;
});