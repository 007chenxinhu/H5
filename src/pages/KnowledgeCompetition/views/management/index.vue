<template>
  <div class="content">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']"> 世界之最知识竞赛题库 </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 40px">
          <el-button type="primary"> 新增 </el-button>
          <el-button type="primary"> 删除 </el-button>
          <el-button type="primary"> 新增 </el-button>

          <!-- <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </el-header>

        <el-main>
          <el-table :data="tableData" border stripe>
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'QuestionManagement',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }
    return {
      tableData: Array(10).fill(item),
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  //   line-height: 10vh;
}
.el-button {
  font-size: 1.1vw;
}
.el-icon-message {
  line-height: 10vh;
  font-size: 2vw;
}
.el-aside {
  line-height: 10vh;
  color: #333;
}
.el-menu {
  height: 99vh;
  line-height: 10vh;
  font-size: 1vw;
}
/deep/.el-submenu .el-submenu__title {
  line-height: 10vh;
  font-size: 2vw;
}
/deep/.el-table th.el-table__cell > .cell {
  line-height: 6vh;
  font-size: 1.1vw;
}
/deep/.el-table td.el-table__cell div {
  line-height: 6vh;
  font-size: 1vw;
}
</style>
