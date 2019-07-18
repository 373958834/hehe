<template>
  <div class="container">
    <!-- <img src="../../assets/images/hh.jpeg" alt /> -->
    <el-carousel height="670px">
      <el-carousel-item v-for="item in 5" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => console.log(res.data))
  }
}
</script>

<style lang="less" scoped>
.container {
  text-align: center;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    margin: 0px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(1n) {
  background: url(../../assets/images/4a.jpg) no-repeat center / cover;
}
.el-carousel__item:nth-child(2n) {
  background: url(../../assets/images/1.jpg) no-repeat center / cover;
}
.el-carousel__item:nth-child(3n) {
  background: url(../../assets/images/4.jpg) no-repeat center / cover;
}
.el-carousel__item:nth-child(4n) {
  background: url(../../assets/images/1a.jpg) no-repeat center / cover;
}
.el-carousel__item:nth-child(5n) {
  background: url(../../assets/images/3.jpg) no-repeat center / cover;
}
</style>
