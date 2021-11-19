import { Iform } from '@/base-ui/form/types'

export const modalConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      lable: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      lable: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
