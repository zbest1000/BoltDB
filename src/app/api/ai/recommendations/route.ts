import { NextRequest, NextResponse } from 'next/server'
import { getComponentRecommendations } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { requirements, application, constraints, budget } = body

    if (!requirements || typeof requirements !== 'string') {
      return NextResponse.json(
        { error: 'Requirements are required' },
        { status: 400 }
      )
    }

    // Get AI recommendations
    const aiRecommendations = await getComponentRecommendations({
      requirements,
      application,
      constraints,
      budget,
    })

    // Find matching components in database based on AI recommendations
    const matchingComponents = []
    
    for (const rec of aiRecommendations.recommendations) {
      const components = await prisma.component.findMany({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: rec.type, mode: 'insensitive' } },
                { category: { contains: rec.type, mode: 'insensitive' } },
                { description: { contains: rec.type, mode: 'insensitive' } },
              ]
            },
            rec.material ? {
              material: { contains: rec.material, mode: 'insensitive' }
            } : {},
            rec.standard ? {
              standard: { contains: rec.standard, mode: 'insensitive' }
            } : {},
            { availability: true },
          ]
        },
        include: {
          specifications: true,
          cadFiles: {
            select: {
              id: true,
              filename: true,
              fileType: true,
              format: true,
            },
          },
          images: {
            where: { isPrimary: true },
            select: {
              id: true,
              filename: true,
              alt: true,
            },
          },
        },
        take: 3,
      })

      matchingComponents.push({
        recommendation: rec,
        components,
      })
    }

    // Save AI interaction for analytics
    await prisma.aiInteraction.create({
      data: {
        type: 'COMPONENT_RECOMMENDATION',
        input: JSON.stringify({ requirements, application, constraints, budget }),
        output: JSON.stringify(aiRecommendations),
        model: 'gpt-4',
      },
    })

    return NextResponse.json({
      aiRecommendations,
      matchingComponents,
      alternativeOptions: aiRecommendations.alternativeOptions,
    })
  } catch (error) {
    console.error('AI Recommendations API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}