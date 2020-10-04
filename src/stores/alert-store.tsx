import { observable, action } from 'mobx'
import { AlertProps } from 'antd/lib/alert'

enum AlertType {
  SUCCESS ='success',
  INFO ='info',
  WARNING ='warning',
  ERROR ='error',
}

interface Alert {
  name: string,
  position: string,
  type: AlertType,
  description: string,
  onShow: (alert: Alert) => void,
  onClose: () => void
}

export class AlertStore {
  @observable
  alert: AlertProps | null = null

  @action
  onClose() {
    this.alert = null
  }

  @action
  onShow(alert: AlertProps) {
    this.alert = alert
  }
}