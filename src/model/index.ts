/**
 * @description 数据模型入口
 * @author aodazhang 2021.04.09
 */
import BaseModel from './BaseModel'

export class UserInfoModel extends BaseModel implements UserInfo {
  name: string = null
  avatar: string = null
  constructor(data?: unknown) {
    super()
    super.update(data)
  }
}

export class UserPermissionModel extends BaseModel implements UserPermission {
  role: string = null
  actionMap: { [key: string]: string[] } = {}
  constructor(data?: unknown) {
    super()
    super.update(data)
  }
}

export class ActivityInfoModel extends BaseModel implements ActivityInfo {
  activityId: number = null
  activityName: string = null
  activityPlatform: string = null
  activityDate: string = null
  activitytags: string[] = null
  constructor(data?: unknown) {
    super()
    super.update(data)
  }
}
