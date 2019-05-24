import _ from 'lodash';
import './styles.css';
// import TagImage from './tag.png';
import printMe from './print';
import { cube } from './math';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ];
  // element.classList.add('hello');

  // // 将图像添加到我们现有的 div。
  // var myIcon = new Image();
  // myIcon.src = TagImage;

  // element.appendChild(myIcon);

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  console.log('process.env:', process.env.NODE_ENV)

  return element;
}

// document.body.appendChild(component());
var element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    // printMe();
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}