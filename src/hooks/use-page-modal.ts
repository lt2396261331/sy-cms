import { ref } from 'vue'
import pageModal from '@/components/page-modal'

type CallbackFn = () => void
type EditbackFn = () => void

export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: EditbackFn
): [any, any, () => void, (query: any) => void] {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})
  // 新建/编辑操作
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCallback && newCallback()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCallback && editCallback()
  }
  console.log('123')

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
