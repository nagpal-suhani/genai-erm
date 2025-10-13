# trend_analyzer.py
import numpy as np
import json
from typing import Dict, List, Tuple
import statistics

class TrendAnalyzer:
    def __init__(self):
        self.target_year = 2030
    
    def load_json_data(self, json_path: str) -> Dict:
        with open(json_path, 'r') as f:
            return json.load(f)
    
    def extract_years_from_filenames(self, data: Dict) -> Dict[int, Dict]:
        yearly_data = {}
        
        for filename, land_cover in data.items():
            year = self._extract_year(filename)
            if year:
                yearly_data[year] = land_cover
                
        return dict(sorted(yearly_data.items()))
    
    def _extract_year(self, filename: str) -> int:
        import re
        match = re.search(r'(\d{4})', filename)
        return int(match.group(1)) if match else None
    
    def calculate_trends(self, yearly_data: Dict) -> Dict:
        trends = {}
        years = list(yearly_data.keys())
        
        if len(years) < 2:
            raise ValueError("Need at least 2 years of data for trend analysis")
        
        for land_cover_type in ['forest', 'urban_barren', 'water', 'glacier', 'agriculture']:
            percentages = []
            areas_km2 = []
            
            for year, data in yearly_data.items():
                if land_cover_type in data:
                    percentages.append(data[land_cover_type]['percentage'])
                    areas_km2.append(data[land_cover_type]['area_km2'])
                else:
                    percentages.append(0.0)
                    areas_km2.append(0.0)
            
            trends[land_cover_type] = self._analyze_single_trend(
                years, percentages, areas_km2, land_cover_type
            )
        
        return trends
    
    def _analyze_single_trend(self, years: List[int], percentages: List[float], 
                            areas_km2: List[float], land_cover_type: str) -> Dict:
        years_np = np.array(years)
        percentages_np = np.array(percentages)
        areas_np = np.array(areas_km2)
        
        annual_changes_pct = []
        annual_changes_area = []
        
        for i in range(1, len(years)):
            year_span = years[i] - years[i-1]
            pct_change = ((percentages[i] - percentages[i-1]) / percentages[i-1]) * 100 if percentages[i-1] > 0 else 0
            area_change = areas_km2[i] - areas_km2[i-1]
            
            annual_changes_pct.append(pct_change / year_span)
            annual_changes_area.append(area_change / year_span)
        
        if len(years) >= 2:
            slope_pct, intercept_pct = np.polyfit(years_np, percentages_np, 1)
            slope_area, intercept_area = np.polyfit(years_np, areas_np, 1)
            
            projected_pct_2030 = slope_pct * self.target_year + intercept_pct
            projected_area_2030 = slope_area * self.target_year + intercept_area
            
            last_pct = percentages[-1]
            last_area = areas_km2[-1]
            total_change_pct = ((projected_pct_2030 - last_pct) / last_pct) * 100 if last_pct > 0 else 0
            total_change_area = projected_area_2030 - last_area
        else:
            projected_pct_2030 = percentages[-1]
            projected_area_2030 = areas_km2[-1]
            total_change_pct = 0
            total_change_area = 0
        
        return {
            'historical_data': {
                'years': years,
                'percentages': percentages,
                'areas_km2': areas_km2
            },
            'trend_analysis': {
                'average_annual_change_pct': statistics.mean(annual_changes_pct) if annual_changes_pct else 0,
                'average_annual_change_area': statistics.mean(annual_changes_area) if annual_changes_area else 0,
                'total_period_change_pct': ((percentages[-1] - percentages[0]) / percentages[0]) * 100 if percentages[0] > 0 else 0,
                'trend_direction': 'increasing' if percentages[-1] > percentages[0] else 'decreasing',
                'volatility': statistics.stdev(percentages) if len(percentages) > 1 else 0
            },
            'projections_2030': {
                'projected_percentage': max(0, round(projected_pct_2030, 2)),
                'projected_area_km2': max(0, round(projected_area_2030, 2)),
                'total_change_from_current_pct': round(total_change_pct, 2),
                'total_change_from_current_area': round(total_change_area, 2),
                'confidence': 'high' if len(years) >= 3 else 'medium'
            }
        }
    
    def generate_critical_findings(self, trends: Dict) -> List[str]:
        findings = []
        
        for land_cover, data in trends.items():
            trend = data['trend_analysis']
            projection = data['projections_2030']
            
            if land_cover == 'forest' and trend['trend_direction'] == 'decreasing':
                if abs(trend['total_period_change_pct']) > 10:
                    findings.append(f"Rapid deforestation detected - {abs(trend['total_period_change_pct']):.1f}% loss historically")
                if projection['total_change_from_current_pct'] < -15:
                    findings.append(f"Forest cover projected to decline by {abs(projection['total_change_from_current_pct']):.1f}% by 2030")
            
            elif land_cover == 'urban_barren' and trend['trend_direction'] == 'increasing':
                if trend['total_period_change_pct'] > 20:
                    findings.append(f"Urban/barren areas increased by {trend['total_period_change_pct']:.1f}%")
            
            elif land_cover == 'water' and abs(trend['total_period_change_pct']) > 15:
                direction = "decreased" if trend['trend_direction'] == 'decreasing' else "increased"
                findings.append(f"Water areas {direction} by {abs(trend['total_period_change_pct']):.1f}%")
        
        return findings
    
    def generate_mathematical_report(self, json_path: str) -> Dict:
        raw_data = self.load_json_data(json_path)
        yearly_data = self.extract_years_from_filenames(raw_data)
        
        if not yearly_data:
            raise ValueError("No valid yearly data found in JSON file")
        
        trends = self.calculate_trends(yearly_data)
        critical_findings = self.generate_critical_findings(trends)
        
        report = {
            'analysis_metadata': {
                'data_source': json_path,
                'years_analyzed': list(yearly_data.keys()),
                'target_projection_year': self.target_year
            },
            'yearly_data': yearly_data,
            'trend_analysis': trends,
            'critical_findings': critical_findings,
            'summary': self._generate_summary(trends)
        }
        
        return report
    
    def _generate_summary(self, trends: Dict) -> Dict:
        most_significant_changes = []
        
        for land_cover, data in trends.items():
            change = abs(data['trend_analysis']['total_period_change_pct'])
            if change > 5:
                most_significant_changes.append({
                    'land_cover': land_cover,
                    'change_pct': data['trend_analysis']['total_period_change_pct'],
                    'direction': data['trend_analysis']['trend_direction']
                })
        
        most_significant_changes.sort(key=lambda x: abs(x['change_pct']), reverse=True)
        
        return {
            'most_significant_changes': most_significant_changes[:3],
            'overall_risk_level': self._calculate_risk_level(trends),
            'key_concerns': [fc for fc in self.generate_critical_findings(trends) if 'projected' in fc or 'Rapid' in fc]
        }
    
    def _calculate_risk_level(self, trends: Dict) -> str:
        risk_score = 0
        
        for land_cover, data in trends.items():
            change = abs(data['trend_analysis']['total_period_change_pct'])
            future_change = abs(data['projections_2030']['total_change_from_current_pct'])
            
            if land_cover in ['forest', 'water']:
                if change > 20 or future_change > 25:
                    risk_score += 3
                elif change > 10 or future_change > 15:
                    risk_score += 2
                elif change > 5:
                    risk_score += 1
        
        if risk_score >= 4:
            return "HIGH"
        elif risk_score >= 2:
            return "MEDIUM"
        else:
            return "LOW"