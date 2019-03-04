<template>
  <div class="app-container">
    <search :query="query"/>
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="name" label="员工姓名"/>
      <el-table-column prop="employeeId" label="编号"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="birthday" label="生日"/>
      <el-table-column prop="natives" label="籍贯"/>
      <el-table-column prop="education" label="学历"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ time(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-model="scope.row.delPopover"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.delPopover = false">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.$index, scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini" @click="scope.row.delPopover = true">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>
<script>
import initData from '../../../mixins/initData'
import { parseTime } from '@/utils/index'
import edit from './module/edit'
import search from './module/search'
import { del } from '@/api/user'
export default {
  components: {
    edit,
    search
  },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    beforeInit() {
      this.url = 'api/users'
      this.params = { page: this.page, size: this.size }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) {
        this.params[type] = value
      }
      return true
    },
    time(time) {
      return parseTime(time)
    },
    subDelete(index, row) {
      this.delLoading = true
      del(row.id).then(res => {
        this.delLoading = false
        row.delPopover = false
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        row.delPopover = false
        console.log(err.response.data.message)
      })
    }
  }
}

</script>

<style scoped>

</style>
