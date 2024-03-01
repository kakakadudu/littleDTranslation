Component({
  relations: {
    '../slideItem/slideItem': {
      type: 'child', // 关联的目标节点应为子节点
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
      // 项目高度
      const height = +deleteNode.data.height;
      // 判断当前删除的节点是否为最后一个节点
      const isNoLast = index < nodes.length - 1;
      deleteNode.setAnimationShow(false);
      // 不是列表删除最后一项
      if (isNoLast) {
        nodes.forEach((item, idx) => {
          if (idx >= index) {
            item.setTranslateProps(height, 0);
          }
        });
        // 删除之后，恢复之前的状态
        function afterDelete() {
          nodes.forEach((item, idx) => {
            if (idx >= index) {
              item.setTranslateProps(0, 100);
              setTimeout(() => {
                // 设置左滑删除按钮动画
                item.setAnimationShow(true);
                // 恢复删除节点之后的元素节点向上的偏移量
                item.setTranslateProps(0, 0);
              }, 100);
            }
          })
        }
        cb();
        afterDelete();
      } else {
        // 删除列表最后一项
        cb();
      }
    }
  },
})