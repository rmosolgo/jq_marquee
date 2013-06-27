
jQuery.fn.marquee = function(options) {
	var options = options || {},
		PERIOD = options["period"] || 3000, // milliseconds per item
		PHASE = options["phase"] || 300, // milliseconds for transition
		STARTED = 'started',
		STOPPED = 'stopped';

	this.each(function() {
		var list = $(this),
			TARGET = $(options["target"] || this),
			m = {
				list: list,
				items: list.children('li'),
				length: list.children('li').length,
				state: STOPPED,
				step: 0,
				hide_current: function(callback) {
					$(this.items[this.step]).fadeOut(PHASE, callback);
				},
				show_current: function(callback) {
					$(this.items[this.step]).fadeIn(PHASE, callback);
				},
				hide_inactive: function() {
					var marquee = this;
					this.items.filter(function(i) { return i != marquee.step }).slideUp(PHASE)
				},
				hide_all: function() {
					this.items.slideUp(PHASE)
				},
				show_all: function() {
					this.items.slideDown(PHASE)
				},
				stop: function() {
					if (this.state != STOPPED) {
						this.state = STOPPED;
						if (this.cycling) {
							clearInterval(this.cycling)
						} 
						marquee = this;
						this.show_all();
					}
				},
				start: function() {
					if (this.state != STARTED) { 
						this.hide_inactive();
						this.state = STARTED;

						var marquee = this;
						this.cycling = setInterval(function() {
				 			marquee.increment() 
				 		}, PERIOD)
						this.show_current();
					}
				},
				increment: function() {
					if (this.state != STOPPED) {
						var marquee = this;
						this.hide_current(function() {
							marquee.step = (marquee.step += 1 ) % marquee.length;
							marquee.show_current();
						})
					}
				},
			};
		m.items.hide();
		m.start()	;
		TARGET.mouseenter(function() {
			m.stop();
		}).mouseleave(function() {	
			m.start(); 
		});
		return this;
	})
}
