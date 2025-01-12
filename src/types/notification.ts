export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  userId: string;
  link?: string;
}

export interface NotificationPayload {
  title: string;
  message: string;
  type: NotificationType;
  userId: string;
  link?: string;
} 