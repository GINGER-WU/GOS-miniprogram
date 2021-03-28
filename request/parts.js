//配件商城请求
const app = getApp()

export function getParts(page){
  return app.request({
    url:app.baseURL+"/parts/showparts",
    data:{
      page,
    }
  })
}