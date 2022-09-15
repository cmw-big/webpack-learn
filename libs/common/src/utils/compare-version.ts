/**
 * 比较版本号:不考虑前置导0的情况。1.001=1.01
 * @param version1 第一个版本号
 * @param version2 第二个版本号
 * @returns 0=》相同版本号，1=》version1大于version2，-1=》version1小于version2
 */
export function compareVersion(version1: string, version2: string): number {
  if (version1 === version2) {
    return 0
  }
  if (/[^\d.]/g.test(version1) || /[^\d.]/g.test(version2)) {
    console.error(
      "'version' must consist of values in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'] only"
    )
  }
  const version1List = version1.split('.')
  const version2List = version2.split('.')

  const maxLen = Math.max(version1List.length, version2List.length)
  for (let i = 0; i < maxLen; i++) {
    const v1Val = parseInt(version1List[i], 10)
    const v2Val = parseInt(version2List[i], 10)
    if (v1Val > v2Val) {
      return 1
    }
    if (v1Val < v2Val) {
      return -1
    }
    if (Number.isNaN(v1Val) && !Number.isNaN(v2Val) && v2Val !== 0) {
      return -1
    }
    if (!Number.isNaN(v1Val) && Number.isNaN(v2Val) && v1Val !== 0) {
      return 1
    }
  }
  return 0
}
