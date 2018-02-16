//define the "week" module
var module = angular.module('week', []);

//define the daysOfWeek provider
module.provider('daysOfWeek', [function() {
   var languages, defaultLanguage;

   //define default languages
   languages = {
      English: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
      French: [ 'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi' ],
      German: [ 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag' ],
      Spanish: [ 'domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado' ]
   };
   defaultLanguage = 'English';

   //define the days of a week for a language
   this.define = function(language, sun, mon, tue, wed, thu, fri, sat) {
      languages[language] = [ mon, tue, wed, thu, fri, sat ];
   };

   //get or set the default language
   this.defaultLanguage = function(language) {
      defaultLanguage = language;
      return defaultLanguage;
   };

   //the factory
   this.$get = [function() {
      var factory;
      factory = {

         //get an array of the days of the week for the language specified
         days: function(language) {
            if (arguments.length === 0) language = factory.defaultLanguage;
            if (!(language in languages)) throw new Error('Unknown language specified');
            return languages[language];
         },

         //the default language
         defaultLanguage: defaultLanguage,

         //get available languages
         languages: function() {
            return Object.keys(languages);
         }

      };
      return factory;
   };
}]);

//create a days of week directive to print out the days of the week in a specified language
module.directive('daysOfWeek', ['daysOfWeek', function(daysOfWeek) {
   return {
      restrict: 'A',
      scope: {
         language: '=daysOfWeek'
      },
      template: '<span ng-repeat="day in days()">{{day}}<br></span>',
      link: function(scope, el, attrs) {

         scope.days = function() {
            return daysOfWeek.days(scope.language);
         };

      }
   }
}]);