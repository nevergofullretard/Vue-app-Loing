

new Vue({
  el: '#app',
  data: {

	players: [],
    player: {name:"", lives:0},
    add_player_number: 1, //for displaying "Spieler 1, Spieler 2 usw in input field"
    current_player: 0,
    last_player: -1,
    


    options: [
      { text: '1', value: 1 },
      { text: '2', value: 2 },
      { text: '3', value: 3 },
      { text: '4', value: 4 },
      { text: '5', value: 5 },
      { text: '6', value: 6 },
      { text: '7', value: 7 },
      { text: '8', value: 8 },
      { text: '9', value: 9 },
	  { text: '10', value: 10 },
    ],
    lives: 3,


    schwimmen: true,


    animation: "",
    next_player_animation: "",
    show_animation: "",
    lie_truth_animation: "",
    info: "",
    info_animation: "",

    

    game_started:false,
    first: false,
    dices_rolled: false,
    showed_button: false,
    showed: false,
    rolled_again: false,
    finished: false,


    dices: [0,0],

    website: 'https://loing.technikmax.com',
    atag:'<a href="website">Home</a>'
  },


  methods: {
 

	add_player: function() {
		this.players.push({ name: this.player.name, lives: this.lives });
		this.player.name = "";
		this.add_player_number++;
	},

	start: function() {
		this.game_started = true;
		
		if (this.schwimmen) {
			this.players.forEach((value, index) => {
		    this.players[index].lives = this.lives + 1;
			});

		} else {
			this.players.forEach((value, index) => {
		    this.players[index].lives = this.lives;
			});
		};


		this.first = true;
	},

	roll: function() {
		 console.log('roll dices');
		var random1 = Math.random();

		dice_one = Math.floor((random1 * 6) + 1);

		random1 = Math.random();
		dice_two = Math.floor((random1 * 6) + 1);

		console.log(dice_one);
		console.log(dice_two);

		if (dice_one >= dice_two) {
			this.dices[0] = dice_one;
			this.dices[1] = dice_two;
		} else {
			this.dices[0] = dice_two;
			this.dices[1] = dice_one;
		}


		this.next_player_animation = "";

//        setTimeout(() => {
//         this.dices_rolled = true;
//         }, 1000);

		this.animation = "animation: shakeY; animation-duration: 1.7s;";
		this.dices_rolled = true;
	},


	open_close: function() {
		//change css class of Jägermeister bottle to move up/down

		    this.animation = "animation: slideOutUp; animation-duration: 1.9s;";
		    setTimeout(() => {
             this.animation = "animation: slideInDown; animation-duration: 2.4s;"
             }, 1800);



	},

	next_player: function() {


		var available_players = []
		this.players.forEach((value, index) => {
			    if (value.lives > 0) {

			    	available_players.push(index)
			    }
			});


		next_player_bigger = available_players.filter(player => player > this.current_player)

		if ( next_player_bigger.length > 0 ) {
			this.last_player = this.current_player;
			this.current_player = next_player_bigger[0];


		} else {
			next_player_bigger = available_players.filter(player => player < this.current_player)
			this.last_player = this.current_player;
			this.current_player = next_player_bigger[0];
		}

		

		this.first = false;
		this.dices_rolled = false;
		this.rolled_again = false;
		this.showed = false;
		this.showed_button = false;
        this.animation = " ";
        this.show_animation = "";
		this.next_player_animation = "animate__animated animate__fadeInLeft";

	},

	show: function() {
        this.animation = " ";
		//change css class of Jägermeister bottle to move up one time
		this.showed = true;
		
		this.showed_button = true;
		this.next_player_animation = "";


         this.show_animation = "animate__animated animate__slideOutUp";




	},

	roll_again: function() {
	    this.animation = " ";
		this.rolled_again = true;

		var random1 = Math.random();
		dice_one = Math.floor((random1 * 6) + 1);

		random1 = Math.random();
		dice_two = Math.floor((random1 * 6) + 1);

		if (dice_one >= dice_two) {
			this.dices[0] = dice_one;
			this.dices[1] = dice_two;
		} else {
			this.dices[0] = dice_two;
			this.dices[1] = dice_one;
		}

		this.dices_rolled = true;

        setTimeout(() => {
             this.animation = "animation: shakeY; animation-duration: 1.7s;";
             }, 100);

	},

	lie: function() {
			this.players[this.last_player].lives--;
			this.showed = false;
			this.first = true;

			var dead = 0;
			this.players.forEach((value, index) => {
			    if (value.lives <= 0) {
			    	dead++;
			    }
			    if (value.lives <= 0) {
			    	this.players[index].lives--;
			    }
			});

			if (this.players.length - dead == 1) {
				this.finished = true;
				console.log("aus")
			}

			this.show_animation = "animate__animated animate__slideInDown";
			this.info = "-1 Leben für "  + this.players[this.last_player].name + "!";
			this.info_animation = "animation: bounceInLeft; animation-duration: 1s;";

            setTimeout(() => {
             this.info_animation = ""
             }, 3000);

			setTimeout(() => {
             this.info_animation = "animation: bounceOutRight; animation-duration: 1s;";

             }, 3000);

             setTimeout(() => {
             this.info = "";

             }, 4000);

		},

	truth: function() {
		this.players[this.current_player].lives--;
		console.log(this.players[this.current_player].lives);
		this.showed = false;
		this.first = true;

		var dead = 0;
			this.players.forEach((value, index) => {
			    if (value.lives <= 0) {
			    	dead++;
			    }
			    if (value.lives <= 0) {
			    	this.players[index].lives--;
			    }
			});

			if (this.players.length - dead == 1) {
				this.finished = true;
				console.log("aus")
			}
		this.show_animation = "animate__animated animate__slideInDown";
        this.info = "-1 Leben für "  + this.players[this.current_player].name + "!";
        this.info_animation = "animation: bounceInLeft; animation-duration: 1s;";
 setTimeout(() => {
             this.info_animation = ""
             }, 3000);

        setTimeout(() => {
             this.info_animation = "animation: bounceOutRight; animation-duration: 1s;";

             }, 3000);

              setTimeout(() => {
             this.info = "";

             }, 4000);


	},


	repeat: function() {
		var players = []
		this.players.reverse().forEach((value, index) => {
			   players.push(value.name)

			});
		console.log(players);
		var n = 0;
		this.players.forEach((value, index) => {
			   this.players[index].name = players[n];
			   console.log(this.players[index].lives);
			   console.log("Leben für alle: " + this.lives)
			   if (this.schwimmen) {
			   	this.players[index].lives = this.lives + 1;
			   } else {
			   	this.players[index].lives = this.lives;
			   }
			   
			   n++;

			});
		

		this.finished = false;
		this.current_player = 0;
		this.last_player = -1;
	},

	sortArrays(arrays) {
            return _.orderBy(arrays, 'name', 'asc');
        }

  },

  




});