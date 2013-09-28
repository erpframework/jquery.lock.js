(function() {
	'use strict';

	$.extend($.fn, {
		lock: function() {
			this.locked = true;
		},
		unlock: function() {
			this.locked = false;
		}
	});

	var origDispatch = $.event.dispatch;

	$.event.dispatch = function(event) {
		if (this.locked) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		return origDispatch.apply(this, arguments);
	};
}());
