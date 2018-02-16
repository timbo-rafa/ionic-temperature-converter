//define our application and require the "week" module
var app: any // = angular.module('app', ['week']);


//define a new language for the days of the week service
app.config(['daysOfWeekProvider', function(daysOfWeekProvider) {

   //define the days of the week in Danish
   daysOfWeekProvider.define('Danish', 'sondag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lordag');
}]);

app.controller('appController', ['$scope', 'daysOfWeek', function($scope, daysOfWeek) {

   //set the selected language
   $scope.language = daysOfWeek.defaultLanguage;

   //get the list of languages
   $scope.languages = daysOfWeek.languages();

}]);