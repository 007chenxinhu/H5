<template>
  <div class="content">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="aside-header">
          <div class="aside-title-box">
            <div class="icon-box">
              <img src="../../assets/icon.png" class="icon" />
            </div>
            <div class="aside-title-box">世界之最知识<br />竞赛管理系统</div>
          </div>
          <div class="aside-subject">科目</div>
        </div>
        <template v-for="(item, index) in subjectList">
          <el-menu :key="index">
            <div>
              <div
                :class="chooseSub === item.val ? 'subject-t' : 'subject-f'"
                @click="chooseSubject(item.val, index)"
              >
                {{ item.label }}
                <div
                  :class="
                    chooseSub === item.val
                      ? 'subject-t-icon1'
                      : 'subject-t-icon2'
                  "
                ></div>
              </div>
              <div
                :class="titleId === title.val ? 'title-t' : 'title-f'"
                v-for="(title, fk) in titleList"
                :key="fk"
                v-show="showTitleList === index"
                @click="chooseTitle(title.val)"
              >
                {{ title.label }}
              </div>
            </div>
          </el-menu>
        </template>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 40px">
          <el-button
            type="primary"
            v-if="isPersonalPower || isAdministrators"
            @click="handleClickFilterButton('add', null)"
          >
            新增
          </el-button>
          <el-button
            font-size="26px"
            type="primary"
            @click="handleOutputButton()"
          >
            导出题库模板
          </el-button>
          <el-button
            type="primary"
            v-if="!isAdministrators"
            @click="handleInputButton()"
          >
            导入题库
          </el-button>
          <el-button
            font-size="26px"
            type="primary"
            v-if="!isAdministrators"
            @click="getPersonalSubject()"
          >
            获取个人题库
          </el-button>
          <el-button
            font-size="16px"
            type="primary"
            @click="GoKnowledgeCompetition()"
          >
            游戏界面预览
          </el-button>
          <el-button
            type="primary"
            v-if="isAdministrators"
            @click="administratorsInputButton()"
          >
            管理人员导入默认题库
          </el-button>
        </el-header>
        <el-main>
          <el-table :data="tableData" center border stripe>
            <!-- <el-table-column prop="index" label="序号" width="140">
            </el-table-column> -->
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="t_content" label="题目"> </el-table-column>
            <el-table-column prop="t_Answer_A" label="A"> </el-table-column>
            <el-table-column prop="t_Answer_B" label="B"> </el-table-column>
            <el-table-column prop="t_Answer_C" label="C"> </el-table-column>
            <el-table-column prop="t_Answer_D" label="D"> </el-table-column>
            <el-table-column prop="t_Answer" label="答案"> </el-table-column>
            <el-table-column prop="t_Explain" label="解析"> </el-table-column>
            <el-table-column label="操作" v-if="isShowClickButton">
              <template slot-scope="scope">
                <el-button
                  @click="handleClickFilterButton('edit', scope.row)"
                  type="text"
                  size="small"
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="deteleTopic(scope.row)"
                >
                  删除
                </el-button>
              </template>
              <!-- <span class="btn-delete">编辑</span>&nbsp;&nbsp;
              <span class="btn-delete" @click="deteleTopic()">删除</span> -->
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <!-- 11111111111111111111111111111111获取个人题库 -->
    <el-dialog
      class="dialog-box"
      title="获取个人题库列表"
      :visible.sync="dialogVisible2"
      width="70%"
      style="border-radius: 2vw"
      :before-close="handleClose2"
    >
      <div>
        <el-form>
          <el-form-item label="个人题库密码: ">
            <input type="text" v-model="sixStringPwa" />
          </el-form-item>
          <div class="hint">
            注：输入六位数字、字母或者符号组成个人题库密码,请妥善保存密码方便查阅题库。
          </div>
        </el-form>
      </div>
      <div class="buttom-button">
        <el-button type="primary" @click="hangleGetPersonalSubject(null)">
          获取
        </el-button>
        <el-button @click="dialogVisible2 = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 22222222222222222222222用户-管理员导入题库 -->
    <el-dialog
      class="dialog-box"
      title="导入题库"
      :visible.sync="dialogVisible1"
      width="70%"
      style="border-radius: 2vw"
      :before-close="handleClose1"
    >
      <div>
        <el-form>
          <el-form-item
            v-if="isAdministrators"
            label="科目:"
            prop="subjectID"
            label-width="100px"
          >
            <div class="radio-box">
              <el-radio
                v-for="(item, index) in subjectList"
                :key="index"
                v-model="subjectID"
                :label="item.val"
                @input="changeRadio(item, index)"
              >
                {{ item.label }}
              </el-radio>
            </div>
          </el-form-item>
          <el-form-item label="输入个人题库名称: ">
            <input v-model.trim="subjectName" type="text" />
          </el-form-item>
          <el-form-item v-if="!isAdministrators" label="输入个人题库密码: ">
            <input
              v-model.trim="sixStringPwa"
              type="text"
              max="6"
              :active-change="false"
            />
          </el-form-item>
          <div class="hint" v-if="!isAdministrators">
            注：输入六位数字、字母或者符号组成个人题库密码,请妥善保存密码方便查阅题库。
          </div>
        </el-form>
      </div>
      <input
        id="input-id"
        v-show="
          isAdministrators
            ? subjectName
            : subjectName && sixStringPwa.length === 6
        "
        type="file"
        text="导入题库"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        @change="handleChooseFiles"
      />
    </el-dialog>
    <!-- 111111111111111111111111成功导入的题目列表 -->
    <el-dialog
      class="dialog-box"
      title="成功导入的题目列表"
      :visible.sync="dialogVisible3"
      width="70%"
      style="border-radius: 2vw"
      :before-close="handleClose3"
    >
      <div>
        <div v-for="(item, index) in uploadList" :key="index">
          {{ index + 1 + ' ' + item.t_content }}
        </div>
      </div>
      <el-button @click="handleClose3">关闭</el-button>
    </el-dialog>
    <!-- 22222222222222222222222新增题目编辑题目 -->
    <el-dialog
      class="dialog-box"
      :title="dialogType === 'add' ? '新增题目' : '编辑题目'"
      :visible.sync="dialogVisible"
      width="70%"
      style="border-radius: 2vw"
      :before-close="handleClose"
    >
      <el-form :v-model="formData" class="el-form-box">
        <el-form-item
          v-if="dialogType === 'add'"
          label="科目:"
          prop="t_title"
          label-width="100px"
        >
          <div class="radio-box">
            <el-radio
              v-for="(item, index) in addFormSubject"
              :key="index"
              v-model="value"
              :label="item.val"
              @input="changeRadio(item, index)"
            >
              {{ item.label }}
            </el-radio>
          </div>
        </el-form-item>
        <el-form-item
          v-if="value && dialogType === 'add'"
          label="题库名称:"
          prop="t_FatherlevelID"
          label-width="100px"
        >
          <div class="radio-box">
            <template v-if="addFormTitleList.length">
              <el-radio
                v-for="(title, index) in addFormTitleList"
                :key="index"
                v-model="value1"
                :label="title.val"
                @input="changeRadioTitle(title)"
              >
                {{ title.label }}
              </el-radio>
            </template>
            <template v-else>
              <div>无</div>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="题目:" prop="t_content" label-width="100px">
          <el-input
            type="textarea"
            class="inputBox"
            v-model.trim="formData.t_content"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="A" prop="t_Answer_A" label-width="100px">
          <el-input
            class="inputBox"
            type="textarea"
            v-model.trim="formData.t_Answer_A"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="B" prop="t_Answer_B" label-width="100px">
          <el-input
            class="inputBox"
            type="textarea"
            v-model.trim="formData.t_Answer_B"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="C" prop="t_Answer_C" label-width="100px">
          <el-input
            class="inputBox"
            type="textarea"
            v-model.trim="formData.t_Answer_C"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="D" prop="t_Answer_D" label-width="100px">
          <el-input
            class="inputBox"
            type="textarea"
            v-model.trim="formData.t_Answer_D"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="答案:" prop="t_Answer" label-width="100px">
          <el-input
            class="inputBox"
            type="textarea"
            v-model.trim="formData.t_Answer"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="解析:" prop="t_Explain" label-width="100px">
          <el-input
            type="textarea"
            class="inputBox"
            v-model.trim="formData.t_Explain"
            :disabled="disabled"
          >
          </el-input>
        </el-form-item>
        <div class="buttom-button">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getListTitle,
  listSubject,
  getListThetopictable,
  upload,
  NewInterface,
  DeleteThetopictable,
  personalQuery,
  Thetopictablerevise,
} from '../../api/index'
import { getParameter } from '../../utils/indexExtends'
import { debounce } from 'lodash'

export default {
  name: 'QuestionManagement',
  data() {
    return {
      dialogType: 'add',
      sixStringPwa: '', //密码
      subjectName: '', //题库名称
      uploadList: null,
      chooseSub: null,
      subjectList: null,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      showTitleList: 0,
      titleList: null,
      personalTitleList: null,
      disabled: false,
      tableData: null,
      titleId: null,
      isPersonalPower: false, //个人  输入密码之后 只能操作自己的题库
      isAdministrators: false, //管理员 有所有权限
      isShowClickButton: false, //表格操作按钮
      formData: {
        // id: null,
        // t_FatherlevelID: null,
        t_Answer: '',
        t_Answer_A: '',
        t_Answer_B: '',
        t_Answer_C: '',
        t_Answer_D: '',
        t_Explain: '',
        t_FatherlevelID: '',
        t_SubjectID: '',
        t_SublevelID: '',
        t_content: '', //题目
        t_title: '', //题库名称
      },
      value: '',
      value1: '',
      subjectID: 5,
      addFormSubject: [],
      addFormTitleList: [],
    }
  },
  async mounted() {
    const administrators = getParameter('administrators')
    if (administrators === '666') {
      this.isAdministrators = true
      this.isShowClickButton = true
    }
    await this._listSubject()
    await this._getNewsList()
    await this._getListTheopictable()
    if (!this.isAdministrators) {
      if (window.localStorage.getItem('sixStringPwa') !== null) {
        this.hangleGetPersonalSubject(
          window.localStorage.getItem('sixStringPwa'),
        )
      }
    }
  },
  methods: {
    //管理人员导入默认题库
    administratorsInputButton() {
      this.subjectName = ''
      this.dialogVisible1 = true
    },
    //新增，编辑点击科目
    changeRadio(e, index) {
      try {
        //个人题库
        if (e.val === 'fff') {
          this.isShowClickButton = true
          this.titleList = []
          this.addFormTitleList = []
          //没数据时
          if (!this.personalTitleList.length) {
            this.$message('个人题库为空，请下载模板再导入！')
            return
          }
          //个人获取题库之后 的新增
          if (index === 'person') {
            this.personalTitleList.map(item => {
              this.addFormTitleList.push(item)
              this.value = 'fff'
            })
          } else {
            this.personalTitleList.map(item => {
              this.titleList.push(item)
            })
          }
        } else {
          if (!this.isAdministrators) {
            this.isShowClickButton = false
          }

          if (e.label === '世界之最') {
            this.value = e.val
            this.subjectID = e.val
          }
          this._getNewsList(e.val, index)
        }
      } catch (error) {
        this.$message(`${error}` || '发生错误')
      }
    },
    changeRadioTitle(e) {
      this.formData.t_FatherlevelID = e.val
    },
    //单条删除
    deteleTopic(e) {
      try {
        const self = this
        this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this._DeleteThetopictable(e.id)
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            setTimeout(() => {
              self._getListTheopictable(self.titleId)
            }, 500)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    //获取个人题库
    async hangleGetPersonalSubject(e) {
      try {
        //当获取过个人浏览器有保存密码自动获取个人题库
        if (e) {
          let subject = {
            label: '',
            val: '',
          }
          const res = await personalQuery(e)
          subject = res.map(item => {
            return {
              label: item.t_title,
              val: item.t_FatherlevelID,
            }
          })
          //个人题库
          this.personalTitleList = subject
          if (this.isPersonalPower) {
            return
          }
          this.subjectList.push({
            label: '个人题库',
            val: 'fff',
          })
          this.addFormSubject = [
            {
              label: '个人题库',
              val: 'fff',
            },
          ]
          this.isPersonalPower = true
        } else {
          //手动获取个人题库
          if (!this.sixStringPwa) {
            this.$message('请先输入密码！')
            return
          }
          if (this.sixStringPwa.length !== 6) {
            this.$message('请输入6位密码！')
            return
          }
          let subject = {
            label: '',
            val: '',
          }
          const res = await personalQuery(this.sixStringPwa)
          subject = res.map(item => {
            return {
              label: item.t_title,
              val: item.t_FatherlevelID,
            }
          })
          //个人题库
          this.personalTitleList = subject
          this.dialogVisible2 = false
          window.localStorage.setItem('sixStringPwa', this.sixStringPwa)

          if (!this.personalTitleList.length) {
            this.$message({
              message: '个人题库为空，请下载模板再导入！',
              type: 'error',
            })
          } else {
            this.$message({
              message: '获取成功！',
              type: 'success',
            })
          }

          if (this.isPersonalPower) {
            return
          }
          this.subjectList.push({
            label: '个人题库',
            val: 'fff',
          })
          this.addFormSubject = [
            {
              label: '个人题库',
              val: 'fff',
            },
          ]
          this.isPersonalPower = true
        }
      } catch (error) {
        this.$message(`${error}` || '发生错误')
      }
    },
    //输入个人密码
    getPersonalSubject() {
      this.dialogVisible2 = true
    },
    //单个删除
    async _DeleteThetopictable(id) {
      try {
        await DeleteThetopictable(id)
      } catch (error) {
        this.$message(`${error}` || '发生错误')
      }
    },
    //点击科目
    chooseSubject(id, index) {
      try {
        if (id === 'fff') {
          this.titleList = []
          this.personalTitleList.map(item => {
            this.titleList.push(item)
          })
          this.titleId = this.titleList[0].val
          this.showTitleList = index
          this.isShowClickButton = true
          this._getListTheopictable(this.titleId)
        } else {
          if (!this.isAdministrators) {
            this.isShowClickButton = false
          }
          this._getNewsList(id, index)
        }
      } catch (error) {
        this.$message(`${error}` || '发生错误')
      }
    },
    //点击科目下的题库
    chooseTitle(id) {
      this._getListTheopictable(id)
    },
    //导入题库
    async handleInputButton() {
      try {
        this.sixStringPwa = ''
        this.subjectName = ''
        this.dialogVisible1 = true
      } catch (error) {
        this.$message(`${error}` || '发生错误')
      }
    },
    //导入题库
    async handleChooseFiles(e) {
      try {
        if (!this.subjectName) {
          this.$message('请先输入个人题库名称！')
          return
        }
        if (!this.isAdministrators) {
          if (!this.sixStringPwa) {
            this.$message('请先输入密码！')
            return
          }
        }

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        if (this.isAdministrators === true) {
          formData.append('subjectID', this.subjectID)
        } else {
          formData.append('subjectID', 5)
        }
        formData.append('password', this.sixStringPwa)
        formData.append('title', this.subjectName)

        const res = await upload(formData)
        this.uploadList = res.result
        this.dialogVisible3 = true
        document.getElementById('input-id').value = ''
      } catch (e) {
        this.$message({
          message: `${e}`,
          type: 'error',
        })
      }
    },
    //新增编辑按钮
    handleClickFilterButton(type, data) {
      try {
        if (type === 'add') {
          this.formData = Object.assign({})
          this.value1 = null
          this.dialogType = 'add'
          // 个人权限新增显示默认选择第一个科目
          if (this.isPersonalPower) {
            const arr = {
              label: '个人题库',
              val: 'fff',
            }
            this.changeRadio(arr, 'person')
          }
          // 管理员权限新增显示默认选择第一个世界之最
          if (this.isAdministrators) {
            this.changeRadio(this.subjectList[0], 0)
          }
          this.dialogVisible = true
        } else if (type === 'edit') {
          this.formData = Object.assign({}, data)
          this.dialogType = 'edit'
          this.dialogVisible = true
        }
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    //关闭新增
    handleClose() {
      this.dialogVisible = false
    },
    //关闭导入
    handleClose1() {
      this.dialogVisible1 = false
    },
    //关闭获取个人题库列表
    handleClose2() {
      this.dialogVisible2 = false
    },
    //关闭成功导入列表
    handleClose3() {
      this.dialogVisible1 = false
      this.dialogVisible3 = false
      if (this.isAdministrators) {
        this.chooseSubject(this.chooseSub, this.showTitleList)
      } else {
        this.chooseSub = 'fff'
        this.showTitleList = this.subjectList.length - 1
        this.chooseSubject(this.chooseSub, this.showTitleList)
      }
    },
    //新增&编辑
    handleSubmit: debounce(async function () {
      try {
        let params = Object.assign({}, this.formData)
        if (this.dialogType === 'add') {
          const res = await NewInterface(params)
          if (res === true) {
            this.dialogVisible = false
            this._getListTheopictable()

            this.$message({
              message: '新增成功！',
              type: 'success',
            })
          }
        } else if (this.dialogType === 'edit') {
          const res = await Thetopictablerevise(params)

          if (res === true) {
            this.dialogVisible = false
            this._getListTheopictable()

            this.$message({
              message: '修改成功！',
              type: 'success',
            })
          }
        }
      } catch (e) {
        this.$message({
          message: `${e}`,
          type: 'error',
        })
      }
    }, 500),
    // 查询科目列表
    async _listSubject() {
      try {
        let subject = {
          label: '',
          val: '',
        }
        let arr = null
        const res = await listSubject()
        subject = res.map(item => {
          return {
            label: item.name,
            val: item.id,
          }
        })
        subject.map((item, index) => {
          if (item.val === 5) {
            arr = {
              label: '世界之最',
              val: item.val,
            }
            subject.splice(index, 1)
          }
        })
        subject.unshift(arr)
        this.addFormSubject = subject
        this.subjectList = subject
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    // 查询科目下题目题库列表
    async _getNewsList(id, index) {
      try {
        let title = {
          label: '',
          val: '',
        }
        let params = id ? id : this.subjectList[0].val
        this.chooseSub = params
        const res = await getListTitle(params)
        if (res.length !== 0) {
          this.showTitleList = index ? index : 0
          title = res.map(item => {
            return {
              label: item.t_title,
              val: item.t_FatherlevelID,
            }
          })
          this.titleId = title[0].val
          this.titleList = title
          this.addFormTitleList = title
        } else {
          this.titleList = []
        }
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    //下载模板
    async handleOutputButton() {
      try {
        window.open(
          'http://47.113.88.149:5572/game/download?fileName=题目导入模板.xlsx',
        )
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    //获取选中当前题库下的题目列表
    async _getListTheopictable(id) {
      try {
        const params = id ? id : this.titleList[0].val
        this.titleId = params
        const res = await getListThetopictable(params)

        this.tableData = res
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    // //获取#后面的参数
    // getParameter(key) {
    //   const url = location.href
    //   // 获取 hash 值，不包含 '#' 号
    //   const hash = url.substring(url.indexOf('#') + 1)
    //   // 查找 '?' 号所在的索引
    //   const searchIndex = hash.indexOf('?')
    //   // '?' 号后面接的是索引参数，如果找到则+1，去除'?' 号
    //   const search = searchIndex !== -1 ? hash.substring(searchIndex + 1) : ''
    //   // 把搜索参数字符串提过URLSearchParams转成对象形式
    //   const usp = new URLSearchParams(search)
    //   // 通过URLSearchParams自带的get方法，查询键所对应的值
    //   return usp.get(key)
    // },
    //跳往游戏界面
    GoKnowledgeCompetition() {
      window.localStorage.setItem('myManagement', window.location.hash)
      this.$router.push('/index?Preview=true')
    },
  },
}
</script>

<style scoped lang="scss">
.content {
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  //   line-height: 10vh;
}
.el-button {
  font-size: 1rem !important;
}
.el-icon-message {
  line-height: 10vh;
  font-size: 2vw;
}
.el-aside {
  line-height: 1vh;
  text-align: center;
  color: #000000;
}
.el-menu {
  // height: 10vh;
  line-height: 5vh;
  font-size: 80px;
  color: #000000;

  cursor: pointer;
  .subject-t {
    position: relative;
    width: 100%;
    border-top: 0.01vw solid #ccc;
    background-color: #b3c0d1;
    white-space: nowrap;
    text-overflow: ellipsis;
    .subject-t-icon1 {
      position: absolute;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 50px solid #06b491;
      border-right: 50px solid transparent;
      border-left: 50px solid transparent;
    }
    .subject-t-icon2 {
      position: absolute;
      right: 2px;
      top: 50%;
      transform: translateY(-50%) rotate(180rag);
      width: 0;
      height: 0;
      border-top: 50px solid #1f1e1e;
      border-right: 50px solid transparent;
      border-left: 50px solid transparent;
    }
  }
  .subject-f {
    position: relative;
    width: 100%;
    border-top: 0.01vw solid #ccc;
    white-space: nowrap;
    text-overflow: ellipsis;
    .subject-t-icon1 {
      position: absolute;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 50px solid #06b491;
      border-right: 50px solid transparent;
      border-left: 50px solid transparent;
    }
    .subject-t-icon2 {
      position: absolute;
      right: 2px;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
      width: 0;
      height: 0;
      border-top: 50px solid #1f1e1e;
      border-right: 50px solid transparent;
      border-left: 50px solid transparent;
    }
  }
  .subject-f:hover {
    background-color: #b3c0d1;
  }
}
.title-t {
  width: 100%;

  border-top: 0.5px solid #bfc8d3;
  font-size: 70px;
  color: #bbb6b6;
  background-color: #3a3939;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title-f {
  width: 100%;

  border-top: 0.5px solid #bfc8d3;
  font-size: 70px;
  color: #333;
  background-color: #dfdede;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title-f:hover {
  color: #bbb6b6;
  background-color: #3a3939;
}
// /deep/.el-submenu .el-submenu__title {
//   line-height: 10vh;
//   font-size: 50px;
// }
/deep/.el-table th.el-table__cell > .cell {
  line-height: 6vh;
  font-size: 70px;
}
/deep/.el-table td.el-table__cell div {
  line-height: 2.5vh;
  font-size: 65px;
}
/deep/.el-dialog {
  position: relative;
  padding: 2vw;
  height: 80%;
  max-height: 80%;
  font-size: 80px;
  border-radius: 1vw;
  .el-dialog__title {
    font-size: 80px;
  }
  .el-form-item__label {
    line-height: 2vw;
    font-size: 70px;
  }
  .el-form-item__content {
    font-size: 70px;
    .radio-box {
      display: flex;
      flex-wrap: wrap;
      font-size: 70px;
      .el-radio {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        font-size: 70px;
        .el-radio__label {
          font-size: 70px;
        }
      }
    }
    .el-textarea__inner {
      font-size: 70px;
    }
  }

  .buttom-button {
    position: absolute;
    bottom: 1vw;
    left: 50%;
    transform: translate(0 50%);
    display: flex;
    justify-content: center;
    font-size: 70px;
    .el-button {
      border-radius: 20px;
      font-size: 70px;
    }
  }
  /deep/.el-option {
    line-height: 10vh !important;
  }
  /deep/.el-scrollbar {
    height: 200px !important;
  }
  /deep/.el-select-dropdown {
    min-width: 250px !important;
    min-height: 200px !important;
    /deep/.el-scrollbar {
      min-height: 200px !important;
    }
  }
  /deep/.el-select-dropdown__item .hover {
    padding: 20px !important;
  }
  /deep/.el-select-dropdown__wrap {
    max-height: 300px !important;
  }
}
/deep/.el-dialog__headerbtn {
  margin: 30px;
  font-size: 80px;
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
  text-align: center;
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
      // font-size: 50px !important;
      font-weight: bold;
    }
  }
  .aside-subject {
    // height: 10vh;
    line-height: 5vh;
    font-size: 90px;
    font-weight: 500;
    background-color: #b3c0d1;
  }
}
.btn-delete {
  color: blue;
  cursor: pointer;
}
.hint {
  font-size: 1rem;
  margin: 10px 0 20px;
  color: #900404;
}
</style>
