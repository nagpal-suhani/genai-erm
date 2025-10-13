# segementation_model.py
import cv2
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

class SimpleLandCoverSegmenter:
    def __init__(self):
        self.class_names = {
            0: 'forest',
            1: 'urban_barren', 
            2: 'water',
            3: 'glacier',
            4: 'agriculture'
        }
        
    def segment_image(self, image_path):
        """
        Simple segmentation using color thresholding and texture analysis
        simplified approach
        """
        # Read image
        image = cv2.imread(image_path)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        height, width = image.shape[:2]
        total_pixels = height * width
        
        # Initialize segmentation mask
        segmentation_mask = np.zeros((height, width), dtype=np.uint8)
        
        # Simple color-based segmentation rules
        # Water (Blue areas)
        water_lower = np.array([90, 30, 50])
        water_upper = np.array([140, 255, 255])
        water_mask = cv2.inRange(hsv, water_lower, water_upper)
        # cv2.imwrite('water_mask.png', water_mask)  # Debug line to check water mask
        segmentation_mask[water_mask > 0] = 2  # Water class
        
        # Forest (Green areas)
        green_lower = np.array([41, 40, 30])
        green_upper = np.array([85, 255, 255])
        forest_mask = cv2.inRange(hsv, green_lower, green_upper)
        # cv2.imwrite('forest_mask_old.png', forest_mask)  # Debug line to check forest mask
        segmentation_mask[forest_mask > 0] = 0  # Forest class
        
        # Glacier/Snow (White areas)
        white_lower = np.array([0, 0, 220])
        white_upper = np.array([180, 30, 255])
        glacier_mask = cv2.inRange(hsv, white_lower, white_upper)
        # cv2.imwrite('glacier_mask.png', glacier_mask)  # Debug line to check glacier mask
        segmentation_mask[glacier_mask > 0] = 3  # Glacier class
        
        # # Urban/Barren (Gray/Brown areas)
        gray_lower = np.array([0, 0, 40])
        gray_upper = np.array([30, 40, 100])
        urban_mask = cv2.inRange(hsv, gray_lower, gray_upper)
        # cv2.imwrite('urban_barren_mask.png', urban_mask)  # Debug line to check urban mask
        segmentation_mask[urban_mask > 0] = 1  # Urban/Barren class
        
        # Agriculture (Yellow/Brown areas)
        yellow_lower = np.array([20, 100, 100])
        yellow_upper = np.array([30, 255, 255])
        agri_mask = cv2.inRange(hsv, yellow_lower, yellow_upper)
        # cv2.imwrite('agri_mask.png', agri_mask)  # Debug line to check agriculture mask
        segmentation_mask[agri_mask > 0] = 4  # Agriculture class
        
        # Any remaining pixels not classified, assign to urban_barren
        unclassified_mask = (segmentation_mask == 0) & \
                            (water_mask == 0) & (forest_mask == 0) & \
                            (glacier_mask == 0) & (agri_mask == 0)
        # cv2.imwrite('unclassified_mask.png', unclassified_mask.astype(np.uint8)*255)  # Debug line to check unclassified mask
        segmentation_mask[unclassified_mask] = 1
        
        return segmentation_mask, image_rgb
    
    def calculate_areas(self, segmentation_mask):
        """Calculate area covered by each class"""
        total_pixels = segmentation_mask.size
        areas = {}
        
        for class_id, class_name in self.class_names.items():
            class_pixels = np.sum(segmentation_mask == class_id)
            percentage = (class_pixels / total_pixels) * 100
            
            # Convert to square kilometers (assuming standard satellite resolution)
            # For Sentinel-2: 10m resolution = 0.0001 km² per pixel
            area_km2 = class_pixels * 0.0001
            
            areas[class_name] = {
                'pixel_count': int(class_pixels),
                'percentage': round(percentage, 2),
                'area_km2': round(area_km2, 2)
            }
        
        return areas
    
    def visualize_segmentation(self, original_image, segmentation_mask, save_path=None):
        """Create visualization of segmentation results"""
        # Create color mask
        color_mask = np.zeros((*segmentation_mask.shape, 3), dtype=np.uint8)
        
        color_map = {
            0: [34, 139, 34],    # Forest - Green
            1: [128, 128, 128],  # Urban/Barren - Gray
            2: [0, 0, 255],      # Water - Blue
            3: [255, 255, 255],  # Glacier - White
            4: [255, 215, 0],    # Agriculture - Yellow
        }
        
        for class_id, color in color_map.items():
            color_mask[segmentation_mask == class_id] = color
        
        # Blend with original image
        blended = cv2.addWeighted(original_image, 0.6, color_mask, 0.4, 0)
        
        # Convert RGB to BGR for OpenCV saving
        original_bgr = cv2.cvtColor(original_image, cv2.COLOR_RGB2BGR)
        color_mask_bgr = cv2.cvtColor(color_mask, cv2.COLOR_RGB2BGR)
        blended_bgr = cv2.cvtColor(blended, cv2.COLOR_RGB2BGR)
        
        # Save images
        if save_path:
            base_path = save_path.rsplit('.', 1)[0]
            cv2.imwrite(f"{base_path}_original.png", original_bgr)
            cv2.imwrite(f"{base_path}_mask.png", color_mask_bgr)
            cv2.imwrite(f"{base_path}_overlay.png", blended_bgr)
            print(f"Saved: {base_path}_original.png, {base_path}_mask.png, {base_path}_overlay.png")
        else:
            cv2.imwrite("original_image.png", original_bgr)
            cv2.imwrite("segmentation_mask.png", color_mask_bgr)
            cv2.imwrite("overlay_result.png", blended_bgr)
        
        return blended
