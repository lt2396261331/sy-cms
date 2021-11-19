import hyRequest from '../../index'
import { IDataType } from '../../types'

export function getPageListDate(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 新建用户
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
// 编辑用户
export function eidtPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}

// url: /users/id
export function deletePageData(url: string) {
  console.log(url)
  return hyRequest.delete<IDataType>({
    url
  })
}
