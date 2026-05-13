import { useAnimate } from "motion/react"
import { useEffect } from "react"
import * as motion from "motion/react-client"

const box = {
  width: 20,
  height: 20,
  backgroundColor: "#ff0088",
  borderRadius: 5,
}

export default function AnimateBookNow() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      scope.current,
      { opacity: [0, 1], y: [-20, 0], scale: [0.95, 1.2] },
      {
        duration: 2.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }
    )
  }, [])

  return (
    <>
      <div
        ref={scope}
        className="absolute top-10 right-1/12 w-fit -translate-x-1/2 rounded-full bg-[#d309e1] px-4 py-2 text-lg text-slate-900 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.3)]"
      >
        Book Now
      </div>
      {/* <motion.button
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
        className="text-2xl"
      >
        zaza{" "}
      </motion.button> */}
      <motion.div
        style={box}
        animate={{
          rotate: 360,
          backgroundColor: ["#ff0088", "#d309e1", "#9c1aff", "#7700ff"],
          scale: [0.8, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </>
  )
}
