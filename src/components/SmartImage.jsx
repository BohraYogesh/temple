import { useState } from "react";
const base = import.meta.env.BASE_URL;

export default function SmartImage({
  src,
  alt = "",
  className = "",
  label,
  style,
  priority = false,
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed)
    return (
      <div
        role="img"
        aria-label={alt}
        style={style}
        className={`grid place-items-center bg-gradient-to-br from-gold/40 via-cream to-maroon/50 text-maroon font-display text-xs p-2 text-center ${className}`}
      >
        {label || alt || "Image"}
      </div>
    );
  return (
    <img
      src={base + src}
      alt={alt}
      style={style}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
