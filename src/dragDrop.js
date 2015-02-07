'use strict';
(function (window, angular) {
    angular.module('dragDropAngular', [])
        .directive('csDraggable', function () {
            return {
                link: function (scope, element) {
                    var el = element[0];
                    el.draggable = true;
                    el.addEventListener(
                        'dragstart',
                        function (e) {
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData('Text', this.id);
                            this.classList.add('dragging');
                            var item = this;
                            // call the passed drop function
                            scope.$apply(function (scope) {
                                var fn = scope.onDragStart();
                                if ('undefined' !== typeof fn) {
                                    fn(item);
                                }
                            });
                            return false;
                        },
                        false
                    );
                    el.addEventListener(
                        'dragend',
                        function (e) {
                            this.classList.remove('dragging');
                            var item = this;
                            // call the passed drop function
                            scope.$apply(function (scope) {
                                var fn = scope.onDragEnd();
                                if ('undefined' !== typeof fn) {
                                    fn(item);
                                }
                            });
                            return false;
                        },
                        false
                    );
                },
                scope: {
                    onDragStart: '&',
                    onDragEnd: '&'
                }
            }
        })
        .directive('csDroppable', function () {
            return {
                link: function (scope, element) {
                    var el = element[0];

                    el.addEventListener(
                        'dragover',
                        function (e) {
                            e.dataTransfer.dropEffect = 'move';
                            // allows us to drop
                            if (e.preventDefault) e.preventDefault();
                            this.classList.add('drag-over');
                            return false;
                        },
                        false
                    );

                    el.addEventListener(
                        'dragenter',
                        function (e) {
                            this.classList.add('drag-over');
                            return false;
                        },
                        false
                    );

                    el.addEventListener(
                        'dragleave',
                        function (e) {
                            this.classList.remove('drag-over');
                            return false;
                        },
                        false
                    );

                    el.addEventListener(
                        'drop',
                        function (e) {
                            // Stops some browsers from redirecting.
                            if (e.stopPropagation) e.stopPropagation();

                            this.classList.remove('drag-over');
                            var binId = this.id;
                            var item = document.getElementById(e.dataTransfer.getData('Text'));
                            // call the passed drop function
                            scope.$apply(function (scope) {
                                var fn = scope.onDrop();
                                if ('undefined' !== typeof fn) {
                                    fn(item.id, binId);
                                }
                            });

                            return false;
                        },
                        false
                    );
                },
                scope: {
                    onDrop: '&'
                }
            }
        });

})(window, window.angular);