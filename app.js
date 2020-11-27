new Vue({
  el: '#app',
  data: {
  	wert: 42,

    person: {
    	name: 'Max',
    	height: 189,
    },

    website: 'https://loing.technikmax.com',
    atag:'<a href="website">Home</a>'
  },

  methods: {
  	sayHi: function(greeting) {
  		return greeting + ' ' + this.person.name;
  	},

  	add: function(){
  		this.wert++;
  	},
  	subtract: function() {
  		this.wert--;
  		},

  },


});