// pages/index/cartype.js
function uniqueArray(array, key) {
  var result = [array[0]];
  for (var i = 1; i < array.length; i++) {
    var item = array[i];
    var repeat = false;
    for (var j = 0; j < result.length; j++) {
      if (item[key] == result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(item);
    }
  }
  return result;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:{
      '2018款全部': [{ name: '2018款1', checked: false, id:1 }, { name: '2018款2', checked: false, id:2}],
      '2016款全部': [{ name: '2016款1', checked: false, id:3 }, { name: '2016款2', checked: false, id:4 }, { name: '2016款3', checked: false, id:5}],
    },
    typeitemsFlag:'',
    arr1:[],
    flag:true,
    allFlag:true,
    navtext:'',
    ifFlag:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //单选
  typeSelect:function(e){
    var itemindex = e.currentTarget.dataset.itemindex;
    var typeindex = e.currentTarget.dataset.typeindex;
    var arr=this.data.types;
    arr[typeindex][itemindex].checked = !arr[typeindex][itemindex].checked;
    this.setData({
      types:arr
    })
    for (var i = 0; i < arr[typeindex].length; i++) {
      var ind = this.data.arr1.indexOf(arr[typeindex][i].id);
      
      if (arr[typeindex][i].checked) {
        if (ind==-1){
          this.data.arr1.push(arr[typeindex][i].id)
        } 
        // j=j+1;
        // if (j == arr[typeindex].length){
        //   this.setData({
        //     flag:false,
        //     navtext: typeindex
        //   })
        // }else{
          
        // }
      }else{
        if (ind != -1) {
          this.data.arr1.splice(ind,1)
        }
        // this.setData({
        //   flag: true,
        //   navtext:''
        // }) 
      }
    }
  },
  //部分全选
  navSelect:function(e){
    console.log(e);
    var navindex = e.currentTarget.dataset.navindex;
    var arr = this.data.types;
    var arr2 = arr[navindex];
    // if(this.data.arr1.length>0){
    //   this.setData({
    //     flag:true,
    //     ifFlag: 1
    //   })
    // }
    if(this.data.flag==true){
      arr2.forEach(function (ele) {
        ele.checked = true;
      })
      arr[navindex] = arr2;
      this.setData({
        types: arr,
        flag:false,
        navtext:navindex
      })  
    }else{
      arr2.forEach(function (ele) {
        ele.checked = false;
      })
      arr[navindex] = arr2;
      this.setData({
        types: arr,
        flag:true,
        navtext: ''
      }) 
    }
    for (var i = 0; i < arr[navindex].length; i++) {
      var ind = this.data.arr1.indexOf(arr[navindex][i].id);
      if (arr[navindex][i].checked) {
        if (ind == -1) {
          this.data.arr1.push(arr[navindex][i].id)
        }
      } else {
        if (ind != -1) {
          this.data.arr1.splice(ind, 1)
        }
      }
    }

  },
  allSelect:function(){
    var arr = this.data.types;
    if (this.data.allFlag == true) {
      for (var p in arr) {
        for (var i = 0; i < arr[p].length; i++) {
          arr[p][i].checked = true
        }
      }
      this.setData({
        types: arr,
        allFlag: false,
        flag: false,
        ifFlag:1
      })
    } else {
      for (var p in arr) {
        for (var i = 0; i < arr[p].length; i++) {
          arr[p][i].checked = false
        }
      }
      this.setData({
        types: arr,
        allFlag: true,
        flag: true,
        ifFlag: 0
      })
    }
    for (var p in arr) {
      for (var i = 0; i < arr[p].length; i++) {
        var ind = this.data.arr1.indexOf(arr[p][i].id);
        if (arr[p][i].checked) {
          if (ind == -1) {
            this.data.arr1.push(arr[p][i].id)
          }
        } else {
          if (ind != -1) {
            this.data.arr1.splice(ind, 1)
          }
        }
      }
    }






  },

  //类型列表的显示与隐藏
  typeitemsShow:function(e){  
    if (this.data.typeitemsFlag == e.currentTarget.dataset.downindex){
      this.setData({
        typeitemsFlag:''
      })
    }else{
      this.setData({
        typeitemsFlag: e.currentTarget.dataset.downindex
      })
    }
  },

  selectsure:function(){

    console.log(this.data.arr1)
  }

  





  
})