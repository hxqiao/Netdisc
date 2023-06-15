declare namespace API {
  // 获取文件列表参数
  type GetFilesListParams = {
    dir: string
  };

  // 删除文件参数
  type DelectFileParams = {
    name: string,
    dir: string
  };

  type FileFinishParams = {
    name: string,
    size: number,
    type: string,
    offset: string,
    hash: string,
    dir: string
  }
}
