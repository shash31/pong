var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d')

console.log(canvas)

// Ball
ballradius = 20
ballx = canvas.width / 2
bally = canvas.height / 2
c.beginPath()
c.arc(ballx, bally, ballradius, 0, Math.PI*2)
c.fillStyle = '#fbfaf5'
c.stroke()
c.fill()



xspeed = ((Math.random()*5)+2) * (Math.random() < 0.5 ? -1 : 1)
yspeed = ((Math.random()*5)+2) * (Math.random() < 0.5 ? -1 : 1)
console.log(`xspeed: ${xspeed}`)
console.log(`yspeed: ${yspeed}`)

// Players
paddleHeight = 0.2*canvas.height
paddleWidth = ballradius*1.5

// Player one
playeroney = (canvas.height / 2) - (paddleHeight / 2)
c.fillRect(0, playeroney, paddleWidth, paddleHeight)
playeronescore = 0

// Player two
playertwoy = (canvas.height / 2) - (paddleHeight / 2)
c.fillRect(canvas.width-paddleWidth, playertwoy, paddleWidth, paddleHeight)
playertwoscore = 0

c.font = '50px Sans-Serif'
c.textAlign = 'center'
c.textBaseline = 'middle'
c.fillText(playeronescore, canvas.width / 4, canvas.height / 8)
c.fillText(playertwoscore, canvas.width*3/4, canvas.height / 8)

c.fillText('Press space to start', canvas.width / 2, canvas.height*4/5)
c.fillText('Use arrow keys and w,a,s,d to move', canvas.width / 2, canvas.height*9/10)

movement = 15
keysPressed = {}

function dvdplayer() {
    c.clearRect(0, 0, canvas.width, canvas.height)

    ballx += xspeed
    bally += yspeed

    c.beginPath()
    c.arc(ballx, bally, ballradius, 0, Math.PI*2)
    c.stroke()
    c.fill()

    c.fillText(playeronescore, canvas.width / 4, canvas.height / 8)
    c.fillText(playertwoscore, canvas.width*3/4, canvas.height / 8)

    if (keysPressed['KeyW']) {
        console.log('w')
        if (playeroney >= 0) playeroney -= movement
    } else if (keysPressed['KeyS']) {
        console.log('s')
        if ((playeroney+paddleHeight) <= canvas.height) playeroney += movement
    }

    if (keysPressed['ArrowUp']) {
        console.log('up')

        if (playertwoy >= 0) playertwoy -= movement
    } else if (keysPressed['ArrowDown']) {
        console.log('down')
        if ((playertwoy+paddleHeight) <= canvas.height) playertwoy += movement
    }

    // Player one
    c.fillRect(0, playeroney, paddleWidth, paddleHeight)

    // Player two
    c.fillRect(canvas.width-paddleWidth, playertwoy, paddleWidth, paddleHeight)

    if (((bally-ballradius) <= 0) || ((bally+ballradius) >= canvas.height)) yspeed *= -1

    // Paddle collision
    if ((((ballx-ballradius)<=paddleWidth) && ((bally>=playeroney)&&(bally<=(playeroney+paddleHeight))))
        || (((ballx+ballradius)>=(canvas.width-paddleWidth)) && ((bally>=playertwoy)&&(bally<=(playertwoy+paddleHeight))))
        ) {
        console.log('paddle collision')
        // Fixing ball getting stuck inside paddle
        if (ballx < (canvas.width / 2)) {
            // left side
            ballx = paddleWidth + ballradius
        } else {
            ballx = canvas.width - paddleWidth - ballradius
        }
        xspeed *= -1.1
    } else if (((ballx-ballradius) <= 0) || ((ballx+ballradius) >= canvas.width)) {
        if (ballx < canvas.width / 2) {
            playertwoscore += 1
        } else {
            playeronescore += 1
        }
        // Reset
        ballx = canvas.width / 2
        bally = canvas.height / 2
        xspeed = 0
        yspeed = 0
    }
    
    requestAnimationFrame(dvdplayer)
}

started = false

document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented) return;

    e.preventDefault()

    if (e.key == ' ') {
        if (!started) {
            started = true
            dvdplayer()
        } else if ((xspeed == 0) && (yspeed == 0)) {
            xspeed = ((Math.random()*5)+1.5) * (Math.random() < 0.5 ? -1 : 1)
            yspeed = ((Math.random()*5)+1.5) * (Math.random() < 0.5 ? -1 : 1)
        }
    } else {
        keysPressed[e.code] = true
    }
})

document.addEventListener('keyup', (e) => {
    delete keysPressed[e.code]
})
