"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function IconList() {
  return (
    <motion.div className="padding grid grid-cols-2 items-start gap-4 py-16 text-center md:grid-cols-4 md:gap-6">
      {IconData.map((_, i) => (
        <motion.div
          initial={"hidden"}
          whileInView="visible"
          viewport={{ amount: "some" }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: i * 0.1,
                delayChildren: 0,
                duration: 0.5,
                // staggerChildren:2
              },
            },
            hidden: { opacity: 0, y: 70 },
          }}
          key={i}
          className="flex flex-col items-center justify-center gap-4"
        >
          <Image src={_.icon} alt="icon" height={30} width={30} className="m-auto cursor-pointer transition-all hover:scale-105" />
          <h3 className="text-gray text-xl font-semibold">{_.title}</h3>
          <p className="text-gray">{_.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

const IconData = [
  {
    icon: "/upload.png",
    title: "Upload Designs",
    description: "Upload your work and become noticable",
  },
  {
    icon: "/gallery.png",
    title: "Get Inspired",
    description: "Get inspired by thousands of designs",
  },
  {
    icon: "/chat.png",
    title: "Message Designer",
    description: "Message Other Interior Designers on the platform",
  },
  {
    icon: "/heart.png",
    title: "Get Feedback",
    description: "Get comments, likes & shares from other people",
  },
]
