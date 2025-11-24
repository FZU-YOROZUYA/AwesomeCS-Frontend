/**
 * 通用 API 响应接口
 */
export interface ApiResult<T = unknown> {
  /** 响应码 */
  code: string;
  /** 响应信息 */
  info: string;
  /** 响应数据 */
  data: T;
}

/**
 * 分页响应接口
 */
export interface PageResponse<T> {
  /** 数据列表 */
  list: T[];
  /** 总数量 */
  total: number;
}

/**
 * 分页请求参数
 */
export interface PageRequest {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  size?: number;
}


