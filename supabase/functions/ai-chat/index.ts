
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

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
    if (!OPENAI_API_KEY) {
      console.error('Missing OpenAI API key');
      throw new Error('Missing OpenAI API key');
    }

    const { message } = await req.json();
    console.log('Received message:', message);

    // Added more detailed logging for debugging
    console.log('Calling OpenAI API with key length:', OPENAI_API_KEY.length);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant who provides concise, accurate answers.' },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
      }),
    });

    // Add more detailed error logging
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', response.status, errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        console.error('OpenAI API error details:', errorData);
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        throw new Error(`OpenAI API error: Status ${response.status}`);
      }
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
