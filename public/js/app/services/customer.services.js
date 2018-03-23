app.service('customerService',  function($resource) {
    var apiLink = '/api/customers/:id';

    var resource = $resource(apiLink, { Id: "@Id" },
        {
            'query':  {
                method:'GET',
                isArray:true}
        });
    return resource;
});