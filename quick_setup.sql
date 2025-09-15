-- Quick Setup for Redlio Designs Chatbot Database
-- Run this in Supabase SQL Editor for a basic setup

-- 1. Services Table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100),
    category VARCHAR(100),
    features TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    technology TEXT[],
    url VARCHAR(500),
    category VARCHAR(100),
    client_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Team Table
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    bio TEXT,
    email VARCHAR(255),
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Testimonials Table
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    rating INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Blog Table
CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT,
    author VARCHAR(255),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. FAQ Table
CREATE TABLE faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Contact Table
CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO services (name, description, price, category, features) VALUES
('Web Design & Development', 'Custom website design and development', 'Starting from $2,500', 'Development', ARRAY['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile Friendly']),
('UI/UX Design', 'User interface and user experience design', 'Starting from $1,500', 'Design', ARRAY['User Research', 'Wireframing', 'Prototyping', 'Usability Testing']),
('E-commerce Development', 'Online store development with payment integration', 'Starting from $3,500', 'E-commerce', ARRAY['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Admin Dashboard']),
('React.js Development', 'Modern web applications built with React.js', 'Starting from $2,000', 'Frontend', ARRAY['Component Architecture', 'State Management', 'API Integration', 'Performance Optimization']),
('Digital Marketing', 'Comprehensive digital marketing services', 'Starting from $800/month', 'Marketing', ARRAY['SEO', 'Social Media', 'Content Marketing', 'Analytics']);

INSERT INTO projects (name, description, technology, client_name, url, category) VALUES
('Apex - Cryptocurrency App', 'Mobile application for cryptocurrency management', ARRAY['React Native', 'Node.js'], 'CryptoCorp', 'https://apex-crypto.com', 'Mobile App'),
('Strikz - Sports Training', 'Landing page for sports training programs', ARRAY['Next.js', 'Tailwind CSS'], 'Strikz Sports', 'https://strikz.com', 'Web Application'),
('E-commerce Platform', 'Full-featured e-commerce platform', ARRAY['React', 'Node.js'], 'Fashion Store', 'https://fashionstore.com', 'E-commerce'),
('Corporate Website', 'Professional corporate website', ARRAY['WordPress', 'PHP'], 'TechCorp', 'https://techcorp.com', 'Corporate'),
('SaaS Dashboard', 'Comprehensive SaaS dashboard', ARRAY['Vue.js', 'Laravel'], 'DataSoft', 'https://datasoft.io', 'SaaS');

INSERT INTO team (name, role, bio, email, skills) VALUES
('Rajesh Patel', 'Lead Developer', 'Full-stack developer with 8+ years of experience', 'rajesh@redliodesigns.com', ARRAY['React', 'Node.js', 'AWS', 'MongoDB']),
('Priya Sharma', 'UI/UX Designer', 'Creative designer specializing in user experience', 'priya@redliodesigns.com', ARRAY['Figma', 'Adobe XD', 'Sketch', 'Prototyping']),
('Amit Kumar', 'Project Manager', 'Experienced project manager', 'amit@redliodesigns.com', ARRAY['Agile', 'Scrum', 'Client Management', 'Quality Assurance']),
('Sneha Gupta', 'Digital Marketing Specialist', 'Digital marketing expert', 'sneha@redliodesigns.com', ARRAY['SEO', 'Google Ads', 'Social Media', 'Analytics']),
('Vikram Singh', 'Backend Developer', 'Backend specialist with API expertise', 'vikram@redliodesigns.com', ARRAY['Python', 'Django', 'PostgreSQL', 'Docker']);

INSERT INTO testimonials (quote, author, company, rating) VALUES
('Redlio Designs transformed our online presence completely.', 'Sarah Johnson', 'TechStart Inc.', 5),
('Working with Redlio was a game-changer.', 'Michael Chen', 'Digital Solutions Ltd.', 5),
('The team at Redlio Designs is professional and highly skilled.', 'Emily Rodriguez', 'Fashion Forward', 5),
('Outstanding work! Redlio Designs understood our vision perfectly.', 'David Kim', 'Innovation Labs', 5),
('Redlio Designs delivered exceptional results.', 'Lisa Wang', 'CloudTech Solutions', 5);

INSERT INTO blog (title, excerpt, author) VALUES
('The Future of Web Design: Trends to Watch in 2024', 'Explore the latest web design trends that will shape the digital landscape.', 'Rajesh Patel'),
('Building Scalable React Applications', 'Learn essential techniques for creating maintainable React applications.', 'Amit Kumar'),
('UI/UX Design Principles Every Developer Should Know', 'Understanding the fundamentals of user interface design.', 'Priya Sharma'),
('E-commerce Success: Key Features Your Store Needs', 'Discover essential features for e-commerce websites.', 'Sneha Gupta'),
('Digital Marketing Strategies for Small Businesses', 'Effective digital marketing tactics for small businesses.', 'Vikram Singh');

INSERT INTO faq (question, answer) VALUES
('What services does Redlio Designs offer?', 'We offer web design, development, UI/UX design, e-commerce, and digital marketing services.'),
('How long does a typical project take?', 'Simple websites take 2-4 weeks, while complex projects can take 8-12 weeks.'),
('Do you provide ongoing support?', 'Yes, we offer various support packages including maintenance and updates.'),
('What technologies do you work with?', 'We work with React, Next.js, Node.js, Python, PHP, WordPress, and more.'),
('How do you ensure project quality?', 'We follow rigorous QA processes including code reviews and testing phases.');

INSERT INTO contact (type, value) VALUES
('Email', 'hello@redliodesigns.com'),
('Phone', '+91 98765 43210'),
('Address', '123 Business Park, Ahmedabad, Gujarat 380015'),
('LinkedIn', 'https://linkedin.com/company/redlio-designs'),
('Website', 'https://redliodesigns.com');

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON team FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON blog FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON faq FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON contact FOR SELECT USING (true);
