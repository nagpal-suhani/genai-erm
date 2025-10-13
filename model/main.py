# main_silent.py
import cv2
import numpy as np
import json
import os
from segmentation_model import SimpleLandCoverSegmenter
from trend_analyzer import TrendAnalyzer
from report_generation import APIEnhancer

def analyze_single_image(image_path, output_json_path=None, visualization_path=None):
    segmenter = SimpleLandCoverSegmenter()
    
    segmentation_mask, original_image = segmenter.segment_image(image_path)
    areas = segmenter.calculate_areas(segmentation_mask)
    
    if visualization_path:
        segmenter.visualize_segmentation(original_image, segmentation_mask, visualization_path)
    
    if output_json_path:
        results = {
            'image_path': image_path,
            'total_area_km2': sum(data['area_km2'] for data in areas.values()),
            'land_cover_distribution': areas
        }
        
        with open(output_json_path, 'w') as f:
            json.dump(results, f, indent=2)
    
    return areas, segmentation_mask

def analyze_multiple_images(image_paths, output_dir=None, output_json_path=None):
    all_results = {}
    segmenter = SimpleLandCoverSegmenter()
    
    for image_path in image_paths:
        segmentation_mask, original_image = segmenter.segment_image(image_path)
        areas = segmenter.calculate_areas(segmentation_mask)
        
        all_results[image_path] = areas
        
        if output_dir:
            import os
            base_name = os.path.splitext(os.path.basename(image_path))[0]
            vis_path = os.path.join(output_dir, f"{base_name}_segmentation.png")
            segmenter.visualize_segmentation(original_image, segmentation_mask, vis_path)
        else:
            base_name = image_path.replace('/', '_').replace('\\', '_').replace('.', '_')
            vis_path = f"{base_name}_segmentation.png"
            segmenter.visualize_segmentation(original_image, segmentation_mask, vis_path)

    if output_json_path:
        with open(output_json_path, 'w') as f:
            json.dump(all_results, f, indent=2)
        
    return all_results

def generate_comprehensive_report(json_data_path, output_report_path=None):
    analyzer = TrendAnalyzer()
    
    try:
        report = analyzer.generate_mathematical_report(json_data_path)
        
        if output_report_path:
            with open(output_report_path, 'w') as f:
                json.dump(report, f, indent=2)
        
        return report
        
    except Exception as e:
        error_result = {
            'error': str(e),
        }
        if output_report_path:
            with open(output_report_path, 'w') as f:
                json.dump(error_result, f, indent=2)
        return error_result

def run_complete_analysis(image_paths, output_base_dir="results"):
    os.makedirs(output_base_dir, exist_ok=True)
    os.makedirs(f"{output_base_dir}/visualizations", exist_ok=True)
    os.makedirs(f"{output_base_dir}/reports", exist_ok=True)
    
    # Step 1: Image segmentation
    segmentation_results = analyze_multiple_images(
        image_paths,
        output_dir=f"{output_base_dir}/visualizations",
        output_json_path=f"{output_base_dir}/segmentation_results.json"
    )
    
    # Step 2: Trend analysis
    trend_report = generate_comprehensive_report(
        f"{output_base_dir}/segmentation_results.json",
        output_report_path=f"{output_base_dir}/reports/trend_analysis_report.json"
    )
    
    # Step 3: API Enhancement
    api_enhancer = APIEnhancer(provider="gemini")
    api_insights = api_enhancer.enhance_analysis(trend_report)
    
    # Save API insights
    with open(f"{output_base_dir}/reports/api_enhancements.json", 'w') as f:
        json.dump(api_insights, f, indent=2)
    
    # Step 4: Generate final combined report
    final_report = {
        'analysis_metadata': {
            'analysis_type': 'complete_environmental_analysis',
            'images_analyzed': image_paths,
            'api_provider_used': 'gemini',
            'enhancement_status': api_insights.get('api_enhancement', {}).get('status', 'unknown')
        },
        'segmentation_results': segmentation_results,
        'mathematical_analysis': trend_report,
        'ai_enhanced_insights': api_insights
    }
    
    with open(f"{output_base_dir}/final_comprehensive_report.json", 'w') as f:
        json.dump(final_report, f, indent=2)
    
    return final_report

if __name__ == "__main__":
    image_paths = [
        "images/alaska_2000.png",
        "images/alaska_2012.png", 
        "images/alaska_2022.png"
    ]
    
    final_results = run_complete_analysis(image_paths, "analysis_results")