import {request} from "./request";
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
//使用对象进行传值
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.discount=itemInfo.discountDesc
    this.columns=columns
    this.services=services
    this.realPrice=itemInfo.lowNowPrice
  }
}
//店铺信息
export class Shop{
  constructor(shopInfo) {
    this.logo=shopInfo.shopLogo
    this.name=shopInfo.name
    this.fans=shopInfo.cFans
    this.sells=shopInfo.csells
    this.score=shopInfo.score
    this.goodCount=shopInfo.cGoods
  }
}

export class GoodsParam{
  constructor(info,rule){
  //  image可能没有值（某些商品有值，某些没有
    this.image=info.image?info.image[0]:"";
    this.infos=info.set;
    this.sizes=rule.tables
  }
}
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
