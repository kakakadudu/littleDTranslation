Component({
  relations: {
    '../slideItem/slideItem': {
      type: 'child', // 关联的目标节点应为子节点
      linked: function (target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked: function (target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },
  methods: {
    /**
     * 删除某一项
     * @param {*} index 
     * @param {*} cb 
     */
    deleteChild(index, cb) {
      const nodes = this.getRelationNodes("../slideItem/slideItem");
      // 获取删除的子节点
      const deleteNode = nodes[index];
      // 每个子节点的可视高度
      const height = deleteNode.data.height;
      // 判断当前删除的节点是否为最后一个节点
      const isLast = index < nodes.length - 1;
      // 得到向上偏移量 = 子节点高度 + 删除项目后一个的 top - 删除项目的 bottom
      const offsetY = height + nodes[index + 1].data.top - deleteNode.data.bottom;
      console.log(deleteNode.data,"=========")
      // 调用子节点方法
      // deleteNode.setDeleteClass();
    }
  },
})