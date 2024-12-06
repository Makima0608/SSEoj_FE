export function transTime(t) {
    if (t <= 1000)
        return `${t} ms`
    else
        return (t / 100).toFixed(1).toString() + ' s';
}   

export function transMem(m) {
    if (m <= 1024)
        return `${m} KB`
    else
        return (Math.round(m / 1024)).toString() + ' MB'
}