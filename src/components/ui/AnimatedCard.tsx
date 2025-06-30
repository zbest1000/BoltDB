'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { clsx } from 'clsx'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  magnetic?: boolean
  tilt?: boolean
  glow?: boolean
  onClick?: () => void
  href?: string
}

export function AnimatedCard({
  children,
  className,
  hover = true,
  magnetic = false,
  tilt = false,
  glow = false,
  onClick,
  href,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse position tracking for magnetic and tilt effects
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smooth movement
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  // Transform values for tilt effect
  const rotateX = useTransform(springY, [-0.5, 0.5], [7.5, -7.5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7.5, 7.5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    if (magnetic || tilt) {
      const mouseX = (e.clientX - centerX) / rect.width
      const mouseY = (e.clientY - centerY) / rect.height

      x.set(mouseX)
      y.set(mouseY)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const baseClasses = clsx(
    'relative bg-white rounded-lg border border-gray-200 transition-all duration-200',
    {
      'cursor-pointer': onClick || href,
      'shadow-sm': !glow,
    },
    className
  )

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: hover ? { 
      scale: 1.02, 
      y: -4,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }
    } : {},
  }

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: glow ? 0.6 : 0,
      transition: { duration: 0.3 }
    },
  }

  const CardComponent = href ? motion.a : motion.div

  return (
    <CardComponent
      ref={ref}
      href={href}
      className={baseClasses}
      style={tilt ? {
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      } : magnetic ? {
        x: springX,
        y: springY,
      } : {}}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg blur opacity-0"
          variants={glowVariants}
          style={{ zIndex: -1 }}
        />
      )}

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -skew-x-12"
        animate={isHovered ? {
          x: ['-100%', '100%'],
          opacity: [0, 0.1, 0],
        } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10"
        style={tilt ? {
          transform: "translateZ(50px)",
        } : {}}
      >
        {children}
      </motion.div>

      {/* Border highlight on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-primary-500 opacity-0"
        animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </CardComponent>
  )
}