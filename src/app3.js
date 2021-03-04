import './app3.css'
import $ from 'jquery'

const html =
    `    <section id="app3">
        <div class="square"></div>
    </section>`
const $element = $(html).appendTo($('body>.page'))
const $square = $('#app3 .square')
const localKey = 'app3.active'
// yes no undefined
const active = localStorage.getItem('localKey') === 'yes'
//active 返回一个布尔值
/*
if(active){
    $square.addClass('active')
}else {
    $square.removeClass(('active'))
}
*/
//上面代码等价于下面
$square.toggleClass('active',active)
//如果true 就加，false就不加
$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active')
        localStorage.setItem('active','no')
    } else {
        $square.addClass('active')
        localStorage.setItem('active','yes')
    }
    // 等同于下面的代码
    // $square.toggleClass('active')
    // toggleClass如果没有就加上，反之就去掉
})