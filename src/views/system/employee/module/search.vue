<template>
  <div class="head-container">
    <el-input v-model="query.value" clearable placeholder="输入关键字搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <add v-if="checkPermission(['ADMIN','USER_ALL','USER_CREATE'])"/>
  </div>
</template>

<script>
import add from './add'
import checkPermission from '@/utils/permission'
export default {
  components: {
    add
  },
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      queryTypeOptions: [
        { key: 'name', display_name: '姓名' },
        { key: 'employeeId', display_name: '编号' },
        { key: 'email', display_name: '邮箱' }
      ]
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
