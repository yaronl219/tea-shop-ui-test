import angular from 'angular';
import { MODULE_NAME } from '../config'

const module = angular.module(MODULE_NAME)
    .controller('TeasCtrl', function () {

    })

module.config(function ($routeProvider) {
    $routeProvider.when('/teas', {
        template: require('./teas.html'),
        controller: 'TeasCtrl',
        controllerAs: 'teas'
    })
})