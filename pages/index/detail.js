// pages/index/detail.js
var util = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgUrls: [],
		indicatorDots: false,
		autoplay: false,
		interval: 5000,
		duration: 1000,
    imgcur:'',
    baseinfo:{},
		height:'',
		msg4:'',
		msg4Flag:-1,
    detailInfo:{},
    seller:{},
    similars:[],
    count : 0,
    dateTime: util.formatDate(new Date())

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    var detailId=options.carid || '';
    var that=this;
    wx.request({
      url: util.baseUrl + '/api/carBasics/carBasicsById?id=' + detailId,
      success: function (res) {
        var obj = that.data.baseinfo;
        obj['表显里程'] = res.data.data.guarantee || ' ';
        obj['首次上牌'] = res.data.data.marketTime || ' ';
        obj['挡位/排量'] = res.data.data.engine || ' ';
        obj['外观'] = res.data.data.colour || ' ';
        obj['过户次数'] = res.data.data.guarantee || ' ';
        that.setData({
          imgUrls: res.data.files,
          detailInfo:res.data.data,
          seller: res.data.seller,
          similars: res.data.similars,
          count: res.data.count,
          imgcur: '1' + '/' + res.data.files.length,
          baseinfo: obj,
        })

      }
    })


		var that = this;
		//创建节点选择器
		var query = wx.createSelectorQuery();
		query.select('.msg1over').boundingClientRect(function (rect) {
			var height=rect.height*2;
			if(height>194){
				that.setData({
					height:194+'rpx',
					msg4: '展开更多',
					msg4Flag:0
				})
			}
		}).exec();
    
	},
  //图片滑动，切换第几张
  swiperChange: function (e) {
    var current = e.detail.current;
    this.setData({
      imgcur: (current + 1) + '/' + this.data.imgUrls.length
    })
  },

	preImg:function(e){
		// var current = e.currentTarget.dataset.imgsrc;
    // console.log(current);
		// wx.previewImage({
		// 	current: current, // 当前显示图片的http链接
		// 	urls: this.data.imgUrls, // 需要预览的图片http链接列表
		// 	success:function(res){
				
		// 	},
		// 	fail: function (res) {
			
		// 	}
		// })
	},

	msg4Show:function(){
		if(this.data.msg4Flag==0){
			this.setData({
				height: '',
				msg4: '收起',
				msg4Flag:1
			})
		}else{
			this.setData({
				height: 194 + 'rpx',
				msg4: '展开更多',
				msg4Flag: 0
			})
		}
		
	},

  call:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.seller.phone,
    })
  },

	goDeploy:function(){
		wx.navigateTo({
			url: '/pages/index/deploy',
		})
	},

  goDetail: function (e) {
    var detailId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/detail?carid=' + detailId,
    })
  },


  // 下拉刷新
  // onPullDownRefresh: function () {
  //   // 显示顶部刷新图标
  //   wx.showNavigationBarLoading();
  //   var that = this;
  //   wx.request({
  //     url: 'https://xxx/?page=0',
  //     method: "GET",
  //     header: {
  //       'content-type': 'application/text'
  //     },
  //     success: function (res) {
  //       that.setData({
  //         moment: res.data.data
  //       });
  //       // 设置数组元素
  //       that.setData({
  //         moment: that.data.moment
  //       });
  //       console.log(that.data.moment);
  //       // 隐藏导航栏加载框
  //       wx.hideNavigationBarLoading();
  //       // 停止下拉动作
  //       wx.stopPullDownRefresh();
  //     }
  //   })
  // },


	
})