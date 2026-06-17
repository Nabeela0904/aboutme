-- Human Library: seed categories and demo mentors
-- Run after 002_core_schema.sql

insert into public.categories (id, name, description, icon) values
  ('career',     'Career Growth',  'Navigate transitions, promotions, and job searches',           'trending-up'),
  ('leadership', 'Leadership',     'Build teams, manage people, and lead with impact',           'users'),
  ('startup',    'Startups',       'Founding, fundraising, and scaling early-stage companies',   'rocket'),
  ('tech',       'Technology',     'Engineering, product, and technical career paths',           'code'),
  ('design',     'Design',         'UX, visual design, and creative direction',                  'palette'),
  ('wellness',   'Wellness',       'Work-life balance, burnout recovery, and mental health',     'heart'),
  ('finance',    'Finance',        'Personal finance, investing, and financial planning',        'dollar-sign'),
  ('marketing',  'Marketing',      'Growth, branding, and go-to-market strategy',                'megaphone')
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon;

insert into public.mentors (
  slug, name, profile_image, profession, years_experience,
  hourly_rate, currency, bio, skills, rating, total_sessions,
  location, featured
) values
  (
    'sarah-okafor',
    'Sarah Okafor',
    'https://api.dicebear.com/7.x/notionists/svg?seed=sarah-okafor&backgroundColor=b6e3f4,c0aede,d1d4f9',
    'VP of Engineering at Datadog', 15, 150, 'USD',
    'Scaled engineering teams from 5 to 120. I help underrepresented engineers break into leadership.',
    array['Engineering Leadership', 'System Design', 'Career Negotiation'],
    4.90, 312, 'New York, USA', true
  ),
  (
    'david-kim',
    'David Kim',
    'https://api.dicebear.com/7.x/notionists/svg?seed=david-kim&backgroundColor=b6e3f4,c0aede,d1d4f9',
    'Founder & CEO at Lumen AI', 12, 200, 'USD',
    'Two-time founder with one exit. I help first-time founders navigate fundraising.',
    array['Fundraising', 'Product Strategy', 'Go-to-Market'],
    4.80, 428, 'San Francisco, USA', true
  ),
  (
    'maria-santos',
    'Maria Santos',
    'https://api.dicebear.com/7.x/notionists/svg?seed=maria-santos&backgroundColor=b6e3f4,c0aede,d1d4f9',
    'Head of Design at Figma', 11, 130, 'USD',
    'Design leader who built systems used by millions.',
    array['Design Systems', 'UX Strategy', 'Portfolio Review'],
    4.90, 245, 'Lisbon, Portugal', true
  ),
  (
    'amara-diallo',
    'Amara Diallo',
    'https://api.dicebear.com/7.x/notionists/svg?seed=amara-diallo&backgroundColor=b6e3f4,c0aede,d1d4f9',
    'Growth Marketing Lead at Shopify', 9, 120, 'USD',
    'Grew three SaaS products from zero to $1M ARR.',
    array['Growth Marketing', 'Content Strategy', 'Analytics'],
    4.80, 267, 'Toronto, Canada', true
  ),
  (
    'fatima-al-hassan',
    'Fatima Al-Hassan',
    'https://api.dicebear.com/7.x/notionists/svg?seed=fatima-al-hassan&backgroundColor=b6e3f4,c0aede,d1d4f9',
    'Staff Software Engineer at Google', 10, 110, 'USD',
    'Staff engineer who has conducted 300+ technical interviews.',
    array['System Design', 'Technical Interviews', 'Staff Engineer Path'],
    4.80, 489, 'Austin, USA', false
  )
on conflict (slug) do nothing;

insert into public.mentor_categories (mentor_id, category_id)
select m.id, c.category_id
from public.mentors m
cross join (values
  ('sarah-okafor', 'career'),
  ('sarah-okafor', 'leadership'),
  ('sarah-okafor', 'tech'),
  ('david-kim', 'startup'),
  ('david-kim', 'leadership'),
  ('maria-santos', 'design'),
  ('maria-santos', 'career'),
  ('amara-diallo', 'marketing'),
  ('amara-diallo', 'startup'),
  ('fatima-al-hassan', 'tech'),
  ('fatima-al-hassan', 'career')
) as c(slug, category_id)
where m.slug = c.slug
on conflict do nothing;

insert into public.mentor_availability (mentor_id, day_of_week, start_time, end_time)
select m.id, a.day_of_week::public.day_of_week, a.start_time::time, a.end_time::time
from public.mentors m
cross join (values
  ('sarah-okafor', 'Tuesday',  '09:00', '12:00'),
  ('sarah-okafor', 'Thursday', '14:00', '18:00'),
  ('david-kim',    'Monday',   '08:00', '11:00'),
  ('david-kim',    'Friday',   '09:00', '12:00'),
  ('maria-santos', 'Tuesday',  '09:00', '12:00'),
  ('maria-santos', 'Thursday', '14:00', '18:00')
) as a(slug, day_of_week, start_time, end_time)
where m.slug = a.slug;

insert into public.reviews (mentor_id, author_name, rating, comment)
select m.id, r.author_name, r.rating, r.comment
from public.mentors m
cross join (values
  ('sarah-okafor', 'James L.', 5, 'Sarah gave me a concrete 90-day plan for my promotion packet.'),
  ('david-kim',    'Tom R.',   5, 'David''s fundraising playbook is gold. Closed our seed round in 6 weeks.'),
  ('maria-santos', 'Lena K.',  5, 'Maria reviewed my portfolio live and I landed 3 interviews the next week.')
) as r(slug, author_name, rating, comment)
where m.slug = r.slug;
