<template>
  <div class="app-container">
    <!--搜索表单-->
    <el-form :inline="true" :model="searchClass" class="demo-form-inline">
      <el-form-item label="病种信息名称">
        <el-input v-model="searchClass.name" placeholder="请输入病种信息名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>

    <!--按钮-->
    <el-row>
      <el-button type="primary" size="medium" @click="openDialog('add')">+ 新增病种信息</el-button>
    </el-row>
    <br>
    <!--新增/编辑数据对话框表单-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form ref="diseaseForm" :model="form" :rules="rules" label-width="150px" size="mini">
        <el-form-item label="疾病编码" prop="disId">
          <el-input v-model="form.disId"></el-input>
        </el-form-item>
        <el-form-item label="病种名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="疾病种类" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="(label, value) in diseaseTypeOptions"
              :key="value"
              :label="label"
              :value="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病报销标志" prop="reimbursementStandards">
          <el-select v-model="form.reimbursementStandards" placeholder="请选择">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="form.note"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validateForm">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <br>
    <!--表格显示诊疗项目信息-->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
      <el-table-column prop="disId" label="疾病编码" align="center"></el-table-column>
      <el-table-column prop="name" label="病种名称" align="center"></el-table-column>
      <el-table-column prop="type" label="疾病种类" align="center">
        <template slot-scope="scope">
          {{ getDiseaseTypeLabel(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="reimbursementStandards" label="疾病报销标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.reimbursementStandards ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" align="center"></el-table-column>
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
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import { page, add, update, selectById, deleteById } from "@/api/disease.js";
import { findAll } from "@/api/disease.js";
import { getToken } from '@/utils/auth';

export default {
  data() {
    return {
      diseaseTypeOptions: {
        0: '心血管系统疾病',
        1: '消化系统疾病',
        2: '代谢内分泌疾病',
        3: '造血系统疾病',
        4: '肾脏疾病',
        5: '神经系统',
        6: '免疫系统疾病',
        7: '传染病',
        8: '呼吸系统疾病',
        9: '恶性肿瘤',
        10: '精神病',
        11: '残疾',
        12: '泌尿系统',
        13: '其他'
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
        disId: '',
        name: '',
        type: '',
        reimbursementStandards: '',
        note: ''
      },
      rules: {
        disId: [{ required: true, message: '请输入疾病编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入病种名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择疾病种类', trigger: 'change' }],
        reimbursementStandards: [{ required: true, message: '请选择疾病报销标志', trigger: 'change' }],
        note: [{ required: false, message: '请输入备注', trigger: 'blur' }]
      },
      tableData: [],
      token: { token: getToken() },
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
      this.dialogTitle = type === 'add' ? '新增疾病信息' : '编辑疾病信息';
      if (type === 'add') {
        this.form = {
          disId: '',
          name: '',
          type: '',
          reimbursementStandards: '',
          note: ''
        };
      } else {
        this.form = { ...row };
      }
      this.dialogVisible = true;
    },
    validateForm() {
      this.$refs.diseaseForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            this.addNewDisease();
          } else {
            this.saveEdit();
          }
        }
      });
    },
    addNewDisease() {
      add(this.form).then((response) => {
        if (response.data.code === 1) {
          this.$message({ type: 'success', message: '新增病种成功!' });
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
          this.$message({ type: 'success', message: '病种更新成功!' });
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
      this.$confirm('此操作将永久删除该病种信息, 是否继续?', '警告', {
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
    getDiseaseTypeLabel(value) {
      return this.diseaseTypeOptions[value] || '未知';
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
