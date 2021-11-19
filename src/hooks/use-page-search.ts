import { ref } from 'vue'
import pageContent from '@/components/page-content'

export function usePageSearch(): [any, () => void, (query: any) => void] {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const handleResetClick = () => {
    console.log('123')
    pageContentRef.value?.getPageData()
  }
  const hanleQueryClick = (queryInfo: any): void => {
    console.log(queryInfo)
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, hanleQueryClick]
}
