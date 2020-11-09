<template>
  <li :class="{'is-disabled': disabled}"
      class="dropdown-option">
    <slot/>
  </li>
</template>

<script type="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
