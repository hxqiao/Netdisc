declare namespace API {
  type LogoutParams = {
  };
  type LoginParams = {
    username: string;
    password: string;
  }

  // 登录接口放回数据
  type TokenData = {
    token: string;
    user: object;
  }

  // 注册接口放回数据
  type registerParams = {
    username: string;
    password: string;
  }
}
