<template>
  <div class="Container">
    <p class="Drawer-heading">Timer</p>
    <div class="Setting-wrapper">
      <p class="Setting-title">Work</p>
      <p class="Setting-value">{{ localTimeWork + ':00' }}</p>
      <div class="Slider-wrapper">
        <input 
          type="range" 
          min="1" 
          :max="maxTime" 
          step="1" 
          class="Slider Slider--red" 
          v-model.number="localTimeWork" 
          @change="setTimeWork($event, 'work')"
        >
        <div 
          class="Slider-bar Slider-bar--red" 
          :style="{ width: calcPercentage(localTimeWork, maxTime) + '%' }">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { EventBus } from '@/utils/event-bus'

export default {
  name: 'Drawer-timer',

  data () {
    return {
      localTimeLongBreak: 0,
      localTimeShortBreak: 0,
      localTimeWork: 0,
      localWorkRounds: 0,
      maxTime: 120,
      maxRounds: 12
    }
  },

  computed: {
    // store getters
    currentRound () {
      return this.$store.getters.currentRound
    },

    timeWork () {
      return this.$store.getters.timeWork
    },

    workRounds () {
      return this.$store.getters.workRounds
    }
  },

  methods: {
    calcPercentage (val, max) {
      return val / max * 100
    },

    // complex conditional to correctly position slider-bar for round slider
    calcRoundPercentage (val, max) {
      const percentage = val / max * 100
      if (percentage > 25 && percentage < 34) {
        return percentage - 6
      } else if (percentage > 33 && percentage < 66) {
        return percentage - 5.5
      } else if (percentage > 50) {
        return percentage - 4
      } else {
        return percentage - 7
      }
    },

    checkToResetTimer (setting) {
      if (this.currentRound === setting) {
        EventBus.$emit('timer-init', {
          auto: false
        })
        EventBus.$emit('call-timer-reset')
      }
    },

    initTimes () {
      this.localTimeLongBreak = this.timeLongBreak
      this.localTimeShortBreak = this.timeShortBreak
      this.localTimeWork = this.timeWork
      this.localWorkRounds = this.workRounds
    },

    resetDefaults () {
      this.$store.dispatch('resetDefaults')
      this.initTimes()
      EventBus.$emit('timer-init', {
        auto: false
      })
      EventBus.$emit('call-timer-reset')
    },

    setTimeWork (e, setting) {
      this.$store.dispatch('setTimeWork', e.target.value)
      this.checkToResetTimer(setting)
    }
  },

  mounted () {
    this.initTimes()
  }
}
</script>

<style lang="scss" scoped>
.Setting-wrapper {
  margin: 10px 0;
  text-align: center;
}

.Setting-title {
  color: $colorBlueGrey;
  font-size: 14px;
  letter-spacing: .05em;
  margin-bottom: 8px;
}

.Setting-value {
  background-color: $colorNavy;
  border-radius: 4px;
  display: inline-block;
  font-family: 'RobotoMono', monospace;
  font-size: 12px;
  padding: 2px 6px;
}

.Slider-wrapper {
  position: relative;
}

.Slider {
  position: relative;
  width: 100%;
  -webkit-appearance: none;
  &:focus {
    outline: 0;
  }
  &::-webkit-slider-runnable-track {
    background-color: $colorNavy;
    width: 100%;
    height: 3px;
  }
  &::-webkit-slider-thumb {
    background-color: $colorBlueGrey;
    border: 2px solid $colorBlueGrey;
    border-radius: 100%;
    margin-top: -7px;
    width: 15px;
    height: 15px;
    -webkit-appearance: none;
    -webkit-app-region: no-drag;
  }
}

.Slider--red {
  &::-webkit-slider-thumb {
    background-color: $colorRed;
    border: 2px solid $colorRed;
    -webkit-app-region: no-drag;
  }
}

.Slider-bar {
  position: absolute;
  top: calc(50% + 3px);
  height: 3px;
}

.Slider-bar--red {
  background-color: $colorRed;
}
</style>
