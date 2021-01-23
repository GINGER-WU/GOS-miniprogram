// index.js
// 获取应用实例
import * as Handle_carfiles from '../../request/index.js'
Page({
  data: {
    carfiles:[],
    isshow:false,
    carfileInfo:{},
    carfileWorkers:[],
    carfileParts:[]
  },
  // 事件处理函数
  bindViewTap() {
  },
  onLoad() {
    Handle_carfiles.getCarfiles(1).then(res=>{
      this.setData({
        carfiles:res.data.data.list
      })
    }).catch(err =>{
      console.log(err);
    })
  },
  handleClick(e){
    this.setData({
      isshow:true
    })
    Handle_carfiles.getCarfilesInfo(e.currentTarget.dataset.id).then(res=>{
      this.setData({
        carfileInfo:res.data.data
      })
    }).then(()=>{
      Handle_carfiles.getCarfilesWorkers(e.currentTarget.dataset.id).then(res=>{
        this.setData({
          carfileWorkers:res.data.data
        })
      }).then(()=>{
        Handle_carfiles.getCarfilesParts(e.currentTarget.dataset.id).then(res=>{
          this.setData({
            carfileParts:res.data.data
          })
        }).catch(err =>{
          console.log(err);
        })
      }).catch(err =>{
        console.log(err);
      })
    }).catch(err =>{
      console.log(err);
    })
  },
  handleOK(){
    this.setData({
      isshow:false
    })
  }
})
