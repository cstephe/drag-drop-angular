'use strict';

angular.module('exampleDD', ['dragDropAngular'])
    .constant('_', _)
    .controller('exampleCtrl', ['$scope', '_', function ($scope, _) {
        $scope.list = [
            {name: 'item1', id: 1, list:'list1'},
            {name: 'item2', id: 2, list:'list1'},
            {name: 'item3', id: 3, list:'list2'},
            {name: 'item4', id: 4, list:'list2'}
        ];
        $scope.onDrop = function (itemID, listID) {
            var item = _.findWhere($scope.list, {id:+itemID});
            item.list = listID;
        };
    }])
