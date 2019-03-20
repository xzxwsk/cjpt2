<template>
    <div class="comm">
        <h3 class="title"><i class="fa fa-angle-left" @click="goReturn"></i>有奖推荐</h3>
        <div class="tab">
            <ul class="tab_head clearfix">
                <li :class="curTab == 0 ? 'cur' : ''" @click="selectTab(0)"><span>邀请用户</span></li>
                <li :class="curTab == 1 ? 'cur' : ''" @click="selectTab(1)"><span>邀请飞人</span></li>
            </ul>
            <div :class="curTab === 0 ? 'tab_con active' : 'tab_con'">
                <p class="title_img"><img :src="img"></p>
                <p class="num">已成功邀请<span class="txt_green">10名</span>用户</p>
                <ul>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                </ul>
            </div>
            <div :class="curTab === 1 ? 'tab_con active' : 'tab_con'">
                <p class="title_img"><img :src="img"></p>
                <p class="num">已成功邀请<span class="txt_green">10名</span>飞人</p>
                <ul>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                    <li>
                        <span class="date">2018-07-06 15:22:33</span><span class="head_img"><img :src="headImg" /></span>152****0101
                    </li>
                </ul>
            </div>
        </div>
        <p class="bottom">*具体奖励请咨询当地服务商</p>
    </div>
</template>

<script>

export default {
    name: 'index',
    data () {
        return {
            img: require('../../assets/images/img_01.png'),
            headImg: require('../../assets/images/img_02.png'),
            curTab: 0
        }
    },
    methods: {
        selectTab (idx) {
            console.log(idx)
            this.curTab = idx
        },
        goReturn () {
            this.$router.back(-1)
        }
    }
}
</script>
