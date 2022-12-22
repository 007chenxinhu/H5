<template>
  <div id="app">
    <div id="score" @click="appscore()">{{ scoreNumber }}</div>
    <svg id="svg" v-if="isDots" @click="changeSvg()" @mousemove="mousemove">
      <!-- <template v-if="isLines">
        <line x1="655" y1="1231" x2="235" y2="1417" class="line"></line>
      </template> -->
      <circle
        v-for="(item, index) in dots.list"
        :key="index"
        style="animation-delay: 0s; transform-origin: 354px 648px"
        :data-visited="dataVisited"
        :r="item.r"
        :cx="item.cx"
        :cy="item.cy"
        :class="index === 0 ? `${dotFirst}` : 'dot'"
        :data-selected="item.dataSelected"
        @click="onClick()"
      ></circle>
      <!-- <line
        id="preline"
        x1="655"
        y1="1231"
        x2="237"
        y2="1422"
        class="line"
      ></line>
      <circle
        data-id="id-0"
        style="animation-delay: 0s; transform-origin: 354px 648px"
        r="8"
        cx="354"
        cy="648"
        class="dot dot--starting"
        data-selected="true"
      ></circle>
      <circle
        data-id="id-1"
        style="animation-delay: 0.1s; transform-origin: 351px 1191px"
        r="8"
        cx="351"
        cy="1191"
        class="dot"
      ></circle> -->
    </svg>
    <div
      id="launch-screen"
      @click="launchScreen()"
      :class="isVisible ? 'is-visible' : ''"
    >
      <div id="launch-screen-content">
        <h1 id="launch-screen__title" @click="launchScreenTitle()">
          {{ title }}
        </h1>
        <p id="launch-screen__description">{{ description }}</p>
        <button class="btn" id="start-btn" @click="playBtn">
          {{ btnText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StortestPath',
  data() {
    return {
      scoreNumber: 0,
      isVisible: false,
      isDots: false,
      isLines: false,
      title: '',
      description: '',
      dotFirst: 'dot dot--starting',
      btnText: 'PLAY',
      // global vars 全局变量
      svg: document.getElementById('svg'),
      // dotMatrix: document.createElementNS(
      //   'http://www.w3.org/2000/svg',
      //   'circle',
      // ),
      // lineMatrix: document.createElementNS(
      //   'http://www.w3.org/2000/svg',
      //   'line',
      // ),
      screenW: '',
      screenH: '',
      totalDist: document.getElementById('distance'),
      lines: {
        online: [
          {
            x1: null,
            y1: null,
            x2: null,
            y2: null,
          },
        ],
      },
      // line constructor线路构造器
      x1: null,
      y1: null,
      x2: null,
      y2: null,
      r: 8,
      cx: null,
      cy: null,
      class: '',
      el: null,
      // setAttr: null,
      // update: null,
      // append: null,
      // dataSelected: false,
      dots: {
        left: [],
        start: 0,
        num: 20,
        list: [
          {
            dotX: [],
            dotY: [],
            dotStyle: [],
            dotId: [],
            dataSelected: [],
            selected: {
              // id: this.dots.start,
              cx: null,
              cy: null,
              id: null,
            },
          },
        ],
      },

      // dots: {
      //   // dot constructor点构造函数
      //   num: null,
      //   list: [[]],
      //   start: 0,
      //   selected: {
      //     // id: this.dots.start,
      //     id: null,
      //   },
      //   left: [],
      //   preline: null,
      // },
      app: {
        level: 4,
        score: {
          number: 0,
          el: null,
        },
      },
    }
  },
  mounted() {
    this.screenW = window.innerHeight
    this.screenH = window.innerWidth
    // this.app.preline = new Line(0, 0, 200, 200)
    // this.app.preline.setAttr('id', 'preline')
    // this.start(dotsNum)
    this.launchScreen(0, 'Path finder', 'Find the nearest yellow dot.', 'PLAY')
  },
  methods: {
    initDot() {
      this.el.setAttribute('r', this.r)
      this.el.setAttribute('cx', this.cx)
      this.el.setAttribute('cy', this.cy)
      this.setAttr('class', this.class)
    },
    playBtn() {
      this.isVisible = true
      this.start(this.app.level)
    },
    //创造点
    Dot() {
      for (let i = 0; i < this.dots.num; i++) {
        this.dots.list[i].dataSelected.push(false)
      }
      this.dataVisited = true

      // this.r = r
      // this.cx = cx
      // this.cy = cy
      // this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      // this.class = 'dot'
      // this.initDot()
      // this.update = function () {
      //   this.el.setAttribute('r', this.r)
      //   this.el.setAttribute('cx', this.cx)
      //   this.el.setAttribute('cy', this.cy)
      //   this.setAttr('class', this.class)
      // }
      // activates a dot
      // this.activate()
      // this.visited()
      // this.setAttr(attr, value)
      // this.getAttr(attr)
      // this.append()
      // this.onClick(event)
    },
    // activate() {
    // console.log(this.list)
    // for (let i = 0; i < this.dots.num; i++) {
    //   this.dots.list[i].dataSelected.push(false)
    //   // this.dots.list[i].setAttr('data-selected', 'false')
    // }
    // this.list.dataSelected[0] = true
    // this.setAttr('data-selected', 'true')
    // },
    // visited() {
    //   this.dataVisited = true
    //   // this.setAttr('data-visited', 'true')
    // },
    update(score) {
      this.scoreNumber += score
      this.scoreNumber = this.app.score.number
    },
    reset() {
      this.app.score.number = 0
      this.update(0)
    },
    getDistance(obj1, obj2) {
      return Math.floor(
        Math.sqrt(
          Math.pow(obj1.cx - obj2.cx, 2) + Math.pow(obj1.cy - obj2.cy, 2),
        ),
      )
    },
    getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    comparator(a, b) {
      if (a[1] < b[1]) return -1
      if (a[1] > b[1]) return 1
      return 0
    },
    difference(source, toRemove) {
      return source.filter(function (value) {
        return toRemove.indexOf(value) == -1
      })
    },
    setAttr(attr, value) {
      console.log(this.el, 'el')
      this.el.setAttribute(attr, value)
    },
    getAttr(attr) {
      return this.el.getAttribute(attr)
    },

    // append() {
    //   this.svg.appendChild(this.el)
    //   this.el.addEventListener('click', this.onClick)
    // },
    //创造线
    Line(x1, y1, x2, y2) {
      this.x1 = x1
      this.y1 = y1
      this.x2 = x2
      this.y2 = y2
      this.el = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      this.class = 'line'
      this.update = function (x1, y1, x2, y2) {
        this.el.setAttribute('x1', x1 || this.x1)
        this.el.setAttribute('y1', y1 || this.y1)
        this.el.setAttribute('x2', x2 || this.x2)
        this.el.setAttribute('y2', y2 || this.y2)
        this.setAttr('class', this.class)
      }
      this.setAttr(attr, value)
      this.append = function () {
        this.svg.insertBefore(this.el, svg.firstChild)
      }
    },
    onClick(event) {
      //gets the id and the coords of the dot
      var thisId = Number(event.target.getAttribute('data-id').substr(3, 2))
      var thisCx = this.dots.list[thisId].cx
      var thisCy = this.dots.list[thisId].cy
      // calculates the distance between dots
      var distances = []
      for (let i = 0; i < this.dots.num; i++) {
        distances[i] = [i, this.getDistance(dots.selected, dots.list[i])]
      }
      distances.sort(comparator)
      distances.splice(0, 1)
      var distancesLeft = []
      for (i = 0; i < distances.length; i++) {
        if (dots.left.includes(distances[i][0])) {
          distancesLeft.push(distances[i][0])
        }
      }
      //if the element is the nearest
      if (thisId == distancesLeft[0] && this.dots.left.includes(thisId)) {
        // calculates distances
        var newDistance = this.getDistance(
          this.dots.list[thisId],
          this.dots.selected,
        )
        app.score.update(1) // punteggio x numero di poi
        // app.score.update(newDistance); punteggio x distanza
        //sets the active class to the selected dot
        dots.list[thisId].activate()
        dots.list[thisId].visited()
        // creates the line
        lines.list.push(
          new Line(
            dots.selected.cx,
            dots.selected.cy,
            dots.list[thisId].cx,
            dots.list[thisId].cy,
          ),
        )
        lines.list[lines.list.length - 1].update()
        lines.list[lines.list.length - 1].append()
        // creates the preview line
        //TODO: eliminare le vecchie preline che rimangono vive
        svg.addEventListener('mousemove', function prelineMove(e) {
          mouseX = e.pageX
          mouseY = e.pageY
          app.preline.update(thisCx, thisCy, mouseX, mouseY)
        })
        //saves the selected dots coordinates
        this.dots.selected.id = thisId
        this.dots.selected.cx = thisCx
        this.dots.selected.cy = thisCy
        //removes the dot from the list of remaining dots
        for (i = 0; i < dots.left.length; i++) {
          if (this.dots.left[i] === thisId) {
            dots.left.splice(i, 1)
          }
        }
        if (dots.left.length == 0) {
          app.end(true)
        }
      } else {
        app.end(false)
      }
    },
    mousemove(e) {
      let mouseX = e.pageX
      let mouseY = e.pageY
      this.prelineUpdate(thisCx, thisCy, mouseX, mouseY)
      // this.update = function (x1, y1, x2, y2) {
      //   this.el.setAttribute('x1', x1 || this.x1)
      //   this.el.setAttribute('y1', y1 || this.y1)
      //   this.el.setAttribute('x2', x2 || this.x2)
      //   this.el.setAttribute('y2', y2 || this.y2)
      //   this.setAttr('class', this.class)
      // }
    },
    prelineUpdate(x1, y1, x2, y2) {
      this.el.setAttribute('x1', x1 || this.x1)
      this.el.setAttribute('y1', y1 || this.y1)
      this.el.setAttribute('x2', x2 || this.x2)
      this.el.setAttribute('y2', y2 || this.y2)
      this.setAttr('class', this.class)
    },
    appscore() {
      this.update(this.app)
      this.reset()
      this.results(this.points)
      this.launchScreen(lastScore, title, description, btnText)
    },

    results(points) {
      if (points == 'reset') {
        sessionStorage.setItem('results', 0)
      } else {
        if (!sessionStorage.getItem('results')) {
          sessionStorage.setItem('results', points)
        } else {
          var newscore = parseInt(sessionStorage.getItem('results')) + points
          sessionStorage.setItem('results', newscore)
        }
      }
    },
    launchScreen(lastScore, title, description, btnText) {
      this.title = title
      this.description = description
      this.btnText = btnText
      this.isDots = true
      this.playBtn()
      // app.launchScreen.btn.addEventListener('click', function lauch() {
      //   app.launchScreen.el.setAttribute('class', '')
      //   this.start(this.app.level)
      //   app.launchScreen.btn.removeEventListener('click', lauch)
      // })
    },
    start(dotsNum) {
      this.dots.num = dotsNum
      for (let i = 0; i < this.dots.num; i++) {
        var cx = this.getRandomArbitrary(10, this.screenW - 10)
        var cy = this.getRandomArbitrary(10, this.screenH - 10)
        this.dots.list[i].dotX.push(cx)
        this.dots.list[i].dotY.push(cy)
        console.log(
          this.dots.list[i].dotX,
          this.dots.list[i].dotY,
          'this.dots.list',
        )
        // this.dots.list[i] = new Dot(8, cx, cy)
        this.Dot()
        this.dots.list[i].dotId = `id-${i}`
        // this.dots.list[i].setAttr('data-id', 'id-' + i)
        this.dots.list[i].dotStyle.push(
          'animation-delay:' +
            i / 10 +
            's; transform-origin: ' +
            cx +
            'px ' +
            cy +
            'px;',
        )
        // this.dots.list[i].setAttr(
        //   'style',
        //   'animation-delay:' +
        //     i / 10 +
        //     's; transform-origin: ' +
        //     this.cx +
        //     'px ' +
        //     this.cy +
        //     'px;',
        // )
        this.update(i)
        // this.append(i)
        this.dots.left.push(i)
        if (i == this.dots.start) {
          this.dots.list[i].selected.cx = this.dots.list[this.dots.start].cx
          this.dots.list[i].selected.cy = this.dots.list[this.dots.start].cy
          this.dots.left.splice(i, 1)
        }
        // adds the preline
        this.line(
          this.dots.list[i].selected.cx,
          this.dots.list[i].selected.cy,
          this.dots.list[i].selected.cx,
          this.dots.list[i].selected.cy,
        )
        // app.preline.append()
        svg.addEventListener('mousemove', function prelineMove(e) {
          mouseX = e.pageX
          mouseY = e.pageY
          app.preline.update(dots.selected.cx, dots.selected.cy, mouseX, mouseY)
        })
      }
      // sets starting point
      this.dots.list[dots.start].setAttr('data-selected', 'true')
    },
    end(win) {
      if (win) {
        this.app.level += 4
        this.results(this.app.score.number)
      } else {
        this.app.level = 4
      }
      this.dots.list = []
      this.dots.selected = {}
      this.dots.left.length = 0
      this.svg.innerHTML = ''
      if (win) {
        this.launchScreen(
          this.app.score.number,
          'Well done!',
          'Your score is: ' +
            sessionStorage.getItem('results') +
            ' The next level will be harder.',
          'PLAY NEXT LEVEL',
        )
      } else {
        this.launchScreen(
          0,
          'Game over!',
          'Your final score is: ' + sessionStorage.getItem('results'),
          'PLAY AGAIN',
        )
        this.results('reset')
        this.reset()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@keyframes jumping {
  0% {
    transform: scale(2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes dotReveal {
  to {
    opacity: 1;
  }
}

@keyframes line {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: 100%;
  }
}

body {
  cursor: crosshair;
  background-color: black;
  background-image: linear-gradient(
      to top,
      rgba(46, 204, 113, 0.2) 1%,
      rgba(255, 255, 255, 0) 0
    ),
    linear-gradient(
      to right,
      rgba(46, 204, 113, 0.2) 1%,
      rgba(255, 255, 255, 0) 0
    );
  background-size: 50px 50px;
}

svg,
html,
body,
#app {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

svg {
  position: relative;
  z-index: 1;
}

.dot {
  z-index: 10;
  stroke-width: 4;
  stroke: black;
  width: 10px;
  height: 10px;
  fill: rgba(241, 196, 15, 1);
  -moz-transform-origin: center;
  -webkit-transform-origin: center;
  transform-origin: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dot--starting.dot--starting {
  fill: black;
  stroke: rgba(46, 204, 113, 1);
  stroke-width: 3;
  stroke-miterlimit: outside;
}

.dot:not(.dot--starting) {
  opacity: 0;
  animation: dotReveal 1s linear;
  animation-fill-mode: forwards;
}

#svg .dot:hover {
  transform: scale(2);
}

#svg .dot[data-selected='true'] {
  opacity: 1;
  fill: rgba(46, 204, 113, 1);
  animation: jumping 0.5s ease-in-out alternate infinite;
  animation-delay: 0;
}

#svg .dot[data-visited='true'] {
  fill: rgba(46, 204, 113, 1);
  animation: jumping 0.5s ease-in-out alternate infinite;
  animation-delay: 0;
  opacity: 1;
}

.line {
  z-index: 10;
  stroke: rgba(46, 204, 113, 1);
  stroke-width: 2;
  stroke-dasharray: 2 16;
  animation: line 10s linear infinite;
}

@media (max-width: 480px) {
  #preline {
    display: none;
  }
}

#score {
  position: fixed;
  z-index: 0;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 20em;
  color: rgba(46, 204, 113, 0.2);
  font-family: 'Bungee Outline', cursive;
}

.btn {
  background: transparent;
  cursor: pointer;
  color: rgba(241, 196, 15, 1);
  font-weight: bold;
  padding: 15px 60px;
  border-radius: 6px;
  border: 3px solid rgba(241, 196, 15, 1);
  transition: all 0.3s ease-out;
}

.btn:hover {
  background: rgba(241, 196, 15, 1);
  color: black;
}

#btn-start {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#launch-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  visibility: hidden;
  position: absolute;
  z-index: 10;
  background-image: linear-gradient(45deg, black, rgba(46, 204, 113, 0.2));
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

#launch-screen.is-visible {
  opacity: 1;
  visibility: visible;
}

#launch-screen-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 50px;
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

#launch-screen.is-visible #launch-screen-content {
  transform: scale(1);
}

#launch-screen-content h1 {
  position: relative;
  font-family: 'Bungee Outline', cursive;
  color: rgba(46, 204, 113, 1);
  font-size: 4em;
  margin: 0 0 0.4em 0;
}

#launch-screen-content p {
  font-family: 'Space Mono', monospace;
  color: #ccc;
  font-size: 1em;
  margin: 0 0 3em 0;
}

#lastScore {
  display: none;
}

#lastScore.is-visible {
  display: block;
}

#lastScore__number {
  color: rgba(231, 76, 60, 1);
}
</style>
