import type { Project } from '~/types/project'

export const PROJECTS_DUMMY: Project[] = [
  {
    id: 1,
    title: 'Fintech Dashboard Evolution',
    slug: 'fintech-dashboard-evolution',
    description: 'Platform manajemen keuangan modern dengan visualisasi data realtime dan AI forecasting.',
    content: `
      <h2>Tantangan</h2>
      <p>Klien membutuhkan dashboard yang mampu mengolah jutaan transaksi dalam hitungan detik dengan visualisasi yang mudah dipahami oleh pengguna non-teknis. Sistem lama lambat dan sulit dikustomisasi.</p>
      
      <h2>Solusi</h2>
      <p>Kami membangun ulang arsitektur menggunakan Nuxt.js untuk frontend dan Go untuk backend service. Mengimplementasikan WebSocket untuk data realtime dan D3.js untuk visualisasi kompleks.</p>
      
      <h2>Hasil</h2>
      <p>Peningkatan performa 300%, user retention naik 45%, dan loading time berkurang menjadi di bawah 800ms.</p>
    `,
    status: 'completed',
    client_id: 101,
    service_id: 1,
    project_url: 'https://demo-fintech.sarando.site',
    repository_url: null,
    started_at: '2025-01-10',
    completed_at: '2025-03-20',
    price: '150000000',
    payment_status: 'paid',
    is_featured: true,
    order: 1,
    client: {
      id: 101,
      name: 'TechFin Global',
      email: 'contact@techfin.com',
      phone: null,
      address: null,
    },
    service: {
      id: 1,
      category_id: 1,
      name: 'Web Development',
      slug: 'web-development',
      description: 'Pembuatan website modern',
      icon: 'lucide:layout',
      image_path: '/images/services/web-dev.jpg',
      is_active: true,
      order: 1,
      prices: [],
      category_name: 'Development',
    },
    images: [
      {
        id: 1,
        project_id: 1,
        image_path: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop', // Dashboard UI
        title: 'Main Dashboard',
        order: 1,
        is_thumbnail: true,
      },
      {
        id: 2,
        project_id: 1,
        image_path: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop', // Analytics
        title: 'Analytics View',
        order: 2,
        is_thumbnail: false,
      },
      {
        id: 3,
        project_id: 1,
        image_path: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', // Mobile
        title: 'Mobile Responsive',
        order: 3,
        is_thumbnail: false,
      },
    ],
    technologies: [
      { id: 1, name: 'Nuxt.js', slug: 'nuxt', icon: 'vscode-icons:file-type-nuxt', category: 'frontend' },
      { id: 2, name: 'TypeScript', slug: 'typescript', icon: 'vscode-icons:file-type-typescript', category: 'frontend' },
      { id: 3, name: 'Tailwind CSS', slug: 'tailwind', icon: 'vscode-icons:file-type-tailwind', category: 'frontend' },
      { id: 4, name: 'Supabase', slug: 'supabase', icon: 'vscode-icons:file-type-supabase', category: 'backend' },
    ],
  },
  {
    id: 2,
    title: 'E-Commerce AI Recommendation',
    slug: 'ecommerce-ai-recommendation',
    description: 'Sistem rekomendasi produk berbasis machine learning untuk meningkatkan konversi penjualan.',
    content: `
      <h2>Overview</h2>
      <p>Mengintegrasikan engine AI ke dalam platform e-commerce existing untuk memberikan personalisasi pengalaman belanja setiap user.</p>
    `,
    status: 'completed',
    client_id: 102,
    service_id: 2,
    project_url: 'https://shop.sarando.site',
    repository_url: null,
    started_at: '2024-11-05',
    completed_at: '2025-01-15',
    price: '85000000',
    payment_status: 'paid',
    is_featured: true,
    order: 2,
    client: {
      id: 102,
      name: 'Retail Maju',
      email: 'info@retailmaju.id',
      phone: null,
      address: null,
    },
    service: {
      id: 2,
      category_id: 2,
      name: 'AI Solutions',
      slug: 'ai-solutions',
      description: 'Solusi kecerdasan buatan',
      icon: 'lucide:brain',
      image_path: '/images/services/ai.jpg',
      is_active: true,
      order: 2,
      prices: [],
      category_name: 'Artificial Intelligence',
    },
    images: [
      {
        id: 11,
        project_id: 2,
        image_path: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2564&auto=format&fit=crop', // AI Dashboard
        title: 'Recommendation Engine',
        order: 1,
        is_thumbnail: true,
      },
      {
        id: 12,
        project_id: 2,
        image_path: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2670&auto=format&fit=crop', // Code
        title: 'Integration Logic',
        order: 2,
        is_thumbnail: false,
      },
    ],
    technologies: [
      { id: 5, name: 'Python', slug: 'python', icon: 'vscode-icons:file-type-python', category: 'backend' },
      { id: 6, name: 'TensorFlow', slug: 'tensorflow', icon: 'logos:tensorflow', category: 'other' },
      { id: 7, name: 'Redis', slug: 'redis', icon: 'vscode-icons:file-type-redis', category: 'database' },
    ],
  },
  {
    id: 3,
    title: 'Healthcare App "SehatQ"',
    slug: 'healthcare-app-sehatq',
    description: 'Aplikasi mobile untuk konsultasi dokter dan booking rumah sakit terintegrasi BPJS.',
    content: `
      <h2>Latar Belakang</h2>
      <p>Akses layanan kesehatan yang cepat dan terintegrasi menjadi kebutuhan krusial. RS Medika ingin mendigitalkan proses pendaftaran pasien dan konsultasi untuk mengurangi antrean fisik.</p>

      <h2>Solusi Mobile</h2>
      <p>Mengembangkan super-app kesehatan dengan fitur telemedisin, booking dokter real-time, dan integrasi riwayat medis elektronik (EMR). Dibangun dengan Flutter untuk performa native di iOS dan Android.</p>

      <h2>Fitur Utama</h2>
      <ul>
        <li>Video Consult: Konsultasi tatap muka virtual dengan dokter spesialis.</li>
        <li>Smart Booking: Jadwal dokter real-time terhubung ke sistem rumah sakit.</li>
        <li>Integrasi BPJS: Verifikasi kepesertaan otomatis.</li>
      </ul>
    `,
    status: 'completed',
    client_id: 103,
    service_id: 3,
    project_url: null,
    repository_url: null,
    started_at: '2024-08-01',
    completed_at: '2024-12-20',
    price: '250000000',
    payment_status: 'paid',
    is_featured: false,
    order: 3,
    client: {
      id: 103,
      name: 'RS Medika',
      email: 'admin@rsmedika.co.id',
      phone: null,
      address: null,
    },
    service: {
      id: 3,
      category_id: 1,
      name: 'Mobile Development',
      slug: 'mobile-development',
      description: 'Pengembangan aplikasi mobile',
      icon: 'lucide:smartphone',
      image_path: '/images/services/mobile.jpg',
      is_active: true,
      order: 3,
      prices: [],
      category_name: 'Development',
    },
    images: [
      {
        id: 21,
        project_id: 3,
        image_path: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop', // Medical App
        title: 'App Interface',
        order: 1,
        is_thumbnail: true,
      },
      {
        id: 22,
        project_id: 3,
        image_path: 'https://picsum.photos/390/844?random=1',
        title: 'Mobile Home Screen',
        order: 2,
        is_thumbnail: false,
      },
      {
        id: 23,
        project_id: 3,
        image_path: 'https://picsum.photos/390/844?random=2',
        title: 'Doctor Profile',
        order: 3,
        is_thumbnail: false,
      },
      {
        id: 24,
        project_id: 3,
        image_path: 'https://picsum.photos/390/844?random=3',
        title: 'Booking Success',
        order: 4,
        is_thumbnail: false,
      },
    ],
    technologies: [
      { id: 8, name: 'Flutter', slug: 'flutter', icon: 'vscode-icons:file-type-flutter', category: 'mobile' },
      { id: 9, name: 'Firebase', slug: 'firebase', icon: 'vscode-icons:file-type-firebase', category: 'backend' },
    ],
  },
  {
    id: 4,
    title: 'Luxury Villa Booking Bali',
    slug: 'luxury-villa-bali',
    description: 'Website booking villa mewah dengan virtual tour 360 derajat.',
    content: null,
    status: 'completed',
    client_id: 104,
    service_id: 1,
    project_url: null,
    repository_url: null,
    started_at: '2025-02-01',
    completed_at: '2025-02-28',
    price: '45000000',
    payment_status: 'paid',
    is_featured: true,
    order: 4,
    client: {
      id: 104,
      name: 'Luxury Bali',
      email: 'info@luxurybali.com',
      phone: null,
      address: null,
    },
    service: {
      id: 1,
      category_id: 1,
      name: 'Web Development',
      slug: 'web-development',
      description: 'Pembuatan website modern',
      icon: 'lucide:layout',
      image_path: '/images/services/web-dev.jpg',
      is_active: true,
      order: 1,
      prices: [],
      category_name: 'Development',
    },
    images: [
      {
        id: 31,
        project_id: 4,
        image_path: 'https://images.unsplash.com/photo-1600596542815-2250c385528c?q=80&w=2675&auto=format&fit=crop', // Villa
        title: 'Villa Exterior',
        order: 1,
        is_thumbnail: true,
      },
    ],
    technologies: [
      { id: 1, name: 'Nuxt.js', slug: 'nuxt', icon: 'vscode-icons:file-type-nuxt', category: 'frontend' },
      { id: 2, name: 'Three.js', slug: 'threejs', icon: 'logos:threejs', category: 'frontend' },
    ],
  },
]
