"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button, Card } from "@heroui/react"
import { Upload, X, AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"

interface ImageUploaderProps {
  images: File[]
  setImages: (images: File[]) => void
  maxImages: number
}

export default function ImageUploader({ images, setImages, maxImages }: ImageUploaderProps) {
  const t = useTranslations("ImageUploader")
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): boolean => {
    if (file.size > 5 * 1024 * 1024) {
      setError(t("errorTooLarge", { name: file.name }))
      return false
    }

    const validTypes = ["image/jpeg", "image/png", "image/heic", "image/heif"]
    if (
      !validTypes.includes(file.type) &&
      !file.name.toLowerCase().endsWith(".heic") &&
      !file.name.toLowerCase().endsWith(".heif")
    ) {
      setError(t("errorInvalidFormat", { name: file.name }))
      return false
    }

    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    setError("")

    if (images.length + files.length > maxImages) {
      setError(t("errorMaxImages", { max: maxImages }))
      return
    }

    const validFiles: File[] = []

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        validFiles.push(files[i])
      }
    }

    if (validFiles.length > 0) {
      setImages([...images, ...validFiles])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 text-sm text-red-600 dark:text-red-200 flex items-start rounded-md">
          <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${dragActive
            ? "border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900/30"
            : "border-gray-300 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-400"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        style={{ minHeight: "200px" }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/heic,image/heif,.heic,.heif"
          onChange={handleChange}
          className="hidden"
        />

        <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-3" />
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{t("dragAndDrop")}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">{t("clickToBrowse")}</p>
        <Button
          className="bg-teal-600 dark:bg-teal-500 text-white hover:bg-teal-700 dark:hover:bg-teal-400"
          size="sm"
          onClick={(e) => {
            if (e && typeof e.stopPropagation === "function") {
              e.stopPropagation()
            }
            onButtonClick()
          }}

          disabled={images.length >= maxImages}
        >
          {t("selectImages")}
        </Button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {t("imageCount", { count: images.length, max: maxImages })}
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group bg-white dark:bg-gray-800">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeImage(index)
                  }}
                  className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs truncate p-2 text-gray-500 dark:text-gray-400">{image.name}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}