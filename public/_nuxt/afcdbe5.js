(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{395:function(e,t,o){var content=o(398);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(86).default)("b0ce853a",content,!0,{sourceMap:!1})},397:function(e,t,o){"use strict";o(395)},398:function(e,t,o){var n=o(85)(!1);n.push([e.i,".file-browser[data-v-1afcc26a]{padding:15px;border:1px solid #ddd;width:400px;height:calc(100vh - 270px);overflow:auto;flex-shrink:0}.img-container[data-v-1afcc26a]{flex-grow:1;padding:15px}",""]),e.exports=n},403:function(e,t,o){"use strict";o.r(t);o(23);var n={data:function(){return{url:"",show:!0,checkedNodes:[],expandedNodes:[],props:{label:"label",isLeaf:"isFile"}}},methods:{loadNode:function(e,t){var o={directory:void 0===e.data?"snapshots":e.data.path};this.$axios.$get("/api/snapshot",{params:o}).then((function(e){return t(e)}))},deleteSnapshot:function(){var e=this;this.$confirm("Anda yakin?","Konfirmasi",{type:"warning"}).then((function(){e.$axios.$post("/api/snapshot/delete",{checkedNodes:e.checkedNodes}).then((function(t){e.url="",e.$message({message:t.message,type:"success"}),e.checkedNodes.forEach((function(t){return e.$refs.tree.remove(t)})),e.checkedNodes=[]}))})).catch((function(e){return console.log(e)}))},refresh:function(){var e=this;this.show=!1,this.$nextTick((function(){return e.show=!0}))}}},r=(o(397),o(22)),component=Object(r.a)(n,(function(){var e=this,t=this,o=t.$createElement,n=t._self._c||o;return n("div",[n("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(e){e.preventDefault()}}},[n("el-form-item",{staticStyle:{"margin-bottom":"0"}},[n("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete",disabled:0==t.checkedNodes.length},on:{click:t.deleteSnapshot}},[t._v("HAPUS SNAPSHOT")])],1),t._v(" "),n("el-form-item",{staticStyle:{"margin-bottom":"0"}},[n("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",plain:"",size:"small"},on:{click:t.refresh}})],1)],1),t._v(" "),n("div",{staticStyle:{display:"flex"}},[n("div",{staticClass:"file-browser"},[t.show?n("el-tree",{ref:"tree",attrs:{props:t.props,load:t.loadNode,lazy:"","show-checkbox":"","highlight-current":"","node-key":"path"},on:{"node-click":function(t){var o=t.isFile,n=t.url;return e.url=o?n:""},check:function(e,o){return t.checkedNodes=o.checkedNodes}}}):t._e()],1),t._v(" "),n("div",{staticClass:"img-container"},[n("img",{staticStyle:{width:"100%"},attrs:{src:t.url,alt:""}})])])],1)}),[],!1,null,"1afcc26a",null);t.default=component.exports}}]);