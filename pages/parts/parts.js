import * as handle_parts from '../../request/parts.js'
Page({
  data: {
      current:1,
      total:0,
      partsList:[],
      partsInfo:{},
      parts4Buy:[],
      isshow:false,
      nodes: [],
      value1:0
  },
  onLoad:function(){
    handle_parts.getParts(this.data.current).then(res =>{
          this.setData({
            partsList: res.data.data.list,
            current:res.data.data.pageNum,
            total:res.data.data.pages
          })
    })
  },
  handleChange(even){
    if(even.detail.type === "next"){
      this.setData({
        current: this.data.current+1 ,
      })
      handle_parts.getParts(this.data.current).then(res=>{
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
      handle_parts.getParts(this.data.current).then(res=>{
        this.setData({
          carfiles:res.data.data.list,
        })
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  handleClick(e){
    this.setData({
      isshow:true
    })
    var pinfo = {};
    for (const iterator of this.data.partsList) {
      if(iterator.partsID === e.currentTarget.dataset.id){
        pinfo = iterator;
      }
    }
    wx.nextTick(()=>{
      this.setData({
        partsInfo:pinfo,
      })
    });
  },
  handleOK(){
    if(this.data.value1!=0){
      let bill = {
        partsID:JSON.parse(JSON.stringify(this.data.partsInfo.partsID)),
        useNumber:JSON.parse(JSON.stringify(this.data.value1))
      }
      let buyList = JSON.parse(JSON.stringify(this.data.parts4Buy));
      let oldList = JSON.parse(JSON.stringify(this.data.partsList));
      let newList =[];
      for (const iterator of oldList) {
        if(iterator.partsID != this.data.partsInfo.partsID){
          newList.push(iterator);
        }
      }
      buyList.push(bill);
      this.setData({
        parts4Buy:buyList,
        partsList:newList,
        value1:0,
        isshow:false
      })
    }
    console.log(this.data.parts4Buy);
  },
  handleChange1 ({ detail }) {
    this.setData({
        value1: detail.value
    })
},
});