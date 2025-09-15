# Database Setup Guide for Redlio Designs Chatbot

This guide will help you set up your Supabase database for the Redlio Designs chatbot.

## Quick Setup (Recommended)

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `quick_setup.sql`**
4. **Click "Run" to execute the SQL**

This will create all necessary tables with sample data.

## Full Setup (Advanced)

If you want the complete database structure with all features:

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `database_setup.sql`**
4. **Click "Run" to execute the SQL**

## What Gets Created

### Tables Created:
- `services` - Your service offerings
- `projects` - Your portfolio/projects
- `team` - Team member information
- `testimonials` - Client reviews and feedback
- `blog` - Blog posts and articles
- `faq` - Frequently asked questions
- `contact` - Contact information
- `company_info` - Company details (full setup only)
- `clients` - Client information (full setup only)
- `case_studies` - Detailed project case studies (full setup only)

### Sample Data Included:
- 5 sample services
- 5 sample projects
- 5 team members
- 5 testimonials
- 5 blog posts
- 5 FAQ entries
- 5 contact methods

## Environment Variables

After setting up the database, make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Testing the Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the chatbot with these queries:**
   - "What services do you offer?"
   - "Show me your portfolio"
   - "Tell me about your team"
   - "What do clients say about you?"
   - "Do you have any blog posts?"

## Customizing Your Data

### Adding Your Own Services:
```sql
INSERT INTO services (name, description, price) VALUES
('Your Service Name', 'Service description', 'Your price');
```

### Adding Your Own Projects:
```sql
INSERT INTO projects (name, description, technology, url) VALUES
('Project Name', 'Project description', ARRAY['React', 'Node.js'], 'https://project-url.com');
```

### Adding Team Members:
```sql
INSERT INTO team (name, role, bio, email) VALUES
('Team Member Name', 'Their Role', 'Their bio', 'their@email.com');
```

### Adding Testimonials:
```sql
INSERT INTO testimonials (quote, author, company, rating) VALUES
('Client testimonial', 'Client Name', 'Company Name', 5);
```

## Troubleshooting

### If you get permission errors:
Make sure Row Level Security policies are created correctly. The setup scripts include these automatically.

### If the chatbot doesn't find data:
1. Check that your environment variables are correct
2. Verify the tables exist in your Supabase dashboard
3. Check the browser console for any errors

### If you want to reset the database:
```sql
-- Drop all tables (be careful!)
DROP TABLE IF EXISTS services, projects, team, testimonials, blog, faq, contact, company_info, clients, case_studies CASCADE;
```

Then run the setup script again.

## Next Steps

1. **Customize the sample data** with your actual information
2. **Add more content** as needed
3. **Test the chatbot** thoroughly
4. **Deploy your application** when ready

The chatbot will automatically scan your database and provide intelligent responses based on your actual data!
