function Turtle (ctx, sim) {
    this.ctx = ctx
    this.pos = [0,0]
    this.dir = 0
    this.stride = 10
    this.sim = !sim | false
}

Turtle.prototype.turn = function (rad) {
    this.dir += rad
};

Turtle.prototype.step = function () {
    if (this.sim) {
        this.ctx.beginPath()
        this.ctx.moveTo(this.pos[0],this.pos[1])
    }
    this.pos = [this.pos[0]+this.stride*Math.cos(this.dir),this.pos[1]+this.stride*Math.sin(this.dir)]
    if (this.sim) {
        this.ctx.lineTo(this.pos[0],this.pos[1])
        this.ctx.stroke()
    }
};

function* lsys (axiom, prod, rules, iter) {
    var inst = axiom.split("")
    for ( var i = 0 ; i < iter ; i++ ) {
        for (var j = 0 ; j < inst.length ; j++) {
            if ((char = inst[j]) in prod) {
                inst.splice.apply(inst,[j,1].concat(prod[char].split("")))
                j += prod[char].length-1
            }
        }
    }
    var dimTurtle = new Turtle(document.createElement("canvas").getContext("2d"),true)
    var minx=0,miny=0,maxx=0,maxy=0,steps=0
    for (var i = 0 ; i < inst.length ; i++) {
        if ((n = inst[i]) in rules) {
            rules[n](dimTurtle)
            steps++
            if (dimTurtle.pos[0] < minx) minx = dimTurtle.pos[0]
            if (dimTurtle.pos[0] > maxx) maxx = dimTurtle.pos[0]
            if (dimTurtle.pos[1] < miny) miny = dimTurtle.pos[1]
            if (dimTurtle.pos[1] > maxy) maxy = dimTurtle.pos[1]
        }
    }
    var turtle = yield [inst.join(""),minx,maxx,miny,maxy]
    yield "ready"
    var step = 0
    for (var i = 0 ; i < inst.length ; i++) {
        if ((n = inst[i]) in rules) {
            step++
            turtle.ctx.strokeStyle = "rgb(" + Math.floor(Math.cos(step/steps*2*Math.PI)*127+128) +
                                        "," + Math.floor(Math.cos(step/steps*2*Math.PI+Math.PI*2/3)*127+128) +
                                        "," + Math.floor(Math.cos(step/steps*2*Math.PI+Math.PI*4/3)*127+128) + ")"
            yield rules[n](turtle)
        }
    }
}

var fractals = {
    hilbert: ["A",{
        "A":"-BF+AFA+FB-",
        "B":"+AF-BFB-FA+"
    },{
        "F": function(t) {
            t.step()
        },
        "+": function(t) {
            t.turn(Math.PI/2)
        },
        "-": function(t) {
            t.turn(-Math.PI/2)
        }
    },8],
    peano: ["F",{
        "F": "F+F-F-F-F+F+F+F-F"
    },{
        "F": function(t) {
            t.step()
        },
        "+": function(t) {
            t.turn(Math.PI/2)
        },
        "-": function(t) {
            t.turn(-Math.PI/2)
        }
    },5],
    arrowhead: ["A",{
        "A":"+B-A-B+",
        "B":"-A+B+A-"
    },{
        "A": function(t) {
            t.step()
        },
        "B": function(t) {
            t.step()
        },
        "+": function(t) {
            t.turn(-Math.PI/3)
        },
        "-": function(t) {
            t.turn(Math.PI/3)
        }
    },9],
    dragon: ["FX",{
        "X":"X+YF+",
        "Y":"-FX-Y"
    },{
        "F": function(t) {
            t.step()
        },
        "-": function(t) {
            t.turn(-Math.PI/2)
        },
        "+": function(t) {
            t.turn(Math.PI/2)
        }
    },15],
    twindragon: ["FX+FX+",{
        "X":"X+YF",
        "Y":"FX-Y"
    },{
        "F": function(t) {
            t.step()
        },
        "-": function(t) {
            t.turn(-Math.PI/2)
        },
        "+": function(t) {
            t.turn(Math.PI/2)
        }
    },15],
    terdragon: ["F",{
        "F":"F+F-F"
    },{
        "F": function(t) {
            t.step()
        },
        "-": function(t) {
            t.turn(-Math.PI*2/3)
        },
        "+": function(t) {
            t.turn(Math.PI*2/3)
        }
    },10],
    koch: ["F++F++F",{
        "F":"F-F++F-F"
    },{
        "F": function(t) {
            t.step()
        },
        "-": function(t) {
            t.turn(-Math.PI/3)
        },
        "+": function(t) {
            t.turn(Math.PI/3)
        }
    },5],
    gosper: ["FX",{
        "X":"X+YF++YF-FX--FXFX-YF+",
        "Y":"-FX+YFYF++YF+FX--FX-Y"
    },{
        "F": function(t) {
            t.step()
        },
        "+": function(t) {
            t.turn(Math.PI/3)
        },
        "-": function(t) {
            t.turn(-Math.PI/3)
        }
    },6],
    sierpinski: ["X",{
        "X":"--FXF++FXF++FXF--",
        "F":"FF"
    },{
        "F": function(t) {
            t.step()
        },
        "+": function(t) {
            t.turn(Math.PI/3)
        },
        "-": function(t) {
            t.turn(-Math.PI/3)
        }
    },7]
}

function* update (l,s,c,it) {

    var f = fractals[l]

    var iters = f[3]
    if (it) iters = it

    updateIters(l, iters)

    // init canvas
    var cvs = document.querySelector("#main")
    cvs.width = document.body.clientHeight;
    cvs.height = document.body.clientHeight;
    var ctx = cvs.getContext("2d")
    ctx.imageSmoothingEnabled = false;
    ctx.lineWidth=(c?1.6:1);


    // constants
    var sside = 0.9*cvs.height
    var dside = 0.9

    // draw canvas

    ctx.translate(cvs.height/2-sside/2,cvs.height/2-sside/2)
    // ctx.strokeRect(0,0,sside,sside)

    // assign l-system

    var gen = lsys(f[0],f[1],f[2], iters)

    // draw l-system
    var data = gen.next().value

    var turtle = new Turtle(ctx)
    ctx.translate(sside*(1-dside)/2,sside*(1-dside)/2)
    if (data[4]-data[3] > data[2]-data[1]) { // taller
        turtle.stride = turtle.stride/(data[4]-data[3])*dside*sside
        ctx.translate(dside*sside/2*(1-(data[2]-data[1])/(data[4]-data[3])),0)
        ctx.translate(dside*sside*-data[1]/(data[4]-data[3]),dside*sside*-data[3]/(data[4]-data[3]))
    } else { // longer
        turtle.stride = turtle.stride/(data[2]-data[1])*dside*sside
        ctx.translate(0,dside*sside/2*(1-(data[4]-data[3])/(data[2]-data[1])))
        ctx.translate(dside*sside*-data[1]/(data[2]-data[1]),dside*sside*-data[3]/(data[2]-data[1]))
    }
    gen.next(turtle)

    // var speed = data[0].length/1500

    // speed = 10

    while (true) {
        for (var i = 0 ; i < s ; i++) {
            gen.next()
        }
        yield
    }
}

var loop = update("hilbert",100,true)

function changeFractal(f,s,c,i) {
    loop = update(f,parseInt(s),c,i)
}

function updateIters(fname, iters) {

    if (iters == undefined) iters = fractals[fname][3]

    // update iteration options
    var iterDropdown = document.getElementById("iterations")
    for(var i=iterDropdown.options.length-1;i>=0;i--)
    {
        iterDropdown.remove(i);
    }
    for (var i = 1 ; i < fractals[fname][3]+1 ; i++) {
        var option = document.createElement("option")
        option.innerHTML = i
        option.value = i
        if (i == iters) option.selected = true
        iterDropdown.appendChild(option)
    }
}

window.onload = function() {
    var dropdown = document.querySelector("#fractalselect")
    for (key in fractals) {
        var option = document.createElement("option")
        option.innerHTML = key
        option.value = key
        dropdown.appendChild(option)
    }
    function t() {
        window.requestAnimationFrame(t)
        loop.next()
    }
    t()
}
