"use strict";
"use strict";
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommodityController = function () {
  function CommodityController(Auth, $state) {
    (0, _classCallCheck3.default)(this, CommodityController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  (0, _createClass3.default)(CommodityController, [{
    key: 'login',
    value: function login(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          // Logged in, redirect to home
          _this.$state.go('main');
        }).catch(function (err) {
          _this.errors.other = err.message;
        });
      }
    }
  }]);
  return CommodityController;
}();

angular.module('coreApp').controller('CommodityController', CommodityController);
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require("babel-runtime/helpers/createClass"),_createClass3=_interopRequireDefault(_createClass2),CommodityController=function(){function e(t,s){(0,_classCallCheck3["default"])(this,e),this.user={},this.errors={},this.submitted=!1,this.Auth=t,this.$state=s}return(0,_createClass3["default"])(e,[{key:"login",value:function(e){var t=this;this.submitted=!0,e.$valid&&this.Auth.login({email:this.user.email,password:this.user.password}).then(function(){t.$state.go("main")})["catch"](function(e){t.errors.other=e.message})}}]),e}();angular.module("coreApp").controller("CommodityController",CommodityController);