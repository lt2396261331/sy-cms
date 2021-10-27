import type { App } from 'vue'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElLink,
  ElCheckbox
} from 'element-plus'

import { UserFilled } from '@element-plus/icons'

const components = [
  ElButton,
  ElInput,
  ElForm,
  ElFormItem,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElIcon,
  UserFilled,
  ElLink,
  ElCheckbox
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
  // app.component()
}
