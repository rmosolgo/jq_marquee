
jQuery.fn.marquee = function(options) {
	var options = options || {},
		PERIOD = options["period"] || 3000, // milliseconds per item
		PHASE = options["phase"] || PERIOD * .1, // milliseconds for transition

		STARTED = 'started',
		STOPPED = 'stopped'

	this.each(function() {
		var list = $(this);
		var CONTAINER = $(options["container"] || this),
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
				this.items.filter(function(i) { return i != marquee.step }).slideUp('slow')
			},
			hide_all: function() {
				this.items.slideUp(PHASE)
			},
			show_all: function() {
				this.items.slideDown('slow')
			},
			stop: function() { 
				if (this.state != STOPPED) {
					this.state = STOPPED;
					if (this.cycling) {
						clearInterval(this.cycling)
					} 
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

			} 

		}
		console.log(m)
		m.items.hide()
		m.start()
		CONTAINER.mouseenter(function() {
				m.stop() 
			})
			.mouseleave(function() {
				m.start(); 
			});
		return this
	})
}


// Marquee = {
// 	  create: function(selector) {
// 	    var m;

// 	    this.selector = selector;
// 	    this.step = 0;
// 	    this.length = $(selector + ' li').length;
// 	    this.start();
// 	    this.phase = this.period * .1;
// 	    m = this;
// 	    return $(selector).parent().mouseenter(marquee.reveal).mouseleave(marquee["continue"]);
// 	  },
// 	  hide_all: function(method) {
// 	    if (method == null) {
// 	      method = null;
// 	    }
// 	    if (method === 'slide') {
// 	      return $(this.selector + ' li').slideUp(300);
// 	    } else {
// 	      return $(this.selector + ' li').hide();
// 	    }
// 	  },
// 	  show_all: function() {
// 	    return $(this.selector + ' li').slideDown('slow');
// 	  },
// 	  stop: function() {
// 	    return marquee.state = 'stopped';
// 	  },
// 	  period: 3000,
// 	  start: function() {
// 	    marquee.state = 'started';
// 	    marquee.hide_all();
// 	    return $(marquee.selector + ' li:eq(' + marquee.step + ')').fadeIn(marquee.phase, function() {
// 	      return marquee.cycling = setInterval(marquee.increment, marquee.period);
// 	    });
// 	  },
// 	  increment: function() {
// 	    var m, step_from, step_to;

// 	    m = marquee;
// 	    if (m.state !== 'stopped') {
// 	      step_from = m.step;
// 	      step_to = (step_from + 1) % m.length;
// 	      $(m.selector + ' li:eq(' + step_from + ')').fadeOut(marquee.phase, function() {
// 	        return $(m.selector + ' li:eq(' + step_to + ')').fadeIn(marquee.phase);
// 	      });
// 	      return m.step = step_to;
// 	    }
// 	  },
// 	  "continue": function() {
// 	    marquee.hide_all();
// 	    $(marquee.selector + ' li:eq(' + marquee.step + ')').show();
// 	    return marquee.state = 'started';
// 	  },
// 	  reveal: function(m) {
// 	    marquee.stop();
// 	    return marquee.show_all();
// 	  }
// 	};
// })

