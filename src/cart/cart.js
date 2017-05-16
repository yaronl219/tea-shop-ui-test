import angular from 'angular'
import { MODULE_NAME } from '../config'

const module = angular.module(MODULE_NAME)
    .controller('CartCtrl', function (ngCart) {
        ngCart.setTaxRate(7.5);
        ngCart.setShipping(2.99);
    });

module.config(function ($routeProvider) {
    $routeProvider
        .when('/cart', {
            template: require('./cart.html'),
            controller: 'CartCtrl',
            controllerAs: 'cart'
        })
})