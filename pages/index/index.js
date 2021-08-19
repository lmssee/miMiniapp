// index.js
// 获取应用实例
import data from '../../data.js';
const app = getApp()
Page({
  /** 
   * 获取数据使用 this.data[''] 或 this.data. 
   * 设置数据使用 this.setData({
   *                         text:'text' 
   *                          })
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    dataList: ["微", "信", "小", '程', '序'],
    switchValue: false,

  },
  onShow(){
    console.log(data.hi);
    wx.showToast({
      title: data.hi,
      duration: 1200
    });
    data.hi = 'hi , you are zhang';
  },
  onReady() {
    this.setData({
      endTime: new Date().toLocaleDateString()
    });
    let _this = this;
    wx.getUserInfo({
      success(res) {
        _this.setData({
          userInfo: res.userInfo.nickName
        });
      }
    });
    /** *
     *  本地储存
     * 
     *    貌似同步和异步方法还不一样, wx 自己封装的太麻烦了 
     *    关键是还不能用原生
     *    
     *     其他还行 也是 get set remove clear 
     */
    wx.setStorage({
      key: 'hi',
      data: 'hi'
    });
    // wx.getStorage({
    //   key: 'hi',
    //   success(r) {
    //     wx.showToast({
    //       title: r.data,
    //       duration: 600
    //     })
    //   }
    // });

  },
  onLoad() {
 
    console.log(wx.getAccountInfoSync().miniProgram.appId);
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // try {
    //   const s = wx.getSystemInfoSync()
    //   console.log(s);
    // } catch (e) {
    //   console.log(e);
    // }
    wx.getSystemInfo({
      success(res) {
        console.log('获取设备信息');
        console.log(res);
      },
      fail(e) {
        console.log('获取设备信息失败');
        console.log(e);
      },
    })
    wx.getSetting({
      success(res) {
        console.log('获取授权信息');
        console.log(res.authSetting);
      }
    });
    wx.openSetting({
      success(res) {
        console.log('获取用户设置');
        console.log(res.authSetting);
      }
    });
    /** 下面是获取录音权限的配置,只会弹出一次获取授权的信息 */
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              wx.startRecord()
            }
          })
        }
      }
    });
    /** *
     *  获取微信的数据状态
     */
    wx.getNetworkType({
      success: (result) => {
        console.log(result);
      },
    });

  },

  onShareAppMessage() {
    return {
      title: "你好，你好",
      path: "pages/home/list/list"
    }
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh({
      success: (res) => {
        console.log(res);
      },
    })
  },
  bindViewTap() {
    // wx.reLaunch({
    //   url: '../home/home/home',
    // })
    wx.navigateTo({
      url: '../logs/logs'
      /**  
       *   
       *   wx.navigateTo();     跳转
       *   
       *   wx.navigateBack();   回退
       *    
       *                        delta    次数 返回几个,若大于栈中总数量,返回首页
       *   
       *   wx.redirectTo();   去向哪个页面,不包括 TabBar
       *  
       *   wx.reLaunch();   去向任何地址,并清除所有栈
       *  
       *   wx.switchTab();  去除非 tabBar 地址,并跳转到 tabBar 页面
       * 
       *   wx.navigateToMiniProgram 接口可以打开另一个小程序,需要在
       *       app.json 的全局配置中设置需要跳转的 appId 
       *     
       */
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onClickTitleText(e) {
    console.log(e.target.dataset.hi);
  },
  log(e) {
    // console.log(e.detail);
    console.log(this.data.inputTest);
  },

  onClickThisButton() {
    wx.getUserInfo({
      success(res) {
        console.log(res);
      }
    })
  },
  clickShowAToast() {
    wx.showToast({
      title: '你好，你好',
      // icon:'success',
      // image:'',
      duration: 1500,
      mask: 'true',
      success() {
        console.log(1);
      },
      fail() {
        console.log(2);
      },
      complete() {
        console.log(3);
      }
      /*** *
       *  
       *  wx.showLoading({
       *    title:'加载中'
       *   });
       *   setTimeout(()=>{
       *    wx.hideLoading()
       *    },2000);
       *  
       *  wx.showLoading 和 wx.showToast 同时只能显示一个
       */
    })
  },
  clickShowAModal() {
    wx.showModal({
      title: '对话框一个',
      content: '我是一个对话框',
      showCancel: 'true',
      cancelText: '关闭',
      cancelColor: '#669',
      confirmText: '了解',
      confirmColor: '#f06',
      success(res) {
        if (res.confirm) {
          console.log(res);
        } else if (res.cancel) {
          console.log(res);
        }
      },
      fail() {
        console.log(2);
      },
      complete() {
        console.log(3);
      }
    })
  },
  clickShowAActionSheet() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      itemColor: '#000',
      success(res) {
        console.log(res);
      },
      fail() {
        console.log(2);
      },
      complete() {
        console.log(3);
      }
    })
  },
  clickAndGoToTop() {
    wx.pageScrollTo({
      duration: 300,
      scrollTop: 0,
      success(res) {
        console.log(res);
      },
      fail() {
        console.log(2);
      },
      complete(e) {}
    })
  },
  clickChangeTitle() {
    wx.setNavigationBarTitle({
      title: 'title',
      success(res) {
        console.log(res);
      }
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#0f0',
      animation: 'linear',
      success() {

      },
      fail() {

      },
      complete() {

      }
    });
  },
  clickGetMenuButton() {
    console.log(wx.getMenuButtonBoundingClientRect());
    /** *
     * 
     *  下面的函数只能在有 tabBar 的时候可以使用
     * 
     */
    // wx.setTabBarStyle({
    //   backgroundColor: '#00f0f0',
    //   selectedColor: '#ff0',
    //   color: '#0f0',
    //   borderStyle: 'white'
    // });

    wx.request({
      url: 'https://lmssee.cn:3000/api/',
      data: {
        data: 123
      },
      /** * 
       *   header 
       *    在请求时 get 时可以不设置,在请求为 post 时,需要设置为 header:{
       *                                                              content-type:application/json
       *                                                              }
       *  可以通过返回信息中的 RequestTask() 监听服务器返回状态
       */
      method: "GET",
      dataType: 'json',
      responseType: 'text',
      success(res) {
        wx.showModal({
          content: res.data,
          cancelColor: 'cancelColor',
        })
        console.log(res.data);
      },
      fail(r) {
        console.log(r);
      },
      complete(e) {
        // console.log(e);
      }
    });
    /*** *
     *  下载 用 api 
     *    wx.downloadFile({
     *      url:"",
     *      header:"",
     *      filePath:""
     *         //设置下载路径,若不设置,则为临时文件
     *      success(){},fail(){},complete(){}
     *     });
     * 
     * 
     * 
     *     wx.uploadFile({
     *      url:"",
     *      header:"",
     *      name:"",
     *      formData:"",
     *      filePath:""
     *         //设置下载路径,若不设置,则为临时文件
     *      success(){},fail(){},complete(){}
     *     });
     *     
     * 
     *    socket Api
     *    
     *   wx.connectSocket({
     *      url:"",
     *      header:{
     *      'content-type': 'application/json'
     *      }
     * 
     *    })
     */
  },
  files() {
    wx.chooseMessageFile({
      count: 2,
      /* *0 ~ 100*/
      type: 'file',
      /* all video image file */
      extension: ['text'],
      /** 过滤的文件类型 */
      success() {

      },
      fail() {

      },
      complete() {

      }
    });
    wx.chooseImage({
      success(res) {
        const temp = res.tempFilePaths
        wx.saveFile({
          tempFilePath: temp[0],
          success(res) {
            const savePath = res.savedFilePath;
          }
        });
        wx.getSavedFileList({
          success: (result) => {
            console.log(res.fileList);
          },
          fail: (res) => {},
          complete: (res) => {},
        });
        wx.removeSavedFile({
          filePath: 'filePath',
        });
        wx.getSavedFileInfo({
          /*** 仅能用于保存在本地的文件,不能访问临时文件 */
          filePath: 'filePath',
        });
        wx.openDocument({
          filePath: 'filePath',
          success(res) {
            console.log(123);
          }
        })
      }
    })
  },
  imageS() {
    wx.saveImageToPhotosAlbum({
      filePath: 'filePath',
      success(res) {
        console.log(res);
      }

    })
    wx.previewImage({
      urls: [],
      current: '' // 默认第一张
    });
    wx.chooseImage({
      count: 1, //默认 9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
      }
    })
  },
  getRecorderMannager() {
    wx.getRecorderManager().start({
      duration: 600000,
      sampleRate: 8000,
      numberOfChannels: 2,
      encodeBitRate: 48000,
      format: 'mp3',
      //  frameSize:''
      audioSource: 'auto'
    });
    /** *
     *   wx.getAvailableAudioSources({
     *     success(res){
     *               }
     *      })
     * 
     *  
     */
  },
  getRecorderManagerPause() {
    wx.getRecorderManager().pause()
  },
  getRecorderManagerResume() {
    wx.getRecorderManager().resume()
  },
  getRecorderManagerStop() {
    wx.getRecorderManager().stop()
  }
})