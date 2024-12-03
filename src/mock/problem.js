import { Mock } from "mockjs";

Mock.mock('/api/problem/:id/description', 'get', function(options) {
    const id = options.param.id;
    // 根据id生成模拟数据
    const data = Mock.mock({
      'description|1-100': '@cparagraph'
    });
    return {
      err: null,
      data: data
    };
  });
