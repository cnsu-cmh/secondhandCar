// pages/index/select.js
//获取应用实例
const app = getApp()

Page({
	data: {
    navName: ['排序', '品牌', '价格', '级别', '筛选'],
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
    price:'',
    prices: [],//价格筛选
    priceflag: -1,
    levelflag: -1,
    selects:{},//存储选中的值
    btnbox: [{ text: '0-3万', pricemin: 0, pricemax: 3 }, { text: '3-6万', pricemin: 3, pricemax: 6 }, 
              { text: '6-10万', pricemin: 6, pricemax: 10 }, { text: '10-15万', pricemin: 10, pricemax: 15 },
      { text: '15-20万', pricemin: 15, pricemax: 20 }, { text: '20-25万', pricemin: 20, pricemax: 25 },
      { text: '25-30万', pricemin: 25, pricemax: 30 }, { text: '30-50万', pricemin: 30, pricemax: 50 },
      { text: '50万以上', pricemin: 50, pricemax: 5000 }
      ],

    carList:[]
	},
	
	onLoad: function (options) {
    //首页传过来的选中nav下标
    //var indexselect = options.indexselect || '';
		var priceflag1 = options.priceflag||-1;
		var levelflag1 = options.levelflag || -1;
    var cartype=options.cartype || '';
    var select0=this.data.selects;
    select0.type = cartype;
		this.setData({
      //navConflag:indexselect,
			priceflag: priceflag1,
			levelflag: levelflag1,
      selects:select0
		})

    this.getRes();

		
		var that = this;

		//请求获取所有品牌列表
		wx.request({
      url: util.baseUrl + '/api/carBrand/allBrand',
			success: function (res) {
				console.log(res)
				that.setData({
					list: res.data
				})
				console.log(that.data.list)
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

    //请求筛选级别
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
				navConflag: e.currentTarget.dataset.sonindex
			})
		} else {
			this.setData({
				shownavindex: -1,
				navConflag: -1
			})
		}
	},

	//排序按钮点击
	sortBtn: function (e) {
		this.setData({
		  'navName[0]': this.data.sortnav[e.currentTarget.dataset.sortindex],
			selected: e.currentTarget.dataset.sortindex,
			navConflag: -1,
			shownavindex: -1
		})
    //把点击的值传到selects对象中
    this.data.selects.sort=this.data.sortnav[e.currentTarget.dataset.sortindex];
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
    let brandName = String(e.currentTarget.dataset.name)
    // this.data.navselects.push(brandName);
    this.setData({
      navConflag: -1,
      shownavindex: -1,
    })
    console.log(brandName);
    //把点击的值传到selects对象中
    this.data.selects.brand = brandName;
    wx.navigateTo({
      url: '/pages/index/brandcar?brandId=' + e.currentTarget.dataset.brandid,
    })
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
      priceflag: e.currentTarget.dataset.priindex
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
      levelflag: e.currentTarget.dataset.levindex
    })
    this.data.selects.level = name;
    this.getRes();
  },

  getRes:function(){
    console.log(this.data.selects);
    var that = this; 
    wx.request({
      url: util.baseUrl + '/api/carBasics/carBasicsSearch',
      data:this.data.selects,
      success:function(res){
        var selects = that.data.selects;
        var selectsArr = {type:selects.type, price:selects.price, level:selects.level};
        var selectsArr1 = {};
        for (var p in selectsArr){
          if (selectsArr[p] != undefined && selectsArr[p] !=''){
            selectsArr1[p] = selectsArr[p];    
          }
        }
        console.log(selectsArr1)
        that.setData({
          carList : res.data.data,
          navselects: selectsArr1
        })
        

      }
    })
  },
  //清除选中的值
  clearSelect: function (e) {
    var clearindex = e.currentTarget.dataset.clearindex;
    console.log(clearindex);
    var selectguo = this.data.selects;
    selectguo[clearindex] = '';
    console.log(selectguo);
    this.setData({
      selects: selectguo
    })
    this.getRes();

  },







  //筛选中座位数和配置
	select2Show: function (e) {
		var select2index = e.currentTarget.dataset.select2index;
		console.log(e);
		if (this.data.select2Flag == select2index) {
			this.setData({
				select2Flag: ''
			})
		} else {
			this.setData({
				select2Flag: select2index
			})
		}

	},
	select2NameBtn: function (e) {
		console.log(this.data.select2Flag == "配置1");
		if (this.data.select2Flag == "配置") {
			this.setData({
				select2Flag: !this.data.select2Flag,
				select2Name: e.currentTarget.dataset.select2
			})
		}

	},

	



	//双向滑块功能
	lowValueChangeAction1: function (e) {
		this.setData({
			low: e.detail.lowValue
		})
	},

	heighValueChangeAction1: function (e) {
		this.setData({
			height: e.detail.heighValue
		})
	},

	

	

	goDetail: function () {
		wx.navigateTo({
			url: '/pages/index/detail',
		})
	},

  








})
