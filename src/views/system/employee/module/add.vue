<template>
  <div>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="dialog = true">新增</el-button>
    <el-dialog :visible.sync="dialog" :title="title" width="500px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" style="width: 370px;"/>
        </el-form-item>
        <el-form-item label="编号" prop="employeeId">
          <el-input v-model="form.employeeId" style="width: 370px;"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="true">男</el-radio>
          <el-radio v-model="form.sex" label="false" >女</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" style="width: 370px;"/>
        </el-form-item>
        <el-form-item label="籍贯" prop="natives">
          <el-input v-model="form.natives" style="width: 370px;"/>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-input v-model="form.education" style="width: 370px;"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" style="width: 370px;"/>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio v-model="form.type" label="true">管理员</el-radio>
          <el-radio v-model="form.type" label="false">普通员工</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add } from '@/api/employee'
export default {
  data() {
    return {
      loading: false, dialog: false, title: '新增员工信息',
      form: { id: '', name: '', employeeId: '', sex: '', birthday: '', natives: '', education: '', email: '', type: '', stat: '' },
      rules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        employeeId: [
          { required: true, message: '请输入员编号', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { id: '', name: '', employeeId: '', sex: '', birthday: '', natives: '', education: '', email: '', type: '', stat: '' }
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          add(this.form).then(res => {
            this.resetForm()
            this.$notify({
              title: '员工添加成功',
              type: 'success',
              duration: 2500
            })
            this.loading = false
            this.$parent.$parent.init()
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
