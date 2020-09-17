// pages/remark/remark.js
const db=wx.cloud.database();
const remark=db.collection("remark");//连接数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discussshow:false                 //点击按钮    
  },
//增加评论的功能
addremark:function(){

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options.id)
     
  },

  
})