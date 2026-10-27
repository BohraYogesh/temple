import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      // threshold 0: element ka 1 pixel bhi dikhe to show ho jaye
      // rootMargin: screen ke bottom se 80px pehle hi trigger ho jaye
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}