// index.js
// 获取应用实例
import * as Handle_carfiles from '../../request/index.js'
Page({
  data: {
    phoneNumber:"1382123965",
    carfiles:[],
    isshow:false,
    carfileInfo:{},
    carfileWorkers:[],
    carfileParts:[],
    current:1,
    total:0
  },
  // 事件处理函数
  bindViewTap() {
  },
  onLoad() {
    Handle_carfiles.getCarfiles(this.data.current,this.data.phoneNumber).then(res=>{
      this.setData({
        carfiles:res.data.data.list,
        current:res.data.data.pageNum,
        total:res.data.data.pages
      })
    }).catch(err =>{
      console.log(err);
    })
  },
  handleClick(e){
    this.setData({
      isshow:true
    })
    Promise.all([Handle_carfiles.getCarfilesInfo(e.currentTarget.dataset.id),
    Handle_carfiles.getCarfilesWorkers(e.currentTarget.dataset.id),
    Handle_carfiles.getCarfilesParts(e.currentTarget.dataset.id)
    ]).then(res =>{
      this.setData({
        carfileInfo:res[0].data.data,
        carfileWorkers:res[1].data.data,
        carfileParts:res[2].data.data
      })
    }).catch(err =>{
      console.log(err);
    })
  },
  handleChange(even){
    if(even.detail.type === "next"){
      this.setData({
        current: this.data.current+1 ,
      })
      Handle_carfiles.getCarfiles(this.data.current,this.data.phoneNumber).then(res=>{
        this.setData({
          carfiles:res.data.data.list,
        })
      }).catch(err =>{
        console.log(err);
      })
    }
    if(even.detail.type === "prev"){
      this.setData({
        current: this.data.current-1 ,
      })
      Handle_carfiles.getCarfiles(this.data.current,this.data.phoneNumber).then(res=>{
        this.setData({
          carfiles:res.data.data.list,
        })
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  handleOK(){
    this.setData({
      isshow:false
    })
  }
})
