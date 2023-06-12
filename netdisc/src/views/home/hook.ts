import SparkMD5 from 'spark-md5';

const { slice, mozSlice, webkitSlice } = File.prototype
export const blobSlice = slice || mozSlice || webkitSlice;
export const hashFile = (file: File, chunkSize: number): Promise<string> => {
  return new Promise((resolve) => {
    let loaded = 0
    const reader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()
    reader.onload = function (e) {
      console.log(`${parseInt(String(loaded/file.size*100))}%`);
      
      const res = e.target?.result
      spark.append(res)
      if (loaded < file.size) { // 已载入小于总大小，继续载入
        loadFile()
      } else { // 载入完成
        const md5 = spark.end();
        console.log(md5);
        
        resolve(md5)
      }
    }
    function loadFile() {
      reader.readAsArrayBuffer(file.slice(loaded, loaded + chunkSize))
      loaded += chunkSize
    }
    loadFile()
  })
}

export const getFileHash = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file.slice(0, 100))
    reader.onload = function (e) {
      const res = e.target?.result
      const md5 = SparkMD5.ArrayBuffer.hash(res)
      resolve(md5)
    }
  })
}