//index.js
const app = getApp()
const db=wx.cloud.database("love");
const love=db.collection("love");//连接数据库
Page({
  data: {
Image:null,
state:0,
num:0,

  },
   //实现选择图片并且把图片显示的功能
  doUpload:function(e)
  {
    wx.chooseImage({
      success:res=>{
        console.log(res);
        wx.cloud.uploadFile({
          cloudPath:`${Math.floor(Math.random()*100000000)}.jpg`,
          filePath:res.tempFilePaths[0] , //文件路径
         
        }).then(res=>{
          this.setData({
            Image:res.fileID
          })
        
        })//然后then
      }
    })
    },
    onSubmit:function(event){  //event提交数据
      love.add({         //添加到数据库love
        data:{
        lover:event.detail.value.lover,
        context:event.detail.value.context,
        Image:this.data.Image,
        state:0,
        num:0,
        createTime:db.serverDate() //添加该字段
        }
        }).then(res=>{
         wx.showToast({
           title: '提交成功',
           icon:"success",
            success:res2=>{
             
          //   //  wx.redirectTo({
          //   //    url:"../index/index"
          //      //url: `../todoInfo/todoInfo?id=${res._id}`,
          //    })
           }
         })
        })
    },
    onChange({ detail }) {
      // 需要手动对 checked 状态进行更新
      this.setData({ checked: detail });
    },

})
