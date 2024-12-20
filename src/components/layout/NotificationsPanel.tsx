import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'like',
    user: 'Sarah Johnson',
    content: 'liked your memory "Summer Vacation 2023"',
    time: '2m ago',
    icon: Heart,
    color: 'text-pink-400'
  },
  {
    id: 2,
    type: 'comment',
    user: 'Mike Chen',
    content: 'commented on your memory "Family Reunion"',
    time: '1h ago',
    icon: MessageCircle,
    color: 'text-blue-400'
  },
  {
    id: 3,
    type: 'follow',
    user: 'Emma Thompson',
    content: 'started following you',
    time: '3h ago',
    icon: UserPlus,
    color: 'text-green-400'
  }
];

interface NotificationsPanelProps {
  onClose: () => void;
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-96 rounded-lg border border-white/10 bg-black shadow-xl"
    >
      <div className="border-b border-white/10 p-4">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <button
            key={notification.id}
            className="flex w-full items-start gap-4 p-4 text-left hover:bg-white/5"
          >
            <div className={`rounded-full bg-white/5 p-2 ${notification.color}`}>
              <notification.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-white">
                <span className="font-medium">{notification.user}</span>
                {' '}
                {notification.content}
              </p>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        className="w-full border-t border-white/10 p-3 text-center text-sm text-blue-400 hover:bg-white/5"
      >
        View all notifications
      </button>
    </motion.div>
  );
}