'use client'

import { useState, useRef, useCallback } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import Image from 'next/image'

interface ImageCropperProps {
  image: string
  onCropComplete: (croppedImage: string) => void
  onCropCancel: () => void
  aspect?: number // Optional aspect ratio prop
}

export default function ImageCropper({ image, onCropComplete, onCropCancel, aspect = 1 }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 90, height: 90, x: 5, y: 5 })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imageRef = useRef<HTMLImageElement>(null)
  const [loading, setLoading] = useState(true)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoading(false)
  }, [])

  const cropImage = useCallback(() => {
    if (imageRef.current && completedCrop) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('No 2D context')
      }

      const scaleX = imageRef.current.naturalWidth / imageRef.current.width
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height
      const pixelRatio = window.devicePixelRatio

      canvas.width = completedCrop.width * scaleX * pixelRatio
      canvas.height = completedCrop.height * scaleY * pixelRatio

      ctx.scale(pixelRatio, pixelRatio)
      ctx.imageSmoothingQuality = 'high'

      const cropX = completedCrop.x * scaleX
      const cropY = completedCrop.y * scaleY

      ctx.drawImage(
        imageRef.current,
        cropX,
        cropY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      )

      canvas.toBlob(blob => {
        if (blob) {
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            onCropComplete(reader.result as string)
          }
        } else {
          console.error('Canvas is empty')
        }
      }, 'image/jpeg', 1)
    }
  }, [completedCrop, onCropComplete])

  return (
    <Dialog open={true} onOpenChange={onCropCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop Your Image</DialogTitle>
          <DialogDescription>Adjust the crop and click save when you&apos;re done.</DialogDescription> {/* Escaped apostrophe */}
        </DialogHeader>

        <div className="relative w-full flex items-center justify-center">
          {loading && <p>Loading...</p>} {/* Loading indicator */}
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect} // Dynamic aspect ratio
          >
            <Image
              ref={imageRef}
              src={image}
              alt="Image to crop"
              className="w-auto rounded-md object-cover"
              width={1024}
              height={1024}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
        
        <DialogFooter className='flex flex-row'>
          <Button className='flex-1' variant="destructive" onClick={onCropCancel} aria-label="Cancel cropping">
            Cancel
          </Button>
          <Button className='flex-1' onClick={cropImage} aria-label="Save cropped image">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
