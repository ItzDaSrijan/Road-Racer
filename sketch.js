var roadImg, road;
var playerCarImg, playerCar;
var railing1, railing1Img, railing2, railing2Img;
var RoadTruckImg, RoadBikeImg, RoadCarImg, RoadCar2Img;
var RoadTruck, RoadBike, RoadCar, RoadCar2;
var roadVehicles;
var gameState = "play";
var kilometers = 0;
var spawnChances, edges, gameover, gameoverImg;

function preload() {
    roadImg = loadImage("Road.png")
    playerCarImg = loadImage("playerCar.png")
    railing1Img = loadImage("Railing_1.png")
    railing2Img = loadImage("Railing_2.png")
    RoadTruckImg = loadImage("RoadTruck.png")
    RoadBikeImg = loadImage("RoadBike.png")
    RoadCarImg = loadImage("RoadCar1.png")
    RoadCar2Img = loadImage("RoadCar2.png")
    gameoverImg = loadImage("gameOver.png")
    roadVehicles = new Group()
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    road = createSprite(100, 250)
    road.addImage(roadImg)

    playerCar = createSprite(200, 400)
    playerCar.addImage(playerCarImg)
    playerCar.scale = 0.7;
    playerCar.setCollider("rectangle", 0, 0, 230, 100)
    playerCar.depth = 2;

    railing1 = createSprite(625, 400)
    railing1.addImage(railing1Img)
    railing1.scale = 4;
    railing2 = createSprite(655, 200)
    railing2.addImage(railing2Img)
    railing2.scale = 4;
    railing1.depth = 1;
    railing2.depth = 1;

    gameover = createSprite(650, 250)
    gameover.addImage(gameoverImg)
    gameover.visible = false
}

function draw() {
    background(220)

    drawSprites()

    textSize(20)
    fill(255)
    text("Distance: " + kilometers + "m", 1000, 85)

    if (gameState == "play") {
        edges = createEdgeSprites()
        playerCar.collide(edges)

        spawnChances = Math.round(random(1, 8))

        if (World.frameCount % 125 === 0) {
            if (spawnChances == 1 || spawnChances == 3) {
                truckSpawn()
            } else if (spawnChances == 2 || spawnChances == 5) {
                bikeSpawn()
            } else if (spawnChances == 3 || spawnChances == 7) {
                car1spawn()
            } else {
                car2spawn()
            }
        }

        if (playerCar.isTouching(roadVehicles)) {
            gameState = "end"
        }

        kilometers = kilometers + Math.round(getFrameRate() / 50);
        road.velocityX = -(6 + 3 * kilometers / 150);

        if (road.x < 0) {
            road.x = width / 2
        }

        playerCar.y = World.mouseY;

    } else if (gameState == "end") {
        gameover.visible = true
        text("Press SPACE button to restart the game!", 475, 325)
        road.velocityX = 0;
        playerCar.velocityX = 0;
        playerCar.destroy()
        roadVehicles.destroyEach()

        if (keyDown("SPACE")) {
            reset()
        }
    }
}

function truckSpawn() {
    RoadTruck = createSprite(1100, Math.round(random(50, 500)))
    RoadTruck.addImage(RoadTruckImg)
    RoadTruck.scale = 0.6;
    RoadTruck.velocityX = -(6 + 2 * kilometers / 150);
    RoadTruck.lifetime = 170;
    RoadTruck.depth = 1;
    playerCar.depth = 2;
    roadVehicles.add(RoadTruck)
}

function bikeSpawn() {
    RoadBike = createSprite(1100, Math.round(random(50, 500)))
    RoadBike.addImage(RoadBikeImg)
    RoadBike.scale = 0.45;
    RoadBike.velocityX = -(6 + 2 * kilometers / 150);
    RoadBike.lifetime = 170;
    RoadBike.depth = 1;
    playerCar.depth = 2;
    roadVehicles.add(RoadBike)
}

function car1spawn() {
    RoadCar = createSprite(1100, Math.round(random(50, 500)))
    RoadCar.addImage(RoadCarImg)
    RoadCar.scale = 0.8;
    RoadCar.velocityX = -(6 + 2 * kilometers / 150);
    RoadCar.lifetime = 170;
    RoadCar.depth = 1;
    playerCar.depth = 2;
    roadVehicles.add(RoadCar)
}

function car2spawn() {
    RoadCar2 = createSprite(1100, Math.round(random(50, 500)))
    RoadCar2.addImage(RoadCar2Img)
    RoadCar2.scale = 0.7;
    RoadCar2.velocityX = -(6 + 2 * kilometers / 150);
    RoadCar2.lifetime = 170;
    RoadCar2.depth = 1;
    playerCar.depth = 2;
    roadVehicles.add(RoadCar2)
}

function reset() {
    gameState = "play"
    kilometers = 0;
    gameover.visible = false;
    playerCar = createSprite(200, 400)
    playerCar.addImage(playerCarImg)
    playerCar.scale = 0.7;
    playerCar.setCollider("rectangle", 0, 0, 230, 100)
    playerCar.depth = 2;
}
