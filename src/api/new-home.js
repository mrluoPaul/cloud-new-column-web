import $axios from '@/service/httpServer';
// 查询目录树形结构
export const treeList = p =>
  $axios.get('/news/rest/column/tree', p);
//   删除
export const del = p =>
  $axios.delete(`/news/rest/column/del/${p}`, null, {
    'AccessToken': localStorage.getItem('AccessToken'),
  });
// 新增栏目或者文章 
export const add = p =>
  $axios.post('/news/rest/column/add', p, {
    'AccessToken': localStorage.getItem('AccessToken'),
    // 'Content-type': 'application/x-www-form-urlencoded'
  })
// 查询文章详情
export const detail = p =>
  $axios.get('/news/rest/column/detail', p);
// 修改栏目或者文章
export const edit = p =>
  $axios.post('/news/rest/column/edit', p, {
    'AccessToken': localStorage.getItem('AccessToken'),
  });
