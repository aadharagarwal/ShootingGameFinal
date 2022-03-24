var bgImg, bg
var gun, gunImg
var gamestate = 1
var bulletImg, bullet, bulletGroup
var redbImg, redGroup
var blast, blastImg
var score = 0
var life = 3
var waterBimg, waterGroup
var count = 0
var counter = 0

function preload() {
  bgImg = loadImage("BG.jpg")
  gunImg = loadImage("gun.png")
  bulletImg = loadImage("bullet.png")
  redbImg = loadImage("redbubble.png")
  blastImg = loadImage("blast.png")
  waterBimg = loadImage("waterBubble.png")
}
function setup() {
  createCanvas(800, 600);
  bg = createSprite(50, width / 2, 100, height);
  bg.addImage(bgImg)

  gun = createSprite(100, height / 2, 50, 50)
  gun.addImage(gunImg)
  gun.scale = 0.2

  redGroup = createGroup()
  bulletGroup = createGroup()
  waterGroup = createGroup()
}

function draw() {
  background("brown");
  fill("yellow")
  text(mouseX + ',' + mouseY, mouseX, mouseY)
  textSize(18)
  text("Score : " + score, 400, 20)
  text("Life :" + life, 150, 20)

  if (gamestate === 1) {
    rbubble()
    Wbubble()
    gun.y = mouseY
    if (keyDown("space") && counter === 0) {
      showBullet()
      counter = 20
    }
    counter = counter - 1

    if (counter === -1) {
      counter = 0
    }

    if (redGroup.collide(bulletGroup)) {
      if (life > 0) {
        //score = score + 1 
        score += 1;
      }
      blast = createSprite(bullet.x + 60, bullet.y, 50, 50)
      blast.addImage(blastImg)
      blast.scale = 0.2
      blast.life = 20
      bulletGroup.destroyEach()
      redGroup.destroyEach()

    }
    if (waterGroup.collide(bulletGroup)) {
      if (life > 0) {
        score += 1
      }
      blast = createSprite(bullet.x + 60, bullet.y, 50, 50)
      blast.addImage(blastImg)
      blast.scale = 0.2
      blast.life = 20
      bulletGroup.destroyEach()
      waterGroup.destroyEach()
    }

    if (redGroup.collide(bg)) {
      handleGameover(redGroup)
    }
    if (waterGroup.collide(bg)) {
      handleGameover(waterGroup)

    }
  }

  drawSprites();
}

function handleGameover(bubbleGroup) {
  life = life - 1
  bubbleGroup.destroyEach()
  if (life === 0) {
    gamestate = 2
    swal({
      title: "GAME OVER",
      text: "Your Score Is " + score,
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
      text: "Your Score is " + score,
    })

    //await sleep(3000 )


  }


}


function showBullet() {
  bullet = createSprite(220, width / 2, 50, 20)
  bullet.addImage(bulletImg)
  bullet.scale = 0.12
  bullet.velocityX = 7
  bullet.y = gun.y - 35
  bulletGroup.add(bullet)
}

function rbubble() {
  if (frameCount % 80 === 0) {
    var redBubble = createSprite(800, 572, 40, 40);
    redBubble.y = random(20, 572)
    redBubble.addImage(redbImg)
    redBubble.scale = 0.1
    redBubble.velocityX = -8
    redBubble.lifetime = 400
    redGroup.add(redBubble)
  }
}

function Wbubble() {

  if (frameCount % 100 === 0) {
    var waterBubble = createSprite(800, 572, 40, 40)
    waterBubble.y = random(20, 572)
    waterBubble.addImage(waterBimg)
    waterBubble.scale = 0.08
    waterBubble.velocityX = -8
    waterBubble.lifetime = 400
    waterGroup.add(waterBubble)


  }
}