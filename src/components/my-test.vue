<template>
    <div class="container">
        <p>哈哈哈</p>
        <p> <slot name="content" :data="innerTest"></slot> </p>
        <p><slot name="footer"></slot></p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      innerTest: '爱你美神可能大女方'

    }
  }

}
</script>

<style lang="less" scoped>

</style>
