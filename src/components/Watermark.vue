<template>
  <n-watermark
      v-if="show"
      content="127.0.0.1"
      cross
      font-color="rgba(128, 128, 128, 0.04)"
      fullscreen
      :image-opacity="0.1"
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(true)
    }
  }
})
</script>