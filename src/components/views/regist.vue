<template>
    <div class="reg">
       <div class="logo"></div>
       <div class="phone">{{nickName}}邀请你加入{{roleName}}</div>
       <form>
           <div class="row"><input type="text" v-model="phoneNum" class="ipt phone_ipt" placeholder="请输入手机号码" /></div>
           <div class="row"><input type="text" v-model="voliCode" class="ipt voli_ipt" placeholder="验证码" />
               <input type="button" :value="voliIptVal" :disabled="enableVoliBtn" class="btn voli_btn" @click="sendVoli" /></div>
           <div class="row"><input type="password" v-model="psw" class="ipt phone_ipt" placeholder="请输入登录密码" /></div>
           <div class="row" v-if="isDelivery">
               <el-cascader
                    v-model="countyCode"
                    placeholder="请选择区域"
                    :options="areaOptions"
                    :props="props"
                    @active-item-change="handleItemChange"
                    clearable
               ></el-cascader>
           </div>
           <div class="protocol">
               <label :class="['check', {checked: checkProtocal}]"><input type="checkbox" v-model="checkProtocal">我已阅读并同意超级飞人《超级服务协议》</label>
           </div>
           <div class="submit_btn"><input type="button" value="同意协议并注册" class="btn" @click="goComm" /></div>
       </form>
    </div>
</template>

<script>
import {deepClone, $http} from '../../assets/js/utils'
export default {
    name: 'top',
    data () {
        return {
            nickName: '',
            phoneNum: '',
            voliCode: '',
            voliIptVal: '发送验证码',
            enableVoliBtn: false,
            psw: '',
            checkProtocal: true,
            recommendCode: null,
            role: '',
            roleName: '',
            isDelivery: false,
            countyCode: [],
            areaOptions: [],
            props: {
                label: 'name',
                value: 'code',
                children: 'children'
            }
        }
    },
    mounted () {
        // console.log(this.$route.query.role, this.$route.query.memberRecommendCode)
        this.role = this.$route.params.role
        // 获取推荐码参数
        this.recommendCode = this.$route.params.memberRecommendCode
        // 获取省份列表
        if (this.role === 'delivery') {
            this.isDelivery = true
            this.roleName = '超级飞人'
            this.getArea(0, 1)
        } else {
            this.roleName = '超级跑腿'
        }
        // 获取推荐人信息
        this.getUserInfo()
    },
    methods: {
        // 获取推荐人信息
        getUserInfo () {
            let id = this.recommendCode
            let me = this
            $http({
                url: '/api/recommend/recommendMemberInfo',
                data: {
                    recommendCode: id
                }
            }).then(res => {
                me.nickName = res.data.nickName
            }).catch(err => {
                console.log(err)
                this.$message({
                    message: '获取推荐人信息出错',
                    type: 'error',
                    duration: 1000
                })
            })
        },
        sendVoli () {
            let me = this
            // 验证
            let mobile = this.phoneNum
            if (mobile === '') {
                this.$message({
                    message: '请填写手机号',
                    type: 'error',
                    duration: 1000
                })
                return
            }

            // 倒计时
            let remainTime = 60
            this.enableVoliBtn = true
            this.voliIptVal = remainTime + '秒后重新发送'
            let siTime = setInterval(() => {
                if (remainTime === 0) {
                    clearInterval(siTime)
                    remainTime = 60
                    me.enableVoliBtn = false
                    this.voliIptVal = '发送验证码'
                } else {
                    remainTime--
                    me.voliIptVal = remainTime + '秒后重新发送'
                }
            }, 1000)

            // 发送
            $http({
                url: '/api/Common/sendAndSaveCheckCodeNew',
                data: {
                    isDelivery: 0,
                    isValidate: 0,
                    mobile: mobile
                }
            }).then(res => {
                this.$message({
                    message: res.message,
                    type: 'success',
                    duration: 1000
                })
            }).catch(err => {
                console.log(err)
                this.$message({
                    message: '发送验证码出错',
                    type: 'error',
                    duration: 1000
                })
            })
        },
        goComm () {
            console.log(this.countyCode)
            // 注册
            let checkCode = this.voliCode
            let mobile = this.phoneNum
            let password = this.psw
            let recommendCode = this.recommendCode
            let msg = ['密码格式错误！', '必须是数字和字母，区分大小写，长度为6-16位']
            let msgDatas = []
            const h = this.$createElement
            for (let i in msg) {
                msgDatas.push(h('p', null, msg[i]))
            };
            if (!this.checkPassWord(password)) {
                this.$message({
                    message: h('div', {
                        class: 'el-message__content'
                    }, msgDatas),
                    type: 'error',
                    duration: 1000
                })
                return
            }
            if (this.role === 'user') {
                // 用户注册
                $http({
                    url: '/api/user/userRegister',
                    data: {
                        checkCode: checkCode,
                        mobile: mobile,
                        password: password,
                        recommendCode: recommendCode
                    }
                }).then(res => {
                    if (res.state !== 200) {
                        this.$message({
                            message: res.message,
                            type: 'error',
                            duration: 1000
                        })
                        return
                    }
                    this.$message({
                        message: '用户注册成功',
                        type: 'success',
                        duration: 1000
                    })
                    setTimeout(function () {
                        window.location = '../appdownload/pages/download_APP.html'
                    }, 1000)
                }).catch(err => {
                    console.log(err)
                    this.$message({
                        message: '用户注册失败',
                        type: 'error',
                        duration: 1000
                    })
                })
            } else {
                // 骑手注册
                $http({
                    url: '/api/superDelivery/superDeliveryRegister',
                    data: {
                        checkCode: checkCode,
                        province: this.countyCode[0], // 省份编码
                        city: this.countyCode[1], // 城市编码
                        country: this.countyCode[2], // 所在区县编码
                        mobile: mobile,
                        password: password,
                        recommendCode: recommendCode
                    }
                }).then(res => {
                    if (res.state !== 200) {
                        this.$message({
                            message: res.message,
                            type: 'error',
                            duration: 1000
                        })
                        return
                    }
                    this.$message({
                        message: '骑手注册成功',
                        type: 'success',
                        duration: 1000
                    })
                    setTimeout(function () {
                        window.location = '../appdownload/pages/download_APP_deliverer.html'
                    }, 1000)
                }).catch(err => {
                    console.log(err)
                    this.$message({
                        message: '骑手注册失败',
                        type: 'error',
                        duration: 1000
                    })
                })
            }
        },
        getArea (ParentCode, level) {
            // 获取省份列表
            $http({
                url: '/api/Common/getAreaByParentCode',
                data: {
                    level: level,
                    parentCode: ParentCode
                }
            }).then(res => {
                this.areaOptions = []
                this.areaOptions = res.data.map(function (item) {
                    let area = deepClone(item)
                    area.children = []
                    return area
                }, this)
            }).catch(err => {
                console.log(err)
                this.$message({
                    message: '获取区域失败',
                    type: 'error',
                    duration: 1000
                })
            })
        },
        handleItemChange (val) {
            // 选择列表列出子节点
            let flag = false
            let level = 1
            if (val.length === 1) {
                level = 2
                this.areaOptions.some(function (item) {
                    if (item.code === val[0]) {
                        if (item.children.length > 0) {
                            flag = true
                        }
                    }
                })
            } else if (val.length === 2) {
                level = 3
                this.areaOptions.some(function (item) {
                    if (item.code === val[0]) {
                        item.children.some(function (sub) {
                            if (sub.code === val[1]) {
                                if (sub.children.length > 0) {
                                    flag = true
                                }
                            }
                        })
                    }
                })
            } else if (val.length === 3) {
                flag = true
            }
            if (!flag) {
                $http({
                    url: '/api/Common/getAreaByParentCode',
                    data: {
                        level: level,
                        parentCode: val[val.length - 1]
                    }
                }).then(res => {
                    let children = []
                    if (val.length < 2) {
                        children = res.data.map(function (item) {
                            let area = deepClone(item)
                            area.children = []
                            return area
                        }, this)
                    } else {
                        children = res.data
                    }

                    this.setArea(children, this.areaOptions, val)
                }).catch(err => {
                    console.log(err)
                    this.$message({
                        message: '获取区域失败',
                        type: 'error',
                        duration: 1000
                    })
                })
            }
        },
        setArea (children, options, codeArr) {
            // 选择县后填充
            options.some(function (item) {
                if (codeArr[0] === item.code) {
                    if (codeArr.length === 1) {
                        item.children = children
                    } else if (codeArr.length === 2) {
                        item.children.some(function (sub) {
                            if (sub.code === codeArr[1]) {
                                sub.children = children
                            }
                        })
                    }
                }
            })
        },
        // 密码必须包含数字和字母
        checkPassWord (password) {
            let str = password
            if (str == null || str.length < 8) {
                return false
            }
            var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
            return reg.test(str)
        }
    }
}
</script>
