<template>
  <div>
    <span style="display:block;" @click="to">修改密码</span>
    <el-dialog :visible.sync="dialog" :append-to-body="true" :close-on-click-modal="false" :title="title" style="text-align: left" width="500px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="140px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" style="width: 200px;"/>
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
import { updatePass } from '@/api/user'
export default {
  data() {
    const validConfirmPassword = (rule, value, callback) => {
      if (this.form.newPassword === value) {
        callback()
      } else {
        callback(new Error('两次密码不相同'))
      }
    }
    const validNewPasswordPassword = (rule, value, callback) => {
      if (this.form.oldPassword === value) {
        callback(new Error('新密码和旧密码不能相同'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialog: false,
      title: '修改密码',
      form: { oldPassword: '', newPassword: '', confirmPassword: '' },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validNewPasswordPassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    to() {
      this.dialog = true
    },
    cancel() {
      this.resetForm()
    },
    resetForm() {
      this.dialog = false
      this.loading = false
      this.$refs['form'].resetFields()
      this.form = { oldPassword: '', newPassword: '', confirmPassword: '' }
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        debugger
        if (valid) {
          this.loading = true
          updatePass(this.form.oldPassword, this.form.newPassword).then(res => {
            this.resetForm()
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2500
            })
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
    margin-right: 3px;
  }
</style>
