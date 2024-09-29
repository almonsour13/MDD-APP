'use client'

import { useState, useRef, useCallback } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import Image from 'next/image'

interface ImageCropperProps {
  image: string
  onCropComplete: (croppedImage: string) => void
  onCropCancel: () => void
}

export default function ImageCropper({ image, onCropComplete, onCropCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imageRef = useRef<HTMLImageElement>(null)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop({ unit: '%', width: 90, height: 90, x: 5, y: 5 })
  }, [])

  const cropImage = useCallback(() => {
    if (imageRef.current && completedCrop) {
      const image = imageRef.current
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('No 2d context')
      }

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      const pixelRatio = window.devicePixelRatio

      canvas.width = completedCrop.width * scaleX * pixelRatio
      canvas.height = completedCrop.height * scaleY * pixelRatio

      ctx.scale(pixelRatio, pixelRatio)
      ctx.imageSmoothingQuality = 'high'

      const cropX = completedCrop.x * scaleX
      const cropY = completedCrop.y * scaleY

      ctx.drawImage(
        image,
        cropX,
        cropY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      )

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty')
            return
          }
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            onCropComplete(reader.result as string)
          }
        },
        'image/jpeg',
        1
      )
    }
  }, [completedCrop, onCropComplete])

  return (
    <div className="relative h-80 lg:h-80 flex items-center justify-center">
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={1}
      >
        <Image
          ref={imageRef}
          src={image}
          alt="Image to crop"
          className="h-80  w-full rounded-md object-cover"
          width={1024}
          height={1024}
          onLoad={onImageLoad}
        />
      </ReactCrop>
        <Button className='absolute top-4 right-4 rounded-full' onClick={onCropCancel} variant="destructive" size="icon">
          <X className="h-4 w-4" />
        </Button>
        <Button className='absolute bottom-4 right-4 rounded-full' onClick={cropImage} variant="default" size="icon">
          <Check className="h-4 w-4" />
        </Button>
    </div>
  )
}