// 需求:
// 1. 一个函数, 检查图片格式, 图片大小是否通过
interface Condition {
  format?: string[];
  size?: number;
}

type errorType = 'format' | 'size' | null
export const imgFormatAndSizeCheck = (file: File, condition: Condition) => {
  const { format, size } = condition
  const isValidateFormat = format ? format.includes(file.type) : true
  const isValidateSize = size ? file.size / 1024 / 1024 < size : true
  let errorType: errorType = null
  if (!isValidateFormat) {
    errorType = 'format'
  } else if (!isValidateSize) {
    errorType = 'size'
  }
  return {
    passed: isValidateSize && isValidateFormat,
    errorType
  }
}
