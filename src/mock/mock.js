import Mock from 'mockjs';

// 模拟登录接口
Mock.mock('http://localhost:8000/api/identity/login', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.email === 'admin' && body.password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'your-token-here',
        user: {
          id: 1,
          name: 'admin'
        }
      }
    };
  } else {
    return {
      code: 400,
      message: '用户名或密码错误'
    };
  }
});