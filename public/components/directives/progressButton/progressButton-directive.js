(function () {
	var injections = [];

	var progressButton = function () {
		return {
			templateUrl: 'components/directives/progressButton/progressButton.html',
			restrict: 'E',
			scope: {
				ctrl: '=',
				text: '=',
				click: '=',
				disabled: '='
			},
			link: function (scope, element, attrs) {

				scope.$watch('disabled', function (newV) {
					if (newV) {
						element.find('button').attr('disabled', 'disabled');
					}
					else {
						element.find('button').removeAttr('disabled');
					}
				});
				var button = element.find('.progress-button')[0],
					ctrl = {};
				//instance.setProgress( progress )
				//instance.stop( true/false);
				new UIProgressButton(button, {
					callback: function (instance) {
						scope.ctrl.instance = instance;
						scope.click();
					}
				});
			}
		}
	};

	progressButton.$inject = injections;

	angular.module('progressButton', []).directive('progressButton', progressButton);
})();