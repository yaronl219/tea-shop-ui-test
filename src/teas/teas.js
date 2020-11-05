import angular from 'angular';
import { MODULE_NAME } from '../config'

const module = angular.module(MODULE_NAME)
    .controller('TeasCtrl', function ($scope, Restangular) {
        const teasReq = Restangular.all('teas')

        $scope.teasList = []
        $scope.filterBy = ''
        $scope.filterType = ''
        $scope.teasForDisplay = []
        $scope.teaTypes = []
        $scope.sortBy = 'name'
        $scope.isGrid = true
        $scope.toggleIsGrid = function() {
            this.isGrid = ! this.isGrid
        }
        $scope.onSort = function () {
            console.log('sorting by', this.sortBy)
            let teas;
            switch (this.sortBy) {
                case ('prAs'):
                    teas = this.teas.teasForDisplay.sort((a, b) => a.price - b.price)
                    break;
                case ('prDe'):
                    teas = this.teas.teasForDisplay.sort((a, b) => b.price - a.price)
                    break;
                default:
                    teas = this.teas.teasForDisplay.sort((a, b) => {
                        let nameA = a.name.toLowerCase()
                        let nameB = b.name.toLowerCase()
                        if (nameA < nameB) {
                            return -1;
                          } else if (nameA > nameB) {
                            return 1;
                          }
                          return 0;
                    })
            }
        }

        
        teasReq.getList().then(teas => {
            this.teasList = teas
            this.teasForDisplay = [...teas]

            const types = new Set(teas.map(tea => tea.tea_type))
            this.teaTypes = Array.from(types)
            
        })


        $scope.onFilter = function () {
            const filter = this.filterBy.toLowerCase()
            this.teas.teasForDisplay = this.teas.teasList.filter(tea => tea.name.toLowerCase().includes(filter) && tea.tea_type.includes(this.filterType))
        }
    })



module.config(function ($routeProvider) {
    $routeProvider.when('/teas', {
        template: require('./teas.html'),
        controller: 'TeasCtrl',
        controllerAs: 'teas'

    })
})