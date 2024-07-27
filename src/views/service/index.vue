<template>
  <div class="app-container">
    <!--搜索表单-->
    <el-form :inline="true" :model="searchClass" class="demo-form-inline">
      <el-form-item label="服务设施项目名称">
        <el-input v-model="searchClass.name" placeholder="请输入设施名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>

    <!--按钮-->
    <el-row>
      <el-button type="primary" size="medium" @click="openDialog('add')">+ 新增服务设施</el-button>
    </el-row>
    <br>
    <!--新增/编辑数据对话框表单-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form ref="facilityForm" :model="form" label-width="150px" size="mini">
        <el-form-item label="医疗服务设施编码" prop="serId">
          <el-input v-model="form.serId"></el-input>
        </el-form-item>
        <el-form-item label="服务设施名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="收费类别" prop="expType">
          <el-select v-model="form.expType" placeholder="请选择">
            <el-option
              v-for="(label, value) in expTypeOptions"
              :key="value"
              :label="label"
              :value="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="startTime">
          <el-date-picker v-model="form.startTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="endTime">
          <el-date-picker v-model="form.endTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标志" prop="valid">
          <el-select v-model="form.valid" placeholder="请选择">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validateForm">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--表格显示诊疗项目信息-->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
      <el-table-column prop="serId" width="150" label="医疗服务设施编码" align="center"></el-table-column>
      <el-table-column prop="name" width="200" label="服务设施名称" align="center"></el-table-column>
      <el-table-column prop="expType" width="150" label="收费类别" align="center">
        <template slot-scope="scope">
          {{ getExpTypeLabel(scope.row.expType) }}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" width="150" label="开始日期" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" width="150" label="终止日期" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="valid" width="150" label="有效标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.valid ? '有效' : '无效' }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openDialog('edit', scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页工具条-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :background="background"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import { page, add, update, selectById, deleteById } from "@/api/service.js";
import { findAll } from "@/api/service.js";
import { getToken } from '@/utils/auth';

export default {
  data() {
    return {
      expTypeOptions: {

        24: '甲类',
        25: '乙类',
        26: '丙类',

      },
      background: true,
      pageSize: 5,
      totalCount: 100,
      currentPage: 1,
      dialogVisible: false,
      dialogTitle: '',
      dialogType: 'add',
      searchClass: { name: "" },
      form: {
        serId: '',
        name: '',
        expType: '',
        startTime: '',
        endTime: '',
        valid: ''
      },
      tableData: [],
      token: { token: getToken() },
      options: [],
      loading: false,
    };
  },

  mounted() {
    this.page();
    findAll().then((result) => {
      this.masterList = result.data.data.map(item => ({ id: item.id, name: item.name }));
    });
  },

  methods: {
    openDialog(type, row = null) {
      this.dialogType = type;
      this.dialogTitle = type === 'add' ? '新增医疗服务设施' : '编辑医疗服务设施';
      if (type === 'add') {
        this.form = {
          serId: '',
          name: '',
          expType: '',
          startTime: '',
          endTime: '',
          valid: ''
        };
      } else {
        this.form = { ...row };
      }
      this.dialogVisible = true;
    },
    validateForm() {
      this.$refs.facilityForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            this.addNewFacility();
          } else {
            this.saveEdit();
          }
        }
      });
    },
    addNewFacility() {
      add(this.form).then((response) => {
        if (response.data.code === 1) {
          this.$message({ type: 'success', message: '新增服务设施成功!' });
          this.dialogVisible = false;
          this.form = {}; // 清空表单
          this.page(); // 重新加载数据
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    saveEdit() {
      update(this.form).then((response) => {
        if (response.data.code === 1) {
          this.$message({ type: 'success', message: '服务设施更新成功!' });
          this.dialogVisible = false;
          this.page(); // 重新加载数据
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    page() {
      page(this.searchClass.name, this.currentPage, this.pageSize).then((res) => {
        this.totalCount = res.data.data.total;
        this.tableData = res.data.data.rows;
      });
    },
    deleteById(id) {
      this.$confirm('此操作将永久删除该服务设施, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then((response) => {
          if (response.data.code === 1) {
            this.$message({ type: 'success', message: '删除成功!' });
            this.page(); // 重新加载数据
          } else {
            this.$message.error(response.data.msg);
          }
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    clear() {
      this.searchClass = { name: "" };
      this.page();
    },
    onSubmit() {
      this.currentPage = 1;
      this.page();
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.page();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.page();
    },
    getExpTypeLabel(value) {
      return this.expTypeOptions[value] || '未知';
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (`0${d.getMonth() + 1}`).slice(-2);
      const day = (`0${d.getDate()}`).slice(-2);
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style>
.app-container {
  margin: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
