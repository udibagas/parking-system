(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{416:function(t,e,n){"use strict";n.r(e);var l={layout:"login",data:function(){return{email:"",password:"",year:this.$moment().format("YYYY")}},methods:{login:function(){var t=this;this.$auth.loginWith("cookie",{data:{email:this.email,password:this.password}}).then((function(e){return t.$router.push("/")}))}}},r=n(22),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",[n("el-main",{staticStyle:{"text-align":"center",background:"#fff"}},[n("img",{staticStyle:{width:"70px","margin-top":"80px","border-radius":"5px"},attrs:{src:"/images/logo.jpeg"}}),t._v(" "),n("h2",[t._v("MITRATEKNIK PARKING")]),t._v(" "),n("el-form",{staticStyle:{width:"300px",margin:"20px auto 0","text-align":"center"},nativeOn:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[n("el-divider",[n("h3",[t._v("LOGIN")])]),t._v(" "),n("el-form-item",[n("el-input",{attrs:{placeholder:"Email/Username"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),t._v(" "),n("el-form-item",[n("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),n("el-form-item",[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary","native-type":"submit"},on:{click:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[t._v("LOGIN")])],1),t._v(" "),n("el-divider",[t._v("© "+t._s(t.year))])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);