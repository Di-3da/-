<template>
    <div class="app-container">
        <!-- 搜索表单 -->
        <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
            <el-form-item label="个人编号">
                <el-input v-model="searchEmp.id" placeholder="请输入个人编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="clear">清空</el-button>
            </el-form-item>
        </el-form>

        <!-- 新增个人信息按钮 -->
        <el-button type="primary" @click="openAddDialog" style="margin-top: 20px;">新增个人信息</el-button>
        <br>
        <br>
        <!-- 个人信息表格 -->
        <el-table :data="personData" style="width: 100%" border>
  <el-table-column prop="peopleId" label="个人ID" width="120"></el-table-column>
  <el-table-column prop="cardType" label="证件类型" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.cardType, documentTypes) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="cardId" label="证件编号" width="150"></el-table-column>
  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
  <el-table-column prop="sex" label="性别" width="80"></el-table-column>
  <el-table-column prop="nationality" label="民族" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.nationality, ethnicities) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="brithday" label="出生日期" width="120"></el-table-column>
  <el-table-column prop="workDate" label="参加工作日期" width="120"></el-table-column>
  <el-table-column prop="retirementDate" label="离退休日期" width="120"></el-table-column>
  <el-table-column prop="retirement" label="离退休状态" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.retirement, retirementStatuses) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="residenceType" label="户口性质" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.residenceType, residenceTypes) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="residenceAdress" label="户口所在地" width="150"></el-table-column>
  <el-table-column prop="education" label="文化程度" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.education, educationLevels) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="politicalStatus" label="政治面貌" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.politicalStatus, politicalStatuses) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="identity" label="个人身份" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.identity, identities) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="employment" label="用工形式" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.employment, employments) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="technicalPosition" label="专业技术职务" width="150">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.technicalPosition, technicalPositions) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="workerLevel" label="国家职业资格等级" width="150">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.workerLevel, workerLevels) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="marriage" label="婚姻状况" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.marriage, marriages) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="administrativePosition" label="行政职务" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.administrativePosition, administrativePositions) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="note" label="备注" width="120"></el-table-column>
  <el-table-column prop="companyId" label="单位编码" width="120"></el-table-column>
  <el-table-column prop="medicalPersonnel" label="医疗人员类别" width="150">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.medicalPersonnel, medicalPersonnelCategories) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="health" label="健康状况" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.health, healthStatuses) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="modelWorker" label="劳模标志" width="100">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.modelWorker, modelWorkerFlags) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="cadre" label="干部标志" width="100">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.cadre, cadreFlags) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="civilServant" label="公务员标志" width="100">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.civilServant, civilServantFlags) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="authorizedStrength" label="在编标志" width="100">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.authorizedStrength, authorizedStrengthFlags) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="residentType" label="居民类别" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.residentType, residentTypes) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="flexibleEmployment" label="灵活就业标志" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.flexibleEmployment, flexibleEmploymentFlags) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="migrantWorker" label="农民工标志" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.migrantWorker, migrantWorkerFlags) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="employer" label="雇主标志" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.employer, employerFlags) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="militaryPersonnel" label="军转人员标志" width="120">
    <template slot-scope="scope">
      <span>{{ getLabelByValue(scope.row.militaryPersonnel, militaryPersonnelFlags) }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="socialSecurityId" label="社保卡号" width="150"></el-table-column>
  <el-table-column prop="medinsId" label="定点医疗机构编码" width="150"></el-table-column>
  <el-table-column label="操作" width="150" fixed="right">
    <template slot-scope="scope">
      <el-button @click="editPerson(scope.row)" type="primary" size="small">编辑</el-button>
      <el-button @click="deletePerson(scope.row)" type="danger" size="small">删除</el-button>
    </template>
  </el-table-column>
</el-table>



        <!-- 新增/编辑个人信息对话框 -->
         <!-- 新增/编辑个人信息对话框 -->
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="80%" custom-class="custom-dialog">
    <el-form :model="formPerson" label-width="150px" class="person-info-form" style="display: flex; flex-wrap: wrap;">
      <el-col :span="8">
        <el-form-item label="证件类型">
          <el-select v-model="formPerson.cardType" placeholder="请选择证件类型">
            <el-option v-for="type in documentTypes" :key="type.value" :label="type.label" :value="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件编号">
          <el-input v-model="formPerson.cardId"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formPerson.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formPerson.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="formPerson.nationality" placeholder="请选择民族" filterable>
            <el-option v-for="ethnicity in ethnicities" :key="ethnicity.value" :label="ethnicity.label" :value="ethnicity.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="formPerson.brithday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="参加工作日期">
          <el-date-picker v-model="formPerson.workDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="离退休日期">
          <el-date-picker v-model="formPerson.retirementDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="离退休状态">
          <el-select v-model="formPerson.retirement" placeholder="请选择离退休状态">
            <el-option v-for="status in retirementStatuses" :key="status.value" :label="status.label" :value="status.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户口性质">
          <el-select v-model="formPerson.residenceType" placeholder="请选择户口性质">
            <el-option v-for="type in residenceTypes" :key="type.value" :label="type.label" :value="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户口所在地">
          <el-input v-model="formPerson.residenceAdress"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="文化程度">
          <el-select v-model="formPerson.education" placeholder="请选择文化程度">
            <el-option v-for="level in educationLevels" :key="level.value" :label="level.label" :value="level.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="formPerson.politicalStatus" placeholder="请选择政治面貌">
            <el-option v-for="status in politicalStatuses" :key="status.value" :label="status.label" :value="status.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人身份">
          <el-select v-model="formPerson.identity" placeholder="请选择个人身份" filterable>
            <el-option v-for="identity in identities" :key="identity.value" :label="identity.label" :value="identity.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用工形式">
          <el-select v-model="formPerson.employment" placeholder="请选择用工形式" filterable>
            <el-option v-for="employment in employments" :key="employment.value" :label="employment.label" :value="employment.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业技术职务">
          <el-select v-model="formPerson.technicalPosition" placeholder="请选择专业技术职务" filterable>
            <el-option v-for="position in technicalPositions" :key="position.value" :label="position.label" :value="position.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家职业资格等级（工人技术等级）">
          <el-select v-model="formPerson.workerLevel" placeholder="请选择职业资格等级" filterable>
            <el-option v-for="level in workerLevels" :key="level.value" :label="level.label" :value="level.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="formPerson.marriage" placeholder="请选择婚姻状况" filterable>
            <el-option v-for="marriage in marriages" :key="marriage.value" :label="marriage.label" :value="marriage.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政职务">
          <el-select v-model="formPerson.administrativePosition" placeholder="请选择行政职务" filterable>
            <el-option v-for="position in administrativePositions" :key="position.value" :label="position.label" :value="position.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formPerson.note"></el-input>
        </el-form-item>
        <el-form-item label="单位编码">
          <el-input v-model="formPerson.companyId"></el-input>
        </el-form-item>
        <el-form-item label="医疗人员类别">
          <el-select v-model="formPerson.medicalPersonnel" placeholder="请选择医疗人员类别" filterable>
            <el-option v-for="category in medicalPersonnelCategories" :key="category.value" :label="category.label" :value="category.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="健康状况">
          <el-select v-model="formPerson.health" placeholder="请选择健康状况" filterable>
            <el-option v-for="status in healthStatuses" :key="status.value" :label="status.label" :value="status.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="劳模标志">
          <el-select v-model="formPerson.modelWorker" placeholder="请选择劳模标志" filterable>
            <el-option v-for="flag in modelWorkerFlags" :key="flag.value" :label="flag.label" :value="flag.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="干部标志">
          <el-select v-model="formPerson.cadre" placeholder="请选择干部标志" filterable>
            <el-option v-for="flag in cadreFlags" :key="flag.value" :label="flag.label" :value="flag.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公务员标志">
          <el-select v-model="formPerson.civilServant" placeholder="请选择公务员标志" filterable>
            <el-option v-for="flag in civilServantFlags" :key="flag.value" :label="flag.label" :value="flag.value"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="在编标志">
          <el-select v-model="formPerson.authorizedStrength" placeholder="请选择在编标志" filterable>
            <el-option v-for="flag in authorizedStrengthFlags" :key="flag.value" :label="flag.label" :value="flag.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居民类别">
          <el-select v-model="formPerson.residentType" placeholder="请选择居民类别" filterable>
            <el-option v-for="type in residentTypes" :key="type.value" :label="type.label" :value="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灵活就业标志">
          <el-select v-model="formPerson.flexibleEmployment" placeholder="请选择灵活就业标志" filterable>
            <el-option v-for="flag in flexibleEmploymentFlags" :key="flag.value" :label="flag.label" :value="flag.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="农民工标志">
          <el-select v-model="formPerson.migrantWorker" placeholder="请选择农民工标志" filterable>
            <el-option v-for="flag in migrantWorkerFlags" :key="flag.value" :label="flag.label" :value="flag.value"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="雇主标志">
          <el-select v-model="formPerson.employer" placeholder="请选择雇主标志" filterable>
            <el-option v-for="flag in employerFlags" :key="flag.value" :label="flag.label" :value="flag.value"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="军转人员标志">
          <el-select v-model="formPerson.militaryPersonnel" placeholder="请选择军转人员标志" filterable>
            <el-option v-for="flag in militaryPersonnelFlags" :key="flag.value" :label="flag.label" :value="flag.value"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="社保卡号">
          <el-input v-model="formPerson.socialSecurityId"></el-input>
        </el-form-item>
        <el-form-item label="定点医疗机构编码">
          <el-input v-model="formPerson.medinsId"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="savePerson">保存</el-button>
    </div>
  </el-dialog>

        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total" :page-size="pageSize"
            :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            style="margin-top: 20px;">
        </el-pagination>
    </div>

</template>

<script>
export default {
    data() {
        return {
            searchEmp: {
                id: ''
            },
            personData: [], // 存储个人信息的数组
            formPerson: {
                peopleId: '',
                cardType: '',
                cardId: '',
                name: '',
                sex: '',
                nationality: '',
                brithday: '',
                workDate: '',
                retirementDate: '',
                retirement: '',
                residenceType: '',
                residenceAdress: '',
                education: '',
                politicalStatus: '',
                identity: '',
                employment: '',
                technicalPosition: '',
                workerLevel: '',
                marriage: '',
                administrativePosition: '',
                note: '',
                companyId: '',
                medicalPersonnel: '',
                health: '',
                modelWorker: '',
                cadre: '',
                civilServant: '',
                authorizedStrength: '',
                residentType: '',
                flexibleEmployment: '',
                migrantWorker: '',
                employer: '',
                militaryPersonnel: '',
                socialSecurityId: '',
                medinsId: ''
            },
            dialogVisible: false,
            dialogTitle: '新增个人信息',
            total: 0,
            pageSize: 5,
            currentPage: 1,
            allPersonData: [], // 保存所有个人信息数据
            documentTypes: [
                { value: '0', label: '澳门特区护照/身份证明' },
                { value: '1', label: '居民身份证' },
                { value: '2', label: '台湾居民来往大陆通行证' },
                { value: '3', label: '外国人护照' },
                { value: '4', label: '香港特区护照/身份证明' },
                { value: '5', label: '中国人民解放军军官证' },
                { value: '6', label: '中国人民武装警察警官证' }
            ],
            ethnicities: [
                { value: '0', label: '汉族' },
                { value: '1', label: '壮族' },
                { value: '2', label: '布依族' },
                { value: '3', label: '朝鲜族' },
                { value: '4', label: '满族' },
                { value: '5', label: '侗族' },
                { value: '6', label: '瑶族' },
                { value: '7', label: '白族' },
                { value: '8', label: '土家族' },
                { value: '9', label: '哈尼族' },
                { value: '10', label: '哈萨克族' },
                { value: '11', label: '傣族' },
                { value: '12', label: '黎族' },
                { value: '13', label: '傈傈族' },
                { value: '14', label: '佤族' },
                { value: '15', label: '畲族' },
                { value: '16', label: '高山族' },
                { value: '17', label: '拉祜族' },
                { value: '18', label: '水族' },
                { value: '19', label: '东乡族' },
                { value: '20', label: '纳西族' },
                { value: '21', label: '景颇族' },
                { value: '22', label: '柯尔克孜族' },
                { value: '23', label: '土族' },
                { value: '24', label: '达翰尔族' },
                { value: '25', label: '仫佬族' },
                { value: '26', label: '羌族' },
                { value: '27', label: '布朗族' },
                { value: '28', label: '撒拉族' },
                { value: '29', label: '毛南族' },
                { value: '30', label: '仡佬族' },
                { value: '31', label: '锡伯族' },
                { value: '32', label: '阿昌族' },
                { value: '33', label: '普米族' },
                { value: '34', label: '塔吉克族' },
                { value: '35', label: '怒族' },
                { value: '36', label: '乌孜别克族' },
                { value: '37', label: '俄罗斯族' },
                { value: '38', label: '鄂温克族' },
                { value: '39', label: '德昂族' },
                { value: '40', label: '保安族' },
                { value: '41', label: '裕固族' },
                { value: '42', label: '京族' },
                { value: '43', label: '塔塔尔族' },
                { value: '44', label: '独龙族' },
                { value: '45', label: '鄂伦春族' },
                { value: '46', label: '赫哲族' },
                { value: '47', label: '门巴族' }
            ], retirementStatuses: [
                { value: '0', label: '离退休状态_离休' },
                { value: '1', label: '离退休状态_退休' },
                { value: '2', label: '离退休状态_退休审核期' },
                { value: '3', label: '离退休状态_未退休' },
                { value: '4', label: '退休状态_离退休' },
                { value: '5', label: '退休状态_审核期' },
                { value: '6', label: '退休状态_未退休' }
            ],
            residenceTypes: [
                { value: '0', label: '城镇' },
                { value: '1', label: '农村' }
            ],
            educationLevels: [
                { value: '0', label: '博士研究生' },
                { value: '1', label: '硕士研究生' },
                { value: '2', label: '大学本科' },
                { value: '3', label: '大学专科' },
                { value: '4', label: '中等专科' },
                { value: '5', label: '职业高中' },
                { value: '6', label: '技工学校' },
                { value: '7', label: '普通中学' },
                { value: '8', label: '初级中学' },
                { value: '9', label: '小学' },
                { value: '10', label: '其他' }
            ],
            politicalStatuses: [
                { value: '0', label: '群众' },
                { value: '1', label: '中国共产党党员' },
                { value: '2', label: '中国共产党预备党员' },
                { value: '3', label: '中国共产主义青年团团员' }
            ],
            identities: [
                { value: '0', label: '工人' },
                { value: '1', label: '农民' },
                { value: '2', label: '学生' },
                { value: '3', label: '干部' },
                { value: '4', label: '国家公务员' },
                { value: '5', label: '现役军人' },
                { value: '6', label: '无业人员' },
                { value: '7', label: '其他' }
            ],
            employments: [
                { value: '0', label: '原固定职工' },
                { value: '1', label: '城镇合同制' },
                { value: '2', label: '农村合同制' },
                { value: '3', label: '临时工' },
                { value: '4', label: '其他' }
            ],
            technicalPositions: [
                { value: '0', label: '正高级专业技术职务' },
                { value: '1', label: '副高级专业技术职务' },
                { value: '2', label: '中级专业技术职务' },
                { value: '3', label: '初级专业技术职务' }
            ],
            workerLevels: [
                { value: '0', label: '职业资格一级(高级技师)' },
                { value: '1', label: '职业资格二级(技师)' },
                { value: '2', label: '职业资格三级(高级)' },
                { value: '3', label: '职业资格四级(中级)' },
                { value: '4', label: '职业资格五级(初级)' }
            ],
            marriages: [
                { value: '0', label: '未婚' },
                { value: '1', label: '已婚' },
                { value: '2', label: '丧偶' },
                { value: '3', label: '离婚' },
                { value: '4', label: '其它' }
            ],
            administrativePositions: [
                { value: '0', label: '相当副司局级' },
                { value: '1', label: '县、处级' },
                { value: '2', label: '调研员' },
                { value: '3', label: '相当处级' },
                { value: '4', label: '副县、副处级' },
                { value: '5', label: '助理调研员' },
                { value: '6', label: '相当副处级' },
                { value: '7', label: '科级' },
                { value: '8', label: '相当科级' },
                { value: '9', label: '副科级' },
                { value: '10', label: '相当副科级' },
                { value: '11', label: '科员级' },
                { value: '12', label: '办事员级' },
                { value: '13', label: '部、省级' },
                { value: '14', label: '相当部、省级' },
                { value: '15', label: '副部、副省级' },
                { value: '16', label: '相当副部、副省级' },
                { value: '17', label: '司、局、地、厅级' },
                { value: '18', label: '巡视员' },
                { value: '19', label: '相当司局级' },
                { value: '20', label: '副司、副局、副地、副厅级' },
                { value: '21', label: '助理巡视员' },
                { value: '22', label: '无行政职务级别' }
            ],
            medicalPersonnelCategories: [
                { value: '0', label: '医疗待遇类别-参合农民' },
                { value: '1', label: '医疗待遇类别-城镇居民' },
                { value: '2', label: '医疗待遇类别-城镇职工' },
                { value: '3', label: '医疗普通人员' },
                { value: '4', label: '医疗人员类别_建国前老工人' },
                { value: '5', label: '医疗人员类别_老红军' },
                { value: '6', label: '医疗人员类别_离休' },
                { value: '7', label: '医疗人员类别_所有类别' },
                { value: '8', label: '医疗人员类别_退休' },
                { value: '9', label: '医疗人员类别_在职' }
            ],
            healthStatuses: [
                { value: '0', label: '健康或良好' },
                { value: '1', label: '一般或较弱' },
                { value: '2', label: '有慢性病' },
                { value: '3', label: '残疾' }
            ],
            modelWorkerFlags: [
                { value: '0', label: '全国劳模' },
                { value: '1', label: '省劳模' },
                { value: '2', label: '市劳模' }
            ],
            cadreFlags: [
                { value: '0', label: '非干部' },
                { value: '1', label: '干部' }
            ],
            civilServantFlags: [
                { value: '0', label: '非公务员' },
                { value: '1', label: '国家公务员' },
                { value: '2', label: '依照公务员' },
                { value: '3', label: '参照公务员' }
            ],
            authorizedStrengthFlags: [
                { value: '0', label: '非在编' },
                { value: '1', label: '在编' }
            ],
            residentTypes: [
                { value: '0', label: '学龄前儿童' },
                { value: '1', label: '学生' },
                { value: '2', label: '其他非从业城镇居民' }
            ],
            flexibleEmploymentFlags: [
                { value: '0', label: '否' },
                { value: '1', label: '是' }
            ],
            migrantWorkerFlags: [
                { value: '0', label: '否' },
                { value: '1', label: '是' }
            ],
            employerFlags: [
                { value: '0', label: '否' },
                { value: '1', label: '是' }
            ],
            militaryPersonnelFlags: [
                { value: '0', label: '师级军转人员' },
                { value: '1', label: '团级军转人员' },
                { value: '2', label: '营级军转人员' },
                { value: '3', label: '连级军转人员' },
                { value: '4', label: '排级军转人员' }
            ]
        };
    },
    mounted() {
        this.search(); // 页面加载时自动查询
    },
    methods: {
        search() {
            console.log('查询人员编号:', this.searchEmp.id);

            // 假设查询结果如下：
            this.allPersonData = [];

            this.total = this.allPersonData.length;
            this.updatePageData();
        },
        updatePageData() {
            page(this.searchEmp.name, this.currentPage, this.pageSize).then((res) => {
              this.totalCount = res.data.data.total;
              this.tableData = res.data.data.rows;
            });
        },
        handleSizeChange(size) {
            this.pageSize = size;
            this.updatePageData();
        },
        handleCurrentChange(page) {
            this.currentPage = page;
            this.updatePageData();
        },
        openAddDialog() {
            this.dialogTitle = '新增个人信息';
            this.formPerson = {
                peopleId: '',
                cardType: '',
                cardId: '',
                name: '',
                sex: '',
                nationality: '',
                brithday: '',
                workDate: '',
                retirementDate: '',
                retirement: '',
                residenceType: '',
                residenceAdress: '',
                education: '',
                politicalStatus: '',
                identity: '',
                employment: '',
                technicalPosition: '',
                workerLevel: '',
                marriage: '',
                administrativePosition: '',
                note: '',
                companyId: '',
                medicalPersonnel: '',
                health: '',
                modelWorker: '',
                cadre: '',
                civilServant: '',
                authorizedStrength: '',
                residentType: '',
                flexibleEmployment: '',
                migrantWorker: '',
                employer: '',
                militaryPersonnel: '',
                socialSecurityId: '',
                medinsId: ''
            };
            this.dialogVisible = true;
        },
        editPerson(row) {
            this.dialogTitle = '修改个人信息';
            this.formPerson = { ...row };
            this.dialogVisible = true;
        },
        savePerson() {
            if (this.dialogTitle === '新增个人信息') {
                this.add();
            } else {
                const index = this.personData.findIndex(person => person.peopleId === this.formPerson.peopleId);
                if (index !== -1) {
                    this.$set(this.personData, index, { ...this.formPerson });
                }
            }
            this.dialogVisible = false;
        },
        getLabelByValue(value, options) {
    const option = options.find(option => option.value === value);
    return option ? option.label : '';
  },
        deletePerson(row) {
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const index = this.personData.findIndex(person => person.peopleId === row.peopleId);
                if (index !== -1) {
                    this.personData.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
};
</script>



<style>
.demo-form-inline .el-form-item {
    margin-bottom: -10px;
    margin-right: 10px;
}

.person-info-form {
    margin-top: 20px;
}
.custom-dialog .el-dialog__header {
  padding-bottom: 0;
}

.custom-dialog .el-dialog__body {
  padding-top: 10px;
}

.custom-dialog {
  top: -10vh;
}

.person-info-form .el-form-item {
  margin-bottom: 10px;
}


</style>