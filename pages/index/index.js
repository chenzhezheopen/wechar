const app = getApp()
let schoolData = require('../../resources/gis-school')
Page({
  data:{
    lastTapTime: 0,
    hand:0,
    longitude: 120.0706744194,
    latitude: 31.4774089485,
    num:-1,
    offx:0,
    src:"",
    scale:16,
    items: [
        {
          "title": "发现"
        },
        {
          "title": "展览"
        },
        {
          "title": "专馆"
        },
        {
          "title": "卫生间"
        },
        {
          "title": "出入口"
        },
        {
          "title": "餐饮"
        },
        {
          "title": "商店"
        },
        {
          "title": "咨询"
        },
        {
          "title": "广播"
        },
        {
          "title": "医务"
        },
        {
          "title": "售票处"
        },
        {
          "title": "书店"
        }
    ],
    markers: []
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let iconPath = point.iconPath;
    let id = point.id;
    let width = point.width;
    let height = point.height;
    let src = point.src;
    let marker = {
      src:src,
      iconPath: iconPath,
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      width: width,
      height: height,
    }
    return marker;
  },
  onload:function(){
    var that = this
    wx.showLoading({
      title: '定位中'
    })
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
      }
    })
  },
  tap:function(e){
    var data = e.currentTarget.dataset.smile;
    console.log(data);
    this.setData({
      num:data
    })
  },
  search:function(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // num:function(e){
  //   this.setData({
  //     markers: markers
  //   })
  //   console.log(schoolData)
  //   console.log(this.data.markers)
  // },
  onReady:function(){
    this.audioCtx = wx.createAudioContext('myAudio')
    let markers = [];
    for (let item of schoolData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    this.setData({
      markers:markers
    })
  },
  gotohere: function (e) {
    // console.log(this.audioCtx.src)
    this.setData({
      src: e.currentTarget.dataset.markers[e.markerId].src
    })
    this.audioCtx.play()
    console.log(src)
  },
  // num:function(){
  //   this.setData({
  //     hand: this.data.hand+1
  //   })
  // },
  // mapreduce:function(){
  //   this.setData({
  //     hand: this.data.hand - 1
  //   })
  // },
  // add: function () {
  //   this.setData({
  //     scale: this.data.scale + 1
  //   })
  //   for(let index=0; index< this.data.markers.length-1;index++){
  //     console.log(this.data.markers[index].height)
  //     this.setData({
  //       "markers[0].height": 600 * this.data.scale / 17,
  //         "markers[0].width":500*this.data.scale/17
  //     })
  //   }
  // },
  // reduce: function () {
  //   this.setData({
  //     scale: this.data.scale - 1
  //   })
  //   for (let index = 0; index < this.data.markers.length - 1; index++) {
  //     console.log(this.data.markers[index].height)
  //     this.setData({
  //       "markers[0].height": 600 * this.data.scale / 17,
  //       "markers[0].width": 500 * this.data.scale / 17
  //     })
  //   }
  //   // console.log(this.data.num)
  // },
})