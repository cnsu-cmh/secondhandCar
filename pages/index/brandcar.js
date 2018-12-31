// pages/index/brandcar.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var brandId = options.brandId || -1;
    var that = this;
    wx.request({
      url: util.baseUrl + '/api/carType/carTypesByBrandId/' + brandId,
      success: function (res) {
        that.setData({
          alls: res.data
        })
      }
    })
  },

  goCartype:function(e){
    var itemindex=e.currentTarget.dataset.itemindex;
    var cartype = this.data.alls[itemindex].name;
    // wx.redirectTo({
    //   url: '/pages/index/select?cartype=' + cartype,
    // })
  }



  
})