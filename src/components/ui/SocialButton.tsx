
import { Instagram, WhatsApp } from "lucide-react";

type SocialButtonProps = {
  type: "instagram" | "whatsapp";
  href: string;
  size?: number;
  className?: string;
};

const SocialButton = ({ type, href, size = 24, className = "" }: SocialButtonProps) => {
  const getIcon = () => {
    switch (type) {
      case "instagram":
        return <Instagram size={size} />;
      case "whatsapp":
        return <WhatsApp size={size} />;
      default:
        return null;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case "instagram":
        return "instagram-button";
      case "whatsapp":
        return "whatsapp-button";
      default:
        return "";
    }
  };

  const getTooltipText = () => {
    switch (type) {
      case "instagram":
        return "Follow me for collaborations and updates!";
      case "whatsapp":
        return "Chat with me directly!";
      default:
        return "";
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-button ${getButtonClass()} ${className}`}
      aria-label={`Connect on ${type}`}
      title={getTooltipText()}
    >
      {getIcon()}
    </a>
  );
};

export default SocialButton;
