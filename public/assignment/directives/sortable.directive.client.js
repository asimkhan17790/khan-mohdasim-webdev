(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {

        var startIndex = -1;
        var endIndex = -1;
        function linkFunc(scope, element, attributes) {
            element.sortable({
                handle: 'a.handler',
                axis: 'y',
                start: function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui) {
                    endIndex = ui.item.index();
                    scope.model.reArrangeItems(startIndex,endIndex);
                }});
        }
        return {
            link: linkFunc
            
        };
    }
})();
