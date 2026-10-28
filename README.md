# Dhanushka | AI & Web Developer Portfolio

This is the personal portfolio of **Dhanushka Rathnayaka**, an IT undergraduate at the Institute of Technology of the University of Moratuwa (ITUM). The site showcases projects, AI experiments, technical interests, and services in a responsive, interactive experience.

## Features

- **Modern interactive UI** with glassmorphism, animations, 3D effects, and responsive layouts.
- **Project showcase** powered by Supabase.
- **AI learning roadmap** covering fundamentals through large language models.
- **AI chatbot** with Gemini and Groq integrations.
- **Interactive learning tools**, including a Python learning hub, visualizer, and technology quiz.
- **Contact form** powered by EmailJS.
- **Freelance call-to-actions** for professional collaborations.
- **Vercel Analytics** for production insights.

## Tech Stack

- **Frontend:** [React](https://react.dev/) and [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://motion.dev/)
- **3D and effects:** [Three.js](https://threejs.org/) and [canvas-confetti](https://github.com/catdad/canvas-confetti)
- **Icons:** [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
- **Data and services:** [Supabase](https://supabase.com/) and [EmailJS](https://www.emailjs.com/)
- **AI integrations:** [Google Gemini](https://ai.google.dev/) and [Hugging Face](https://huggingface.co/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dhanuwa856/modern-react-portfolio.git
   cd modern-react-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root. Add the services you intend to use:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

   Keep your `.env` file private and never commit real credentials to the repository.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Vite will display the local URL in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
├── components/       # Portfolio sections and reusable UI components
├── assets/           # Static project assets
├── utils/            # Shared integrations and utility modules
├── App.jsx           # Application routes and top-level layout
├── index.css         # Global styles and Tailwind directives
├── main.jsx          # Application entry point
└── supabaseClient.js # Supabase client configuration
```

## Contact

Interested in working together? Get in touch through the portfolio or connect through:

- [LinkedIn](https://www.linkedin.com/in/dhanushka-rathnayaka/)
- [Facebook](https://www.facebook.com/profile.php?id=61577681014893)
- Email: [infoname259@gmail.com](mailto:infoname259@gmail.com)

---

Built with ❤️ by **Dhanushka Rathnayaka**
