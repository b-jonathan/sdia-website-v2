import os
import csv

# Root folder containing all the subfolders
root_dir = r"C:\Users\Brandon\Documents\GitHub\sdia-vibe\B&W Pics"

# Allowed extensions
image_exts = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"}

# Output CSV path
output_csv = os.path.join(root_dir, "first_two_images_full.csv")

with open(output_csv, "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Folder", "Image1", "Image2"])  # header row

    for subfolder in sorted(os.listdir(root_dir)):
        subfolder_path = os.path.join(root_dir, subfolder)
        if os.path.isdir(subfolder_path):
            # List only image files
            images = [
                os.path.join(subfolder_path, f)
                for f in os.listdir(subfolder_path)
                if os.path.splitext(f)[1].lower() in image_exts
            ]
            images.sort()  # alphabetical order for consistency

            # Grab first two
            first_two = images[:2]
            while len(first_two) < 2:
                first_two.append("")

            writer.writerow([subfolder] + first_two)

print(f"Done! Results saved to {output_csv}")
