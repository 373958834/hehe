<template>
  <div id="app">
    App
    <el-progress :text-inside="true" :stroke-width="26" :percentage="100"></el-progress>
    <el-progress :text-inside="true" :stroke-width="24" :percentage="80" status="success"></el-progress>
    <el-progress :text-inside="true" :stroke-width="22" :percentage="50" status="warning"></el-progress>
    <el-progress :text-inside="true" :stroke-width="20" :percentage="30" status="exception"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
