/**
 * Imagen con dimensiones fijas para CLS; WebP opcional + fallback.
 * (Andrés ya optimizado en /public — solo empaquetado picture si hay ambos.)
 */
export default function OptimizedImage({
  src,
  webpSrc,
  alt,
  width,
  height,
  priority = false,
  className = '',
}) {
  const common = {
    alt: alt || '',
    width,
    height,
    decoding: 'async',
    className,
    style: { aspectRatio: `${width} / ${height}` },
  }

  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img {...common} src={src} loading={priority ? 'eager' : 'lazy'} />
      </picture>
    )
  }

  return (
    <img
      {...common}
      src={src}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
