-- MINIMAL SETUP - No errors guaranteed!
-- Run this after deleting all tables

-- 1. Services Table (minimal)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- 2. Projects Table (minimal)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- 3. Team Table (minimal)
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255)
);

-- 4. Testimonials Table (minimal)
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255) NOT NULL
);

-- 5. Blog Table (minimal)
CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT
);

-- 6. FAQ Table (minimal)
CREATE TABLE faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

-- 7. Contact Table (minimal)
CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    value TEXT NOT NULL
);

-- Insert simple sample data
INSERT INTO services (name, description) VALUES
('Web Design', 'Custom website design and development'),
('UI/UX Design', 'User interface and user experience design'),
('E-commerce Development', 'Online store development'),
('React.js Development', 'Modern web applications with React'),
('Digital Marketing', 'Comprehensive digital marketing services');

INSERT INTO projects (name, description) VALUES
('Apex App', 'Mobile application for cryptocurrency management'),
('Strikz Sports', 'Landing page for sports training programs'),
('E-commerce Platform', 'Full-featured e-commerce platform'),
('Corporate Website', 'Professional corporate website'),
('SaaS Dashboard', 'Comprehensive SaaS dashboard');

INSERT INTO team (name, role) VALUES
('Rajesh Patel', 'Lead Developer'),
('Priya Sharma', 'UI/UX Designer'),
('Amit Kumar', 'Project Manager'),
('Sneha Gupta', 'Digital Marketing Specialist'),
('Vikram Singh', 'Backend Developer');

INSERT INTO testimonials (quote, author) VALUES
('Redlio Designs transformed our online presence completely.', 'Sarah Johnson'),
('Working with Redlio was a game-changer.', 'Michael Chen'),
('The team at Redlio Designs is professional and highly skilled.', 'Emily Rodriguez'),
('Outstanding work! Redlio Designs understood our vision perfectly.', 'David Kim'),
('Redlio Designs delivered exceptional results.', 'Lisa Wang');

INSERT INTO blog (title, excerpt) VALUES
('The Future of Web Design: Trends to Watch in 2024', 'Explore the latest web design trends'),
('Building Scalable React Applications', 'Learn essential techniques for React'),
('UI/UX Design Principles', 'Understanding the fundamentals of design'),
('E-commerce Success: Key Features', 'Discover essential e-commerce features'),
('Digital Marketing Strategies', 'Effective marketing tactics for businesses');

INSERT INTO faq (question, answer) VALUES
('What services do you offer?', 'We offer web design, development, UI/UX design, e-commerce, and digital marketing services.'),
('How long does a project take?', 'Simple websites take 2-4 weeks, while complex projects can take 8-12 weeks.'),
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
