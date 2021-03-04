import './app1.css'
import $ from 'jquery'

const eventBus = $(window)
// 初始化界面
// model
const m = {
    data: {
        n: parseInt(localStorage.getItem('n'))
    },
    create() {
    },
    delete() {
    },
    update(data) {
        // 把data的属性复制给m.data
        Object.assign(m.data, data)
        // 触发事件，其他地方只要监听这个事件
        eventBus.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    },
    get() {
    }
}
// view
const v = {
    el : null,
    html: `
  <div>
    <div class="output">
      <span id="number">{{n}}</span>
    </div>
    <div class="actions">
      <button id="add1">+1</button>
      <button id="minus1">-1</button>
      <button id="mul2">*2</button>
      <button id="divide2">÷2</button>
    </div>
  </div>
`,
    init(container) {
        v.el = $(container)
    },
    render(n) {
        if (v.el.children.length !== 0) v.el.empty()
        $(v.html.replace('{{n}}', n))
            .appendTo(v.el)
    //    如果el内不为空，就先全部清空，然后替换data中的n然后在加到容器里
    }
}
// controller
const c = {
    init(container) {
        v.init(container)  //先初始化容器
        v.render(m.data.n) //view = render(Data)
        c.autoBindEvents() //添加事件委托
        // 添加监听m:updated
        eventBus.on('m:updated', () => {
            v.render(m.data.n)
        })
    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'div',
    },
    add() {
        m.update({n: m.data.n + 1})
    },
    minus() {
        m.update({n: m.data.n - 1})
    },
    mul() {
        m.update({n: m.data.n * 2})
    },
    div() {
        m.update({n: m.data.n / 2})
    },
    autoBindEvents() {
        for (let key in c.events) {
            // 将key划分成两部分，以空格隔开
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            v.el.on(part1, part2, value)
        }
    }
}

// 把c给暴露出去 c需要外面传一个参数container
export default c