<template>
  <teleport to="#loading">
    <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container loading-container">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
        </div>
        <p v-if="text" class="text-primary small">{{text}}</p>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    text: String
  }
}
</script>

<style lang="scss" scoped>
.loading-container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background: rgba(255, 255, 255, .5);
}
</style>
