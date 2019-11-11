<template>
  <div id="app">
    <router-view v-if="!isQQWeiChart" />
    <div class="navigator show-ios" v-if="isIos && isQQWeiChart">
        <div class="ak">
            <img src="./assets/imgs/safari.jpg" alt="" width="100">
            <h3>1.请点击右上角图标<img src="./assets/imgs/menu.jpg" alt="" class="icon">
                <br>2.用safari浏览器打开</h3>
        </div>
    </div>
    <div class="navigator show-android" v-if="isAndroid && isQQWeiChart">
        <div class="ak">
            <img src="./assets/imgs/android.jpg" alt="" width="100">
            <h3>1.请点击右上角图标<img src="./assets/imgs/menu.jpg" alt="" class="icon">或<img src="./assets/imgs/add.jpg" alt="" class="icon">
                <br>2.用默认浏览器打开</h3>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            isIos: false,
            isAndroid: false,
            isQQWeiChart: false,
        }
    },
    methods: {
        // 区分QQ/微信
        diffQQWeChart(){
            let ua = navigator.userAgent;
            let uaLow = navigator.userAgent.toLowerCase();
            if(!uaLow.match(/MicroMessenger\/[0-9]/i) && !uaLow.match(/QQ\/[0-9]/i)){
                this.isQQWeiChart = false;
            }else{
                this.isQQWeiChart = true;
                if(ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1)
                    this.isAndroid = true
                if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
                    this.isIos = true;
            }
        }
    },
    created() {
        // 销毁有关session
        sessionStorage.removeItem("gtStatus");
        sessionStorage.removeItem("gtuser");
        sessionStorage.removeItem("gtuser1");
        sessionStorage.removeItem("gtState");
        sessionStorage.removeItem("gtSetting");
        sessionStorage.removeItem("gtNewMgs");
        sessionStorage.removeItem("gtuserNames");
        sessionStorage.removeItem("gtSetImg");
        sessionStorage.removeItem("orgNames");
        sessionStorage.removeItem("gtNexConfig");
        sessionStorage.removeItem("claimerConfirm");
        sessionStorage.removeItem("registerInfo");
        sessionStorage.removeItem("accountInfo");
        this.diffQQWeChart();
        console.log('[版本号] 5.32.31');
    }
}
</script>

<style lang="scss">
/****   判断微信QQ    ****/  
.navigator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: #fff;
}

.show-ios,
.show-android {
}

.ak {
    width: 100vw;
    height: 100vh;
}

.ak img {
    display: block;
    margin: 20% auto 20px;
    clear: both;
    width: 30%;
    max-width: 128px;
	pointer-events: none;
}

img.icon {
    width: 30px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
}

.ak h3 {
    display: block;
    width: 240px;
    margin: auto;
}
/****   判断微信QQ    ****/  

/***** 全局样式 -start-****/
html, body{
	height: 100%;
	width: 100%;
	color: #333333;
	padding: 0;
	margin: 0;
	font-size: 10px;
	background-color: #fff;
	scrollbar-width: none;
	-webkit-overflow-scroll: touch !important;
	-webkit-text-size-adjust: none;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	-ms-overflow-style: none;
	-ms-text-size-adjust: 100%;
    -webkit-appearance: none;
}

body::-webkit-scrollbar {
    display: none;
}

#app {
	height: 100%;
	width: 100%;
	font-family: 'Avenir', Helvetica, Arial;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;  
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section,
summary {
    display: block;
}

audio,
canvas,
progress,
video {
    display: inline-block;
    vertical-align: baseline;
}

audio:not([controls]) {
    display: none;
    height: 0;
}

[hidden],
template {
    display: none;
}

svg:not(:root) {
    overflow: hidden;
}

a {
    background: transparent;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    color: #0088cc;
}

a:active {
    outline: 0;
	color: #006699;
}

abbr[title] {
    border-bottom: 1px dotted;
}

b,
strong {
    font-weight: bold;
}

dfn {
    font-style: italic;
}

mark {
    background: #ff0;
    color: #000;
}

small {
    font-size: 80%;
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sup {
    top: -0.5em;
}

sub {
    bottom: -0.25em;
}

img {
    border: 0;
    vertical-align: middle;
	pointer-events: none;
}

hr {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
}

pre {
    overflow: auto;
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: break-word;
}

code,
kbd,
pre,
samp {
    font-family: monospace, monospace;
    font-size: 1em;
}

button,
input,
optgroup,
select,
textarea {
    color: inherit;
    font: inherit;
    margin: 0;
    letter-spacing: 1.1px;
}

button {
    overflow: visible;
}

button,
select {
    text-transform: none;
}

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer;
}

button[disabled],
html input[disabled] {
    cursor: default;
}

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0;
}

input {
    line-height: normal;
	transform: translateZ(0);
	-webkit-transform: translateZ(0);
	-webkit-appearance: none;
}

input[type="checkbox"],
input[type="radio"] {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    height: auto;
}

input[type="search"] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
}

legend {
    border: 0;
    padding: 0;
}

textarea {
    overflow: auto;
    resize: vertical;
}

optgroup {
    font-weight: bold;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

td,
th {
    padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
figure,
form,
blockquote {
    margin: 0;
    font-size: 14px;
}

ul,
ol,
li,
dl,
dd {
    margin: 0;
    padding: 0;
	cursor: pointer;
    -webkit-appearance: none;
}

ul,
ol {
    list-style: none outside none;
}

h1,
h2,
h3 {
    line-height: 32px;
    margin: 5px 0;
}

h1 {
    font-size: 18px;
}

h2 {
    font-size: 18px;
}

h3 {
    font-size: 14px;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
    color: #cccccc;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
    color: #cccccc;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #cccccc;
}

* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

a,
button {
    cursor: pointer;
}

del,
ins,
u,
s,
a,
a:hover {
    text-decoration: none;
}

a,
a:hover {
    color: #333;
}

.text-center {
    text-align: center;
}

.text-left {
    text-align: left;
}

.text-right {
    text-align: right;
}

.w-100 {
    width: 100%;
}

.w-50 {
    width: 50%;
}

.block-auto {
    display: block;
    margin: auto;
}

.block {
    display: block;
}

.inline-block {
    display: inline-block;
}

table {
    width: 100%;
    max-width: 100%;
    background-color: transparent;
}

.el-pagination {
    text-align: right;
    overflow-y: auto;
}

.el-table {
    margin: 10px 0;
}

.el-progress-bar {
    width: 60% !important;
    margin-top: 10px;
}

.el-progress__text {
    margin-top: 10px;
}

.el-form-item__content {
    text-align: left;
}

.el-submenu__title:focus,
.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
    background-color: #919eaf !important;
    color: #fff;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.search .el-input,
.search select {
    width: 200px;
    display: block;
    margin: 0 10px 10px 0;
}

.el-date-editor .el-range-separator {
    width: 7% !important;
}

.search .el-date-editor.el-range-editor.el-input__inner.el-date-editor--datetimerange {
    transform: translateY(-8px);
    margin-top: 5px;
    margin-right: 10px;
}

.search button.el-button.el-button--default {
    transform: translateY(-8px);
    margin-top: 5px;
}

.flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 200px !important;
}

.el-submenu__title,
li.el-menu-item {
    text-align: left;
}

.el-transfer-panel__item .el-checkbox__input {
    left: 10px;
}

.el-transfer .el-transfer-panel:first-child {
    width: 320px !important;
}

.el-transfer .el-transfer-panel:last-child {
    width: 810px !important;
}

.el-transfer__buttons {
    padding: 0 !important;
}

.el-dialog__body {
    /*padding: 30px 10px !important;*/
}

.el-transfer {
    display: flex !important;
    align-items: center;
}

.el-transfer-panel__item.el-checkbox .el-checkbox__label {
    padding: 0 16px !important;
    text-align: left !important;
}

.el-dialog__footer {
    text-align: center !important;
}

.bg-gray td,
.bg-gray th {
    padding: 0 !important;
    height: 17px !important;
    line-height: 17.5px;
}

.bg-gray .el-table td,
.bg-gray .el-table th.is-leaf {
    border-bottom: 1px solid #EBEEF5;
}

.two>div>.el-select {
    width: 50% !important;
}

.two>div>.el-input.el-input--suffix {
    width: 37% !important;
    padding: 0;
}

.two>div>.el-input.el-input--suffix .el-input__inner {
    padding-right: 0px;
}

.el-checkbox__inner {
    width: 20px !important;
    height: 20px !important;
}

.el-checkbox__inner::after {
    height: 12px !important;
    left: 7px !important;
}
/***** 全局样式 -end-****/

/**** iphoneX 兼容性样式 -start-****/
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){ 
   body{
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
   }
   .phonex-pb{
       padding-bottom: constant(safe-area-inset-bottom);
   }
   .iphonex-pt{
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
   }
   .iphonex-pb{
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
   }
   .iphonex-mt{
      margin-top: constant(safe-area-inset-top);
      margin-top: env(safe-area-inset-top);
   }
   .iphonex-mb{
      margin-bottom: constant(safe-area-inset-bottom);
      margin-bottom: env(safe-area-inset-bottom);
   }
   .iphonex-pl{
      padding-left: constant(safe-area-inset-left);
      padding-left: env(safe-area-inset-left);
   }
   .iphonex-pr{
      padding-right: constant(safe-area-inset-right);
      padding-right: env(safe-area-inset-right);
   }
   .iphonex-ml{
      margin-left: constant(safe-area-inset-left);
      margin-left: env(safe-area-inset-left);
   }
   .iphonex-mr{
      margin-right: constant(safe-area-inset-right);
      margin-right: env(safe-area-inset-right);
   }
   .iphonex-bd-top-bg{
      border-top: 88px solid transparent;
   }
   .iphonex-bd-top{
      border-top: 44px solid transparent;
   }
   .iphonex-bd-bottom{
      border-bottom: 34px solid transparent;
   }
}
/**** iphoneX 兼容性样式 -end-****/
</style>
