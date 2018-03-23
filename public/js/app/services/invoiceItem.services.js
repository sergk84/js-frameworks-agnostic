app.service('invoiceItemService',  function($resource) {
    var getResource = function (id) {
        var apiLink = '/api/invoices/' + id + '/items/:id';
        var resource = $resource(apiLink, { id: "@id" },
            {
                'query':  {
                    method:'GET',
                    isArray:true},
                update: { method: 'put', isArray: false },
                delete_item: {
                    method: 'DELETE'
                }
            });
        return resource;
    };
    return {
        getResource : getResource
    };
});