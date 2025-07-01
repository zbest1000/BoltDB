import OpenAI from 'openai'

let openai: OpenAI | null = null

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

function getOpenAI(): OpenAI {
  if (!openai) {
    throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.')
  }
  return openai
}

export { openai }

export interface SearchEnhancementRequest {
  query: string
  context?: string
  userProfile?: {
    role?: string
    company?: string
    preferences?: string[]
  }
}

export interface ComponentRecommendationRequest {
  requirements: string
  application?: string
  constraints?: string[]
  budget?: number
}

export const enhanceSearch = async (request: SearchEnhancementRequest): Promise<{
  enhancedQuery: string
  suggestions: string[]
  filters: Record<string, any>
}> => {
  const prompt = `
You are an expert in mechanical engineering and fasteners. 
Enhance this search query for a fastener/component database:

Original Query: "${request.query}"
${request.context ? `Context: ${request.context}` : ''}
${request.userProfile?.role ? `User Role: ${request.userProfile.role}` : ''}

Please provide:
1. An enhanced search query that captures the user's intent
2. 3-5 specific search suggestions
3. Relevant filters (material, type, standard, size range, etc.)

Respond in JSON format:
{
  "enhancedQuery": "improved query",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "filters": {
    "material": ["steel", "stainless"],
    "type": ["bolt", "screw"],
    "standard": ["ISO", "DIN"]
  }
}
`

  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 500,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    return JSON.parse(content)
  } catch (error) {
    console.error('Error enhancing search:', error)
    return {
      enhancedQuery: request.query,
      suggestions: [],
      filters: {},
    }
  }
}

export const getComponentRecommendations = async (
  request: ComponentRecommendationRequest
): Promise<{
  recommendations: Array<{
    type: string
    material: string
    standard: string
    reasoning: string
    confidence: number
  }>
  alternativeOptions: string[]
}> => {
  const prompt = `
You are an expert mechanical engineer specializing in fasteners and components.
Provide component recommendations based on these requirements:

Requirements: "${request.requirements}"
${request.application ? `Application: ${request.application}` : ''}
${request.constraints ? `Constraints: ${request.constraints.join(', ')}` : ''}
${request.budget ? `Budget consideration: $${request.budget}` : ''}

Please recommend 3-5 specific fastener/component options with:
1. Component type
2. Recommended material
3. Applicable standard (ISO, DIN, ANSI, etc.)
4. Brief reasoning
5. Confidence level (0-1)

Also suggest 2-3 alternative options to consider.

Respond in JSON format:
{
  "recommendations": [
    {
      "type": "hex bolt",
      "material": "stainless steel 316",
      "standard": "ISO 4017",
      "reasoning": "Corrosion resistance for marine application",
      "confidence": 0.9
    }
  ],
  "alternativeOptions": ["option1", "option2"]
}
`

  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 800,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    return JSON.parse(content)
  } catch (error) {
    console.error('Error getting recommendations:', error)
    return {
      recommendations: [],
      alternativeOptions: [],
    }
  }
}

export const analyzeSpecifications = async (
  specifications: string
): Promise<{
  analysis: string
  compatibility: string[]
  warnings: string[]
}> => {
  const prompt = `
Analyze these fastener/component specifications:

Specifications: "${specifications}"

Provide:
1. Technical analysis of the specifications
2. Compatible components/standards
3. Any warnings or considerations

Respond in JSON format:
{
  "analysis": "detailed technical analysis",
  "compatibility": ["compatible items"],
  "warnings": ["important warnings"]
}
`

  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 600,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    return JSON.parse(content)
  } catch (error) {
    console.error('Error analyzing specifications:', error)
    return {
      analysis: 'Unable to analyze specifications at this time.',
      compatibility: [],
      warnings: [],
    }
  }
}