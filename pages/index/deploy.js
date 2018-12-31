// pages/index/deploy.js
var util = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    deploylist:{},
    styFlag:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    var that=this;
    wx.request({
      url: util.baseUrl + '/api/carBasics/carInfoById?id=1',
      success:function(res){
        console.log(res.data);
        var obj=that.data.deploylist;

        var carBasics= res.data.carBasics;
        var carBody = res.data.carBody;
        var carEngine = res.data.carEngine;

        // obj['基本参数']=res.data.carBasics;
        // obj['车身'] = res.data.carBody;
        // obj['发动机'] = res.data.carEngine;

        obj['基本参数'] = {
          '车型名称': carBasics.manufacturer,
          '厂商指导价（元）': carBasics.guidancePrice,
          '级别': carBasics.level,
          '上市时间': carBasics.playingCards,
          '最大功率': carBasics.maxPower,
          '车身结构': carBasics.carStructure,
          '整车质保': carBasics.guarantee,
        };
        obj['车身'] = {
          '长度(mm)': carBody.width,
          '宽度(mm)': carBody.length,
          '高度(mm)': carBody.height,
          '轴距(mm)': carBody.wheelbase,
          '前轮距(mm)': carBody.frontWheelPitch,
          '后轮距(mm)': carBody.rearWheelPitch,
          '车门数(个)': carBody.doorNum,
          '座位数(个)': carBody.seatNum,
          '油箱容积(L)': carBody.tankCapacity,
          '行李箱容积(L)': carBody.trunkCapacity,
          '整备质量(kg)': carBody.vehicleWeight,
        };
        obj['发动机'] = {
          '发动机型号': carEngine.type,
          '排量(mL)': carEngine.displacement,
          '排量(L)': carEngine.displacementL,
          '进气形式': carEngine.intakeForm,
          '气缸排列形式': carEngine.cylinderArr,
          '汽缸数(个)': carEngine.cylinderNum,
          '每缸气门数(个)': carEngine.cylinderValve,
          //'压缩比': carEngine.doorNum,
          //'配气机构': carEngine.seatNum,
          //'缸径(mm)': carEngine.tankCapacity,
          //'行程(mm)': carEngine.trunkCapacity,
          '最大马力(kg)': carEngine.maxHorsepower,
          '最大功率(kg)': carEngine.maxPower,
          '最大功率转速(kg)': carEngine.maxPowerSpeed,
          //'最大扭矩(kg)': carEngine.vehicleWeight,
          //'最大扭矩转速(kg)': carEngine.vehicleWeight,
          '燃料形式': carEngine.fuelForm,
          '燃油标号': carEngine.fuelGrade,
          '供油方式': carEngine.fuelSupplyMode,
          '缸盖材料': carEngine.cylinderHeadMaterial,
          '缸体材料': carEngine.cylinderBlockMaterial,
          '环保标准': carEngine.envProtection,
        };

        that.setData({
          deploylist:obj
        })
      }
      
    })



	},

	infoShow:function(e){
    console.log(e.currentTarget.dataset.infoindex);
    if (this.data.styFlag == e.currentTarget.dataset.infoindex){
      this.setData({
        styFlag: 0
      })
    }else{
      this.setData({
        styFlag: e.currentTarget.dataset.infoindex
      })
    }
    
    
	},





	
})