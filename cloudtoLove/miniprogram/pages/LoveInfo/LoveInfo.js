// pages/LoveInfo/LoveInfo.js
const db=wx.cloud.database();
const love=db.collection("love");//连接数据库
Page({
  //数据
  data:{
    task:[]  , //数据初值
    liuyan:"",
    id:""
  },
  pageData:{//跳过数据的对象,默认跳过0条
       skip:0
  },//没有这个只能显示20条数据
 onReachBottom: function(){
 this.getData();
 },
 onLoad:function(options){  //数据加载
  // this.getData(res=>{});
 this.getData();
  },
  onshow:function()
  {
 
  },
  //下拉刷新
 onPullDownRefresh:function(){
  this.data.task=[];//设置为[]  
  this.pageData.skip=0;//跳回0 
  this.getData(res=>{
      wx.stopPullDownRefresh();//停止页面刷新
    })
   
 },
 //获取数据
 getData:function(callack){
   if(!callack){
     callack=res=>{}
   }
 wx.showLoading({  //输出数据加载中  //下拉获取数据提示
   title: '数据加载中',
 })
 love.skip(this.pageData.skip).get().then(res=>{  //输出数据skip()跳出多少条
  
  
   let oldData=this.data.task;//旧的一页数据
    this.setData({
    task:oldData.concat(res.data),//老数据+新数据   
   
 },res=>{             
 
   this.pageData.skip=this.pageData.skip+20;//每次跳过10条数据     
   
   wx.hideLoading();  //停止数据加载提示
   callack();
 })
 })
 
 },
 onUp:function(event){
  var index = event.currentTarget.dataset.index;
   love.get().then(res=>{
     let da=this.data.task
     for(let i in da){
      if(i==index) {
            if(da[i].state==0){//没点赞
              this.data.task[index].state=1
              da[i].num=parseInt(da[i].num)+1
              love.doc(this.data.task[index]._id).update({
                data:{
                  state:this.data.task[index].state,
                  num: da[i].num
                }
              })
            }       else{
              this.data.task[index].state=0
              da[i].num=parseInt(da[i].num)-1
              love.doc(this.data.task[index]._id).update({
                data:{
                  state:this.data.task[index].state,
                  num:da[i].num
                }
              })
            }
      }
     } 
     this.setData({
       task:this.data.task
     })
   })
 },

 //评论功能

 formSubmit: function(e) {
  wx.showToast({
    title: '评论成功',
    icon: 'success',
    duration: 3000
  })
   var remarks=e.detail.value.remarks;
   var id=e.detail.target.id
    this.setData({
      liuyan:remarks,
      id:id
    })
    

 }

})
 