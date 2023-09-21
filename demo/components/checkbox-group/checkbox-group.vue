<template>
  <view class="content" >

    <checkbox-group @change="checkboxChange">
      <label :class="item.checked ?  'checkbox selectBox' : 'checkbox '" @click="labelBtn(item.value,index)" v-for="(item,index) in labelList" :key="item.value" >
        <checkbox :value="item.value" :checked="item.checked" v-show="false"/>{{item.name}}
      </label>
    </checkbox-group>

  </view>
</template>

<script>
  export default {
    name:'checkboxgroup',
    props:{
      labelList:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        labelName:'',
        labelDataList:'',

      };
    },
    methods:{
      checkboxChange: function (e) {
        this.labelDataList = e.detail.value
      },
      labelBtn(name,index){
        this.$emit('changeData', {checkData:this.labelDataList,checkIndex:index,checkName:name});
      }

    }
  }
</script>

<style>
  .selectBox{
    background: #000000!important;
    color: #C69C6C !important;
  }
  .checkbox{
    padding: 5px 10px;
    /*border: 1px solid #EB5248;*/
    margin: 10px;
    border-radius: 50upx;
    color: #000;
    background-color: #D7D7D7;
  }
  .content{
    padding: 10px;
  }
</style>
