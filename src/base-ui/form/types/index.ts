type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  lable: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
}

export interface Iform {
  formItems: IFormItem[]
  lableWidth?: any
  itemStyle?: any
  colLayout?: any
}
