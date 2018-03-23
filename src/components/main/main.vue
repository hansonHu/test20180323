<template>
  <div class="wrap">
      <div class="inner">
        <h2>品牌：{{this.hanson.brand}}</h2>
        <h2>产品：{{this.hanson.title}}</h2>
        <h2>货号：{{this.hanson.goodsno}}</h2>
        <h2></h2>
        <table>
          <thead>
            <tr>
              <td>颜色/尺寸</td>
              <td>M</td>
              <td>S</td>
              <td>L</td>
              <td>小计</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in this.hanson.details">
              <td>{{item.color}}</td>
              <td><input type="text" :placeholder="item.M.sum" @blur="changM(index)" ref="numM" onkeyup="
              if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                         onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}
                         else{this.value=this.value.replace(/\D/g,'')}"></td>
              <td><input type="text" :placeholder="item.S.sum" @blur="changS(index)" ref="numS" onkeyup="
              if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                         onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}
                         else{this.value=this.value.replace(/\D/g,'')}"></td>
              <td><input type="text" :placeholder="item.L.sum" @blur="changL(index)" ref="numL" onkeyup="
              if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                         onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}
                         else{this.value=this.value.replace(/\D/g,'')}"></td>
              <td ref="totalColor">{{item.M.num+item.S.num+item.L.num}}</td>
            </tr>
          <tr  class="trSum">
            <td align="center" colspan="5">
              <span>总件数:{{totalHui}},</span>
              <span>总金额:￥{{totalHui*hanson.price}}元,</span>
              <input type="button" value="提交订单" :disabled='totalHui<=0?true:false'>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data(){
        return{
          hanson:""
        }
      },
      created(){
        this.$http.get("http://localhost:3000/data").then(response=>{
          var data=response.data;
          this.hanson=data[0];

        },response =>{
          console.log("网络错误")
        })
      },
      methods:{
        changM:function (index) {
          if(this.$refs.numM[index].value==""){
            this.$refs.numM[index].value=this.hanson.details[index].M.sum
          }
          if(parseInt(this.$refs.numM[index].value)>this.hanson.details[index].M.sum){
            alert("超过库存");
            this.$refs.numM[index].value=0;
            this.hanson.details[index].M.num=0;
            this.$refs.numM[index].focus();
          }else{
            this.hanson.details[index].M.num=parseInt(this.$refs.numM[index].value);
          }
        },
        changS:function (index) {
          if(this.$refs.numS[index].value==""){
            this.$refs.numS[index].value=this.hanson.details[index].S.sum
          }
          if(parseInt(this.$refs.numS[index].value)>this.hanson.details[index].S.sum){
            alert("超过库存");
            this.$refs.numS[index].value=0;
            this.hanson.details[index].S.num=0;
            this.$refs.numS[index].focus()
          }else{
            this.hanson.details[index].S.num=parseInt(this.$refs.numS[index].value);
          }
        },
        changL:function (index) {
          if(this.$refs.numL[index].value==""){
            this.$refs.numL[index].value=this.hanson.details[index].L.sum
          }
          if(parseInt(this.$refs.numL[index].value)>this.hanson.details[index].L.sum){
            alert("超过库存");
            this.$refs.numL[index].value=0;
            this.hanson.details[index].L.num=0;
            this.$refs.numL[index].focus()
          }else{
            this.hanson.details[index].L.num=parseInt(this.$refs.numL[index].value);
          }
        },
      },
      computed:{
        totalHui:function () {
          let abc=0;
          if(!this.hanson){
            return
          }else{
            this.hanson.details.forEach((item)=>{
              abc +=item.L.num+item.M.num+item.S.num
            });
            this.hanson.total=abc;
            return abc
          }
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  table
    margin 0 auto
    tr
      td
        border 1px solid black
        padding 10px
      input
        width 50px
        border 0
        border-bottom 1px solid
        text-align center
    .trSum
      input
        border 1px solid white
        font-size 12px
</style>
