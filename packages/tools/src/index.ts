export function sum<T>(a: T, b: T): T {
    return (a as any) + (b as any);
}

/**
 * 生成随机数
 * @param start 开始范围
 * @param end 结束范围
 * @returns 随机数
 */
export function random(start: number, end: number): number {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}
