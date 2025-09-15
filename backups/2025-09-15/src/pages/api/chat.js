// Database-powered chatbot for Redlio Designs
import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { query } = req.body;
	if (!query) {
		return res.status(400).json({ error: "No query provided" });
	}

	try {
		// First, try to get database-driven response
		const dbResponse = await getDatabaseResponse(query);
		
		if (dbResponse) {
			return res.status(200).json({ response: dbResponse });
		}

		// Fallback to AI if no database match
		const aiResponse = await getAIResponse(query);
		console.log(aiResponse, 'aiResponse');
		return res.status(200).json({ response: aiResponse });
		
	} catch (error) {
		console.error("Chat API Error:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

async function getDatabaseResponse(query) {
	try {
		const lowerQuery = query.toLowerCase();

		// Scan all tables and get relevant data
		const databaseContent = await scanDatabase();
		
		// Check for specific patterns and return relevant database content
		if (lowerQuery.includes('services') || lowerQuery.includes('what do you offer')) {
			return formatServicesResponse(databaseContent.services);
		}

		if (lowerQuery.includes('portfolio') || lowerQuery.includes('projects') || lowerQuery.includes('work')) {
			return formatPortfolioResponse(databaseContent.projects);
		}

		if (lowerQuery.includes('team') || lowerQuery.includes('staff') || lowerQuery.includes('people')) {
			return formatTeamResponse(databaseContent.team);
		}

		if (lowerQuery.includes('testimonials') || lowerQuery.includes('reviews') || lowerQuery.includes('feedback')) {
			return formatTestimonialsResponse(databaseContent.testimonials);
		}

		if (lowerQuery.includes('blog') || lowerQuery.includes('articles') || lowerQuery.includes('posts')) {
			return formatBlogResponse(databaseContent.blog);
		}

		if (lowerQuery.includes('faq') || lowerQuery.includes('questions') || lowerQuery.includes('help')) {
			return formatFAQResponse(databaseContent.faq);
		}

		if (lowerQuery.includes('contact') || lowerQuery.includes('get in touch')) {
			return formatContactResponse(databaseContent.contact);
		}

		// General search across all content
		const searchResults = await searchDatabaseContent(query, databaseContent);
		if (searchResults.length > 0) {
			return formatSearchResponse(searchResults);
		}

		return null;
	} catch (error) {
		console.error("Database response error:", error);
		return null;
	}
}

async function scanDatabase() {
	const content = {
		services: [],
		projects: [],
		team: [],
		testimonials: [],
		blog: [],
		faq: [],
		contact: []
	};

	try {
		// Scan all possible tables
		const tables = [
			'services', 'projects', 'portfolio', 'team', 'staff', 'testimonials', 
			'reviews', 'blog', 'articles', 'posts', 'faq', 'contact', 'company_info',
			'about', 'clients', 'case_studies'
		];

		for (const table of tables) {
			try {
				const { data, error } = await supabase
					.from(table)
					.select('*')
					.limit(50); // Limit to prevent overwhelming responses

				if (!error && data) {
					// Categorize data based on table name
					if (table.includes('service')) {
						content.services = [...content.services, ...data];
					} else if (table.includes('project') || table.includes('portfolio')) {
						content.projects = [...content.projects, ...data];
					} else if (table.includes('team') || table.includes('staff')) {
						content.team = [...content.team, ...data];
					} else if (table.includes('testimonial') || table.includes('review')) {
						content.testimonials = [...content.testimonials, ...data];
					} else if (table.includes('blog') || table.includes('article') || table.includes('post')) {
						content.blog = [...content.blog, ...data];
					} else if (table.includes('faq')) {
						content.faq = [...content.faq, ...data];
					} else if (table.includes('contact') || table.includes('company')) {
						content.contact = [...content.contact, ...data];
					}
				}
			} catch (tableError) {
				// Table doesn't exist or access denied, continue
				console.log(`Table ${table} not accessible:`, tableError.message);
			}
		}

		return content;
	} catch (error) {
		console.error("Database scan error:", error);
		return content;
	}
}

async function searchDatabaseContent(query, databaseContent) {
	const results = [];
	const searchTerms = query.toLowerCase().split(' ');

	// Search through all content
	Object.values(databaseContent).flat().forEach(item => {
		if (typeof item === 'object' && item !== null) {
			const itemText = JSON.stringify(item).toLowerCase();
			const matchCount = searchTerms.filter(term => itemText.includes(term)).length;
			
			if (matchCount > 0) {
				results.push({
					item,
					relevance: matchCount,
					table: getTableName(item, databaseContent)
				});
			}
		}
	});

	return results.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
}

function getTableName(item, databaseContent) {
	for (const [tableName, items] of Object.entries(databaseContent)) {
		if (items.includes(item)) {
			return tableName;
		}
	}
	return 'unknown';
}

function formatServicesResponse(services) {
	if (!services || services.length === 0) {
		return "We offer web design, development, UI/UX design, e-commerce, and digital marketing services. Visit https://redliodesigns.com for details or contact us directly!";
	}

	let response = "We offer these services:\n\n";
	
	services.forEach((service, index) => {
		const name = service.name || service.title || service.service_name || `Service ${index + 1}`;
		const description = service.description || service.details || service.info || '';
		const price = service.price ? ` - ${service.price}` : '';
		
		response += `• ${name}${price}`;
		if (description) {
			response += `\n  ${description}`;
		}
		response += `\n\n`;
	});

	response += "Contact us at https://redliodesigns.com/contact to discuss your project!";
	return response;
}

function formatPortfolioResponse(projects) {
	if (!projects || projects.length === 0) {
		return "We've completed 250+ projects across 20+ industries. Visit https://redliodesigns.com to see our portfolio or contact us to discuss your project!";
	}

	let response = "Here are some of our recent projects:\n\n";
	
	projects.slice(0, 3).forEach((project, index) => {
		const name = project.name || project.title || project.project_name || `Project ${index + 1}`;
		const description = project.description || project.details || project.summary || '';
		
		response += `• ${name}`;
		if (description) {
			response += ` - ${description}`;
		}
		response += `\n`;
	});

	response += "\nVisit https://redliodesigns.com to see our full portfolio!";
	return response;
}

function formatTeamResponse(team) {
	if (!team || team.length === 0) {
		return "We have a team of 30+ skilled professionals. Visit https://redliodesigns.com to learn about our team or contact us directly!";
	}

	let response = "Our team includes:\n\n";
	
	team.slice(0, 3).forEach((member, index) => {
		const name = member.name || member.full_name || member.employee_name || `Team Member ${index + 1}`;
		const role = member.role || member.position || member.title || member.job_title || '';
		
		response += `• ${name}`;
		if (role) {
			response += ` - ${role}`;
		}
		response += `\n`;
	});

	response += "\nVisit https://redliodesigns.com to meet our full team!";
	return response;
}

function formatTestimonialsResponse(testimonials) {
	if (!testimonials || testimonials.length === 0) {
		return "We have a 98% client satisfaction rate with 250+ completed projects. Visit https://redliodesigns.com to read client reviews or contact us to discuss your project!";
	}

	let response = "Here's what our clients say:\n\n";
	
	testimonials.slice(0, 2).forEach((testimonial, index) => {
		const quote = testimonial.quote || testimonial.review || testimonial.feedback || testimonial.testimonial || '';
		const author = testimonial.author || testimonial.client_name || testimonial.name || `Client ${index + 1}`;
		
		if (quote) {
			response += `"${quote}"\n`;
			response += `- ${author}\n\n`;
		}
	});

	response += "Visit https://redliodesigns.com to read more reviews!";
	return response;
}

function formatBlogResponse(blog) {
	if (!blog || blog.length === 0) {
		return "We regularly publish insights on web design, development, and digital marketing. Visit https://redliodesigns.com to read our latest articles!";
	}

	let response = "Here are some of our recent articles:\n\n";
	
	blog.slice(0, 3).forEach((post, index) => {
		const title = post.title || post.name || post.headline || `Post ${index + 1}`;
		const excerpt = post.excerpt || post.summary || post.description || '';
		
		response += `• ${title}`;
		if (excerpt) {
			response += `\n  ${excerpt}`;
		}
		response += `\n\n`;
	});

	response += "Visit https://redliodesigns.com to read more articles!";
	return response;
}

function formatFAQResponse(faq) {
	if (!faq || faq.length === 0) {
		return "For answers to common questions, visit https://redliodesigns.com or contact us directly!";
	}

	// Return the most relevant FAQ answer directly
	const bestFAQ = faq[0];
	const question = bestFAQ.question || bestFAQ.q || bestFAQ.title || '';
	const answer = bestFAQ.answer || bestFAQ.a || bestFAQ.response || bestFAQ.description || '';
	
	if (answer) {
		return answer;
	}
	
	return "For answers to your questions, visit https://redliodesigns.com or contact us directly!";
}

function formatContactResponse(contact) {
	if (!contact || contact.length === 0) {
		return "Contact us at https://redliodesigns.com/contact or email hello@redliodesigns.com. We typically reply within 24 hours!";
	}

	// Return the most important contact info directly
	const email = contact.find(c => c.type?.toLowerCase().includes('email'))?.value || 'hello@redliodesigns.com';
	const phone = contact.find(c => c.type?.toLowerCase().includes('phone'))?.value || '+91 98765 43210';
	
	return `Contact us at ${email} or call ${phone}. Visit https://redliodesigns.com/contact for more options. We typically reply within 24 hours!`;
}

function formatSearchResponse(results) {
	if (results.length === 0) {
		return "I don't have specific information about that in our database. Please visit https://redliodesigns.com or contact us directly for more details!";
	}

	// Get the most relevant result (highest relevance score)
	const bestResult = results[0];
	const item = bestResult.item;
	
	// Extract the most relevant information
	const title = item.name || item.title || item.headline || item.question || '';
	const description = item.description || item.details || item.answer || item.summary || '';
	
	// Format as a direct answer
	let response = '';
	
	if (title && description) {
		response = `${title}: ${description}`;
	} else if (description) {
		response = description;
	} else if (title) {
		response = title;
	} else {
		response = "I found some information, but please visit https://redliodesigns.com for more details.";
	}
	
	// Add contact info if it's a general query
	if (bestResult.table === 'contact' || bestResult.table === 'faq') {
		response += " For more information, visit https://redliodesigns.com or contact us directly!";
	}
	
	return response;
}

async function getAIResponse(query) {
	try {
		// Use OpenRouter API as fallback
		const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// model: "google/gemini-2.0-flash-exp:free",
				model:"nvidia/nemotron-nano-9b-v2:free",
				messages: [
					{ 
						role: "system", 
						content: "You are the my assistant chatbot. You ONLY provide information about Redlio Designs, a web design and development company. You should help visitors learn about:\n\n- Redlio Designs services (web design, UI/UX, development, etc.)\n- Company information (9+ years experience, offices in Ahmedabad & Jamnagar, India)\n- Portfolio and projects (250+ projects, 20+ industries, 98% client satisfaction)\n- Process and methodology\n- Team information (30+ professionals)\n- Contact information (https://redliodesigns.com/contact)\n- Awards and recognition (Top Rated on Clutch, featured on DesignRush, Pro Agency on Dribbble)\n\nIf someone asks about anything unrelated to Redlio Designs, politely redirect them to ask about Redlio Designs services, portfolio, or how to get started with a project. Always be helpful, professional, and enthusiastic about Redlio Designs." 
					},
					{ role: "user", content: query }
				],
			}),
		});

		if (!response.ok) {
			throw new Error(`AI API error: ${response.status}`);
		}

		const result = await response.json();
		return result?.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response right now. Please try again.";
		
	} catch (error) {
		console.error("AI Response Error:", error);
		return "I'm having trouble connecting to my AI service right now. Please try again later or ask me something else!";
	}
}


