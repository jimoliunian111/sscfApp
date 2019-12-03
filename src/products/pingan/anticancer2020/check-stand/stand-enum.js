export const standType = { // 处理状态
  success: 0,
  fail: 1,
  dealing: 2 // 处理中
}

export const payType = {
  pending: 1, // 未支付
  paid: 2, // 已支付
  close: 3 // 关闭
}

export const proposalStatus  = { // 保单状态
  /**
   * 待支付
   *
   * @var int
   */
  PENDING: 0,
  
  /**
   * 已支付
   *
   * @var int
   */
  PAID: 1,
  
  /**
   * 无效
   *
   * @var int
   */
  INVALID: 2,

  /**
   * 承保成功
   *
   * @var int
   */
  DONE: 3,
  
  /**
   * 核保失败
   *
   * @var int
   */
  FAILED: 4,
  
  /**
   * 支付失败
   */
  PAY_FAILED: 10,
  
  /**
   * 承保失败
   */
  CONFIRM_FAILED: 20

}

