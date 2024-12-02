import Mock from 'mockjs'

Mock.mock(/\/api\/problemset\//, 'get', {
    err: null,
    data: {
        total: 100,
        problems: [
            {
                "status": true,
                "problem_id": "P1001",
                "problem_name": "你好，世界",
                "tags": [
                    "hash-table",
                    "math",
                    "dp"
                ],
                "pass_rate": 66.6,
                "difficulty": 5
            },
            {
                "status": true,
                "problem_id": "P1002",
                "problem_name": "A+B",
                "tags": [
                    "递归",
                    "链表"
                ],
                "pass_rate": 88.8,
                "difficulty": 3
            }
        ]
    }
}
)