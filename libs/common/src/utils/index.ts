import { nanoid } from 'nanoid'

export * from './compare-version'
/**
 * 生成min和max之间的随机数
 * @param min - minimum value
 * @param max - maximum value
 * @returns - random number between min and max
 */
export function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 随机生成id和name的对象
 * @param num
 * @returns
 */
export function randomObject(num: number) {
  const resultList = []
  for (let i = 0; i < num; i++) {
    resultList.push({
      id: nanoid(),
      name: `name${i}`
    })
  }
  return resultList
}
