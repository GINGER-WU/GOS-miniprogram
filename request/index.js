//首页请求
const app = getApp()

export function getCarfiles(page){
  return app.request({
    url:app.baseURL+"/carfiles/selectcarfiles",
    data:{
      page
    }
  })
}

export function getCarfilesInfo(carfileID){
  return app.request({
    url:app.baseURL+"/carfiles/selectcarfilesinfo",
    data:{
      carfileID
    }
  })
}

export function getCarfilesWorkers(carfileID){
  return app.request({
    url:app.baseURL+"/carfiles/selectuseworker",
    data:{
      carfileID
    }
  })
}

export function getCarfilesParts(carfileID){
  return app.request({
    url:app.baseURL+"/carfiles/selectuseparts",
    data:{
      carfileID
    }
  })
}