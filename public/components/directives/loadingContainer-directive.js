(function () {
	'use strict';

	var injections = [];

	var loadingContainer = function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var loadingElement = angular.element('<div class="loading-spinner"></div>');
				var loadingLayout = angular.element('<div class="loading-layout"></div>');
				element.append(loadingElement);
				element.append(loadingLayout);
				element.addClass('loading-container');
				scope.$watch(attrs.loadingContainer, function (value) {
					loadingElement.toggleClass('ng-hide', !value);
					loadingLayout.toggleClass('ng-hide', !value);
				})
			}
		};
	};

	loadingContainer.$inject = injections;
	angular.module('directives').directive('loadingContainer', loadingContainer);
})();