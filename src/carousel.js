import React,{Component} from "react";
import ReactDOM from "react-dom";
import "./carousel.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// const ReactCSSTransitionGroup = React.addons.TransitionGroup;
const CarouselItem =(item)=>{
  return <div className="carousel-item">{item}</div>
}

export default class Carousel extends React.Component{
  constructor(props) {
    super(props);
    let {noOfVisibleItem : noOfVisibleItem = 1 ,
        showPagination:showPagination = false,items:items=[]} = this.props;
    this.totalPageNo = Math.ceil(items.length / noOfVisibleItem);
    this.itemWidth = (100/noOfVisibleItem).toFixed(2);
    this.noOfVisibleItem = noOfVisibleItem;
    this.currentPageNo = 1;
    this.items = items;

  }
  componentWillMount(){
    let items = this.getVisibaleItems(this.items , 0 , this.noOfVisibleItem);
    this.setState({
      items : items
    })
  }

  getVisibaleItems(items, start , end){
    let visibleItems = [];
    for(let i = start;i<end;i++){
      items[i] && visibleItems.push(items[i]);
    }
    return visibleItems;
  }
  goPrev =(e)=>{
    e.preventDefault();
    this.goPage(this.currentPageNo -1);
  }

  goNext=(e)=>{
    e.preventDefault();
    this.goPage(this.currentPageNo + 1);
  }

  goPage =(pageNo)=>{
    this.currentPageNo = pageNo;
    let noOfVisibleItem = this.noOfVisibleItem;
    let start = (pageNo -1) * noOfVisibleItem , end = pageNo * noOfVisibleItem;
    this.setState({
      items : this.getVisibaleItems(this.items , start , end)
    });
  }

  hasPrevious (){
    return this.currentPageNo > 1 ;
  }

  hasNext (){
    return this.totalPageNo > 1 && this.currentPageNo !== this.totalPageNo;
  }

  componentWillAppear(){
    console.log(arguments,'will appear')
  }



  render(){
    let {transitionName : transitionName = 'slide',
        noOfVisibleItem : noOfVisibleItem = 1 ,
        showPagination:showPagination = false} = this.props;
    return <div className="carousel-container">
          <div className="carousel">
            {this.hasPrevious() && <div className="carousel__prev" onClick={this.goPrev.bind(this)}>◀</div>}
            {this.hasNext() && <div className="carousel__next" onClick={this.goNext.bind(this)}>▶</div>}
            <ReactCSSTransitionGroup transitionName={transitionName}
            transitionEnterTimeout={500} transitionLeaveTimeout={500}
            component="ul" className="carousel-list">
              {this.state.items.map((item, i) => {
                  return (
                      <li key={item.id} className="carousel-item">{item.name}</li>
                  );
              })}
            </ReactCSSTransitionGroup>
          </div>
    </div>;
  }
}
