<template>
  <div class="navBar">
    <a-icone-more @click.native="$emit('updateState')" class="buttonMore" :class="{'rotate' : isOpen}" />
    <div class="navBar__visiblePart">
      <a-navbar-picto
        v-for="(pageIcon, index) in navPages"
        :key="'icone_nave_' + index"
        @click.native="pageIcon.functionBind()"
        :pageName="pageIcon.pageName"
        :isSelected="currentPageName === pageIcon.pageNameBind"
        :componentId="pageIcon.componentId"
      />
    </div>
    <div class="navBar__hiddenPart">
      <span
        v-for="(link, index) in navPagesSecondary"
        :key="'icone_nave_hidden_' + index"
        @click="link.functionBind()"
      >{{ link.pageNameBind}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    navPages: {
      required: true,
      type: Array,
    },
    isOpen: {
      default: false,
      type: Boolean,
    },
    navPagesSecondary: {},
    currentPageName: {
      type: String,
    },
  },
  watch: {
    isOpen(isOpen) {
      if (isOpen) {
        this.$anime.openMenu();
      } else {
        this.$anime.closeMenu();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.navBar {
  height: 520px;
  width: 100%;
  bottom: -441px;
  left: 0;
  background-color: #f5f5f5;
  position: fixed;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  border-radius: 31px;
  z-index: 100;

  .buttonMore {
    position: absolute;
    top: -25px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
    &.rotate {
      transform: rotate(45deg);
    }
  }
  &__visiblePart {
    padding-top: 22px;
    padding-bottom: 22px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__hiddenPart {
    background: white;
    width: 90vw;
    margin: auto;
    height: 71%;
    border-radius: 30px;
    padding: 20px;
    padding-top: 5vh;
    padding-bottom: 60px;
  }
  .wrapper--links {
    font-size: 11px;
    color: #de6b48;
    height: 38px;
    width: 85px;
    border-radius: 8px;
    * {
      pointer-events: none;
    }
  }
  .navBar__hiddenPart {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
