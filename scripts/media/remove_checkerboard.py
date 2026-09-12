from pathlib import Path
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


source = Path(sys.argv[1])
destination = Path(sys.argv[2])
preview = Path(sys.argv[3])

image = Image.open(source).convert("RGB")
pixels = np.asarray(image).astype(np.int16)
maximum = pixels.max(axis=2)
minimum = pixels.min(axis=2)
chroma = maximum - minimum
luminance = pixels.mean(axis=2)

# The generated background is neutral gray, while the sunflower is strongly
# yellow/brown. Very dark pixels preserve the fine seed-head filaments.
foreground = ((chroma > 34) | (luminance < 112)).astype(np.uint8) * 255
mask = Image.fromarray(foreground, mode="L")
mask = mask.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))

# Fill small holes inside the flower without filling the exterior background.
inverse = Image.eval(mask, lambda value: 255 - value)
outside = inverse.copy()
ImageDraw.floodfill(outside, (0, 0), 128, thresh=8)
outside_array = np.asarray(outside)
mask_array = np.asarray(mask)
holes = (outside_array == 255) & (mask_array == 0)
mask_array = np.where(holes, 255, mask_array).astype(np.uint8)
mask = Image.fromarray(mask_array, mode="L").filter(ImageFilter.GaussianBlur(0.8))

rgba = image.convert("RGBA")
rgba.putalpha(mask)
rgba.save(destination)

backdrop = Image.new("RGBA", rgba.size, "#f8f1df")
backdrop.alpha_composite(rgba)
backdrop.convert("RGB").save(preview, quality=92)
