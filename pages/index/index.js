//index.js

var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    navName: ['排序', '品牌', '价格', '级别'],
    sortnav: [], //筛选排序
    shownavCon: true,
    isfull: false,
    shownavindex: -1,
    navConflag: -1,
    selected: 0,
    navselects: {},
    pxIndex: 0, //排序内容下拉框，默认第一个
    list: [],//筛选品牌
    nav: ["热", "*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    toView: 0,
    level: [],//筛选级5
    low: 0,
    height: 12,
    select2Flag: '',
    select2Name: '不限',
    select2Con: {
      '配置': ['不限', '微型车0', '微型车1', '微型车2', '微型车3', '微型车4'],
      '座位数': ['不限', '座位数0', '座位数1', '座位数2', '座位数车3', '座位数4'],
    },
    mileage: '不限',
    pricemin: '',
    pricemax: '',
    price: '',
    prices: [],//价格筛选
    priceflag: -1,
    levelflag: -1,
    selects: {},//存储选中的值
    btnbox: [
      { text: '0-3万', pricemin: 0, pricemax: 3 }, { text: '3-6万', pricemin: 3, pricemax: 6 },
      { text: '6-10万', pricemin: 6, pricemax: 10 }, { text: '10-15万', pricemin: 10, pricemax: 15 },
      { text: '15-20万', pricemin: 15, pricemax: 20 }, { text: '20-25万', pricemin: 20, pricemax: 25 },
      { text: '25-30万', pricemin: 25, pricemax: 30 }, { text: '30-50万', pricemin: 30, pricemax: 50 },
      { text: '50万以上', pricemin: 50, pricemax: 5000 }
    ],
    carList: [],
    isfull:false,
    iscon:true,
    alls: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    
    // var cartype = options.cartype || '';
    // var select0 = this.data.selects;
    // select0.type = cartype;
    // this.setData({
    //   selects: select0
    // })
    this.getRes();

    var that = this;

    //请求获取所有品牌列表
    wx.request({
      url: util.baseUrl + '/api/carBrand/allBrand',
      success: function (res) {
        that.setData({
          list: res.data
        })
      }
    })

    //请求排序方式
    wx.request({
      url: util.baseUrl + '/api/dict/listValByType?type=orderBy',
      success: function (res) {
        that.setData({
          sortnav: res.data
        })
      }
    })

    //请求级别
    wx.request({
      url: util.baseUrl + '/api/dict/listValByType?type=carLevel',
      success: function (res) {
        that.setData({
          level: res.data
        })
      }
    })


  },
  //下拉筛选按钮点击切换与显示
  navCon: function (e) {
    if (this.data.shownavindex != e.currentTarget.dataset.sonindex) {
      this.setData({
        shownavindex: e.currentTarget.dataset.sonindex,
        navConflag: e.currentTarget.dataset.sonindex,
        isfull:true,
        iscon: true
      })
    } else {
      this.setData({
        shownavindex: -1,
        navConflag: -1,
        isfull: false
      })
    }
  },

  hidebg:function(){
    this.setData({
      navConflag: -1,
      shownavindex: -1,
      isfull: false
    })
  },

  //排序按钮点击
  sortBtn: function (e) {
    this.setData({
      'navName[0]': this.data.sortnav[e.currentTarget.dataset.sortindex],
      selected: e.currentTarget.dataset.sortindex,
      navConflag: -1,
      shownavindex: -1,
      isfull: false
    })
    //把点击的值传到selects对象中
    this.data.selects.sort = this.data.sortnav[e.currentTarget.dataset.sortindex];
    this.getRes();

  },

  // 品牌右侧字母导航功能
  toView: function (e) {
    let i = parseInt(e.currentTarget.dataset.i);
    this.setData({
      toView: i
    })
  },

  //点击得到品牌名
  getBrandName: function (e) {
    let brandName = String(e.currentTarget.dataset.name);
    var that = this;
    if(brandName=='不限品牌'){
      this.setData({
        navConflag: -1,
        shownavindex: -1,
        isfull: false,
        iscon: false
      })
      this.getRes();
    }else{
      this.setData({
        isfull: false,
        iscon: false
      })
      var brandId = e.currentTarget.dataset.brandid;
      wx.request({
        url: util.baseUrl + '/api/carType/carTypesByBrandId/' + brandId,
        success: function (res) {
          that.setData({
            alls: res.data
          })
        }
      })
    }
    //把点击的品牌值传到selects对象中
    this.data.selects.brand = brandName;

  },
  //获取选中的车type
  getCartype: function (e) {
    var itemindex = e.currentTarget.dataset.itemindex;
    var cartype = this.data.alls[itemindex].name;
    this.data.selects.type = cartype;
    this.setData({
      navConflag: -1,
      shownavindex: -1,
      isfull: false,
      iscon: true
    })
    this.getRes();
  },
  //点击全部车型里的不限，把type值设为brand值
  getCartypeall: function () {
    this.data.selects.type = '';
    this.setData({
      navConflag: -1,
      shownavindex: -1,
      isfull: false,
      iscon: true
    })
    this.getRes();
  },

  //获取自定义价格最小值
  priceMin: function (e) {
    this.setData({
      pricemin: e.detail.value
    })
  },

  //获取自定义价格最大值
  priceMax: function (e) {
    this.setData({
      pricemax: e.detail.value
    })
  },

  //价格确定按钮
  priceSure: function () {
    var reg = /^[0-9]*$/;
    if (this.data.pricemin == "" || this.data.pricemax == "") {
      wx.showToast({
        title: '请输入数字',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var tf = reg.test(this.data.pricemin) && reg.test(this.data.pricemax);
    if (tf == false) {
      wx.showToast({
        title: '请输入数字',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        navConflag: -1,
        shownavindex: -1,
        isfull: false
      })
      var ziprice = this.data.pricemin + "-" + this.data.pricemax + '万'
      this.data.selects.minPrice = this.data.pricemin;
      this.data.selects.maxPrice = this.data.pricemax;
      this.data.selects.price = ziprice;
      this.getRes();
    }
  },
  //价格按钮点击
  priceBtn: function (e) {
    let priceText = e.currentTarget.dataset.text;
    this.setData({
      navConflag: -1,
      shownavindex: -1,
      priceflag: e.currentTarget.dataset.priindex,
      isfull: false
    })
    this.data.selects.minPrice = e.currentTarget.dataset.pricemin;
    this.data.selects.maxPrice = e.currentTarget.dataset.pricemax;
    this.data.selects.price = priceText;
    this.getRes();
  },

  //级别按钮点击
  levelBtn: function (e) {
    let name = e.currentTarget.dataset.levname;
    this.setData({
      navConflag: -1,
      shownavindex: -1,
      levelflag: e.currentTarget.dataset.levindex,
      isfull: false
    })
    this.data.selects.level = name;
    this.getRes();
  },

  getRes: function () {
    var that = this;
    wx.request({
      url: util.baseUrl + '/api/carBasics/carBasicsSearch',
      data: this.data.selects,
      success: function (res) {
        var selects = that.data.selects;
        var selectsArr = { brand: selects.brand,type: selects.type, price: selects.price, level: selects.level };
        if (selectsArr.brand=='不限品牌'){
          selectsArr.brand ='';
        }
        var selectsArr1 = {};
        for (var p in selectsArr) {
          if (selectsArr[p] != undefined && selectsArr[p] != '') {
            selectsArr1[p] = selectsArr[p];
          }
        }
        that.setData({
          carList: res.data.data,
          navselects: selectsArr1
        })
      }
    })
  },
  //清除选中的值
  clearSelect: function (e) {
    var clearindex = e.currentTarget.dataset.clearindex;
    var selectguo = this.data.selects;
    selectguo[clearindex] = '';
    if (clearindex == 'price') {
      selectguo.minPrice = '';
      selectguo.maxPrice = '';
    }
    this.setData({
      selects: selectguo
    })
    this.getRes();
  },

  goDetail: function (e) {
    var detailId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/detail?carid='+detailId,
    })
  },


  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  

  





















})
