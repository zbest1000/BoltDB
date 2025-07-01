'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

interface AnimatedInputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export function AnimatedInput({
  label,
  placeholder,
  type = 'text',
  value = '',
  onChange,
  onFocus,
  onBlur,
  error,
  success = false,
  disabled = false,
  required = false,
  className,
  icon,
  iconPosition = 'left',
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(value.length > 0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setHasValue(newValue.length > 0)
    onChange?.(newValue)
  }

  const isFloating = isFocused || hasValue || placeholder

  const containerClasses = clsx(
    'relative w-full',
    className
  )

  const inputClasses = clsx(
    'w-full px-4 py-3 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none',
    {
      // Icon padding
      'pl-10': icon && iconPosition === 'left',
      'pr-10': icon && iconPosition === 'right',
      
      // States
      'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20': !error && !success,
      'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20': error,
      'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20': success,
      'bg-gray-50 cursor-not-allowed': disabled,
    }
  )

  const labelClasses = clsx(
    'absolute left-4 transition-all duration-200 pointer-events-none text-gray-500',
    {
      'top-3 text-base': !isFloating,
      'top-1 text-xs text-primary-600': isFloating && isFocused,
      'top-1 text-xs text-gray-400': isFloating && !isFocused,
      'left-10': icon && iconPosition === 'left' && !isFloating,
    }
  )

  const iconClasses = clsx(
    'absolute top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200',
    {
      'left-3': iconPosition === 'left',
      'right-3': iconPosition === 'right',
      'text-primary-600': isFocused && !error,
      'text-red-500': error,
      'text-green-500': success,
    }
  )

  return (
    <div className={containerClasses}>
      {/* Input container with focus ring animation */}
      <motion.div
        className="relative"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Floating label */}
        {label && (
          <motion.label
            className={labelClasses}
            animate={{
              y: isFloating ? -8 : 0,
              scale: isFloating ? 0.85 : 1,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => inputRef.current?.focus()}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}

        {/* Input field */}
        <motion.input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFloating ? placeholder : (label || placeholder)}
          disabled={disabled}
          className={inputClasses}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        />

        {/* Icon */}
        {icon && (
          <motion.div
            className={iconClasses}
            animate={{ scale: isFocused ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}

        {/* Focus border animation */}
        <motion.div
          className="absolute inset-0 border-2 border-primary-500 rounded-lg pointer-events-none"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{
            scale: isFocused ? 1 : 0.95,
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Error/Success message */}
      <AnimatePresence mode="wait">
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1"
          >
            {error && (
              <motion.p
                className="text-sm text-red-600 flex items-center"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                {error}
              </motion.p>
            )}
            
            {success && !error && (
              <motion.p
                className="text-sm text-green-600 flex items-center"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                Valid input
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}