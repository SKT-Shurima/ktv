<template>
	<div class="carousel-wrap" id="carousel">
	    <transition-group tag="ul" class='slide-ul' name="list">
	      <li v-for="(item,index) in sliderList" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go" @click="jump(item)">
	          <img :src="`${qnhost}${item.image}`" :alt="item.name" @error='errorLoadImg'>
	      </li>
	    </transition-group>
	    <div class="carousel-items">
	      <span v-for="(item,index) in sliderList" :class="{'active':index===currentIndex}" @mouseover="currentIndex=index"></span>
	    </div>
	</div>
</template>
<script type="text/esmascript-6">
	export default {
		data() {
			return{
			    currentIndex: 0,
			    timer: '',
			    qnhost: qnhost
			}
		},
		props: {
			sliderList:{
				type: Array
			}
		},
		methods:{
			jump(item){
				if (!item.actionBean.params) {
					return false;
				}else{
					let url  = item.actionBean.params[0].key + "?" + item.actionBean.params[0].val;
					if (url) {
						window.location.href = url;
					}
				}
			},
			go() {
			    this.timer = setInterval(() => {
			        this.autoPlay()
			    }, 3000)
			},
			stop() {
			    clearInterval(this.timer)
			    this.timer = null
			},
			autoPlay() {
			    this.currentIndex++;
			    if (this.currentIndex > this.sliderList.length - 1) {
			        this.currentIndex = 0
			    }
			}
		},
		created() {
		    this.$nextTick(() => {
		        this.timer = setInterval(() => {
		            this.autoPlay()
		        }, 3000)
		    })
		},

	}
	
</script>
<style type="text/css" lang='scss' scoped>
	.carousel-wrap {
		position: relative;
		height: 3.82rem;
		width: 100%;
		overflow: hidden;
		background-color: #fff;
	}
	.slide-ul {
	  	width: 100%;
	  	li {
		    position: absolute;
		    width: 100%;
		    img {
		      	width: 100%;
		    }
	  	}
	}
	.carousel-items {
	  	position: absolute;
	  	z-index: 10;
	  	bottom: .2rem;
	  	width: 100%;
	  	margin: 0 auto;
	  	text-align: center;
	  	font-size: 0;
	  	span {
		    display: inline-block;
		    height: .16rem;
		    width: .16rem;
		    border-radius: 50%;
		    margin: 0px 3px;
		    background-color: rgba(255,255,255,.5);
		    cursor: pointer;
		}
	  	.active {
	    	background-color: #f65287;
	  	}
	}
	.list-enter-active {
	  transition: all 1s ease;
	  transform: translateX(0)
	}
	.list-leave-active {
	  transition: all 1s ease;
	  transform: translateX(-100%)
	}
	.list-enter {
	  transform: translateX(100%)
	}
	.list-leave {
	  transform: translateX(0)
	}
</style>