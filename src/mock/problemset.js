import Mock from 'mockjs'

Mock.mock('http://localhost:8000/api/problemset/', 'get', {
    code: 200,
    data: [
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
            "difficulty": 100
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
            "difficulty": 50
        }
    ]
})  