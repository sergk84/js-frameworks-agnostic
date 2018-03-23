(function () {
    window.app = angular.module('app', ['ui.router', 'ngResource'])
})();

function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('default', {
            url: "/",
            template: "<invoices></invoices>"
        })

        .state('customers', {
            url: "/customers",
            template: "<customers></customers>",
        })
        .state('invoices', {
            url: "/invoices",
            abstract: true,
        })
        .state('invoices.list', {
            url: "/list",
            template: "<invoices></invoices>",
        })
        .state('invoices.add', {
            url: "/add",
            template: "<edit-invoice></edit-invoice>",
        })
        .state('invoices.edit', {
            url: "/edit/:invoiceId",
            template: "<edit-invoice></edit-invoice>",
        })
        .state('products', {
            url: "/products",
            template: "<products></products>",
        })

};

app
    .config(config);
