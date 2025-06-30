import { PrismaClient, ComponentType, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@boltdb.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      company: 'BoltDB Inc.',
    },
  })

  // Create engineer user
  const engineerPassword = await bcrypt.hash('engineer123', 10)
  const engineerUser = await prisma.user.create({
    data: {
      email: 'engineer@boltdb.com',
      username: 'engineer',
      password: engineerPassword,
      firstName: 'John',
      lastName: 'Engineer',
      role: UserRole.ENGINEER,
      company: 'Tech Solutions Ltd.',
    },
  })

  // Sample fastener data
  const fasteners = [
    {
      name: 'M8 x 25 Hex Head Cap Screw',
      description: 'High-strength hex head cap screw with full thread, ideal for structural applications',
      category: 'Fasteners',
      subcategory: 'Screws',
      type: ComponentType.SCREW,
      material: 'Stainless Steel 316',
      finish: 'Passivated',
      grade: 'A4-80',
      standard: 'ISO 4762',
      manufacturer: 'FastenerTech',
      partNumber: 'FT-M8-25-316',
      sku: 'SKU-001',
      price: 0.85,
      availability: true,
      stock: 5000,
      tags: ['hex', 'cap screw', 'M8', 'stainless', 'structural'],
      dimensions: {
        diameter: '8mm',
        length: '25mm',
        headDiameter: '13mm',
        headHeight: '8mm',
        threadPitch: '1.25mm',
      },
    },
    {
      name: 'M10 x 30 Socket Head Cap Screw',
      description: 'Precision socket head cap screw for high-torque applications',
      category: 'Fasteners',
      subcategory: 'Screws',
      type: ComponentType.SCREW,
      material: 'Alloy Steel',
      finish: 'Black Oxide',
      grade: '12.9',
      standard: 'ISO 4762',
      manufacturer: 'PrecisionBolt',
      partNumber: 'PB-M10-30-129',
      sku: 'SKU-002',
      price: 1.25,
      availability: true,
      stock: 3200,
      tags: ['socket', 'cap screw', 'M10', 'high torque', 'alloy'],
      dimensions: {
        diameter: '10mm',
        length: '30mm',
        headDiameter: '16mm',
        headHeight: '10mm',
        threadPitch: '1.5mm',
      },
    },
    {
      name: 'M6 Hex Nut',
      description: 'Standard hex nut for general purpose applications',
      category: 'Fasteners',
      subcategory: 'Nuts',
      type: ComponentType.NUT,
      material: 'Carbon Steel',
      finish: 'Zinc Plated',
      grade: '8',
      standard: 'ISO 4032',
      manufacturer: 'StandardNuts',
      partNumber: 'SN-M6-HEX-8',
      sku: 'SKU-003',
      price: 0.15,
      availability: true,
      stock: 10000,
      tags: ['hex nut', 'M6', 'zinc plated', 'general purpose'],
      dimensions: {
        threadDiameter: '6mm',
        acrossFlats: '10mm',
        thickness: '5mm',
        threadPitch: '1.0mm',
      },
    },
    {
      name: 'M8 Spring Washer',
      description: 'Split ring spring washer for preventing loosening',
      category: 'Fasteners',
      subcategory: 'Washers',
      type: ComponentType.WASHER,
      material: 'Spring Steel',
      finish: 'Phosphated',
      grade: 'Standard',
      standard: 'DIN 127',
      manufacturer: 'SpringTech',
      partNumber: 'ST-M8-SPRING',
      sku: 'SKU-004',
      price: 0.08,
      availability: true,
      stock: 15000,
      tags: ['spring washer', 'M8', 'anti-loosening', 'split ring'],
      dimensions: {
        innerDiameter: '8.4mm',
        outerDiameter: '14.8mm',
        thickness: '2.0mm',
      },
    },
    {
      name: 'M12 x 80 Hex Bolt',
      description: 'Heavy-duty hex bolt for structural connections',
      category: 'Fasteners',
      subcategory: 'Bolts',
      type: ComponentType.BOLT,
      material: 'Carbon Steel',
      finish: 'Hot Dip Galvanized',
      grade: '8.8',
      standard: 'ISO 4017',
      manufacturer: 'StructuralBolts',
      partNumber: 'SB-M12-80-88',
      sku: 'SKU-005',
      price: 2.45,
      availability: true,
      stock: 2500,
      tags: ['hex bolt', 'M12', 'structural', 'galvanized', 'heavy duty'],
      dimensions: {
        diameter: '12mm',
        length: '80mm',
        headDiameter: '19mm',
        headHeight: '12mm',
        threadPitch: '1.75mm',
      },
    },
  ]

  // Create components with specifications
  for (const fastener of fasteners) {
    const component = await prisma.component.create({
      data: {
        name: fastener.name,
        description: fastener.description,
        category: fastener.category,
        subcategory: fastener.subcategory,
        type: fastener.type,
        material: fastener.material,
        finish: fastener.finish,
        grade: fastener.grade,
        standard: fastener.standard,
        manufacturer: fastener.manufacturer,
        partNumber: fastener.partNumber,
        sku: fastener.sku,
        price: fastener.price,
        availability: fastener.availability,
        stock: fastener.stock,
        tags: fastener.tags,
        dimensions: fastener.dimensions,
      },
    })

    // Create specifications
    const specs = Object.entries(fastener.dimensions).map(([name, value]) => ({
      componentId: component.id,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: value.toString(),
      unit: value.toString().includes('mm') ? 'mm' : undefined,
    }))

    await prisma.specification.createMany({
      data: specs,
    })

    console.log(`Created component: ${component.name}`)
  }

  // Create sample searches
  const sampleSearches = [
    'M8 screws',
    'stainless steel bolts',
    'hex nuts',
    'spring washers',
    'socket head cap screws',
    'galvanized fasteners',
    'high strength bolts',
    'metric screws',
  ]

  for (const query of sampleSearches) {
    await prisma.search.create({
      data: {
        query,
        userId: Math.random() > 0.5 ? adminUser.id : engineerUser.id,
        aiEnhanced: Math.random() > 0.7,
      },
    })
  }

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })