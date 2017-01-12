"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

require("./carousel.css");

var _reactAddonsCssTransitionGroup = require("react-addons-css-transition-group");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const ReactCSSTransitionGroup = React.addons.TransitionGroup;
var CarouselItem = function CarouselItem(item) {
  return _react2.default.createElement(
    "div",
    { className: "carousel-item" },
    item
  );
};

var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _initialiseProps.call(_this);

    var _this$props = _this.props,
        _this$props$noOfVisib = _this$props.noOfVisibleItem,
        noOfVisibleItem = _this$props$noOfVisib === undefined ? 1 : _this$props$noOfVisib,
        _this$props$showPagin = _this$props.showPagination,
        showPagination = _this$props$showPagin === undefined ? false : _this$props$showPagin,
        _this$props$items = _this$props.items,
        items = _this$props$items === undefined ? [] : _this$props$items;

    _this.totalPageNo = Math.ceil(items.length / noOfVisibleItem);
    _this.noOfVisibleItem = noOfVisibleItem;
    _this.currentPageNo = 1;
    _this.itemWidth = (100 / noOfVisibleItem).toFixed(2);
    _this.items = items;

    return _this;
  }

  _createClass(Carousel, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var items = this.getVisibaleItems(this.items, 0, this.noOfVisibleItem);
      this.setState({
        items: items,
        animationDir: 'right'
      });
    }
  }, {
    key: "getVisibaleItems",
    value: function getVisibaleItems(items, start, end) {
      var visibleItems = [];
      for (var i = start; i < end; i++) {
        items[i] && visibleItems.push(items[i]);
      }
      return visibleItems;
    }
  }, {
    key: "hasPrevious",
    value: function hasPrevious() {
      return this.currentPageNo > 1;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      return this.totalPageNo > 1 && this.currentPageNo !== this.totalPageNo;
    }
  }, {
    key: "componentWillAppear",
    value: function componentWillAppear() {
      console.log(arguments, 'will appear');
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$transitionName = _props.transitionName,
          transitionName = _props$transitionName === undefined ? 'slide' : _props$transitionName,
          _props$noOfVisibleIte = _props.noOfVisibleItem,
          noOfVisibleItem = _props$noOfVisibleIte === undefined ? 1 : _props$noOfVisibleIte,
          _props$showPagination = _props.showPagination,
          showPagination = _props$showPagination === undefined ? false : _props$showPagination;

      transitionName = transitionName + '-' + this.state.animationDir;
      var style = {
        width: this.itemWidth + '%'
      };
      return _react2.default.createElement(
        "div",
        { className: "carousel-container" },
        this.hasPrevious() && _react2.default.createElement(
          "div",
          { className: "carousel__prev", onClick: this.goPrev.bind(this) },
          "◀"
        ),
        _react2.default.createElement(
          "div",
          { className: "carousel" },
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            { transitionName: transitionName,
              transitionEnterTimeout: 500, transitionLeave: 500,
              component: "div", className: "carousel-list" },
            this.state.items.map(function (item, i) {
              return _react2.default.createElement(
                "div",
                { key: item.id, className: "carousel-item blue", style: style },
                _react2.default.createElement(
                  "h3",
                  null,
                  item.name
                )
              );
            })
          )
        ),
        this.hasNext() && _react2.default.createElement(
          "div",
          { className: "carousel__next", onClick: this.goNext.bind(this) },
          "▶"
        )
      );
    }
  }]);

  return Carousel;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.goPrev = function (e) {
    e.preventDefault();
    _this2.goPage(_this2.currentPageNo - 1, 'left');
  };

  this.goNext = function (e) {
    e.preventDefault();
    _this2.goPage(_this2.currentPageNo + 1, 'right');
  };

  this.goPage = function (pageNo, dir) {
    _this2.currentPageNo = pageNo;
    var noOfVisibleItem = _this2.noOfVisibleItem;
    var start = (pageNo - 1) * noOfVisibleItem,
        end = pageNo * noOfVisibleItem;
    _this2.setState({
      items: _this2.getVisibaleItems(_this2.items, start, end),
      animationDir: dir
    });
  };
};

exports.default = Carousel;