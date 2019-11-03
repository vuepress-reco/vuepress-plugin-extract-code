<template>
  <div class="demo-wrap">
    <div class="demo-nav">
      <i class="demo-nav-btn" @click='toggleCode'>
         <svg t="1572515960134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1097" width="20" height="20"><path d="M888 64H136q-30.016 0-51.008 20.992T64 136v752.992q0 28.992 20.992 50.496t51.008 21.504h752.992q28.992 0 50.496-21.504t21.504-50.496V136q0-30.016-21.504-51.008T888 64zM228.992 548.992q-15.008 0-25.504-10.496t-10.496-25.504 10.016-26.016l115.008-115.008-115.008-116.992q-10.016-11.008-10.016-25.504t10.496-24.992 25.504-10.496 24.992 10.016l140.992 142.016q10.016 11.008 10.016 26.016t-11.008 24.992l-140 140.992q-10.016 11.008-24.992 11.008z m389.024 0l-199.008-0.992q-15.008 0-25.504-10.496T383.008 512t10.496-25.504 25.504-10.496l199.008 0.992q15.008 0 25.504 10.496t10.496 25.504-11.008 25.504-24.992 10.496z" p-id="1098"></path></svg>
      </i>
      <i :class="showCode ? 'demo-icon-arrow active' : 'demo-icon-arrow'">
        <svg t="1572587847226" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3297" width="16" height="16"><path d="M830.687738 603.071182c0 9.614985-3.933589 17.949814-11.799744 25.007557-7.867178 7.05672-17.222243 10.56052-28.065196 10.512425L232.716714 638.591163c-10.789741 0-20.144806-3.5038-28.064172-10.512425-7.919367-7.009647-11.852956-15.344476-11.799744-25.007557 0.053212-9.660011 3.986801-17.996886 11.799744-25.00551l279.05253-248.641917c7.867178-7.009647 17.22122-10.513448 28.065196-10.513448 10.842952 0 20.196994 3.504824 28.064172 10.513448l279.05253 248.641917C826.754149 585.074296 830.687738 593.411171 830.687738 603.071182z" p-id="3298"></path></svg>
      </i>
    </div>
    <transition name="code-fade">
      <div class="demo-code" v-show="showCode">
          <div class="demo-code-nav">
            <button
              v-for="(config, index) in codeNavConfigs"
              :key="index"
              :class="['demo-code-btn', codeNavIndex === index ? 'active' : '']"
              @click="codeNavBtnHandler(index)">{{config.title}}</button>
          </div>
          <div class="demo-code-content">
            <div
              class="demo-code-item"
              v-for="(config, index) in codeNavConfigs"
              :key="index"
              v-show="codeNavIndex === index">
              <slot :name="config.slotName"></slot>
            </div>
            <i class="demo-code-content-copy" @click='copyCode'>
              <svg t="1572585974849" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1695" width="20" height="20" style="fill: #fff"><path d="M866.461538 39.384615H354.461538c-43.323077 0-78.769231 35.446154-78.76923 78.769231v39.384616h472.615384c43.323077 0 78.769231 35.446154 78.769231 78.76923v551.384616h39.384615c43.323077 0 78.769231-35.446154 78.769231-78.769231V118.153846c0-43.323077-35.446154-78.769231-78.769231-78.769231z m-118.153846 275.692308c0-43.323077-35.446154-78.769231-78.76923-78.769231H157.538462c-43.323077 0-78.769231 35.446154-78.769231 78.769231v590.769231c0 43.323077 35.446154 78.769231 78.769231 78.769231h512c43.323077 0 78.769231-35.446154 78.76923-78.769231V315.076923z m-354.461538 137.846154c0 11.815385-7.876923 19.692308-19.692308 19.692308h-157.538461c-11.815385 0-19.692308-7.876923-19.692308-19.692308v-39.384615c0-11.815385 7.876923-19.692308 19.692308-19.692308h157.538461c11.815385 0 19.692308 7.876923 19.692308 19.692308v39.384615z m157.538461 315.076923c0 11.815385-7.876923 19.692308-19.692307 19.692308H216.615385c-11.815385 0-19.692308-7.876923-19.692308-19.692308v-39.384615c0-11.815385 7.876923-19.692308 19.692308-19.692308h315.076923c11.815385 0 19.692308 7.876923 19.692307 19.692308v39.384615z m78.769231-157.538462c0 11.815385-7.876923 19.692308-19.692308 19.692308H216.615385c-11.815385 0-19.692308-7.876923-19.692308-19.692308v-39.384615c0-11.815385 7.876923-19.692308 19.692308-19.692308h393.846153c11.815385 0 19.692308 7.876923 19.692308 19.692308v39.384615z" p-id="1696"></path></svg>
            </i>
            <transition name="slide-fade">
              <span class="demo-code-content-copied" v-if="copied">Copied</span>
            </transition>
          </div>
      </div>
    </transition>
    <div class="demo-main">
      <div class="demo-component-wrap" v-if="$slots.demo">
        <slot name="demo"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Demo',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showCode: false,
      copied: false,
      codeNavIndex: 0,
      codeNavConfigs: []
    }
  },
  created () {
    this.showCode = this.collapse
    this.makeCodeNavConfigs()
  },
  methods: {
    toggleCode () {
      this.showCode = !this.showCode
    },
    copyCode () {
      const pre = this.$el.querySelectorAll('pre')[this.codeNavIndex]
      pre.setAttribute('contenteditable', 'true')
      pre.focus()
      document.execCommand('selectAll', false, null)
      this.copied = document.execCommand('copy')
      pre.removeAttribute('contenteditable')
      setTimeout(() => { this.copied = false }, 1000)
    },
    codeNavBtnHandler (i) {
      this.codeNavIndex = i
    },
    makeCodeNavConfigs () {
      console.log(this.$slots)
      const slots = this.$slots
      const configs = []
      let title
      for (const key in slots) {
        console.log(key.indexOf('code-'))
        if (key.indexOf('code-') == 0) {
          title = key.replace('code-', '').replace(/^\S/, s => s.toUpperCase())
          configs.push({
            title,
            slotName: key
          })
        }
      }
      this.codeNavConfigs = configs
    }
  }
}
</script>
<style lang="stylus">
.demo-wrap
  margin: 20px 0
  box-shadow 0 1px 6px 0 rgba(0, 0, 0, 0.2)
  border-radius 8px
  text-decoration: none
  overflow hidden
  .demo-nav
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between
    align-items center
    height 48px
    background-color #f5f5f5
    color rgba(0,0,0,0.87)
    .demo-nav-btn
      margin-left 6px
      font-size 22px
      font-weight bold
      align-items center
      outline 0
      border 0
      fill $accentColor
      cursor pointer
    .demo-icon-arrow
      transition all .5s
      margin-right 8px
      transform rotateX(180deg)
      &.active
        transform rotateX(0deg)
  .demo-code
    background-color rgb(45, 45, 45)
    border-color rgb(45, 45, 45)
    color #fff
    pre
      margin 0!important
    .demo-code-nav
      display flex
      flex-direction row
      flex-wrap nowrap
      justify-content flex-start
      align-items center
      height 48px
      border-bottom: 1px solid rgba(255,255,255,0.12)
      .demo-code-btn
        display block
        padding 0 16px
        margin 0 8px
        height 32px
        line-height 32px
        font-size 16px
        border-radius 8px
        outline none
        cursor pointer
        background-color transparent
        color white
        border none
        &.active
          background #f5f5f5
          color $accentColor
          transition all .3s ease
    .demo-code-content
      max-height 350px
      overflow-y auto
      position relative
      .demo-code-item
        div[class*="language-"]
          margin 0
      .demo-code-content-copy
        position absolute
        top 30px
        right 10px
        z-index 100
        cursor pointer
      .demo-code-content-copied
          position absolute
          top 30px
          right 50px
          z-index 100
  .demo-main
    background #fff
    .demo-component-wrap
      box-sizing border-box
      padding 8px 12px
      overflow hidden

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.code-fade-enter-active {
  transition: all .3s ease;
}
.code-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.code-fade-enter, .code-fade-leave-to {
  transform: translateY(-6px);
  opacity: 0;
}
</style>
