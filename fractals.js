const sqrt3 = Math.sqrt(3)

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
    },[
      [2,0],
      [0,2]
    ], [
      [.5,0],
      [.5,-.5]
    ], i => Math.pow(4,i)],
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
    },[
      [3,0],
      [0,3]
    ],[
      [.5,0],
      [0,.5]
    ], i => Math.pow(9,i)],
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
            t.turn(Math.PI/3)
        },
        "-": function(t) {
            t.turn(-Math.PI/3)
        }
    },[
      [2,0],
      [0,2]
    ],[
      [.5,sqrt3/4],
      [-sqrt3/4,.5]
    ], i => Math.pow(3,i)],
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
    },[
      [1.015625,1.015625],
      [-1.015625,1.015625]
    ],[
      [.3,-.1],
      [0,.3]
    ], i=>Math.pow(2,i)],
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
    },[
      [1.03125,1.03125],
      [-1.03125,1.03125]
    ],[
      [.3,0],
      [0,.3]
    ], i => Math.pow(2,i)],
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
    },[
      [1.5,sqrt3/2],
      [-sqrt3/2,1.5]
    ],[
      [.5,0],
      [0,.5]
    ], i => Math.pow(3,i) ],
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
    },[
      [3, 0],
      [0, 3]
    ],[
      [1/2, 1/4],
      [-1/4, 1/2]
    ], i => Math.pow(4,i)*3 ],
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
    },[
      [2.5,1.5/sqrt3],
      [-1.5/sqrt3,2.5]
    ],[
      [.5,.29],
      [-.29,.5]
    ], i => Math.pow(7,i)],
    sierpinski: ["X",{
        "X":"--FXF++FXF++FXF--",
        "F":"FF"
    },{
        "F": function(t) {
            t.step()
        },
        "+": function(t) {
            t.turn(-Math.PI/3)
        },
        "-": function(t) {
            t.turn(Math.PI/3)
        }
    },[
      [2.25,0],
      [0,2.25]
    ],[
      [0, 0],
      [-sqrt3/4, 0]
    ], i => 6*(Math.pow(3,i)-Math.pow(2,i))]
}
