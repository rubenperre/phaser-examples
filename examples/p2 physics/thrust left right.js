
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('stars', 'assets/misc/starfield.jpg');
    game.load.image('ship', 'assets/sprites/thrust_ship2.png');

}

var ship;
var starfield;
var cursors;

function create() {

    game.world.setBounds(0, 0, 1920, 1200);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.defaultRestitution = 0.8;

    starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');
    starfield.fixedToCamera = true;

    ship = game.add.sprite(200, 200, 'ship');

    game.physics.p2.enable(ship);

    game.camera.follow(ship);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown)
    {
        ship.body.thrustLeft(100);
    }
    else if (cursors.right.isDown)
    {
        ship.body.thrustRight(100);
    }

    if (cursors.up.isDown)
    {
        ship.body.thrust(400);
    }
    else if (cursors.down.isDown)
    {
        ship.body.reverse(400);
    }

    if (!game.camera.atLimit.x)
    {
        starfield.tilePosition.x -= (ship.body.velocity.x * game.time.physicsElapsed);
    }

    if (!game.camera.atLimit.y)
    {
        starfield.tilePosition.y -= (ship.body.velocity.y * game.time.physicsElapsed);
    }

}
