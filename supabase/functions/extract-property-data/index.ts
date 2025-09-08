import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Function called successfully');
    
    const { url } = await req.json();
    console.log('Processing URL:', url);

    // For now, return mock data to test deployment
    const mockData = {
      title: "Luxury 4BR Penthouse",
      description: "Ultra-luxury penthouse with private pool",
      location: "Dubai Marina",
      address: "Dubai Marina, Dubai",
      property_type: "apartment",
      price: 5000000,
      area_sqft: 3500,
      bedrooms: 4,
      bathrooms: 4,
      opportunity_type: "flip",
      investment_required: 5000000,
      expected_roi: 25,
      features: ["Private Pool", "Marina View", "Balcony"],
      images: [],
      risk_rating: "medium",
      deadline: null,
      contact_info: {
        agent_name: null,
        phone: null,
        email: null
      }
    };

    return new Response(JSON.stringify({ 
      success: true, 
      data: mockData,
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