'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  icon,
  iconPosition = 'left',
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const baseClasses = clsx(
    'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      // Variants
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500': variant === 'secondary',
      'border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500': variant === 'outline',
      'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500': variant === 'ghost',
      
      // Sizes
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
      
      // States
      'opacity-50 cursor-not-allowed': disabled || loading,
      'cursor-pointer': !disabled && !loading,
    },
    className
  )

  const iconClasses = clsx(
    'transition-transform duration-200',
    {
      'mr-2': iconPosition === 'left' && children,
      'ml-2': iconPosition === 'right' && children,
    }
  )

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{ 
        scale: disabled || loading ? 1 : 1.02,
        y: disabled || loading ? 0 : -1,
      }}
      whileTap={{ 
        scale: disabled || loading ? 1 : 0.98,
        y: disabled || loading ? 0 : 1,
      }}
      initial={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={isPressed ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: variant === 'primary' ? 'white' : 'currentColor',
        }}
      />

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        className="flex items-center"
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {icon && iconPosition === 'left' && (
          <motion.div
            className={iconClasses}
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && (
          <motion.div
            className={iconClasses}
            whileHover={{ rotate: -5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  )
}