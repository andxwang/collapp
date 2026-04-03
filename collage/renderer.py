from PIL import Image
from typing import List, Tuple


def crop_to_fill(img: Image.Image, target_w: int, target_h: int,
                 zoom: float = 1.0, pan_x: float = 0.0, pan_y: float = 0.0) -> Image.Image:
    """Resize and crop an image so it exactly fills *target_w* × *target_h*.

    *zoom* (>=1.0): 1.0 = cover; higher values zoom in further.
    *pan_x*, *pan_y* (normalised -1…1): shift the visible region within
    the available pan range.  Values are clamped so the image always
    fully covers the target rectangle.
    """
    src_w, src_h = img.size
    src_aspect    = src_w / src_h
    target_aspect = target_w / target_h

    # Base "cover" crop dimensions (at zoom=1)
    if src_aspect > target_aspect:
        base_crop_h = src_h
        base_crop_w = int(src_h * target_aspect)
    else:
        base_crop_w = src_w
        base_crop_h = int(src_w / target_aspect)

    # Apply zoom (crop a smaller region of the source)
    zoom = max(1.0, zoom)
    crop_w = max(1, int(base_crop_w / zoom))
    crop_h = max(1, int(base_crop_h / zoom))

    # Clamp crop dimensions to source
    crop_w = min(crop_w, src_w)
    crop_h = min(crop_h, src_h)

    # Max shift from center
    max_shift_x = (src_w - crop_w) / 2
    max_shift_y = (src_h - crop_h) / 2

    # Crop origin: center + pan shift
    cx = (src_w - crop_w) / 2
    cy = (src_h - crop_h) / 2
    left = int(cx + pan_x * max_shift_x)
    top  = int(cy + pan_y * max_shift_y)

    # Final clamp so we never go out of bounds
    left = max(0, min(left, src_w - crop_w))
    top  = max(0, min(top,  src_h - crop_h))

    img = img.crop((left, top, left + crop_w, top + crop_h))
    return img.resize((target_w, target_h), Image.Resampling.LANCZOS)


def compose_collage(
    image_paths: List[str],
    positions: List[Tuple[int, int, int, int]],
    output_size: Tuple[int, int],
    crops: List[dict] | None = None,
) -> Image.Image:
    """Compose images into a collage.

    Each position is *(x, y, w, h)*.  Each optional crop dict may contain
    *zoom*, *panX*, *panY*.  Images are cropped to fill their tile.
    """
    collage = Image.new('RGB', output_size, (255, 255, 255))
    for i, (img_path, (x, y, w, h)) in enumerate(zip(image_paths, positions)):
        img = Image.open(img_path).convert('RGB')
        c = (crops[i] if crops and i < len(crops) else None) or {}
        img = crop_to_fill(
            img, w, h,
            zoom=float(c.get('zoom', 1.0)),
            pan_x=float(c.get('panX', 0.0)),
            pan_y=float(c.get('panY', 0.0)),
        )
        collage.paste(img, (x, y))
    return collage