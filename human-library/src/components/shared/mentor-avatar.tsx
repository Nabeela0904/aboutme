import Image from "next/image";
import { cn } from "@/lib/utils";

interface MentorAvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function MentorAvatar({ src, alt, size = 48, className }: MentorAvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={cn("bg-muted", className)}
    />
  );
}
