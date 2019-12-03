import { getInsureAttribute } from '@/apis';
export const storeInsure = {
  data () {
    return {
      localDataList: [], // 存储的所有产品信息数组
      scode: ''
    }
  },
  methods: {
    delTimeOver (scode) { // 删除过期的、除本scode之外的存储数据
      let newData = this.readStorageData().filter(item => (item.scode === (scode || this.scode) || item.time > new Date().getTime()))
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
      if (this.readStorageData().some(item => item.scode === (scode || this.scode))) {
        return true
      } else {
        return false
      }
    },
    addLocalData (data, scode, delay = 3600000) { // 添加传入scode匹配的对象, delay为有效时间戳， 默认为1小时，单位是毫秒, data是存储的数据
      if (!this.isLocalDataList()) {
        let obj = {scode: (scode || this.scode), time: (new Date().getTime()) + delay, data: data}
        let newData = []
        newData.push(obj)
        this.storeTotalData(newData)
        return
      }
      if (this.isCurrentObj((scode || this.scode))) {
        let active = this.readStorageData().findIndex(item => item.scode === (scode || this.scode))
        let arr = this.readStorageData()
        arr[active] = {scode: (scode || this.scode), time: (new Date().getTime()) + delay, data: data},
        this.storeTotalData(arr)
      } else {
        let arr = this.readStorageData()
        arr.push({scode: (scode || this.scode), time: (new Date().getTime()) + delay, data: data})
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
      return this.readStorageData().find(item => item.scode === (scode || this.scode))
    },
    delItemStorage (scode) { // 根据scode删除对应数据
      this.storeTotalData(this.readStorageData().filter(item => item.scode === (scode || this.scode)))
    },
    delAllStorage () { // 删除整个localDataList数组
      window.localStorage.removeItem('localDataList')
    },
    objectDeleteNull (data) {
      Object.keys(data).map(items => {
        if (items === 'benefit_percent' && data[items] == 0) {
          delete data[items]
        }
        if (Object.prototype.toString.call(data[items]) == '[object Object]') {
          this.objectDeleteNull(data[items])
        } else if (Object.prototype.toString.call(data[items]) == '[object Array]') {
          data[items].map(items => {
            this.objectDeleteNull(items)
          })
        } else {
          if (data[items] === '') {
            delete data[items]
          }
        }
      })
    },
    enterFunc (scode, data, flag) { // 赋值操作流程总入口，即业务页面点击了引用旧数据选项后调用， data是为需要更新的最新数据
      this.scode = scode
      if (this.isLocalDataList() && this.isCurrentObj(scode)) {
        let that = this
        this.$vux.confirm.show({
          // 组件除show外的属性
          title: '提示',
          content: '您有未填写完成的信息，是否继续？',
          onCancel : () => {
            // console.log(this) //当前 vm
          },
          onConfirm : () => {
            that.delTimeOver(scode)
            let Obj = that.readStorageItemData()
            let datanew = {}
            if (Obj) {
              Obj.data.insure_plan = {...Obj.insure_plan, ...data.insure_plan}
              Obj.data.scode = data.scode
              datanew = Obj.data
            }
            console.log(new Date().getMilliseconds())
            if (!flag) {
              this.objectDeleteNull(datanew)
            }
            console.log(new Date().getMilliseconds())
            that.localInsureData(datanew)
          }
        })
      }
    }
  }
}
