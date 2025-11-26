import React from 'react';
import { 
  Clock, 
  EyeOff, 
  Activity, 
  UserCheck, 
  Menu, 
  X, 
  Send, 
  MessageSquare,
  Calendar,
  Video,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Bot
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  const icons: Record<string, React.ElementType> = {
    clock: Clock,
    'eye-off': EyeOff,
    activity: Activity,
    'user-check': UserCheck,
    menu: Menu,
    x: X,
    send: Send,
    'message-square': MessageSquare,
    calendar: Calendar,
    video: Video,
    check: CheckCircle2,
    phone: Phone,
    mail: Mail,
    map: MapPin,
    chevron: ChevronRight,
    bot: Bot
  };

  const LucideIcon = icons[name];

  if (!LucideIcon) return null;

  return <LucideIcon className={className} size={size} />;
};