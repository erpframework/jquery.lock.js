(function() {
	'use strict';

	$.extend($.fn, {
		lock: function() {
			return this.each(function() {
				this.setAttribute('locked', true);
			});
		},
		unlock: function() {
			return this.each(function() {
				this.removeAttribute('locked');
			});
		}
	});

	var origDispatch = $.event.dispatch;

	$.event.dispatch = function(event) {
		event = $.event.fix(event || window.event);
		var args = [].slice.call(arguments, 1);

		if (event.currentTarget && event.currentTarget.getAttribute &&
				event.currentTarget.getAttribute('locked')) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		args.unshift(event);
		return origDispatch.apply(this, args);
	};
}());
