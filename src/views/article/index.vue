<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>

      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：" style="margin-left:10px">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据晒选条件共查询到
        <b>{{total}}</b> 条结果
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif" alt="" class="mmp">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="primary" circle></el-button>
            <el-button @click="del(scope.row.id)" icon="el-icon-delete" type="danger" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination background layout="prev, pager, next" @current-change="pager" :current-page="reqParams.page" :page-size="reqParams.per_page" :total="total"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },

      // 日期数据
      dateValues: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取你文章列表数据
    this.getArticles()
  },
  methods: {
    // 删除
    del (id) {
      this.$confirm('md此操作将永久删除该文章, 是否继续?', 'md提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles${id}`)
        // 删除成功
        this.$message.success('删除成功')
        this.getArticles()
      }).catch(() => {})
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 搜索
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 选择时间处理函数
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },

    // 获取文章列表
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
.box {
  margin-top: 20px;
  text-align: center;
}
.mmp {
  width: 100px;
  height: 80px;
}
</style>
