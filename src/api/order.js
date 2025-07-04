import request from '@/utils/request'

// 订单结算接口
// mode:cart=>obj {cartIds}
// mode:buynow =>obj {goodsId,goodsNum,goodsSkuId}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart butNow
      delivery: 10, // 10配送 20门店自提
      couponId: 0, // 优惠券id  传0不使用优惠券
      isUsePoints: 0, // 积分  传0不使用积分
      ...obj // 传递过来的参数对象动态展开
    }
  })
}
