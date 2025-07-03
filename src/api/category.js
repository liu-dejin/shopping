import request from '@/utils/requset'

// 获取分类数据
export const getCategoryData = () => {
  return request.get('/category/list')
}
