-- Redlio Designs Chatbot Database Setup
-- Run these queries in your Supabase SQL Editor

-- Enable Row Level Security (RLS) for all tables
-- This ensures data security while allowing public read access

-- 1. Services Table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100),
    category VARCHAR(100),
    features TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Projects/Portfolio Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    summary TEXT,
    technology TEXT[],
    tech_stack TEXT,
    tools TEXT,
    url VARCHAR(500),
    link VARCHAR(500),
    website VARCHAR(500),
    image_url VARCHAR(500),
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'completed',
    client_name VARCHAR(255),
    project_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Team/Staff Table
CREATE TABLE IF NOT EXISTS team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    employee_name VARCHAR(255),
    role VARCHAR(255),
    position VARCHAR(255),
    title VARCHAR(255),
    job_title VARCHAR(255),
    bio TEXT,
    description TEXT,
    about TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin VARCHAR(500),
    image_url VARCHAR(500),
    department VARCHAR(100),
    experience_years INTEGER,
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Testimonials/Reviews Table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    review TEXT,
    feedback TEXT,
    testimonial TEXT,
    author VARCHAR(255) NOT NULL,
    client_name VARCHAR(255),
    name VARCHAR(255),
    company VARCHAR(255),
    organization VARCHAR(255),
    position VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_name VARCHAR(255),
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Blog/Articles Table
CREATE TABLE IF NOT EXISTS blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    name VARCHAR(500),
    headline VARCHAR(500),
    excerpt TEXT,
    summary TEXT,
    description TEXT,
    content TEXT,
    url VARCHAR(500),
    slug VARCHAR(500),
    link VARCHAR(500),
    author VARCHAR(255),
    category VARCHAR(100),
    tags TEXT[],
    featured_image VARCHAR(500),
    status VARCHAR(50) DEFAULT 'published',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. FAQ Table
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    q TEXT,
    title TEXT,
    answer TEXT NOT NULL,
    a TEXT,
    response TEXT,
    description TEXT,
    category VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Contact/Company Info Table
CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    contact_type VARCHAR(100),
    value TEXT NOT NULL,
    contact_value TEXT,
    details TEXT,
    description TEXT,
    note TEXT,
    is_primary BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Company Info Table
CREATE TABLE IF NOT EXISTS company_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    about TEXT,
    mission TEXT,
    vision TEXT,
    values TEXT[],
    founded_year INTEGER,
    employees_count INTEGER,
    location VARCHAR(255),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    social_links JSONB,
    awards TEXT[],
    certifications TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    logo_url VARCHAR(500),
    website VARCHAR(500),
    industry VARCHAR(100),
    project_type VARCHAR(100),
    testimonial TEXT,
    project_url VARCHAR(500),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Case Studies Table
CREATE TABLE IF NOT EXISTS case_studies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    client_name VARCHAR(255),
    project_type VARCHAR(100),
    challenge TEXT,
    solution TEXT,
    results TEXT,
    technologies TEXT[],
    duration VARCHAR(100),
    team_size INTEGER,
    project_url VARCHAR(500),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for Redlio Designs

-- Sample Services
INSERT INTO services (name, description, price, category, features) VALUES
('Web Design & Development', 'Custom website design and development tailored to your business needs', 'Starting from $2,500', 'Development', ARRAY['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile Friendly']),
('UI/UX Design', 'User interface and user experience design for web and mobile applications', 'Starting from $1,500', 'Design', ARRAY['User Research', 'Wireframing', 'Prototyping', 'Usability Testing']),
('E-commerce Development', 'Online store development with payment integration and inventory management', 'Starting from $3,500', 'E-commerce', ARRAY['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Admin Dashboard']),
('React.js Development', 'Modern web applications built with React.js for optimal performance', 'Starting from $2,000', 'Frontend', ARRAY['Component Architecture', 'State Management', 'API Integration', 'Performance Optimization']),
('Digital Marketing', 'Comprehensive digital marketing services to grow your online presence', 'Starting from $800/month', 'Marketing', ARRAY['SEO', 'Social Media', 'Content Marketing', 'Analytics']);

-- Sample Projects
INSERT INTO projects (name, description, technology, client_name, url, category) VALUES
('Apex - Cryptocurrency App', 'Innovative mobile application for cryptocurrency management with real-time tracking and portfolio management', ARRAY['React Native', 'Node.js', 'MongoDB'], 'CryptoCorp', 'https://apex-crypto.com', 'Mobile App'),
('Strikz - Sports Training', 'Sleek, user-focused landing page for sports training programs with booking system', ARRAY['Next.js', 'Tailwind CSS', 'Stripe'], 'Strikz Sports', 'https://strikz.com', 'Web Application'),
('E-commerce Platform', 'Full-featured e-commerce platform with admin dashboard and payment integration', ARRAY['React', 'Node.js', 'PostgreSQL'], 'Fashion Store', 'https://fashionstore.com', 'E-commerce'),
('Corporate Website', 'Professional corporate website with CMS and multilingual support', ARRAY['WordPress', 'PHP', 'MySQL'], 'TechCorp', 'https://techcorp.com', 'Corporate'),
('SaaS Dashboard', 'Comprehensive SaaS dashboard with analytics and user management', ARRAY['Vue.js', 'Laravel', 'Redis'], 'DataSoft', 'https://datasoft.io', 'SaaS');

-- Sample Team Members
INSERT INTO team (name, role, bio, email, skills) VALUES
('Rajesh Patel', 'Lead Developer', 'Full-stack developer with 8+ years of experience in React, Node.js, and cloud technologies', 'rajesh@redliodesigns.com', ARRAY['React', 'Node.js', 'AWS', 'MongoDB']),
('Priya Sharma', 'UI/UX Designer', 'Creative designer specializing in user experience and interface design for web and mobile applications', 'priya@redliodesigns.com', ARRAY['Figma', 'Adobe XD', 'Sketch', 'Prototyping']),
('Amit Kumar', 'Project Manager', 'Experienced project manager ensuring smooth delivery of complex web development projects', 'amit@redliodesigns.com', ARRAY['Agile', 'Scrum', 'Client Management', 'Quality Assurance']),
('Sneha Gupta', 'Digital Marketing Specialist', 'Digital marketing expert focused on SEO, social media, and content marketing strategies', 'sneha@redliodesigns.com', ARRAY['SEO', 'Google Ads', 'Social Media', 'Analytics']),
('Vikram Singh', 'Backend Developer', 'Backend specialist with expertise in API development, database design, and server architecture', 'vikram@redliodesigns.com', ARRAY['Python', 'Django', 'PostgreSQL', 'Docker']);

-- Sample Testimonials
INSERT INTO testimonials (quote, author, company, rating, project_name) VALUES
('Redlio Designs transformed our online presence completely. Their attention to detail and technical expertise exceeded our expectations.', 'Sarah Johnson', 'TechStart Inc.', 5, 'E-commerce Platform'),
('Working with Redlio was a game-changer. They delivered our project on time and within budget, with outstanding results.', 'Michael Chen', 'Digital Solutions Ltd.', 5, 'Corporate Website'),
('The team at Redlio Designs is professional, creative, and highly skilled. Our new website has significantly increased our conversions.', 'Emily Rodriguez', 'Fashion Forward', 5, 'Fashion Store'),
('Outstanding work! Redlio Designs understood our vision and brought it to life better than we imagined.', 'David Kim', 'Innovation Labs', 5, 'SaaS Dashboard'),
('Redlio Designs delivered exceptional results. Their expertise in React and modern web technologies is unmatched.', 'Lisa Wang', 'CloudTech Solutions', 5, 'React Application');

-- Sample Blog Posts
INSERT INTO blog (title, excerpt, author, category, published_at) VALUES
('The Future of Web Design: Trends to Watch in 2024', 'Explore the latest web design trends that will shape the digital landscape in 2024, from AI integration to sustainable design practices.', 'Rajesh Patel', 'Web Design', NOW() - INTERVAL '5 days'),
('Building Scalable React Applications: Best Practices', 'Learn essential techniques for creating maintainable and scalable React applications that can grow with your business needs.', 'Amit Kumar', 'Development', NOW() - INTERVAL '10 days'),
('UI/UX Design Principles Every Developer Should Know', 'Understanding the fundamentals of user interface and user experience design to create better digital products.', 'Priya Sharma', 'Design', NOW() - INTERVAL '15 days'),
('E-commerce Success: Key Features Your Online Store Needs', 'Discover the essential features that can make or break your e-commerce website and drive more sales.', 'Sneha Gupta', 'E-commerce', NOW() - INTERVAL '20 days'),
('Digital Marketing Strategies for Small Businesses', 'Effective digital marketing tactics that small businesses can implement to compete with larger companies.', 'Vikram Singh', 'Marketing', NOW() - INTERVAL '25 days');

-- Sample FAQ
INSERT INTO faq (question, answer, category) VALUES
('What services does Redlio Designs offer?', 'We offer comprehensive web design and development services including custom websites, e-commerce platforms, mobile applications, UI/UX design, digital marketing, and ongoing maintenance and support.', 'Services'),
('How long does a typical project take?', 'Project timelines vary based on complexity. A simple website typically takes 2-4 weeks, while complex e-commerce platforms or custom applications can take 8-12 weeks. We provide detailed timelines during the planning phase.', 'Timeline'),
('Do you provide ongoing support after project completion?', 'Yes, we offer various support packages including maintenance, updates, security monitoring, and technical support. We believe in long-term partnerships with our clients.', 'Support'),
('What technologies do you work with?', 'We work with modern technologies including React, Next.js, Node.js, Python, PHP, WordPress, and various databases. We choose the best technology stack based on your specific project requirements.', 'Technology'),
('How do you ensure project quality?', 'We follow a rigorous quality assurance process including code reviews, testing phases, and client feedback loops. Our team has extensive experience and we maintain high standards throughout the development process.', 'Quality');

-- Sample Contact Information
INSERT INTO contact (type, value, description, is_primary) VALUES
('Email', 'hello@redliodesigns.com', 'Primary contact email for general inquiries', true),
('Phone', '+91 98765 43210', 'Main office phone number', true),
('Address', '123 Business Park, Ahmedabad, Gujarat 380015', 'Main office address in Ahmedabad', true),
('LinkedIn', 'https://linkedin.com/company/redlio-designs', 'Follow us on LinkedIn for updates', false),
('Twitter', 'https://twitter.com/redliodesigns', 'Connect with us on Twitter', false),
('Instagram', 'https://instagram.com/redliodesigns', 'See our work on Instagram', false);

-- Sample Company Info
INSERT INTO company_info (name, description, founded_year, employees_count, location, phone, email, website, awards) VALUES
('Redlio Designs', 'A leading web design and development company specializing in creating digital experiences that drive business growth. With over 9 years of expertise, we help businesses establish their online presence and achieve their digital goals.', 2015, 30, 'Ahmedabad & Jamnagar, India', '+91 98765 43210', 'hello@redliodesigns.com', 'https://redliodesigns.com', ARRAY['Top Rated on Clutch', 'Featured on DesignRush', 'Pro Agency on Dribbble']);

-- Sample Clients
INSERT INTO clients (name, company, industry, project_type, testimonial) VALUES
('Sarah Johnson', 'TechStart Inc.', 'Technology', 'E-commerce Platform', 'Redlio Designs delivered an exceptional e-commerce platform that exceeded our expectations.'),
('Michael Chen', 'Digital Solutions Ltd.', 'Consulting', 'Corporate Website', 'Professional, reliable, and highly skilled team. Our new website has been a game-changer.'),
('Emily Rodriguez', 'Fashion Forward', 'Fashion', 'Online Store', 'The team understood our vision perfectly and brought it to life beautifully.'),
('David Kim', 'Innovation Labs', 'Technology', 'SaaS Application', 'Outstanding technical expertise and attention to detail. Highly recommended!'),
('Lisa Wang', 'CloudTech Solutions', 'Cloud Services', 'Web Application', 'Redlio Designs transformed our digital presence completely.');

-- Sample Case Studies
INSERT INTO case_studies (title, client_name, project_type, challenge, solution, results, technologies, duration, team_size) VALUES
('E-commerce Transformation', 'Fashion Forward', 'E-commerce Platform', 'Outdated website with poor user experience and low conversion rates', 'Redesigned the entire platform with modern UI/UX, implemented advanced search and filtering, and optimized for mobile', '300% increase in conversions, 50% improvement in page load speed', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], '12 weeks', 5),
('SaaS Dashboard Development', 'CloudTech Solutions', 'Web Application', 'Need for a comprehensive dashboard to manage cloud services and analytics', 'Built a scalable dashboard with real-time analytics, user management, and API integrations', '40% reduction in support tickets, 200% increase in user engagement', ARRAY['Vue.js', 'Laravel', 'Redis', 'Chart.js'], '16 weeks', 6),
('Mobile App for Cryptocurrency', 'CryptoCorp', 'Mobile Application', 'Complex requirements for real-time cryptocurrency tracking and portfolio management', 'Developed a cross-platform mobile app with real-time data updates and secure wallet integration', '50,000+ downloads in first month, 4.8-star rating on app stores', ARRAY['React Native', 'Node.js', 'WebSocket', 'Blockchain APIs'], '20 weeks', 7);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_blog_published_at ON blog(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog(category);
CREATE INDEX IF NOT EXISTS idx_faq_category ON faq(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (for chatbot)
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON team FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON blog FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON faq FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON contact FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON company_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON clients FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON case_studies FOR SELECT USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_updated_at BEFORE UPDATE ON team FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_updated_at BEFORE UPDATE ON blog FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON faq FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_info_updated_at BEFORE UPDATE ON company_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
