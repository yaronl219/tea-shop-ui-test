import angular from 'angular';
import { MODULE_NAME } from '../config'

const module = angular.module(MODULE_NAME)
    .controller('TeaCtrl', function (Restangular, $routeParams) {
        var tea = Restangular.one('teas', $routeParams.id)

        tea.get().then((tea) => {
            this.details = tea
        })

    })

module.config(function ($routeProvider) {
    $routeProvider.when('/teas/:id', {
        template: require('./tea.html'),
        controller: 'TeaCtrl',
        controllerAs: 'tea'
    })
})