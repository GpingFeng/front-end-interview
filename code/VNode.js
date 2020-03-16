/**
 * 虚拟 DOM 的一些方法
 */
class VNode {
  constructor(tag, data, children, text, elm) {
    // 当前的标签名
    this.tag = tag
    // 当前节点的一些数据信息，包括 props，attrs
    this.data = data
    // 当前节点的子节点
    this.children = children
    // 当前节点的文本信息
    this.text = text
    // 当前虚拟节点对应的真实节点
    this.elm = elm
  }
}

// 创建一个空节点
function createEmptyVNode () {
  const node = new VNode()
  node.text = ''
  return node
}

// 创建一个文本节点
function createTextVNode (val) {
  const node = new VNode(undefined, undefined, undefined, String(val), undefined)
  return node
}

// 克隆一个节点
function cloneVNode (node) {
  const node = new VNode(
    node.tag,
    node.data,
    node.children,
    node.text,
    node.elm
  )
  return node
}