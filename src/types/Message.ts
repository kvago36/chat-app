export enum MessageStatus {
  ERROR = 'error',
  SENDED = 'sended',
  READED = 'readed',
  CREATED = 'created'
}

export enum MessageType {
  SMS = 'sms',
  IMG = 'img'
}

export type Message = {
  id: string,

  value: string;

  sender: string;
  reciver: string;

  type: string;

  status: MessageStatus;

  attachment: string,
};