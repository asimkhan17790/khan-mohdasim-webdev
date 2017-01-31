angular
    .module("WidgetApp", [])
    .controller("WidgetChooserController", WidgetChooserController);

function WidgetChooserController($scope, $http) {
    $scope.widgetList = [
        {name:'Header', route:'widget-heading.html'},
        {name:'Image', route:'widget-image.html'},
        {name:'YouTube', route:'widget-youtube.html'}
    ];


}
