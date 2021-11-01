import { Iform } from '@/base-ui/form'

export const searchFormConfig: Iform = {
  lableWidth: '120px',
  formItems: [
    {
      field: 'name',
      type: 'input',
      lable: '角色名称',
      rules: [],
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      lable: '权限介绍',
      rules: [],
      placeholder: '请输入权限介绍'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      lable: '创建时间',
      rules: [],
      placeholder: '请选择创建时间的范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
