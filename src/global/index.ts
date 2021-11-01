import type { App } from 'vue'
import registerElement from './registerElement'
import registerProperties from './register-properties'

export function golbalRegister(app: App): void {
  registerElement(app)
  registerProperties(app)
}
