<template>
  <div class="app-container">
    <!--搜索表单-->
    <el-form :inline="true" :model="searchClass" class="demo-form-inline">
      <el-form-item label="药品名称">
        <el-input v-model="searchClass.name" placeholder="请输入药品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
    <br>
    <!--按钮-->
    <el-row>
      <el-button type="primary" size="medium" @click="addDialogVisible = true;">+ 新增药品</el-button>
    </el-row>
    <br>
    <!--新增数据对话框表单-->
    <el-dialog title="新增药品项目" :visible.sync="addDialogVisible" width="50%">
      <el-form ref="newDrugForm" :model="medicine" :rules="rules" label-width="150px" size="mini">
        <el-form-item label="药品编码" prop="medicId">
          <el-input v-model="medicine.medicId"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="name">
          <el-input v-model="medicine.name"></el-input>
        </el-form-item>
        <el-form-item label="收费类别" prop="expType">
          <el-select
            v-model="medicine.expType"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费项目等级" prop="expLevel">
          <el-select v-model="medicine.expLevel" placeholder="请选择">
            <el-option label="甲类" value="0"></el-option>
            <el-option label="乙类" value="1"></el-option>
            <el-option label="丙类" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品剂量单位" prop="measurement">
          <el-input v-model="medicine.measurement"></el-input>
        </el-form-item>
        <el-form-item label="最高限价" prop="maxPrice">
          <el-input v-model="medicine.maxPrice"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审批标志" prop="approvalMark">
          <el-select v-model="medicine.approvalMark" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院等级" prop="hosLevel">
          <el-select v-model="medicine.hosLevel" placeholder="请选择">
            <el-option label="一级医院" value="0"></el-option>
            <el-option label="二级医院" value="1"></el-option>
            <el-option label="三级医院" value="2"></el-option>
            <el-option label="社区医院" value="3"></el-option>
            <el-option label="所有医院" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="size">
          <el-input v-model="medicine.size"></el-input>
        </el-form-item>
        <el-form-item label="药品商品名" prop="tradeName">
          <el-input v-model="medicine.tradeName"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="startTime">
          <el-date-picker v-model="medicine.startTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%" format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="endTime">
          <el-date-picker v-model="medicine.endTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%" format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标志" prop="valid">
          <el-select v-model="medicine.valid" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特检特制标志" prop="specialMark">
          <el-select v-model="medicine.specialMark" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validateForm('newDrugForm')">保存</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
    <!--表格显示药品信息-->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="index" width="100" label="序号" align="center" type="index"></el-table-column>
      <el-table-column prop="medicId" width="150" label="药品编码" align="center"></el-table-column>
      <el-table-column prop="name" width="150" label="药品名称" align="center"></el-table-column>
      <el-table-column label="收费类别" width="150" align="center">
        <template slot-scope="scope">
          {{ getExpTypeLabel(scope.row.expType) }}
        </template>
      </el-table-column>
      <el-table-column label="收费项目等级" width="150" align="center">
        <template slot-scope="scope">
          {{ getExpLevelLabel(scope.row.expLevel) }}
        </template>
      </el-table-column>
      <el-table-column prop="measurement" width="150" label="药品剂量单位" align="center"></el-table-column>
      <el-table-column prop="maxPrice" width="100" label="最高限价" align="center"></el-table-column>
      <el-table-column prop="approvalMark" width="150" label="是否需要审批标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.approvalMark ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="医院等级" align="center">
        <template slot-scope="scope">
          {{ getHosLevelLabel(scope.row.hosLevel) }}
        </template>
      </el-table-column>
      <el-table-column prop="size" width="150" label="规格" align="center"></el-table-column>
      <el-table-column prop="tradeName" width="200" label="药品商品名" align="center"></el-table-column>
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
      <el-table-column prop="valid" width="150" label="有效标识" align="center">
        <template slot-scope="scope">
          {{ scope.row.valid ? '有效' : '无效' }}
        </template>
      </el-table-column>
      <el-table-column prop="specialMark" width="150" label="特检特制标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.specialMark ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
 
    <!--编辑数据对话框表单-->
    <el-dialog :visible.sync="dialogVisible" title="编辑药品" width="50%">
      <el-form :model="editForm" label-width="150px" :rules="rules">
        <el-form-item label="药品编码" prop="medicId">
          <el-input v-model="editForm.medicId"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="收费类别" prop="expType">
          <el-select v-model="editForm.expType" placeholder="请选择">
            <el-option
              v-for="(label, value) in expTypeOptions"
              :key="value"
              :label="label"
              :value="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费项目等级" prop="expLevel">
          <el-select v-model="editForm.expLevel" placeholder="请选择">
            <el-option
              v-for="(label, value) in expLevelOptions"
              :key="value"
              :label="label"
              :value="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品剂量单位" prop="measurement">
          <el-input v-model="editForm.measurement"></el-input>
        </el-form-item>
        <el-form-item label="最高限价" prop="maxPrice">
          <el-input v-model="editForm.maxPrice"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审批标志" prop="approvalMark">
          <el-select v-model="editForm.approvalMark" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院等级" prop="hosLevel">
          <el-select v-model="editForm.hosLevel" placeholder="请选择">
            <el-option
              v-for="(label, value) in hosLevelOptions"
              :key="value"
              :label="label"
              :value="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="size">
          <el-input v-model="editForm.size"></el-input>
        </el-form-item>
        <el-form-item label="药品商品名" prop="tradeName">
          <el-input v-model="editForm.tradeName"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="startTime">
          <el-date-picker v-model="editForm.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="endTime">
          <el-date-picker v-model="editForm.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标识" prop="valid">
          <el-switch v-model="editForm.valid"></el-switch>
        </el-form-item>
        <el-form-item label="特检特制标志" prop="specialMark">
          <el-switch v-model="editForm.specialMark"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </div>
    </el-dialog>

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
import { page, add, update, selectById, deleteById } from "@/api/medicine.js";
import { findAll } from "@/api/medicine.js";
import { getToken } from '@/utils/auth';

export default {
  data() {
    return {
      expTypeOptions: {
        0: '西药',
        1: '中成药',
        2: '中草药',
        22: '非处方药',
        23: '处方药'
      },
      // 收费项目等级映射
      expLevelOptions: {
        0: '甲类',
        1: '乙类',
        2: '丙类'
      },
      // 医院等级映射
      hosLevelOptions: {
        0: '一级医院',
        1: '二级医院',
        2: '三级医院',
        3: '社区医院',
        4: '所有医院'
      },
      background: true,
      pageSize: 5,
      totalCount: 0, // 初始化为0
      currentPage: 1,
      addDialogVisible: false,
      editDialogVisible: false,
      searchClass: { name: "" },
      newClass: {},
      editClass: {},
      masterList: [],
      searchTime: ["", ""],
      tableData: [],
      token: { token: getToken() },
      //新建表单
      medicine: {
        medicId: '',
        name: '',
        expType: '',
        expLevel: '',
        measurement: '',
        maxPrice: '',
        approvalMark: '',
        hosLevel: '',
        size: '',
        tradeName: '',
        startTime: '',
        endTime: '',
        valid: '',
        specialMark: ''
      },
      rules: {
        medicId: [{ required: true, message: '请输入药品编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入药品名称', trigger: 'blur' }],
        expType: [{ required: true, message: '请选择收费类别', trigger: 'change' }],
        expLevel: [{ required: true, message: '请选择收费项目等级', trigger: 'change' }],
        measurement: [{ required: true, message: '请输入药品剂量单位', trigger: 'blur' }],
        maxPrice: [{ required: true, message: '请输入最高限价', trigger: 'blur' }],
        approvalMark: [{ required: true, message: '请选择是否需要审批标志', trigger: 'change' }],
        hosLevel: [{ required: true, message: '请选择医院等级', trigger: 'change' }],
        size: [{ required: true, message: '请输入规格', trigger: 'blur' }],
        tradeName: [{ required: true, message: '请输入药品商品名', trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择终止日期', trigger: 'change' }],
        valid: [{ required: true, message: '请选择有效标志', trigger: 'change' }],
        specialMark: [{ required: true, message: '请选择特检特制标志', trigger: 'change' }]
      },
      options: [], // 收费类别选项
      loading: false, // 远程加载状态

      tableData: [
        // 示例数据
        // {
        //   id: 1,
        //   medicId: '001',
        //   name: '药品A',
        //   expType: '类别1',
        //   expLevel: '等级1',
        //   measurement: 'mg',
        //   maxPrice: 100,
        //   approvalMark: true,
        //   hosLevel: '三级甲等',
        //   size: '10mg/片',
        //   tradeName: '品牌A',
        //   startTime: '2024-01-01',
        //   endTime: '2024-12-31',
        //   valid: true,
        //   specialMark: false,
        // },
        // 更多数据
      ],
      dialogVisible: false,
      editForm: {
        id: '',
        medicId: '',
        name: '',
        expType: '',
        expLevel: '',
        measurement: '',
        maxPrice: '',
        approvalMark: false,
        hosLevel: '',
        size: '',
        tradeName: '',
        startTime: '',
        endTime: '',
        valid: false,
        specialMark: false,
      }
    }
  },

  mounted() {
    this.page();
    findAll().then((result) => {
      this.masterList = result.data.data.map(item => ({ id: item.id, name: item.name }));
    });
  },

  methods: {
    // 在表格中使用的方法
    getExpTypeLabel(value) {
      return this.expTypeOptions[value] || '未知';
    },
    getExpLevelLabel(value) {
      return this.expLevelOptions[value] || '未知';
    },
    getHosLevelLabel(value) {
      return this.hosLevelOptions[value] || '未知';
    },
    page() {
      page(this.searchClass.name, this.currentPage, this.pageSize).then((res) => {
        this.totalCount = res.data.data.total;
        this.tableData = res.data.data.rows;
      }).catch((error) => {
        this.$message.error('加载数据失败，请稍后重试');
      });
    },
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addNewClass();
        }
      });
    },
    addNewClass() {
      add(this.medicine).then((response) => {
        if (response.data.code === 1) {
          this.$message({ type: 'success', message: '新增药品成功!' });
          this.addDialogVisible = false;
          this.medicine = {}; // 清空表单
          this.page(); // 重新加载数据
        } else {
          this.$message.error(response.data.msg);
        }
      }).catch((error) => {
        this.$message.error('新增药品失败，请稍后重试');
      });
    },
    openEditDialog(row) {
      this.editForm = { ...row };
      this.dialogVisible = true;
    },
    saveEdit() {
      update(this.editForm).then((response) => {
        if (response.data.code === 1) {
          this.$message({ type: 'success', message: '药品更新成功!' });
          this.dialogVisible = false;
          this.page(); // 重新加载数据
        } else {
          this.$message.error(response.data.msg);
        }
      }).catch((error) => {
        this.$message.error('更新药品失败，请稍后重试');
      });
    },
    deleteById(id) {
      this.$confirm('此操作将永久删除该药品, 是否继续?', '警告', {
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
        }).catch((error) => {
          this.$message.error('删除药品失败，请稍后重试');
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
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        // 模拟远程搜索
        setTimeout(() => {
          this.loading = false;
          this.options = [
            { value: '0', label: '西药' },
            { value: '1', label: '中成药' },
            { value: '2', label: '中草药' },
            { value: '22', label: '非处方药' },
            { value: '23', label: '处方药' }
          ];
        }, 200);
      } else {
        this.options = [];
      }
    },
    formatDate(date) {
      return date ? date.split('T')[0] : '';
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
