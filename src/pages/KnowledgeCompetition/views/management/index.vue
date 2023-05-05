<template>
  <div class="content">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="aside-header">
          <div class="aside-title-box">
            <div class="icon-box">
              <img src="../../assets/icon.png" class="icon" />
            </div>
            <div class="aside-title-box">世界之最知识竞赛管理系统</div>
          </div>
          <div class="aside-subject">科目</div>
        </div>
        <template v-for="(item, index) in titleList">
          <el-menu :key="index">
            <div
              class="subject-s"
              @click="chooseSubject(item[0].t_FatherlevelID)"
            >
              {{ item[0].t_SubjectID }}
            </div>
          </el-menu>
        </template>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 40px">
          <el-button type="primary" @click="handleClickFilterButton('add')">
            新增
          </el-button>
          <el-button type="primary" @click="handleClickFilterButton('edit')">
            删除
          </el-button>
          <el-button type="primary" @click="handleOutputButton()">
            导出题库模板
          </el-button>
          <el-button type="primary" @click="handleInputButton">
            <input
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              @change="handleInputButton"
            />
            <!-- <a
              href="javascript:void(0)"
              id="clueImgUploadButton"
              class="btn-normal"
            ></a> -->
            导入题库
          </el-button>
        </el-header>
        <el-main>
          <el-table :data="tableData" center border stripe>
            <!-- <el-table-column prop="index" label="序号" width="140">
            </el-table-column> -->
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="t_title" label="题目"> </el-table-column>
            <el-table-column prop="t_Answer_A" label="A"> </el-table-column>
            <el-table-column prop="t_Answer_B" label="B"> </el-table-column>
            <el-table-column prop="t_Answer_C" label="C"> </el-table-column>
            <el-table-column prop="t_Answer_D" label="D"> </el-table-column>
            <el-table-column prop="t_Answer" label="答案"> </el-table-column>
            <el-table-column prop="t_Explain" label="解析"> </el-table-column>
            <!-- <el-table-column label="操作">
              <span class="btn-delete">删除</span>
            </el-table-column> -->
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      class="dialog-box"
      title="新增题目"
      :visible.sync="dialogVisible"
      width="70%"
      style="border-radius: 2vw"
      :before-close="handleClose"
    >
      <el-form class="el-form-box">
        <el-form-item label="题目:" prop="t_title" label-width="100px">
          <el-input
            type="textarea"
            class="inputBox"
            v-model.trim="formData.t_title"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="A" prop="t_Answer_A" label-width="100px">
          <el-input
            class="inputBox"
            v-model.trim="formData.t_Answer_A"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="B" prop="t_Answer_B" label-width="100px">
          <el-input
            class="inputBox"
            v-model.trim="formData.t_Answer_B"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="C" prop="t_Answer_C" label-width="100px">
          <el-input
            class="inputBox"
            v-model.trim="formData.t_Answer_C"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="D" prop="t_Answer_D" label-width="100px">
          <el-input
            class="inputBox"
            v-model.trim="formData.t_Answer_D"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="答案:" prop="t_Explain" label-width="100px">
          <el-input
            class="inputBox"
            v-model.trim="formData.t_Explain"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="解析:" prop="t_Answer" label-width="100px">
          <el-input
            type="textarea"
            class="inputBox"
            v-model.trim="formData.t_Answer"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <div class="buttom-button">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            提交
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getListTitle,
  getListThetopictable,
  // download,
  upload,
  NewInterface,
  deleteThetopictabledeleteThetopi,
} from '../../api/index'
import { handelBlobData } from '../../utils/tools'

export default {
  name: 'QuestionManagement',
  data() {
    return {
      dialogVisible: false,
      titleList: null,
      disabled: false,
      tableData: {
        t_Answer: '',
        t_Answer_A: '',
        t_Answer_B: '',
        t_Answer_C: '',
        t_Answer_D: '',
        t_Explain: '',
        t_FatherlevelID: '',
        t_SubjectID: '',
        t_SublevelID: '',
        t_TheTopicTableID: '',
        t_content: '',
        t_title: '',
      },
      formData: {
        t_Answer: '',
        t_Answer_A: '',
        t_Answer_B: '',
        t_Answer_C: '',
        t_Answer_D: '',
        t_Explain: '',
        t_FatherlevelID: '',
        t_SubjectID: '',
        t_SublevelID: '',
        t_TheTopicTableID: '',
        t_content: '',
        t_title: '',
      },
    }
  },
  async mounted() {
    await this._getNewsList()
    await this._getListTheopictable()
  },
  methods: {
    async _deleteThetopictabledeleteThetopi() {
      try {
        const res = await deleteThetopictabledeleteThetopi()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    chooseSubject(index) {
      this._getListTheopictable(index)
    },
    async handleInputButton(e) {
      try {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        const res = await upload(formData)
      } catch (error) {
        console.log(error)
      }
    },
    handleClickFilterButton(type) {
      try {
        if (type === 'add') {
          this.dialogVisible = true
        }
      } catch (e) {}
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    //新增
    async _NewInterface() {
      try {
        const res = await NewInterface(param)
        console.log(res, 'add')
      } catch (e) {
        console.log(e)
      }
    },
    // 获取题库
    async _getNewsList() {
      try {
        const res = await getListTitle(null)
        this.titleList = res
        console.log(this.titleList, 're=====s')
      } catch (e) {
        console.log(e)
      }
    },
    //下载模板
    async handleOutputButton() {
      try {
        window.open('http://47.113.88.149:9060/download/题目导入模板.xlsx')
        // const res = await download()
        // console.log(res, 'asdareasdasdasd')
        // handelBlobData(res)
      } catch (e) {
        console.log(e)
      }
    },
    //获取选中当前题库下的题目列表
    async _getListTheopictable(id) {
      try {
        console.log(id, 'idiidiidiiid')
        const params = id ? id : this.titleList[1][0].t_FatherlevelID
        console.log(this.titleList, '123')
        const res = await getListThetopictable(params)
        this.tableData = res
        console.log(res, 'rswssesss')
      } catch (e) {
        console.log(e)
      }
    },
  },
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
  line-height: 1vh;
  text-align: center;
  color: #333;
}
.el-menu {
  // height: 10vh;
  line-height: 5vh;
  font-size: 1vw;
  cursor: pointer;
  .subject-s {
    border-top: 0.01vw solid #ccc;
  }
  .subject-s:hover {
    background-color: #b3c0d1;
  }
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
  line-height: 2.5vh;
  font-size: 1vw;
}
/deep/.el-dialog {
  position: relative;
  padding: 2vw;
  height: 80%;
  max-height: 80%;
  font-size: 1.5vw;
  border-radius: 1vw;
  .el-dialog__title {
    font-size: 1.5vw;
  }
  .el-form-item__label {
    // height: 2vw;
    line-height: 2vw;
    font-size: 1.3vw;
  }
  .el-form-item__content {
    // height: 2vw;
    font-size: 1.3vw;
  }
  .buttom-button {
    position: absolute;
    bottom: 1vw;
    left: 50%;
    transform: translate(0 50%);
    display: flex;
    justify-content: center;
  }
}
/deep/.el-form-item {
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  min-height: 2vw;

  // height: 2vw;
  // line-height: 2vw;
}
/deep/.inputBox {
  margin-left: 1vw;
}
/deep/.el-input__inner {
  padding: 0 0.8vw;
  min-height: 2vw;
  border-radius: 1vw;
}
.aside-header {
  // height: 10vh;
  background: #fff;
  .aside-title-box {
    display: flex;
    .icon-box {
      margin-top: 1vh;

      width: 3.5vw;
      height: 3.5vw;
      .icon {
        width: 3.5vw;
        height: 3.5vw;
      }
    }
    .aside-title-box {
      line-height: 4vh;
      font-size: 1.5vw;
      font-weight: bold;
    }
  }
  .aside-subject {
    // height: 10vh;
    line-height: 5vh;
    font-size: 1.4vw;
    font-weight: 500;
    background-color: #b3c0d1;
  }
}
.btn-delete {
  color: blue;
  cursor: pointer;
}
</style>
