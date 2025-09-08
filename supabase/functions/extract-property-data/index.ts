import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PropertyExtractionRequest {
  url: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url }: PropertyExtractionRequest = await req.json();
    
    console.log('Extracting property data from URL:', url);

    // Fetch the webpage content
    const webpageResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!webpageResponse.ok) {
      throw new Error(`Failed to fetch webpage: ${webpageResponse.status}`);
    }

    const htmlContent = await webpageResponse.text();
    console.log('Successfully fetched webpage content');

    // Use OpenAI to extract structured property data
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 2000,
        messages: [
          {
            role: 'system',
            content: `You are a property data extraction specialist. Extract property information from real estate listings and return ONLY a valid JSON object with the following structure:

{
  "title": "string",
  "description": "string", 
  "location": "string (area/city)",
  "address": "string (full address if available)",
  "property_type": "apartment|villa|townhouse|commercial|land",
  "price": number (asking price),
  "area_sqft": number (if available),
  "bedrooms": number (if available),
  "bathrooms": number (if available),
  "opportunity_type": "flip|renovation|other",
  "investment_required": number (estimate based on price),
  "expected_roi": number (percentage estimate),
  "features": ["feature1", "feature2"] (amenities/features),
  "images": ["url1", "url2"] (image URLs from the listing),
  "risk_rating": "low|medium|high",
  "deadline": null,
  "contact_info": {
    "agent_name": "string (if available)",
    "phone": "string (if available)",
    "email": "string (if available)"
  }
}

Extract all available information. For missing values, use null or reasonable estimates. For opportunity_type, analyze the property condition to suggest flip/renovation/other.`
          },
          {
            role: 'user',
            content: `Extract property data from this real estate listing HTML:\n\n${htmlContent.slice(0, 15000)}`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const extractedDataText = data.choices[0].message.content.trim();
    
    // Clean up the response to ensure it's valid JSON
    let cleanedResponse = extractedDataText;
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/, '').replace(/```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/, '').replace(/```$/, '');
    }

    let extractedData;
    try {
      extractedData = JSON.parse(cleanedResponse);
      console.log('Successfully parsed extracted data');
    } catch (parseError) {
      console.error('Failed to parse extracted data:', parseError);
      console.error('Raw response:', cleanedResponse);
      throw new Error('Failed to parse property data from AI response');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: extractedData,
      source_url: url 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in extract-property-data function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});