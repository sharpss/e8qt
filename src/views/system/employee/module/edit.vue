<template>
  <div>
    <el-button :disabled="false" size="mini" type="success" @click="to">编辑</el-button>
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :title="title" :before-close="cancel" style="text-align: left" width="500px">
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
import { edit } from '@/api/employee'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false, title: '编辑员工信息',
      form: { id: '', name: '', employeeId: '', sex: '', birthday: '', natives: '', education: '', email: '', type: '', stat: '' },
      rules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
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
    to() {
      // const _this = this
      this.form = {
        id: this.data.id, name: this.data.name, employeeId: this.data.employeeId, sex: this.data.sex, birthday: this.data.birthday,
        natives: this.data.natives, education: this.data.education, email: this.data.email, type: this.data.type, stat: this.data.stat
      }
      this.dialog = true
    },
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
          const _this = this
          edit(this.form).then(res => {
            this.resetForm()
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2500
            })
            this.loading = false
            _this.sup_this.init()
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
