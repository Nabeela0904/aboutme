import Image from "next/image";
import { getMentorAvatarUrl } from "@/lib/mentors";
import { cn } from "@/lib/utils";

interface MentorAvatarProps {
  seed: string;
  alt: string;
  size?: number;
  className?: string;
}

export function MentorAvatar({ seed, alt, size = 48, className }: MentorAvatarProps) {
  return (
    <Image
      src={getMentorAvatarUrl(seed)}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={cn("bg-muted", className)}
    />
  );
}
