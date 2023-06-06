import SparkMD5 from 'spark-md5';

export const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
export const hashFile = (file: File, chunkSize: number): any => {
  return new Promise((resolve, reject) => { 
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    function loadNext() {
      const start = currentChunk * chunkSize;
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
    fileReader.onload = (e: any) => {
      spark.append(e.target.result); // Append array buffer
      currentChunk += 1;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        console.log('finished loading');
        const result = spark.end();
        // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
        // 想保留两个文件无法保留。所以把文件名称加上。
        const sparkMd5 = new SparkMD5();
        sparkMd5.append(result);
        sparkMd5.append(file.name);
        const hexHash = sparkMd5.end();
        resolve(hexHash);
      }
    };
    fileReader.onerror = () => {
      console.warn('文件读取失败！');
    };
    loadNext();
  }).catch(err => {
      console.log(err);
  });
}