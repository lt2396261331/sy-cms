import { Iform } from '@/base-ui/form'

export const searchFormConfig: Iform = {
  lableWidth: '120px',
  itemStyle: {
    padding: '10px 30px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      lable: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      lable: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      lable: '密码',
      rules: [],
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      lable: '喜欢的运动',
      rules: [],
      placeholder: '请选择喜欢的运动',
      options: [
        {
          title: '篮球',
          value: 'basketball'
        },
        {
          title: '足球',
          value: 'football'
        }
      ]
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
