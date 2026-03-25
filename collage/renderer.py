from PIL import Image
from typing import List, Tuple


def crop_to_fill(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """Resize and centre-crop an image so it exactly fills *target_w* × *target_h*."""
    src_w, src_h = img.size
    src_aspect    = src_w / src_h
    target_aspect = target_w / target_h

    if src_aspect > target_aspect:
        # Source is wider → crop sides
        new_w = int(src_h * target_aspect)
        left  = (src_w - new_w) // 2
        img   = img.crop((left, 0, left + new_w, src_h))
    else:
        # Source is taller → crop top/bottom
        new_h = int(src_w / target_aspect)
        top   = (src_h - new_h) // 2
        img   = img.crop((0, top, src_w, top + new_h))

    return img.resize((target_w, target_h), Image.Resampling.LANCZOS)


def compose_collage(
    image_paths: List[str],
    positions: List[Tuple[int, int, int, int]],
    output_size: Tuple[int, int],
) -> Image.Image:
    """Compose images into a collage.

    Each position is *(x, y, w, h)*.  Images are centre-cropped to fill
    their tile without distortion.
    """
    collage = Image.new('RGB', output_size, (255, 255, 255))
    for img_path, (x, y, w, h) in zip(image_paths, positions):
        img = Image.open(img_path).convert('RGB')
        img = crop_to_fill(img, w, h)
        collage.paste(img, (x, y))
    return collage