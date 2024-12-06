import Mock from "mockjs";

Mock.mock(/\/api\/problem\/(\d+)\/description/, 'get', function (options) {
  const id = options.url.match(/\/api\/problem\/(\d+)\/description/)[1];
  // 根据id生成模拟数据
  const data = {
    "id": id,
    "name": "昔国秀",
    "description": "除民强与切事史划易。经需问九又各行。家反我带生全。严此林很特格增求。即细市世则层。业角专观细实展。着委林。",
    "input_style": "veniam",
    "output_style": "in",
    "data_range": "nostrud in nulla tempor",
    "difficulty": 5,
    "time_limit": 1000,
    "memory_limit": 32768,
    "sample": {
      "inputs": [
        "Duis nulla est incididunt",
        "Duis nulla est incididunt"
      ],
      "outputs": [
        "Excepteur enim anim minim cupidatat",
        "laborum nisi ullamco dolore reprehenderit"
      ]
    },
    "tags": [
      1,
      2,
      3
    ],
    "source": "est",
    "star_count": 233,
    "similar_problems": [
      {
        "check_status": true,
        "id": "koowIYvklt6eUTM5YPrSO",
        "name": "锺桂兰",
        "difficulty": "irure"
      }
    ],
    "pass_status": true,
    "star_status": true,
    "pass_count": 5,
    "attempt_count": 100
  };
  return {
    err: null,
    data: data
  };
});
