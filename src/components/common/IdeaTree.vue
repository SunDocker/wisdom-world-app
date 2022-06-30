<template>
  <div
      class="cp_container tree-container"
      :style="{
        flexDirection:direction==='level'?'row':'column',
        '--my-gap':gap || '15px',
    }">
    <div
        v-if="!isStart && parentNode.children && parentNode.children.length>1"
        :class="{
            location_el:true,
            'start_location_el-vertical':direction==='vertical',
            'start_location_el-level':direction==='level',
        }">
    </div>
    <div
        v-if="!isEnd && parentNode.children && parentNode.children.length>1"
        :class="{
            location_el:true,
            'end_location_el-vertical':direction==='vertical',
            'end_location_el-level':direction==='level',
        }">
    </div>
    <div
        class="name tree-name-container"
        :isCurIdea="this.$route.params.id === nodeData.id? 'true': 'false'"
        @click="onItem(nodeData,parentNode,zIndex)">
      {{ nodeName }}
      <div
          v-if="parentNode.name"
          :class="{
                center_el:true,
                'start_center_el-vertical':direction==='vertical',
                'start_center_el-level':direction==='level',
            }">
        <span></span>
      </div>
      <div
          v-if="nodeData.children && nodeData.children.length>0"
          :class="{
                center_el:true,
                'end_center_el-vertical':direction==='vertical',
                'end_center_el-level':direction==='level',
            }">
        <span></span>
      </div>
    </div>
    <div
        class="container tree-childs-container"
        v-if="nodeData.children && nodeData.children.length>0"
        :style="{
            gridTemplateColumns:direction!=='level'?`repeat(${nodeData.children.length},max-content)`:'',
            gridTemplateRows:direction==='level'?`repeat(${nodeData.children.length},max-content)`:'',
            paddingTop:direction!=='level'?'calc(var(--my-gap) * 2)':'',
            paddingLeft:direction==='level'?'calc(var(--my-gap) * 2)':'',
        }">
      <MyTree
          v-for="(item,index) in nodeData.children"
          :key="index"
          :zIndex="zIndex+1"
          :direction="direction"
          :parentNode="nodeData"
          :nodeData='item'
          :isStart='index === 0 && nodeData.children.length>1'
          :isEnd='index === (nodeData.children.length - 1) && nodeData.children.length>1'
          @onClick="onItem($event.nodeData,$event.parentNode,$event.zIndex)"
          >
      </MyTree>
    </div>
  </div>
</template>
<script>
//部门树结构组件  提供css让外部修改
export default {
  name: 'MyTree',
  props: {
    zIndex: {  //结构层级
      type: Number,
      default: 0,
    },
    direction: {  //结构方向
      type: String,
      default: 'vertical',
    },
    nodeData: {  //节点数据对象
      type: Object,
      default: () => {
        return {};
      },
    },
    parentNode: {  //父节点
      type: Object,
      default: () => {
        return {};
      },
    },
    isStart: {  //是左侧
      type: Boolean,
      default: false,
    },
    isEnd: {  //是右侧
      type: Boolean,
      default: false,
    },
    gap: {  //间隔
      type: String,
      default: '15px',
    },
  },
  data() {
    return {};
  },
  computed: {
    nodeName() {
      /*let nodeDataName = this.nodeData.name + '666666666666666666'
      let len = nodeDataName.length

      if (len <= 8) return this.nodeData.name

      let res = ''
      let count = 0;
      for (let i = 8; i < len; i++) {
        if (i % 8 === 0) {
          res += nodeDataName.substring(i - 8, i) + '\n'
          count++
        }
      }
      res += nodeDataName.substring(res.length - count);
      return res*/
      return this.nodeData.name
    },
  },
  methods: {
    onItem(nodeData, parentNode, zIndex) {  //点击事件
      this.$emit('onClick', {
        parentNode,
        nodeData,
        zIndex,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.cp_container {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  --border-color: #ccc; //边框颜色
  > .location_el {
    position: absolute;
  }

  > .start_location_el-vertical {
    height: var(--my-gap);
    width: calc(50% + var(--my-gap));
    left: calc(0px - var(--my-gap));
    top: calc(0px - var(--my-gap));
    border-top: 1px solid var(--border-color);
  }

  > .start_location_el-level {
    width: var(--my-gap);
    height: calc(50% + var(--my-gap));
    left: calc(0px - var(--my-gap));
    top: calc(0px - var(--my-gap));
    border-left: 1px solid var(--border-color);
  }

  > .end_location_el-vertical {
    height: var(--my-gap);
    width: calc(50% + var(--my-gap));
    right: calc(0px - var(--my-gap));
    top: calc(0px - var(--my-gap));
    border-top: 1px solid var(--border-color);
  }

  > .end_location_el-level {
    width: var(--my-gap);
    height: calc(50% + var(--my-gap));
    left: calc(0px - var(--my-gap));
    bottom: calc(0px - var(--my-gap));
    border-left: 1px solid var(--border-color);
  }

  > .name {
    max-width: 160px;
    padding: 12px;
    border-radius: 10px;
    font-size: 14px;
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 1px 4px #00152936;
    color: #3e4761;

/*    > svg {
      margin-right: 5px;
      min-width: 20px;
      width: 20px;
      height: 20px;
    }*/

    &:hover {
      /*.bt_list {
        opacity: 1;
      }*/
      background-color: rgba(128, 128, 128, 0.20);
    }

    > .bt_list {
      opacity: 0;
      display: grid;
      position: absolute;
      height: 30px;
      padding: 0 5px;
      border-radius: 2px;
      background-color: rgb(255, 255, 255);
      bottom: -35px;
      border: 1px solid #dadada;
      box-sizing: border-box;
      z-index: 999;
      grid-gap: 5px;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      transition: all 0.2s;
      box-shadow: 0 1px 4px #00152936;

      &:hover {
        opacity: 1;
      }
    }

    //center 居中的四个边框
    > .center_el {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;

      > span {
        background-color: var(--border-color);
      }
    }

    > .start_center_el-vertical {
      width: 100%;
      height: var(--my-gap);
      right: 0;
      top: calc(0px - var(--my-gap));

      > span {
        width: 1px;
        height: 100%;
      }
    }

    > .start_center_el-level {
      width: var(--my-gap);
      height: 100%;
      left: calc(0px - var(--my-gap));
      top: 0;

      > span {
        height: 1px;
        width: 100%;
      }
    }

    > .end_center_el-vertical {
      width: 100%;
      height: var(--my-gap);
      right: 0;
      bottom: calc(0px - var(--my-gap));

      > span {
        width: 1px;
        height: 100%;
      }
    }

    > .end_center_el-level {
      width: var(--my-gap);
      height: 100%;
      right: calc(0px - var(--my-gap));
      top: 0;

      > span {
        height: 1px;
        width: 100%;
      }
    }
  }

  > .container {
    display: grid;
    grid-gap: var(--my-gap);
    justify-content: center;
    width: fit-content;
  }

  .tree-name-container[isCurIdea=true] {
    background-color: rgb(175, 210, 227);
  }
}
</style>
