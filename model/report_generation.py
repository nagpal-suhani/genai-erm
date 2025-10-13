# api_enhancer.py
import os
import json
import requests
from typing import Dict
from dotenv import load_dotenv

class APIEnhancer:
    def __init__(self, provider: str = "gemini"):
        self.provider = provider
        self.setup_api_keys()
    
class APIEnhancer:
    def __init__(self, provider: str = "gemini"):
        self.provider = provider
        load_dotenv()  # Load environment variables from .env file
        self.setup_api_keys()
    
    def setup_api_keys(self):
        """Setup API keys from environment variables"""
        if self.provider == "gemini":
            self.api_key = os.getenv('GEMINI_API_KEY')
            if not self.api_key:
                raise ValueError("GEMINI_API_KEY not found. Please create a .env file with your API key")
            self.base_url = self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash/generateContent"
        else:
            raise ValueError(f"Unsupported provider: {self.provider}")
    
    def query_api(self, prompt: str) -> str:
        """Query Gemini API"""
        try:
            headers = {'Content-Type': 'application/json'}
            
            data = {
                "contents": [{
                    "parts": [{"text": prompt}]
                }],
                "generationConfig": {
                    "temperature": 0.3,
                    "topK": 40,
                    "topP": 0.95,
                    "maxOutputTokens": 1024,
                }
            }
            
            response = requests.post(
                f"{self.base_url}?key={self.api_key}",
                headers=headers,
                json=data,
                timeout=30
            )
            response.raise_for_status()
            return response.json()['candidates'][0]['content']['parts'][0]['text']
            
        except Exception as e:
            return f"API Error: {str(e)}"
    
    def generate_impact_analysis(self, trend_data: Dict) -> Dict:
        """Generate environmental impact analysis"""
        
        prompt = f"""
As an environmental scientist with expertise in land use change, analyze these land cover trends and provide a structured impact assessment:

TREND DATA:
{json.dumps(trend_data, indent=2)}

Provide a comprehensive analysis in this exact JSON format:
{{
  "environmental_impacts": {{
    "biodiversity": "analysis of species and ecosystem impacts",
    "climate": "carbon sequestration and climate regulation effects", 
    "hydrology": "water cycle and resource impacts",
    "soil_health": "erosion and soil quality changes"
  }},
  "socio_economic_impacts": {{
    "agriculture": "food security and farming impacts",
    "water_security": "drinking water and irrigation availability",
    "livelihoods": "community and economic impacts",
    "health": "public health consequences"
  }},
  "risk_assessment": {{
    "immediate_risks": ["risk1", "risk2"],
    "long_term_risks": ["risk1", "risk2"],
    "vulnerable_groups": ["group1", "group2"]
  }},
  "key_concerns": ["concern1", "concern2", "concern3"]
}}

Be specific, data-driven, and focus on measurable impacts.
"""
        response = self.query_api(prompt)
        return self._parse_response(response)
    
    def generate_recommendations(self, trend_data: Dict, impact_analysis: Dict) -> Dict:
        """Generate policy recommendations"""
        
        prompt = f"""
As a sustainability policy expert, recommend specific interventions based on:

LAND COVER TRENDS:
{json.dumps(trend_data, indent=2)}

ENVIRONMENTAL IMPACTS:  
{json.dumps(impact_analysis, indent=2)}

Provide actionable recommendations in this exact JSON format:
{{
  "immediate_actions": [
    {{"action": "specific action", "timeline": "1-6 months", "priority": "high"}},
    {{"action": "specific action", "timeline": "1-6 months", "priority": "medium"}}
  ],
  "short_term_strategies": [
    {{"strategy": "specific strategy", "timeline": "6-24 months", "stakeholders": ["government", "community"]}},
    {{"strategy": "specific strategy", "timeline": "6-24 months", "stakeholders": ["private sector"]}}
  ],
  "long_term_solutions": [
    {{"solution": "specific solution", "timeline": "2-5 years", "impact": "expected outcome"}},
    {{"solution": "specific solution", "timeline": "2-5 years", "impact": "expected outcome"}}
  ],
  "monitoring_metrics": [
    {{"metric": "specific metric", "frequency": "monthly", "target": "desired value"}},
    {{"metric": "specific metric", "frequency": "quarterly", "target": "desired value"}}
  ]
}}
Focus on practical, implementable solutions with clear timelines and stakeholders.
"""
        response = self.query_api(prompt)
        return self._parse_response(response)
    
    def generate_executive_summary(self, trend_data: Dict, impact_analysis: Dict, recommendations: Dict) -> str:
        """Generate executive summary"""
        
        simplified_trends = self._simplify_trend_data(trend_data)
        
        prompt = f"""
As an environmental reporting expert, create a concise executive summary for policymakers:

KEY FINDINGS:
{json.dumps(simplified_trends, indent=2)}

ENVIRONMENTAL IMPACTS:
{json.dumps(impact_analysis, indent=2)}

RECOMMENDED ACTIONS:
{json.dumps(recommendations, indent=2)}

Write a 200-word executive summary that:
1. Highlights the 3 most critical changes
2. Explains the primary environmental and socio-economic risks  
3. Prioritizes the top 3 recommendations with expected outcomes
4. Emphasizes urgency where needed
5. Provides clear calls to action

Keep it professional, data-driven, and compelling for decision-makers.
"""
        return self.query_api(prompt)
    
    def _simplify_trend_data(self, trend_data: Dict) -> Dict:
        """Simplify trend data for API prompts"""
        simplified = {
            "major_changes": [],
            "projections_2030": {},
            "critical_findings": trend_data.get('critical_findings', [])[:3]  # Top 3 only
        }
        
        # Extract major trends
        for land_cover, data in trend_data.get('trend_analysis', {}).items():
            trend_info = data.get('trend_analysis', {})
            change_pct = trend_info.get('total_period_change_pct', 0)
            
            if abs(change_pct) > 5:  # Only significant changes
                simplified["major_changes"].append({
                    "land_cover": land_cover,
                    "change_percentage": change_pct,
                    "direction": trend_info.get('trend_direction', 'stable')
                })
            
            # Add projections
            projections = data.get('projections_2030', {})
            simplified["projections_2030"][land_cover] = {
                "projected_percentage": projections.get('projected_percentage', 0),
                "change_from_current": projections.get('total_change_from_current_pct', 0)
            }
        
        # Add summary if available
        summary = trend_data.get('summary', {})
        if summary:
            simplified["overall_risk"] = summary.get('overall_risk_level', 'unknown')
            simplified["key_concerns"] = summary.get('key_concerns', [])
        
        return simplified
    
    def _parse_response(self, response: str) -> Dict:
        """Parse API response and extract JSON"""
        try:
            # Look for JSON pattern
            start_idx = response.find('{')
            end_idx = response.rfind('}') + 1
            if start_idx != -1 and end_idx != -1:
                json_str = response[start_idx:end_idx]
                parsed = json.loads(json_str)
                return parsed
        except json.JSONDecodeError as e:
            # If JSON parsing fails, return the raw response with error info
            return {
                "raw_response": response[:500],  # First 500 chars
                "parse_error": f"JSON parsing failed: {str(e)}",
                "response_preview": response[:200] + "..." if len(response) > 200 else response
            }
        except Exception as e:
            return {
                "parse_error": f"Unexpected error: {str(e)}",
                "raw_response": response[:500]
            }
        
        # If no JSON found, return the raw response
        return {
            "raw_response": response,
            "note": "No structured JSON found in response"
        }
    
    def enhance_analysis(self, mathematical_report: Dict) -> Dict:
        """Main enhancement function"""
        try:
            # Generate API insights
            impact_analysis = self.generate_impact_analysis(mathematical_report)
            recommendations = self.generate_recommendations(mathematical_report, impact_analysis)
            executive_summary = self.generate_executive_summary(mathematical_report, impact_analysis, recommendations)
            
            return {
                "api_enhancement": {
                    "status": "success",
                    "provider": self.provider,
                    "executive_summary": executive_summary,
                    "impact_analysis": impact_analysis,
                    "policy_recommendations": recommendations,
                }
            }
            
        except Exception as e:
            return {
                "api_enhancement": {
                    "status": "error",
                    "error": str(e),
                }
            }