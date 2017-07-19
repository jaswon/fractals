// recursive generator
function* l(instruction, rules, iterations) {
  for (let char of instruction) {
    if (char in rules && iterations) yield* l(rules[char], rules, iterations-1)
    else yield char
  }
}

const cvs = document.querySelector("canvas#main")
const ctx = cvs.getContext("2d")
ctx.imageSmoothingEnabled = false;

class Turtle {
  constructor (ctx,origin,s, totseg) {
    this.curseg = 0
    this.totseg = totseg
    this.s = ctx.canvas.width/s
    this.ctx = ctx
    this.velt = 0
    this.posx = origin[0]*this.s
    this.posy = origin[1]*this.s
  }

  step () {
    var frac = this.curseg / this.totseg
    this.ctx.strokeStyle = "rgb(" + Math.floor(Math.cos(frac*2*Math.PI)*127+128) +
                           "," + Math.floor(Math.cos(frac*2*Math.PI+Math.PI*2/3)*127+128) +
                           "," + Math.floor(Math.cos(frac*2*Math.PI+Math.PI*4/3)*127+128) + ')'
    this.curseg += 1
    this.ctx.beginPath()
    this.ctx.moveTo(this.posx,this.posy)
    this.posx += Math.cos(this.velt)*this.s
    this.posy += Math.sin(this.velt)*this.s
    this.ctx.lineTo(this.posx,this.posy)
    this.ctx.stroke()
  }

  turn (angle) { this.velt -= angle }
}

function calcDim (matarr, fintransform, it) {
  const k = 1.5
  var mat = math.matrix(matarr)
  var radius = math.chain(matarr)
                   .pow(it)
                   .multiply([1,0])
                   .done()
  var side = math.norm(radius)*k
  radius = math.multiply(fintransform,radius)
  return [side,[side/2-radius[0],side/2-radius[1]]]
}

var curdraw = null;

function drawFractal (fractal, it, showRadius = false, speed = 3000) {
  if (fractal in fractals) var fractal = fractals[fractal]
  else return
  if (curdraw) cancelAnimationFrame(curdraw)
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
  var dims = calcDim(fractal[3],fractal[4],it)
  var side = dims[0]
  var origin = dims[1]
  const f = l(fractal[0],fractal[1], it)
  const t = new Turtle(ctx,origin,side,fractal[5](it))
  if (showRadius) {
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(cvs.width/2,cvs.height/2)
    ctx.lineTo(origin[0]/side*cvs.width,origin[1]/side*cvs.height)
    ctx.stroke()
  }
  function draw() {
    for (var i = 0 ; i < speed ; ++i) {
      var action = f.next()
      if (action.done) return
      else action = action.value
      if (action in fractal[2]) fractal[2][action](t)
    }
    curdraw = requestAnimationFrame(draw)
  }
  draw()
}

function setCanvasSize (s) {
  cvs.width = s
  cvs.height = s
}
