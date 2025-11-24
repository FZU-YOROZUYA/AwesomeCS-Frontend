/**
 * 用户注册请求
 */
export interface RegisterRequest {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 手机号 */
  phone: string;
  /** 头像URL */
  avatar: string;
  /** 目标职位 */
  target_job: string;
  /** 技术栈 */
  techs: string[];
  /** 个人简介 */
  bio: string;
}

/**
 * 用户登录请求
 */
export interface LoginRequest {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}

/**
 * 用户登录响应
 */
export interface LoginResponse {
  /** Token 键值对 */
  key: string;
}

/**
 * 更新头像请求
 */
export interface AvatarUpdateRequest {
  /** 头像URL */
  avatar: string;
}

/**
 * 更新个人资料请求
 */
export interface ProfileUpdateRequest {
  /** 个人简介 */
  bio: string;
  /** 技术栈 */
  techs: string[];
  /** 目标职位 */
  targetJob: string;
}


