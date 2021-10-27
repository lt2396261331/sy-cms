import type { App } from 'vue'
import registerElement from './registerElement'

export function golbalRegister(app: App): void {
  registerElement(app)
}
