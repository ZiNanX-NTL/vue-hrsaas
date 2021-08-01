<!--
 * @Author: your name
 * @Date: 2021-07-20 22:40:21
 * @LastEditTime: 2021-07-30 00:29:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hrsaas\src\views\departments\index.vue
-->
<template>
  <div v-loading="loading" class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <tree-tools :tree-node="company" :is-root="true" />

        <el-tree :data="departs" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>

    <!-- 放置新增弹层组件  -->
    <add-dept ref="addDept" :show-dialog="showDialog" :tree-node="node" @addDepts="getDepartments" @closeDialog="showDialog=false" />
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'

export default {
  components: {
    treeTools,
    AddDept
  },
  data() {
    return {
      company: { }, // 头部的数据结构
      departs: [],
      showDialog: false, // 显示窗体
      node: {},
      loading: false // 用来控制进度弹层的显示和隐藏
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '') // 需要转化成树形结构
      this.loading = false
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
    },
    editDepts(node) {
      // 首先打开弹层
      this.showDialog = true
      this.node = node // 赋值操作的节点
      this.$refs.addDept.getDepartDetail(node.id) // 直接调用子组件中的方法 传入一个id
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
