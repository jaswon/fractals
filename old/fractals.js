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
