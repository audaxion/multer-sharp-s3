import {
  ResizeOptions,
  RGBA,
  Region,
  ExtendOptions,
  ThresholdOptions,
  AvailableFormatInfo,
  OutputOptions,
  JpegOptions,
  PngOptions,
  Metadata,
  Kernel,
} from 'sharp'
import { S3 } from 'aws-sdk'
import * as express from 'express'

export interface Size {
  width?: number
  height?: number
  options?: ResizeOptions
}

export interface Sharpen {
  sigma?: number
  flat?: number
  jagged?: number
}

export interface Threshold {
  threshold?: number
  options?: ThresholdOptions
}

export interface Format {
  type: string | AvailableFormatInfo
  options?: OutputOptions | JpegOptions | PngOptions
}

export interface ExtendSize {
  suffix: string
}

export type SharpOption<T = string> = void | T

export type ResizeOption =
  | SharpOption<Size>
  | Array<SharpOption<Size & ExtendSize>>

export interface SharpOptions {
  resize?: ResizeOption
  crop?: SharpOption<string | number>
  background?: SharpOption<RGBA | string>
  embed?: boolean
  max?: boolean
  min?: boolean
  withoutEnlargement?: boolean
  ignoreAspectRatio?: boolean
  extract?: SharpOption<Region>
  trim?: SharpOption<number>
  flatten?: boolean
  extend?: SharpOption<number | ExtendOptions>
  negate?: boolean
  rotate?: boolean
  flip?: boolean
  flop?: boolean
  blur?: SharpOption<number>
  sharpen?: SharpOption<Sharpen>
  gamma?: SharpOption<number>
  grayscale?: boolean
  greyscale?: boolean
  normalize?: boolean
  normalise?: boolean
  withMetadata?: SharpOption<Metadata>
  convolve?: SharpOption<Kernel>
  threshold?: SharpOption<number | Threshold>
  toColourspace?: SharpOption
  toColorspace?: SharpOption
  toFormat?: SharpOption<string | Format>
}

export type Callback = (req: express.Request, file: Express.Multer.File, callback: (error?: any, info?: string) => void) => void;

export interface CloudStorageOptions
  extends Partial<S3.Types.PutObjectRequest> {
  Key?: any
  multiple?: boolean
  s3: S3
}

export type S3StorageOptions = CloudStorageOptions & SharpOptions