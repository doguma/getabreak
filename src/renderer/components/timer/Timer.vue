<template>
  <div class="Timer-wrapper">
    <app-audio/>
    <app-timer-dial :minutes="minutes">
      <p class="Dial-time" v-if="!timerStarted">{{ prettyMinutes }}</p>
      <p class="Dial-time" v-else>{{ prettyTime }}</p>
    </app-timer-dial>

    <section class="Container Button-wrapper">
      <transition name="fade" mode="out-in">
        <div class="Button" v-if="!timerStarted" @click="startTimer" :key="'start'">
          <div class="Button-icon-wrapper">
            <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px" y="0px" viewBox="0 0 7.6 15" xml:space="preserve" height="15px" class="Icon--start">
              <polygon fill="#F6F2EB" points="0,0 0,15 7.6,7.4 "/>
            </svg>
          </div>
        </div>
        <div class="Button" v-if="timerStarted && !timerActive" @click="resumeTimer" :key="'resume'">
          <div class="Button-icon-wrapper">
            <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px" y="0px" viewBox="0 0 7.6 15" xml:space="preserve" height="15px">
              <polygon fill="#F6F2EB" points="0,0 0,15 7.6,7.4 "/>
            </svg>
          </div>
        </div>
        <div class="Button" v-else-if="timerStarted && timerActive" @click="pauseTimer" :key="'pause'">
          <div class="Button-icon-wrapper">
            <svg version="1.2" baseProfile="tiny" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"   x="0px" y="0px" viewBox="0 0 10.9 18" xml:space="preserve" height="15px" class="Icon--pause">
                <line fill="none" stroke="#F6F2EB" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="1.5" y1="1.5" x2="1.5" y2="16.5"/>
                <line fill="none" stroke="#F6F2EB" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="9.4" y1="1.5" x2="9.4" y2="16.5"/>
            </svg>
          </div>

        </div>
      </transition>
        <p class="Button-icon-wrapper TextButton2" @click="callForReset">Reset</p>

    </section>

    <app-timer-controller/>
  </div>
</template>

<script>
import Timer from '@/utils/timer'
import appAudio from '@/components/Audio'
import appTimerController from '@/components/timer/Timer-controller'
import appTimerDial from '@/components/timer/Timer-dial'
import { EventBus } from '@/utils/event-bus'
import axios from 'axios'

export default {
  components: {
    appAudio,
    appTimerController,
    appTimerDial
  },

  data () {
    return {
      minutes: 1,
      timer: null,
      timerActive: false,
      timerStarted: false
    }
  },

  computed: {
    currentRound () {
      return this.$store.getters.currentRound
    },

    round () {
      return this.$store.getters.round
    },

    timeWork () {
      return this.$store.getters.timeWork
    },

    workRound () {
      return this.$store.getters.workRounds
    },

    // local
    prettyMinutes () {
      return this.minutes + ':00'
    },

    prettyTime () {
      return `${this.timeRemaining.remainingMinutes}:${this.timeRemaining.remainingSeconds}`
    },

    timeElapsed () {
      if (this.timer.time !== null) {
        const time = this.timer.time
        const minutes = Math.floor(time / 60)
        const seconds = time - (minutes * 60)
        return {
          minutes,
          seconds
        }
      }
    },

    timeRemaining () {
      if (this.timer.time !== null) {
        const minutes = this.minutes
        const time = this.timer.time
        const elapsedMinutes = Math.floor(time / 60)
        const elapsedSeconds = time - (elapsedMinutes * 60)
        const remainingSeconds = this.formatTimeDouble(60 - elapsedSeconds)
        let remainingMinutes = minutes - elapsedMinutes

        if (elapsedSeconds > 0) {
          remainingMinutes -= 1
        }

        return {
          remainingMinutes,
          remainingSeconds
        }
      }
    }
  },

  methods: {
    callForReset () {
      EventBus.$emit('call-timer-reset')
    },
    formatTimeDouble (time) {
      if (time === 60) {
        return '00'
      } else if (time < 10) {
        return `0${time}`
      } else {
        return time
      }
    },

    createTimer (min) {
      this.timer = new Timer(min)
    },

    initTimer () {
      this.minutes = this.timeWork
      this.createTimer(this.timeWork)
    },

    pauseTimer () {
      this.timer.pause()
      this.timerActive = !this.timerActive
      axios.get("https://api.telegram.org/bot607705815:AAFccf8ImMduAmTMpYA8zRFHcbvwLBB3haY/sendmessage?chat_id=561683539&text='timer paused'")
    },

    resetTimer () {
      this.timer.reset()
      this.timerActive = !this.timerActive
      this.timerStarted = false
    },

    resumeTimer () {
      this.timer.resume()
      this.timerActive = true
      axios.get("https://api.telegram.org/bot607705815:AAFccf8ImMduAmTMpYA8zRFHcbvwLBB3haY/sendmessage?chat_id=561683539&text='timer resumes :>'")
    },

    startTimer () {
      this.timer.start()
      this.timerActive = true
      this.timerStarted = true
      axios.get("https://api.telegram.org/bot607705815:AAFccf8ImMduAmTMpYA8zRFHcbvwLBB3haY/sendmessage?chat_id=561683539&text='timer startsss, concentrate on your work!'")
    }
  },

  mounted () {
    this.initTimer()

    EventBus.$on('timer-init', opts => {
      // clear previous timers
      this.timer.reset()
      this.initTimer()
      this.timerActive = false
    })

    EventBus.$on('call-timer-reset', () => {
      this.resetTimer()
    })
  }
}
</script>

<style lang="scss" scoped>
.Button {
  border: 2px solid $colorBlueGrey;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  transition: $transitionDefault;
  width: 50px;
  height: 50px;
  -webkit-app-region: no-drag;
  &:hover {
    background-color: $colorLightNavy;
    & .Icon--pause line {
      stroke: $colorRed;
    }
    & .Icon--start polygon {
      fill: $colorRed;
    }
  }
}

.Button-wrapper {
  display: flex;
  margin: 0 0 0 180px;
}

.Button-icon-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
}

.Dial-time {
  font-family: 'Pacifico', sans-serif;
  font-size: 60px;
  margin: 0;
  position: absolute;
  color: #00BFFF;
}

.Timer-wrapper {
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
}
.TextButton2{
  margin: 20px
}
.TextButton2:hover {
    background-color: $colorLightNavy;
    & .Icon--pause line {
      stroke: $colorRed;
    }
    & .Icon--start polygon {
      fill: $colorRed;
    }
}
</style>
