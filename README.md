
# 💡 Idea Generator – Community Idea Board

>A modern, open-source platform for sharing, upvoting, and discovering the best ideas from the community. Built with Next.js, Supabase, and Tailwind CSS.

---

## What is this project?

**Idea Generator** is a simple, community-driven idea board. Users can:

- Submit new ideas
- Upvote their favorite ideas (one vote per user)
- See ideas ranked by popularity
- Give feedback or report issues
- Register and sign in securely (Supabase Auth)
- Browse public ideas (private ideas coming soon)

The platform is designed for hackathons, product teams, open communities, or anyone who wants to crowdsource and prioritize ideas in a transparent way.

---

## Features

- Modern, responsive UI (Next.js App Router + Tailwind CSS)
- Authentication (email/password, magic link)
- Real-time updates for idea submission and voting
- Upvote restriction (one per user)
- Feedback & reporting form
- Legal pages: Terms, Privacy, About
- Accessible, keyboard-friendly modals
- Deployed-ready (Vercel, Netlify, etc.)

---

## Tech Stack

- [Next.js](https://nextjs.org/) 15+
- [Supabase](https://supabase.com/) (Database, Auth, Realtime)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## Getting Started

1. **Clone the repo:**
	```bash
	git clone https://github.com/TheHakan/idea-generator.git
	cd idea-generator
	```
2. **Install dependencies:**
	```bash
	npm install
	# or yarn or pnpm
	```
3. **Set up Supabase:**
	- Create a [Supabase](https://supabase.com/) project
	- Copy your project URL and anon/public key to a `.env.local` file:
	  ```env
	  NEXT_PUBLIC_SUPABASE_URL=your-url
	  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
	  ```
	- Run the SQL in `/sql/` (or see docs) to create the `ideas`, `idea_votes`, and `feedback` tables and the `upvote_idea` function
4. **Run the dev server:**
	```bash
	npm run dev
	```
5. **Open** [http://localhost:3000](http://localhost:3000)

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes (keep code clean and readable)
4. Add tests if possible
5. Open a pull request with a clear description

**All contributions must follow the [Code of Conduct](CODE_OF_CONDUCT.md) and respect the community guidelines.**

---

## License

MIT. See [LICENSE](LICENSE) for details.

---

## Credits

- [Next.js](https://nextjs.org/), [Supabase](https://supabase.com/), [Tailwind CSS](https://tailwindcss.com/), [React Icons](https://react-icons.github.io/react-icons/)
- Project by [TheHakan](https://github.com/TheHakan)
