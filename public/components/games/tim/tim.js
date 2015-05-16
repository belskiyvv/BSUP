function startTimGame() {
    var game = new Phaser.Game(600, 400, Phaser.AUTO, 'tim-game', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var tim,
        currentAnimation = 'stay',
        timSpeed = 4;

    var staircaseArray = [];
    var blocksArray = [];
    var doorsArray = [];
    var textsArray = [];

    //TODO: need to refactor this:
    //проверка на столкновения с блоком (мб есть функция в либе??)
    function overlapArray(array, obj) {
        for (var i = 0; i < array.length; i++) {
            if (Math.abs(array[i].y - obj.y) <= 10) {
                return true;
            }
        }
        return false;
    }

    function addStaircase(x, y) {
        var staircase = game.add.sprite(x, y, 'staircase');
        staircase.anchor.setTo(0.5, 0.5); //позиция отсчета
        staircase.scale.setTo(1.0, 1.0); //размер

        staircaseArray.push(staircase);
    }

    function createTim(x, y) {
        tim = game.add.sprite(x, y, 'tim');

        tim.anchor.setTo(0.5, 1); //позиция отсчета
        tim.scale.setTo(0.35, 0.35); //размер

        game.physics.enable(tim, Phaser.Physics.ARCADE);
        tim.body.collideWorldBounds = true;

        //задаем ключи анимаций
        tim.animations.add('stay', ['frame0.png', 'frame1.png', 'frame2.png', 'frame3.png', 'frame4.png', 'frame5.png', 'frame6.png', 'frame7.png', 'frame8.png', 'frame9.png', 'frame10.png', 'frame11.png', 'frame12.png', 'frame13.png', 'frame14.png', 'frame15.png', 'frame16.png', 'frame17.png', 'frame18.png', 'frame19.png', 'frame20.png', 'frame21.png'], 60, false, false);
        tim.animations.add('run', ['run01.png', 'run02.png', 'run03.png', 'run04.png', 'run05.png', 'run06.png', 'run07.png', 'run08.png', 'run09.png', 'run10.png', 'run11.png', 'run12.png', 'run13.png', 'run14.png', 'run15.png', 'run16.png', 'run17.png', 'run18.png', 'run19.png', 'run20.png', 'run21.png', 'run22.png', 'run23.png', 'run24.png', 'run25.png', 'run26.png', 'run27.png']);
        tim.animations.add('climb', ['climb0.png', 'climb1.png', 'climb2.png', 'climb3.png', 'climb4.png', 'climb5.png', 'climb6.png', 'climb7.png']);
        tim.animations.add('enter', ['enter0.png', 'enter1.png', 'enter2.png', 'enter3.png', 'enter4.png']);


        tim.animations.play('stay', 30, true);

    }

    function restart() {
        tim.kill();
        createTim(game.world.centerX, game.world.centerY);
    }

    function addDoor(x, y, text) {
        var door = game.add.sprite(x, y, 'door');
        door.assignText = addText(x + 25, y - 58, text);
        door.testValue = text;

        door.anchor.setTo(0.5, 1); //позиция отсчета
        door.scale.setTo(0.6, 0.6); //размер

        door.animations.add('open', ['door0.png', 'door1.png', 'door2.png', 'door3.png', 'door4.png']);
        door.animations.add('close', ['door5.png', 'door6.png', 'door7.png', 'door8.png', 'door9.png']);
        door.close = true;

        doorsArray.push(door);
    }

    function openDoor(door) {
        if (door.close) {
            door.animations.play('open', 10, false);
            door.close = false;
        }
    }

    function closeDoor(door) {
        if (!door.close) {
            door.animations.play('close', 15, false);
            door.close = true;
        }
    }

    //войти в дверь
    function enterTim(door) {
        openDoor(door);
        tim.animations.play('enter', 10, false);
        var scale = 0.5;

        function decreaseScaleTim() {
            if (scale > 0.1) {
                scale -= 0.1;
                tim.scale.setTo(scale, scale);
                tim.y -= 2;
                setTimeout(decreaseScaleTim, 20);
            }
            else{
                closeDoor(door);
                restart();
            }
        }

        setTimeout(decreaseScaleTim, 100);
    }


    //поменять анимацию на стоячую
    function startStayTim() {
        if (currentAnimation !== 'stay') {
            tim.animations.stop(currentAnimation);
            tim.animations.play('stay', 20, true);
            currentAnimation = 'stay';
        }
    }

    //поменять анимацию на бегущую
    function startRunTim() {
        if (currentAnimation !== 'run') {
            tim.animations.stop(currentAnimation);
            tim.animations.play('run', 30, true);
            currentAnimation = 'run';
        }
    }

    //поменять анимацию на карабкаться
    function startClimb() {
        if (currentAnimation !== 'climb') {
            tim.animations.stop(currentAnimation);
            tim.animations.play('climb', 10, true);
            currentAnimation = 'climb';
        }
    }

    //Тим бежит вправо
    function runRight() {

        if (tim.scale.x < 0) { //если смотрил влево
            tim.scale.x *= -1;
        }
        startRunTim();

        tim.x += timSpeed;
    }

    function runLeft() {

        if (tim.scale.x > 0) { //если смотрит вправо
            tim.scale.x *= -1;
        }
        //если стоит
        startRunTim();
        tim.x -= timSpeed;
    }

    function climbUp() {
        startClimb();
        tim.y -= timSpeed;
    }

    function climbDown() {
        startClimb();
        tim.y += timSpeed;
    }

    //создать блок, на всю длину, y - координата (считаются от верха)
    function addBlock(y) {
        var block = game.add.tileSprite(0, y, 600, 6, 'block');

        blocksArray.push(block);
    }

    function addText(x, y, textStr) {

        var text = game.add.text(x, y, textStr);
        text.align = 'center';

        text.font = 'Arial';
        text.fontSize = 50;
        text.fill = '#8C6239';

        text.setShadow(5, 5, 'rgba(0, 0, 0, 0.5)', 0);
        return text;
    }

    function stay() {
        startStayTim();
    }


    function preload() {

        game.load.atlasJSONHash('tim', 'components/games/tim/assets/tim/tim.png', 'components/games/tim/assets/tim/tim.json');
        game.load.atlasJSONHash('staircase', 'components/games/tim/assets/staircase/staircase.png', 'components/games/tim/assets/staircase/staircase.json');
        game.load.atlasJSONHash('door', 'components/games/tim/assets/door/door.png', 'components/games/tim/assets/door/door.json');
        game.load.image('layout', 'components/games/tim/assets/layout.jpg');
        game.load.image('block', 'components/games/tim/assets/block.jpg');

    }

    function create() {
        game.add.tileSprite(0, 0, 600, 400, 'layout');

        var y = 250;
        var y1 = y+70;
        var y2 = y1-70;
        var y3 = y2-70;
        var y4 = y3-70;

        addBlock(y1);
        addDoor(400,y1,'1');

        addBlock(y2);
        addDoor(40,y2,'2');

        addBlock(y3);
        addDoor(500,y3,'3');

        addBlock(y4);
        addDoor(100,y4,'4');


        addStaircase(100, y1-35);
        addStaircase(game.world.centerX, y2-35);
        addStaircase(200, y3-35);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        createTim(game.world.centerX, game.world.centerY);

        game.physics.enable(staircaseArray, Phaser.Physics.ARCADE);
        game.physics.enable(blocksArray, Phaser.Physics.ARCADE);
        game.physics.enable(doorsArray, Phaser.Physics.ARCADE);

        game.input.keyboard.processKeyDown()
    }


    function update() {

        //govnocode

        //на блоке, не на лестнице
        if (overlapArray(blocksArray, tim) && !game.physics.arcade.overlap(tim, staircaseArray, null)) {

            if (overlapArray(blocksArray, tim) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                runRight();
            }

            else if (overlapArray(blocksArray, tim) && game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                runLeft();
            }
            else {
                stay();
            }
        }

        //на лестнице, не на блоке
        else if (!overlapArray(blocksArray, tim) && game.physics.arcade.overlap(tim, staircaseArray, function (tim, staircase) {
                if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && (tim.bottom > staircase.bottom - staircase.height + 10)) {
                    climbUp();
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && (tim.bottom < staircase.bottom)) {
                    climbDown();
                }
                else {
                    stay();
                }
            }, null, this));

        //на блоке и на лестнице
        else if (overlapArray(blocksArray, tim) && game.physics.arcade.overlap(tim, staircaseArray, function (tim, staircase) {
                if (overlapArray(blocksArray, tim) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    runRight();
                }

                else if (overlapArray(blocksArray, tim) && game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    runLeft();
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && (tim.bottom > staircase.bottom - staircase.height + 10)) {
                    climbUp();
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && (tim.bottom < staircase.bottom)) {
                    climbDown();
                }
                else {
                    stay();
                }
            }, null, this));
        else {
            stay();
        }

        //возле двери
        if(!game.physics.arcade.overlap(tim, doorsArray, function (tim, door) {
            $(document).trigger('hover:'+door.testValue);
            if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
                if (door.close) {
                    enterTim(door);
                    restart();
                    $(document).trigger(door.testValue);
                }
            }
        }, null, this)){
            $(document).trigger('unhover');
        }
    }

    document.stopGame = function() {
        game.destroy();
    };

    function render() {
    }
};