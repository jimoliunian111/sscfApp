export const storeInsure = {
  data () {
    return {
      localDataList: [] // 存储的所有产品信息数组
    }
  },
  methods: {
    delTimeOver (scode) { // 删除过期的、除本scode之外的存储数据
      let newData = this.readStorageData().filter(item => (item.scode === scode || item.time > new Date().getTime()))
      this.storeTotalData(newData)
    },
    isLocalDataList () { // 是否有存储过localDataList数组
      if (window.localStorage.getItem('localDataList')) {
        return true
      } else {
        return false
      }
    },
    isCurrentObj (scode) { // 在localDataList中是否含有传入scode匹配的数据信息， 前置条件是localDataList存在，即this.isLocalDataList() 为true时
      if (this.readStorageData().find(item => item.scode === scode)) {
        return true
      } else {
        return false
      }
    },
    addLocalData (scode, data, delay = 3600000) { // 添加传入scode匹配的对象, delay为有效时间戳， 默认为1小时，单位是毫秒, data是存储的数据
      if (!this.isLocalDataList()) {
        let obj = {scode: scode, time: (new Date().getTime()) + delay, data: data}
        let newData = []
        newData.push(obj)
        this.storeTotalData(newData)
        return
      }
      if (this.isCurrentObj(scode)) {
        let active = this.readStorageData().findIndex(item => item.scode === scode)
        let arr = this.readStorageData()
        arr[active] = {scode: scode, time: (new Date().getTime()) + delay, data: data},
        this.storeTotalData(arr)
      } else {
        let arr = this.readStorageData()
        arr.push({scode: scode, time: (new Date().getTime()) + delay, data: data})
        this.storeTotalData(arr)
      }
    },
    storeTotalData (data) { // 存储数组
      window.localStorage.setItem('localDataList', JSON.stringify(data))
    },
    readStorageData () { // 读取全部存储
      return JSON.parse(window.localStorage.getItem('localDataList'))
    },
    readStorageItemData (scode) { // 读取单个数据
      return this.readStorageData().find(item => item.scode === scode)
    },
    delItemStorage (scode) { // 根据scode删除对应数据
      this.storeTotalData(this.readStorageData().filter(item => item.scode !== scode))
    },
    delAllStorage () { // 删除整个localDataList数组
      window.localStorage.removeItem('localDataList')
    },
    enterFunc (scode, data) { // 赋值操作流程总入口，即业务页面点击了引用旧数据选项后调用， data是为需要更新的最新数据
      if (this.isLocalDataList() && this.isCurrentObj(this.scode)) {
        let that = this
        this.$vux.confirm.show({
          // 组件除show外的属性
          title: '提示',
          content: '您已填写过相关信息，是否引用？',
          onCancel : () => {
            console.log(this) //当前 vm
          },
          onConfirm : () => {
            that.delTimeOver(scode)
            let Obj = that.readStorageItemData(scode)
            let datanew = {}
            if (Obj) {
              Obj.data.insure_plan = {...Obj.insure_plan, ...data.insure_plan}
              Obj.data.scode = data.scode
              datanew = Obj.data
            }
            that.localInsureData(datanew) // 此方法名必须对应存在于页面
          }
        })
      }
    }
  }
}
