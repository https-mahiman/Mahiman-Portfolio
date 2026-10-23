// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import Image from "next/image";

// type InitialLoaderProps = {
//   children: React.ReactNode;
// };

// export default function InitialLoader({ children }: InitialLoaderProps) {
//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const counter = { value: 0 };

//     const counterTween = gsap.to(counter, {
//       value: 100,
//       duration: 1.5,
//       ease: "power1.inOut",
//       onUpdate: () => {
//         setProgress(Math.round(counter.value));
//       },
//       onComplete: () => {
//         const loader = loaderRef.current;

//         if (!loader) {
//           setIsLoaded(true);
//           return;
//         }

//         gsap.to(loader, {
//           yPercent: -100,
//           duration: 1.2,
//           ease: "power4.inOut",
//           onComplete: () => {
//             setIsLoaded(true);
//           },
//         });
//       },
//     });

//     return () => {
//       counterTween.kill();
//       gsap.killTweensOf(loaderRef.current);
//     };
//   }, []);

//   return (
//     <>
//       {!isLoaded && (
//         <div
//           ref={loaderRef}
//           className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black text-white"
//         >
//           {/* Logo */}
//           <div className="mb-8">
//             <Image
//               src="/images/MB.webp"
//               alt="Mahiman logo"
//               width={350}
//               height={350}
//               priority
//               className="h-auto w-50 object-contain"
//             />
//           </div>

//           {/* Percentage */}
//           <div className="mb-4 text-7xl font-bold tabular-nums text-white">
//             {progress}%
//           </div>

//           <p className="mt-4 text-sm tracking-widest text-white/60">LOADING</p>
//         </div>
//       )}

//       <div className={`transition-opacity duration-700 opacity-100`}>
//         {children}
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type InitialLoaderProps = {
  children: React.ReactNode;
};

export default function InitialLoader({ children }: InitialLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const name = nameRef.current;
    const loader = loaderRef.current;

    if (!name || !loader) return;

    const counter = { value: 0 };

    // Calculate zoom needed to cover the screen
    const calculateZoom = () => {
      const nameWidth = name.offsetWidth;
      const nameHeight = name.offsetHeight;

      if (!nameWidth || !nameHeight) return 20;

      const scaleX = window.innerWidth / nameWidth;
      const scaleY = window.innerHeight / nameHeight;

      return Math.max(scaleX, scaleY) * 1.5;
    };

    const counterTween = gsap.to(counter, {
      value: 100,
      duration: 1.5,
      ease: "power1.inOut",

      onUpdate: () => {
        setProgress(Math.round(counter.value));
      },

      onComplete: () => {
        gsap.to(name, {
          scale: calculateZoom(),
          duration: 1.2,
          ease: "power4.in",
          transformOrigin: "center center",

          onComplete: () => {
            setIsLoaded(true);

            window.dispatchEvent(new Event("portfolio-loader-complete"));

            gsap.fromTo(
              homeRef.current,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
              },
            );
          },
        });
      },
    });

    return () => {
      counterTween.kill();
      gsap.killTweensOf(name);
    };
  }, []);

  return (
    <>
      {!isLoaded && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-transparent text-white"
        >
          {/* Animated Name */}
          <div
            ref={nameRef}
            className="
              max-w-[95vw]
              text-center
              text-[clamp(2.5rem,9vw,9rem)]
              font-bold
              leading-[0.95]
              tracking-tight
              wrap-break-word
            "
          >
            Mahiman
            <span className="text-blue-600 dark:text-blue-400"> Bhatt.</span>
          </div>

          {/* Percentage */}
          <div
            className="
              absolute
              bottom-[max(2rem,env(safe-area-inset-bottom))]
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-bold
              tabular-nums
            "
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Homepage */}
      <div
        ref={homeRef}
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
