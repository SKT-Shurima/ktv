
import App from './App'
Vue.prototype.successLoadAvater = function(event) {
  if (event.target.complete == true) {
    event.target.classList.remove("default-avater");;
    var imgParentNode = event.target.parentNode;
    if(imgParentNode.classList.contains('show-img')==true){
      imgParentNode.style.background = "#000";
    }
  }
};
Vue.prototype.errorLoadAvater = function(event) {
    event.target.src = '';
    event.target.classList.add("default-avater");;
};
Vue.prototype.errorLoadImg = function(event) {
    event.target.src = '../../../static/img/default-img.png';
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
