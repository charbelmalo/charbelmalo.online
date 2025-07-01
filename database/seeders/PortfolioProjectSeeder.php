<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PortfolioProject;
use Carbon\Carbon;

class PortfolioProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Grower.pro',
                'slug' => 'grower',
                'description' => 'Advanced agricultural management platform with IoT integration and real-time monitoring.',
                'long_description' => 'Grower.pro is a comprehensive agricultural management platform designed to optimize farming operations through data-driven insights. The platform integrates IoT sensors, weather data, and machine learning algorithms to provide farmers with real-time monitoring and predictive analytics for crop management.',
                'technologies' => json_encode(['Laravel', 'Vue.js', 'PHP', 'MySQL', 'IoT', 'Machine Learning', 'REST API']),
                'category' => 'web-application',
                'client' => 'Agricultural Technology Company',
                'project_url' => 'https://grower.pro',
                'github_url' => null,
                'featured_image' => '/assets/projects/grower/hero.jpg',
                'gallery_images' => json_encode([
                    '/assets/projects/grower/dashboard.jpg',
                    '/assets/projects/grower/monitoring.jpg',
                    '/assets/projects/grower/analytics.jpg'
                ]),
                'meta_data' => json_encode([
                    'features' => [
                        'Real-time crop monitoring',
                        'Weather integration',
                        'Predictive analytics',
                        'IoT sensor management',
                        'Mobile-responsive dashboard',
                        'Automated alerts and notifications'
                    ],
                    'challenges' => [
                        'Integrating multiple IoT data sources',
                        'Real-time data processing at scale',
                        'Building predictive models for various crops',
                        'Creating intuitive interfaces for farmers'
                    ],
                    'results' => [
                        '30% increase in crop yield',
                        '25% reduction in water usage',
                        '40% improvement in decision-making speed',
                        'Successful deployment across 50+ farms'
                    ],
                    'project_type' => 'full-stack',
                    'demo_url' => null,
                    'start_date' => '2023-03-01',
                    'end_date' => '2023-08-15',
                    'meta_title' => 'Grower.pro - Agricultural Management Platform | Charbel Malo',
                    'meta_description' => 'Advanced agricultural management platform with IoT integration and real-time monitoring for optimized farming operations.'
                ]),
                'project_date' => Carbon::create(2023, 8, 15),
                'is_featured' => true,
                'status' => 'active',
                'sort_order' => 1,
                'completion_percentage' => 100.00,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Hovi Analytics',
                'slug' => 'hovi',
                'description' => 'Comprehensive business intelligence platform with advanced data visualization and reporting.',
                'long_description' => 'Hovi Analytics is a powerful business intelligence platform that transforms complex data into actionable insights. Built with modern web technologies, it features interactive dashboards, real-time analytics, and customizable reporting tools for enterprise clients.',
                'technologies' => json_encode(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'D3.js', 'Redis', 'Docker']),
                'category' => 'web-application',
                'client' => 'Enterprise Analytics Firm',
                'project_url' => 'https://hovi-analytics.com',
                'github_url' => null,
                'featured_image' => '/assets/projects/hovi/hero.jpg',
                'gallery_images' => json_encode([
                    '/assets/projects/hovi/dashboard.jpg',
                    '/assets/projects/hovi/charts.jpg',
                    '/assets/projects/hovi/reports.jpg'
                ]),
                'meta_data' => json_encode([
                    'features' => [
                        'Interactive data visualizations',
                        'Real-time dashboard updates',
                        'Custom report generation',
                        'Multi-tenant architecture',
                        'Advanced filtering and search',
                        'Export capabilities (PDF, Excel, CSV)'
                    ],
                    'challenges' => [
                        'Processing large datasets efficiently',
                        'Creating responsive data visualizations',
                        'Implementing real-time updates',
                        'Ensuring data security and privacy'
                    ],
                    'results' => [
                        'Reduced report generation time by 75%',
                        'Improved data accuracy by 90%',
                        'Increased user engagement by 60%',
                        'Successfully serving 100+ enterprise clients'
                    ],
                    'project_type' => 'full-stack',
                    'demo_url' => null,
                    'start_date' => '2023-01-15',
                    'end_date' => '2023-06-30',
                    'meta_title' => 'Hovi Analytics - Business Intelligence Platform | Charbel Malo',
                    'meta_description' => 'Comprehensive business intelligence platform with advanced data visualization and reporting for enterprise clients.'
                ]),
                'project_date' => Carbon::create(2023, 6, 30),
                'is_featured' => true,
                'status' => 'active',
                'sort_order' => 2,
                'completion_percentage' => 100.00,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Pellini Solutions',
                'slug' => 'pellini',
                'description' => 'E-commerce platform with advanced inventory management and multi-channel integration.',
                'long_description' => 'Pellini Solutions is a comprehensive e-commerce platform designed for multi-channel retail operations. The system integrates inventory management, order processing, and customer relationship management with seamless third-party integrations.',
                'technologies' => json_encode(['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Stripe', 'AWS', 'Elasticsearch']),
                'category' => 'e-commerce',
                'client' => 'Retail Technology Company',
                'project_url' => 'https://pellini-solutions.com',
                'github_url' => null,
                'featured_image' => '/assets/projects/pellini/hero.jpg',
                'gallery_images' => json_encode([
                    '/assets/projects/pellini/storefront.jpg',
                    '/assets/projects/pellini/admin.jpg',
                    '/assets/projects/pellini/mobile.jpg'
                ]),
                'meta_data' => json_encode([
                    'features' => [
                        'Multi-channel inventory sync',
                        'Advanced product catalog',
                        'Order management system',
                        'Customer portal',
                        'Payment gateway integration',
                        'Analytics and reporting'
                    ],
                    'challenges' => [
                        'Synchronizing inventory across channels',
                        'Handling high-volume transactions',
                        'Implementing complex pricing rules',
                        'Ensuring PCI compliance'
                    ],
                    'results' => [
                        'Increased sales by 45%',
                        'Reduced inventory discrepancies by 80%',
                        'Improved order processing speed by 60%',
                        'Enhanced customer satisfaction scores'
                    ],
                    'project_type' => 'full-stack',
                    'demo_url' => null,
                    'start_date' => '2022-09-01',
                    'end_date' => '2023-02-28',
                    'meta_title' => 'Pellini Solutions - E-commerce Platform | Charbel Malo',
                    'meta_description' => 'Advanced e-commerce platform with multi-channel integration and comprehensive inventory management.'
                ]),
                'project_date' => Carbon::create(2023, 2, 28),
                'is_featured' => true,
                'status' => 'active',
                'sort_order' => 3,
                'completion_percentage' => 100.00,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Vertical Software',
                'slug' => 'vertical-software',
                'description' => 'Enterprise software suite for construction project management and resource planning.',
                'long_description' => 'Vertical Software is an enterprise-grade construction management platform that streamlines project planning, resource allocation, and team collaboration. The system provides comprehensive tools for project managers, contractors, and stakeholders.',
                'technologies' => json_encode(['ASP.NET Core', 'C#', 'SQL Server', 'Angular', 'Azure', 'SignalR', 'AutoCAD API']),
                'category' => 'enterprise-software',
                'client' => 'Construction Technology Firm',
                'project_url' => 'https://vertical-software.com',
                'github_url' => null,
                'featured_image' => '/assets/projects/vertical/hero.jpg',
                'gallery_images' => json_encode([
                    '/assets/projects/vertical/dashboard.jpg',
                    '/assets/projects/vertical/planning.jpg',
                    '/assets/projects/vertical/mobile.jpg'
                ]),
                'meta_data' => json_encode([
                    'features' => [
                        'Project timeline management',
                        'Resource allocation tools',
                        'Real-time collaboration',
                        'Document management',
                        'Cost tracking and budgeting',
                        'Mobile field applications'
                    ],
                    'challenges' => [
                        'Integrating with CAD software',
                        'Managing complex project hierarchies',
                        'Ensuring real-time synchronization',
                        'Supporting offline functionality'
                    ],
                    'results' => [
                        'Reduced project delays by 35%',
                        'Improved resource utilization by 50%',
                        'Enhanced team collaboration efficiency',
                        'Successful deployment across 200+ projects'
                    ],
                    'project_type' => 'full-stack',
                    'demo_url' => null,
                    'start_date' => '2022-05-01',
                    'end_date' => '2022-12-15',
                    'meta_title' => 'Vertical Software - Construction Management | Charbel Malo',
                    'meta_description' => 'Enterprise construction project management and resource planning software suite.'
                ]),
                'project_date' => Carbon::create(2022, 12, 15),
                'is_featured' => true,
                'status' => 'active',
                'sort_order' => 4,
                'completion_percentage' => 100.00,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'NFE Digital Solutions',
                'slug' => 'nfe',
                'description' => 'Digital transformation platform for Brazilian fiscal compliance and automation.',
                'long_description' => 'NFE Digital Solutions is a comprehensive platform designed to streamline Brazilian fiscal compliance processes. The system automates NFE (Nota Fiscal Eletrônica) generation, validation, and submission while ensuring full compliance with SEFAZ requirements.',
                'technologies' => json_encode(['Laravel', 'PHP', 'MySQL', 'React', 'SOAP/REST APIs', 'XML Processing', 'Digital Certificates']),
                'category' => 'fintech',
                'client' => 'Brazilian Fintech Company',
                'project_url' => 'https://nfe-solutions.com.br',
                'github_url' => null,
                'featured_image' => '/assets/projects/nfe/hero.jpg',
                'gallery_images' => json_encode([
                    '/assets/projects/nfe/dashboard.jpg',
                    '/assets/projects/nfe/compliance.jpg',
                    '/assets/projects/nfe/reports.jpg'
                ]),
                'meta_data' => json_encode([
                    'features' => [
                        'Automated NFE generation',
                        'SEFAZ integration',
                        'Digital certificate management',
                        'Compliance monitoring',
                        'Batch processing',
                        'Audit trail and reporting'
                    ],
                    'challenges' => [
                        'Complex Brazilian tax regulations',
                        'SEFAZ API integration variations',
                        'Digital certificate handling',
                        'High-volume transaction processing'
                    ],
                    'results' => [
                        'Reduced compliance errors by 95%',
                        'Automated 99% of NFE processes',
                        'Improved processing speed by 80%',
                        'Serving 500+ Brazilian businesses'
                    ],
                    'project_type' => 'full-stack',
                    'demo_url' => null,
                    'start_date' => '2022-01-10',
                    'end_date' => '2022-08-30',
                    'meta_title' => 'NFE Digital Solutions - Brazilian Fiscal Compliance | Charbel Malo',
                    'meta_description' => 'Digital transformation platform for Brazilian fiscal compliance and NFE automation.'
                ]),
                'project_date' => Carbon::create(2022, 8, 30),
                'is_featured' => false,
                'status' => 'active',
                'sort_order' => 5,
                'completion_percentage' => 100.00,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        foreach ($projects as $project) {
            PortfolioProject::create($project);
        }
    }
}
