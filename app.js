new Vue({
  el: '#app',
  data: {

	players: [{name: "", lives: 0}, {name: "", lives: 0}],
	sorted_players: "",
    player_range: 2,
    current_player: 0,
    last_player: -1,
    next_available_player: 1,
    first_round: true,




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
    instructions_open: "*Achte darauf, dass dir niemand ins Handy schaut!",
    instructions_next_player: '*Zuerst den Knopf "Weiter geben" drücken, dann das Handy dem nächsten Spieler geben',
    start_error: false,




    game_started:false,
    first: false,
    dices_rolled: false,
    showed_button: false,
    showed: false,
    rolled_again: false,
    finished: false,
    vogerl: false,


    dices: [0,0],

    website: 'https://loing.technikmax.com',
    atag:'<a href="website">Home</a>'
  },






  methods: {


	add_player: function() {
		this.players.push({ name: "", lives: 0 });
		this.player_range++;

	},



	delete_player: function(player) {
	    console.log(player);
	    console.log(this.players.indexOf(player));
	     this.players.splice(this.players.indexOf(player), 1);

	     this.players.forEach((value, index) => {
			   console.log(value.name);
			});

	     this.player_range--;



	},

	start: function() {

	var real_players = [];
	this.players.forEach((value, index) => {
			    if (value.name != "" && value.name != " ") {

			    	real_players.push(index);
			    }
			});

	    if (real_players.length >= 2) {


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

	    } else {
            this.start_error = true;
	    }



	},

	roll: function() {
		 console.log('roll dices');
		var random1 = Math.random();

		dice_one = Math.floor((random1 * 6) + 1);


		random1 = Math.random();
		dice_two = Math.floor((random1 * 6) + 1);


//        dice_one = 2;
//        dice_two = 1;

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

            var available_players = []
		this.players.forEach((value, index) => {
			    if (value.lives > 0) {

			    	available_players.push(index)
			    }
			});


		next_player_bigger = available_players.filter(player => player > this.current_player)


		if ( next_player_bigger.length > 0 ) {
			this.last_player = this.current_player;

			this.next_available_player = next_player_bigger[0];


		} else {
			next_player_bigger = available_players.filter(player => player < this.current_player)
			this.last_player = this.current_player;
			this.next_available_player = next_player_bigger[0];
		}




          if (this.dices[0] == 2 && this.dices[1] == 1 || this.dices[1] == 2 && this.dices[0] == 1) {
		    this.players.forEach((value, index) => {
		        if (index != this.current_player) {
		            this.players[index].lives--;
		        }

		        var dead = 0;
			this.players.forEach((value, index) => {
			    if (value.lives <= 0) {
			    	dead++;
			    }
			});

			if (this.players.length - dead == 1) {
			    this.sorted_players = _.orderBy(this.players, 'lives', 'desc');
				this.finished = true;
				console.log("aus")
			}
		    });

		    this.vogerl = true;

		    this.show_animation = "animate__animated animate__slideOutUp";
			this.info = "-1 Leben für alle außer "  + this.players[this.current_player].name + "!";
			this.info_animation = "animation: bounceInLeft; animation-duration: 1s;";
			this.animation = " ";

            setTimeout(() => {
             this.info_animation = ""
             }, 3000);

			setTimeout(() => {
             this.info_animation = "animation: bounceOutRight; animation-duration: 1s;";
             }, 6000);

             setTimeout(() => {
             this.info = "";
             this.animation = "";



             }, 7000);

		} else {

		    this.animation = "animation: slideOutUp; animation-duration: 1.9s;";
		    setTimeout(() => {
             this.animation = "animation: slideInDown; animation-duration: 2.4s;"
             }, 1800);

             setTimeout(() => {
             this.animation = "";
             }, 4500);



             }



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
			this.next_available_player = next_player_bigger[1];


		} else {
			next_player_bigger = available_players.filter(player => player < this.current_player)
			this.last_player = this.current_player;
			this.current_player = next_player_bigger[0];
			this.next_available_player = next_player_bigger[1];
		}


        if (this.vogerl) {
            this.first = true;
            this.animation = " .";
            this.vogerl = false;
        } else {
            this.first = false;
            this.animation = "";
        }

		this.dices_rolled = false;
		this.rolled_again = false;
		this.showed = false;
		this.showed_button = false;

        this.show_animation = "";
		this.next_player_animation = "animate__animated animate__fadeInLeft";

		if (this.current_player == 0) {
            this.first_round = false;
		}

	},

	show: function() {

		//change css class of Jägermeister bottle to move up one time

		if (this.dices[0] == 2 && this.dices[1] == 1 || this.dices[1] == 2 && this.dices[0] == 1) {
		    this.players.forEach((value, index) => {
		        if (index != this.last_player) {
		            this.players[index].lives--;
		        }

		     var dead = 0;
			this.players.forEach((value, index) => {
			    if (value.lives <= 0) {

			    	dead++;
			    }
			});

			if (this.players.length - dead == 1) {
			    this.sorted_players = _.orderBy(this.players, 'lives', 'desc');
				this.finished = true;
				console.log("aus")
			}
		    });

		    this.dices_rolled = false;
             this.first = true;
             this.showed = false;

		    this.show_animation = "animate__animated animate__slideOutUp";
			this.info = "-1 Leben für alle außer "  + this.players[this.last_player].name + "!";
			this.info_animation = "animation: bounceInLeft; animation-duration: 1s;";
			this.animation = " ";

            setTimeout(() => {
             this.info_animation = ""
             }, 3000);

			setTimeout(() => {
             this.info_animation = "animation: bounceOutRight; animation-duration: 1s;";
             }, 6000);

             setTimeout(() => {
             this.info = "";

            this.animation = "animation: slideInDown; animation-duration: 2.4s;"


             }, 7000);

		} else {
		 this.animation = "";
		this.showed = true;

		this.showed_button = true;
		this.next_player_animation = "";


         this.show_animation = "animate__animated animate__slideOutUp";
		}







	},

	roll_again: function() {

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
             this.animation = "animation: shakeY; animation-duration: 1.8s;";
             }, 100);
              setTimeout(() => {
             this.animation = "";
             }, 2800);



             setTimeout(() => {


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
			this.next_available_player = next_player_bigger[1];


		} else {
			next_player_bigger = available_players.filter(player => player < this.current_player)
			this.last_player = this.current_player;
			this.current_player = next_player_bigger[0];
			this.next_available_player = next_player_bigger[1];
		}



		this.first = false;
		this.dices_rolled = false;
		this.rolled_again = false;
		this.showed = false;
		this.showed_button = false;
        this.animation = "";
        this.show_animation = "";
		this.next_player_animation = "animate__animated animate__fadeInLeft";

		if (this.current_player == 0) {
            this.first_round = false;
		}


             }, 2500);








	},

	lie: function() {
            this.players[this.last_player].lives--;
			this.showed = false;
			this.first = true;

			var dead = 0;
			this.players.forEach((value, index) => {
			    if (value.lives <= 0) {
			    	this.players[index].lives--;
			    	dead++;
			    }
			});



			if (this.players.length - dead == 1) {
			    this.sorted_players = _.orderBy(this.players, 'lives', 'desc');
				this.finished = true;
				console.log("aus")
			}



			this.show_animation = "animate__animated animate__slideInDown_delay-2s";
			this.info = "-1 Leben für "  + this.players[this.last_player].name + "!";
			this.info_animation = "animation: bounceInLeft; animation-duration: 1s;";
			this.animation = " ";

            setTimeout(() => {
             this.info_animation = ""
             }, 3000);

			setTimeout(() => {
             this.info_animation = "animation: bounceOutRight; animation-duration: 1s;";
             }, 5000);

             setTimeout(() => {
             this.info = "";
             }, 6000);

		},

	truth: function() {
        this.players[this.current_player].lives--;
		console.log(this.players[this.current_player].lives);
		this.showed = false;
		this.first = true;

		var dead = 0;
			this.players.forEach((value, index) => {

			    if (value.lives <= 0) {
			    	this.players[index].lives--;
			    	dead++;
			    }
			});



			if (this.players.length - dead == 1) {
				this.sorted_players = _.orderBy(this.players, 'lives', 'desc');
				this.finished = true;
				console.log("aus")
			}
		this.show_animation = "animate__animated animate__slideInDown_delay-2s";
        this.info = "-1 Leben für "  + this.players[this.current_player].name + "!";
        this.info_animation = "animation: bounceInLeft; animation-duration: 1s;";
        this.animation = " ";
 setTimeout(() => {
             this.info_animation = ""
             }, 3000);

        setTimeout(() => {
             this.info_animation = "animation: bounceOutRight; animation-duration: 1s;";


             }, 3000);

              setTimeout(() => {
             this.info = "";

             }, 4000);

                console.log("lives:");
                console.log(this.players[this.current_player].lives);
                if (this.players[this.current_player].lives <= 0) {
                console.log('nächster spieler weil tot');
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
                    this.next_available_player = next_player_bigger[1];


                } else {
                    next_player_bigger = available_players.filter(player => player < this.current_player)
                    this.last_player = this.current_player;
                    this.current_player = next_player_bigger[0];
                    this.next_available_player = next_player_bigger[1];
                }
            }


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
		this.animation = "";
		this.first = true;
	},



  },






});

