// import { Navigate, useRoutes } from 'react-router-dom'
// import { lazy, Suspense } from 'react'
// import { createLazyModule } from '@/utils'

// const EditPage = createLazyModule('@/page/edit')
// console.log(EditPage, 'edit')
// // 创建router的路由配置
// export default function useCreateRouter() {
//   return useRoutes([
//     {
//       path: '/',
//       children: [
//         {
//           path: 'edit',
//           element: EditPage
//           // element: (
//           //   <Suspense fallback={<h1>loading......</h1>}>
//           //     <EditPage />
//           //   </Suspense>
//           // )
//           // children: [
//           //   {
//           //     path: ':editId',
//           //     element: createLazyModule('@/page/editItem')
//           //   },
//           //   {
//           //     element: <h1>我是没有子路由匹配的时候时候展示的默认页面</h1>
//           //   }
//           // ]
//         }
//       ]
//     }
//     // {
//     //   path: 'detail/*',
//     //   element: createLazyModule('@/page/detail')
//     // },
//     // {
//     //   path: '*',
//     //   element: <Navigate to="detail" replace state={{ a: 1 }} />
//     // }
//   ])
// }
