(function() {
	'use strict';

	$.extend($.fn, {
		lock: function() {
			return this.attr('locked', true);
		},
		unlock: function() {
			return this.removeAttr('locked');
		}
	});

	$.expr[':'].locked = function(elm) {
		return elm.getAttribute('locked');
	};

	var origDispatch = $.event.dispatch;

	$.event.dispatch = function(event) {
		var e = $.event.fix(event || window.event);
		var args = [].slice.call(arguments, 1);

		var target = $(e.currentTarget);

		if (e !== event && (target.is(':locked') || target.closest(':locked').length > 0)) {
			e.preventDefault();
			e.stopImmediatePropagation();
			return;
		}

		args.unshift(e);
		return origDispatch.apply(this, args);
	};
}());
