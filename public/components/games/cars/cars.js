function startCarsGame() {
	var game = new Phaser.Game(600, 400, Phaser.AUTO, 'cars-game', {
		preload: preload,
		create: create,
		update: update
	});

	var cars = [],
		selectedCarBody = null,
		carCollisionGroup;

	var player, playerCollisionGroup;

	var point;

	function addCar(x, y, spriteKey, value) {
		var car = game.add.sprite(x, y, 'cars', spriteKey);

		car.anchor.setTo(0.5, 0.5); //позиция отсчета
		car.scale.setTo(0.5, 0.5); //размер

		game.physics.p2.enable(car);

		car.body.static = true;
		car.body.testValue = value;

		car.body.setCollisionGroup(carCollisionGroup);
		car.body.collides([carCollisionGroup, playerCollisionGroup]);

		cars.push(car);
	}

	function addPlayer(x, y) {
		player = game.add.sprite(x, y, 'player');

		player.animations.add('stay', ['stay0.png']);
		player.animations.add('run', ['run0.png', 'run1.png', 'run2.png', 'run3.png', 'run4.png']);

		player.anchor.setTo(0.5, 0.5); //позиция отсчета
		player.scale.setTo(0.3, 0.3); //размер

		game.physics.p2.enable(player, false);

		player.body.setCollisionGroup(playerCollisionGroup);
		player.body.collides(carCollisionGroup, function (player, car) {
			player.removeFromWorld();
			stayPlayer();
			player.x = -10;

			if (selectedCarBody) {
				selectedCarBody.setZeroVelocity();
				selectedCarBody.static = true;
			}

			car.static = false;
			car.mass = 1;

			selectedCarBody = car;
			$(document).trigger('hover:' + selectedCarBody.testValue);
		}, this);
	}

	function runPlayer() {
		player.animations.play('run', 10, true);
		player.body.moveForward(90);
	}

	function stayPlayer() {
		player.animations.play('stay', 10, true);
		player.body.setZeroVelocity();
	}

	function unselectCar() {
		$(document).trigger('unhover');
		if (selectedCarBody) {
			selectedCarBody.setZeroVelocity();
			selectedCarBody.static = true;
		}

		selectedCarBody = null;
	}


	function addCars() {
		addCar(40, 100, 'car01.png', 1);
		addCar(120, 100, 'car02.png', 2);
		addCar(200, 100, 'car03.png', 3);
		addCar(280, 100, 'car04.png', 4);
	}

	function restart() {
		selectedCarBody = null;
		for (var i = 0; i < cars.length; i++) {
			cars[i].kill();
		}
		player.kill();

		addCars();

		addPlayer(100, 220);
	}

	function preload() {
		game.load.onFileComplete.add(fileComplete, this);

		game.load.atlasJSONHash('cars', 'components/games/cars/assets/cars/cars.png', 'components/games/cars/assets/cars/cars.json');
		game.load.atlasJSONHash('player', 'components/games/cars/assets/player/player.png', 'components/games/cars/assets/player/player.json');
		game.load.image('asphalt', 'components/games/cars/assets/asphalt.jpg');
		game.load.image('point', 'components/games/cars/assets/point.png');
	}

	function fileComplete(progress) {
		$(document).trigger('progressChange', [progress]);
	}

	function create() {
		game.add.tileSprite(0, 0, 600, 400, 'asphalt');


		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.defaultRestitution = 0.9;

		carCollisionGroup = game.physics.p2.createCollisionGroup();
		playerCollisionGroup = game.physics.p2.createCollisionGroup();


		game.physics.p2.updateBoundsCollisionGroup();

		point = game.add.sprite(550, 350, 'point');
		point.scale.setTo(0.2, 0.2);
		point.anchor.setTo(0.5, 0.6);

		addCars();

		addPlayer(100, 220);

	}


	var speed = 0,
		rotation = 0;

	function update() {
		if (!selectedCarBody) {
			if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				runPlayer();
			}
			else {
				stayPlayer();
			}

			if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				player.body.rotateLeft(70);
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				player.body.rotateRight(70);
			}
			else {
				player.body.setZeroRotation();
			}
		}

		if (selectedCarBody) {

			if (Math.abs(selectedCarBody.x - point.x) <= 30 && Math.abs(selectedCarBody.y - point.y) <= 30) {
				$(document).trigger('' + selectedCarBody.testValue);
				restart();
				$(document).trigger('unhover');
				return;
			}

			if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
				player.body.addToWorld(game);
				player.body.x = selectedCarBody.x;
				player.body.y = selectedCarBody.y;
				unselectCar();
				return;
			}


			if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && speed < 200) {
				speed += 50;
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && speed > -100) {
				speed -= 30;
			}
			else if (speed > 0) {
				speed -= 10;
			}
			else if (speed < 0) {
				speed += 10;
			}

			if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				rotation = -15;
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				rotation = +15;
			}
			else {
				rotation = 0;
			}

			if (speed > 0) {
				selectedCarBody.rotateRight(rotation);
			}
			else if (speed < 0) {
				selectedCarBody.rotateLeft(rotation);
			}

			if (rotation === 0 || speed === 0) {
				selectedCarBody.setZeroRotation();
			}

			selectedCarBody.moveForward(speed);
		}
	}

	document.stopGame = function () {
		game.destroy();
	}

}