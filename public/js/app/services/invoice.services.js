app.service('invoiceService',  function($resource) {
    var apiLink = '/api/invoices/:id';

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
});