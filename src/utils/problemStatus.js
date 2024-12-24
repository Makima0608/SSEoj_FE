
const statusMap = new Map([
    [-2, ["COMPILE_ERROR", "编译错误"]],
    [-1, ["WRONG_ANSWER", "答案错误"]],
    [0, ["ACCEPTED", "答案正确"]],
    [1, ["CPU_TIME_LIMIT_EXCEEDED", "超出时间限制"]],
    [2, ["REAL_TIME_LIMIT_EXCEEDED", "超出时间限制"]],
    [3, ["MEMORY_LIMIT_EXCEEDED", "超出内存限制"]],
    [4, ["RUNTIME_ERROR", "运行时错误"]],
    [5, ["SYSTEM_ERROR", "系统错误"]],
    [6, ["PENDING", "判题中"]],
    [7, ["JUDGING", "判题中"]],
    [8, ["PARTIALLY_ACCEPTED", "部分接受"]]
]);

export const statusCodeToDesc = (code) => {
    return statusMap.get(code) || "Unknow Status"
}