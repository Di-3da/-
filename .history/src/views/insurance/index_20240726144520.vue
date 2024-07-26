<template>
    <div class="app-container">
        <!-- 申请报销按钮 -->
        <el-button type="primary" @click="applyReimbursement">申请报销</el-button>
  
        <!-- 报销信息CRUD表格 -->
        <el-table :data="expenseClaims" style="width: 100%; margin-top: 20px;" border>
            <el-table-column prop="id" label="编号" width="80"></el-table-column>
            <el-table-column prop="name" label="报销人"></el-table-column>
            <el-table-column prop="amount" label="报销金额"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="viewClaim(scope.row)">查看报销单</el-button>
                    <el-button type="danger" @click="deleteClaim(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
  
        <!-- 第一步对话框：确定报销人员 -->
        <el-dialog :visible.sync="step1Visible" title="确定报销人员">
            <div slot="title" style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 18px">确定报销人员</span>
                <span style="color: red; font-size: 12px;margin-right: 30px">注：请一次填完所有信息，退出后需重新填写</span>
            </div>
  
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="证件编号" label-width="80px">
                            <el-input v-model="personId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名" label-width="80px">
                            <el-input v-model="personName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="confirmPerson">确认</el-button>
                    <el-button @click="clearInput">清空</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="personResults" v-if="personResults.length" border>
                  <el-table-column prop="id" label="ID"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="gender" label="性别"></el-table-column>
                  <el-table-column prop="idNumber" label="证件编号"></el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                          <el-button @click="selectPerson(scope.row)">选择</el-button>
                      </template>
                  </el-table-column>
              </el-table>
              <br>
            <el-button type="primary" @click="nextStep1" v-if="selectedPerson">下一步</el-button>
        </el-dialog>
  
        <!-- 第二步对话框：录入就诊信息 -->
        <el-dialog :visible.sync="step2Visible" title="录入就诊信息" center>
            <div slot="title" style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 18px">录入就诊信息</span>
                <span style="color: red; font-size: 12px;margin-right: 30px">注：请一次填完所有信息，退出后需重新填写</span>
            </div>
            <el-form label-width="140px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="证件编号">
                            <el-input v-model="selectedPersonId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="住院号（门诊号）">
                            <el-input v-model="hospitalNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="定点医疗机构编号">
                            <el-input v-model="institutionId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="医疗类别">
                            <el-select v-model="medicalCategory" placeholder="请选择医疗类别">
                                <el-option label="普通门诊" value="0"></el-option>
                                <el-option label="定点药店购药" value="1"></el-option>
                                <el-option label="急诊抢救" value="2"></el-option>
                                <el-option label="普通住院" value="3"></el-option>
                                <el-option label="生育门诊" value="4"></el-option>
                                <el-option label="节育门诊" value="5"></el-option>
                                <el-option label="生育住院" value="6"></el-option>
                                <el-option label="节育住院" value="7"></el-option>
                                <el-option label="所有类别" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="入院日期">
                            <el-date-picker v-model="admissionDate" type="date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出院日期">
                            <el-date-picker v-model="dischargeDate" type="date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="病种编码">
                            <el-input v-model="diseaseCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="医院等级">
                            <el-select v-model="hospitalLevel" placeholder="请选择医院等级">
                                <el-option label="一级医院" value="0"></el-option>
                                <el-option label="二级医院" value="1"></el-option>
                                <el-option label="三级医院" value="2"></el-option>
                                <el-option label="社区医院" value="3"></el-option>
                                <el-option label="所有医院" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="入院诊断疾病编码">
                            <el-input v-model="admissionDiagnosisCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="入院诊断疾病名称">
                            <el-input v-model="admissionDiagnosisName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="出院原因">
                            <el-select v-model="dischargeReason" placeholder="请选择出院原因">
                                <el-option label="正常治愈出院" value="0"></el-option>
                                <el-option label="未治愈出院" value="1"></el-option>
                                <el-option label="医院要求转院" value="2"></el-option>
                                <el-option label="病人要求转院" value="3"></el-option>
                                <el-option label="院内相关疾病转科治疗" value="4"></el-option>
                                <el-option label="院内无关疾病专科治疗" value="5"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结算标志">
                            <el-input v-model="settlementFlag"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="nextStep2">下一步</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
  
        <!-- 第三步对话框：录入处方明细 -->
        <el-dialog :visible.sync="step3Visible" title="录入处方明细" center>
            <div slot="title" style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 18px">录入处方明细</span>
                <span style="color: red; font-size: 12px;margin-right: 30px">注：请一次填完所有信息，退出后需重新填写</span>
            </div>
            <el-table :data="prescriptionDetails" border>
                <el-table-column prop="hospitalNumber" label="住院号（门诊号）" width="140px"></el-table-column>
                <el-table-column prop="category" label="收费项目类别" width="140px"></el-table-column>
                <el-table-column prop="itemCode" label="项目编码" width="140px"></el-table-column>
                <el-table-column prop="itemName" label="项目名称" width="140px"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column prop="quantity" label="数量"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
                <el-table-column label="操作" fixed="right" width="100px">
                    <template slot-scope="scope">
                        <el-button @click="removePrescription(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="showAddPrescriptionDialog">添加处方</el-button>
            <el-button type="success" @click="submitReimbursement">提交报销申请</el-button>
        </el-dialog>
  
        <!-- 添加处方对话框 -->
        <el-dialog :visible.sync="addPrescriptionVisible" @open="clearNewPrescriptionData" title="添加处方" center>
            <div slot="title" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span>添加处方</span>
                <span style="color: #d9534f; font-size: 12px; margin-right: 30px;">注：请一次填完所有信息，退出后需重新填写</span>
            </div>
            <el-form>
                <el-form-item label="住院号（门诊号）">
                <!-- 可以不显示 -->
                    <el-input v-model="newPrescription.hospitalNumber"></el-input>
                </el-form-item>
                <el-form-item label="收费项目类别">
                    <el-select v-model="newPrescription.category" placeholder="请选择收费项目类别" @change="handleCategoryChange">
                        <el-option label="药品" value="药品"></el-option>
                        <el-option label="诊疗项目" value="诊疗项目"></el-option>
                        <el-option label="服务设施" value="服务设施"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="newPrescription.category">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-form-item label="编码" label-width="80px">
                                <el-input v-model="searchCode" placeholder="输入编码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="名称" label-width="80px">
                                <el-input v-model="searchName" placeholder="输入名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" @click="searchCategoryItems">查询</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item v-if="categoryTableVisible">
                    <el-table :data="categoryItems" border>
                        <el-table-column prop="code" label="编码"></el-table-column>
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop="price" label="单价"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button @click="selectCategoryItem(scope.row)">选择</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目编码" label-width="80px">
                            <el-input v-model="newPrescription.itemCode" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目名称" label-width="80px">
                            <el-input v-model="newPrescription.itemName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="单价" label-width="80px">
                            <el-input v-model="newPrescription.price" type="number" disabled @input="calculateAmount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="数量" label-width="80px">
                            <el-input v-model="newPrescription.quantity" type="number" @input="calculateAmount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="金额" label-width="80px">
                            <el-input v-model="newPrescription.amount" type="number" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="addPrescription">确定</el-button>
                    <el-button @click="addPrescriptionVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
  
        <!-- 第四步对话框：等待审批 -->
        <el-dialog :visible.sync="step4Visible" title="等待审批" center>
            <el-alert title="审批中，请等待..." type="info" show-icon></el-alert>
        </el-dialog>
  
        <!-- 审批结果对话框 -->
        <el-dialog :visible.sync="step5Visible" title="审批结果" center>
            <div slot="title" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span>审批结果</span>
            </div>
            <div v-if="approved">
                <el-alert title="审批通过" type="success" show-icon></el-alert>
                <el-table :data="[settlementDetails]" border style="width: 100%; margin-top: 20px;">
                    <el-table-column prop="totalAmount" label="费用总额"></el-table-column>
                    <el-table-column prop="reimbursedAmount" label="报销金额"></el-table-column>
                    <el-table-column prop="selfPaidAmount" label="自费金额"></el-table-column>
                    <el-table-column prop="annualReimbursedAmount" label="年度累计报销金额"></el-table-column>
                    <el-table-column prop="deductible" label="起付标准"></el-table-column>
                    <el-table-column prop="segmentSelfPaidAmount" label="分段计算中自费金额"></el-table-column>
                    <el-table-column prop="reimbursementCap" label="报销封顶线"></el-table-column>
                    <el-table-column prop="classBProjectSelfPaidAmount" label="乙类项目自费金额"></el-table-column>
                    <el-table-column prop="specialInspectionSelfPaidAmount" label="特检特治自费金额"></el-table-column>
                </el-table>
                <div style="margin-top: 20px; text-align: right;">
                    <el-button type="primary" @click="confirmReimbursement">确认</el-button>
                    <el-button @click="cancelReimbursement">取消</el-button>
                </div>
            </div>
            <div v-else>
                <el-alert title="审批未通过" type="error" show-icon></el-alert>
            </div>
        </el-dialog>
  
        <!-- 打印结算单据对话框 -->
        <el-dialog :visible.sync="printDialogVisible" title="打印结算单据" center>
            <el-alert title="审批通过" type="success" show-icon></el-alert>
            <div style="margin-top: 20px; text-align: right;">
                <el-button type="primary" @click="printReceipt">打印结算单据</el-button>
                <el-button @click="closePrintDialog">关闭</el-button>
            </div>
        </el-dialog>
    </div>
  </template>
  
  <script>

    import { page, add, update, selectById, deleteById } from "@/api/insurance.js";
    import { query } from "@/api/people.js";
    import { findAll } from "@/api/insurance.js";
  export default {
  data() {
    return {
      expenseClaims: [
        { id: 1, name: '张三', amount: 100, status: '已提交' },
        // 更多示例数据
      ],
      step1Visible: false,
      step2Visible: false,
      step3Visible: false,
      step4Visible: false,
      step5Visible: false,
      printDialogVisible: false,
      personId: '',
      selectedPersonId:'',
      personName: '',
      personResults: [],
      selectedPerson: null,
      visitDate: '',
      hospitalName: '',
      diagnosisResult: '',
      prescriptionDetails: [],
      approved: false,
      settlementDetails: {
        totalAmount: 10000,
        reimbursedAmount: 8000,
        selfPaidAmount: 2000,
        annualReimbursedAmount: 15000,
        deductible: 500,
        segmentSelfPaidAmount: 300,
        reimbursementCap: 20000,
        classBProjectSelfPaidAmount: 400,
        specialInspectionSelfPaidAmount: 600
      },
      hospitalNumber: '',
      institutionId: '',
      medicalCategory: '',
      admissionDate: '',
      dischargeDate: '',
      diseaseCode: '',
      hospitalLevel: '',
      admissionDiagnosisCode: '',
      admissionDiagnosisName: '',
      dischargeReason: '',
      settlementFlag: '',
      addPrescriptionVisible: false,
      categoryTableVisible: false,
      categoryItems: [],
      searchCode: '',
      searchName: '',
      newPrescription: {
        hospitalNumber: '',
        category: '',
        itemCode: '',
        itemName: '',
        price: 0,
        quantity: 1,
        amount: 0
      }
    };
  },
  methods: {
  
    applyReimbursement() {
          this.clearAllData();
          this.step1Visible = true;
      },
      // 其他方法保持不变
      clearAllData() {
          // 清除步骤1的数据
          this.personId = '';
          this.personName = '';
          this.personResults = [];
          this.selectedPerson = null;
          
          // 清除步骤2的数据
          this.hospitalNumber = '';
          this.institutionId = '';
          this.medicalCategory = '';
          this.admissionDate = '';
          this.dischargeDate = '';
          this.diseaseCode = '';
          this.hospitalLevel = '';
          this.admissionDiagnosisCode = '';
          this.admissionDiagnosisName = '';
          this.dischargeReason = '';
          this.settlementFlag = '';
          
          // 清除步骤3的数据
          this.prescriptionDetails = [];
          this.newPrescription = {
              hospitalNumber: '',
              category: '',
              itemCode: '',
              itemName: '',
              price: 0,
              quantity: 1,
              amount: 0
          };
          this.categoryTableVisible = false;
          this.categoryItems = [];
          this.searchCode = '';
          this.searchName = '';
      },
    viewClaim(row) {
      // 查看报销单逻辑
    },
    deleteClaim(row) {
      // 删除报销单逻辑
      const index = this.expenseClaims.indexOf(row);
      if (index !== -1) {
        this.expenseClaims.splice(index, 1);
      }
    },
    confirmPerson() {
      // 模拟后端查询逻辑
      query(this.personId, this.personName).then((res) => {
        this.personResults = res.data.data;
      });
    },
    clearInput() {
      this.personId = '';
      this.personName = '';
      this.personResults = [];
      this.selectedPerson = null;
    },
    selectPerson(person) {
      this.selectedPerson = person;
    },
    selectPerson(person) {
      this.selectedPerson = person;
      this.selectedPersonId = person.id; // 将选中的证件编号赋值给新的变量
    },
    nextStep1() {
      this.step1Visible = false;
      this.step2Visible = true;
    },
    nextStep2() {
      this.step2Visible = false;
      this.step3Visible = true;
    },
    clearStep1Data() {
      this.personId = '';
      this.personName = '';
      this.personResults = [];
      this.selectedPerson = null;
    },
    handleCategoryChange(value) {
      // 清空查询条件
      this.searchCode = '';
      this.searchName = '';
      this.categoryItems = [];
      this.categoryTableVisible = false;
    },
    searchCategoryItems() {
      // 模拟根据类别、编码和名称进行查询的逻辑
      if (this.newPrescription.category === '药品') {
        this.categoryItems = [
          { code: '001', name: '药品A', price: 10 },
          { code: '002', name: '药品B', price: 20 }
        ].filter(item => {
          return (
            item.code.includes(this.searchCode) && 
            item.name.includes(this.searchName)
          );
        });
      } else if (this.newPrescription.category === '诊疗项目') {
        this.categoryItems = [
          { code: '101', name: '诊疗项目A', price: 100 },
          { code: '102', name: '诊疗项目B', price: 200 }
        ].filter(item => {
          return (
            item.code.includes(this.searchCode) && 
            item.name.includes(this.searchName)
          );
        });
      } else if (this.newPrescription.category === '服务设施') {
        this.categoryItems = [
          { code: '201', name: '服务设施A', price: 1000 },
          { code: '202', name: '服务设施B', price: 2000 }
        ].filter(item => {
          return (
            item.code.includes(this.searchCode) && 
            item.name.includes(this.searchName)
          );
        });
      }
      this.categoryTableVisible = true;
    },
    clearNewPrescriptionData() {
      this.newPrescription = {
        hospitalNumber: '',
        category: '',
        itemCode: '',
        itemName: '',
        price: 0,
        quantity: 1,
        amount: 0
      };
      this.categoryTableVisible = false;
      this.categoryItems = [];
      this.searchCode = '';
      this.searchName = '';
    },
    showAddPrescriptionDialog() {
      this.clearNewPrescriptionData();
      this.addPrescriptionVisible = true;
    },
    addPrescription() {
      this.prescriptionDetails.push({ ...this.newPrescription });
      this.addPrescriptionVisible = false;
    },
    calculateAmount() {
      this.newPrescription.amount = this.newPrescription.price * this.newPrescription.quantity;
    },
    removePrescription(row) {
      const index = this.prescriptionDetails.indexOf(row);
      if (index !== -1) {
        this.prescriptionDetails.splice(index, 1);
      }
    },
    selectCategoryItem(item) {
      this.newPrescription.itemCode = item.code;
      this.newPrescription.itemName = item.name;
      this.newPrescription.price = item.price;
      this.calculateAmount(); // 确保金额自动计算
      this.categoryTableVisible = false;
    },
    confirmReimbursement() {
      // 保存报销信息到数据库的逻辑
      this.step5Visible = false;
      this.printDialogVisible = true;
    },
    cancelReimbursement() {
      this.step5Visible = false;
    },
    printReceipt() {
      // 打印单据逻辑
      window.print();
    },
    submitReimbursement() {
      this.step3Visible = false;
      this.step4Visible = true;
  
      // 模拟审批过程
      setTimeout(() => {
        this.step4Visible = false;
        this.approved = true; // 模拟审批通过
        this.step5Visible = true;
      }, 2000);
    },
    closePrintDialog() {
      this.printDialogVisible = false;
    }
  }
  };
  </script>
  
  <style scoped>
  .el-dialog {
    width: 50%;
  }
  </style>
  