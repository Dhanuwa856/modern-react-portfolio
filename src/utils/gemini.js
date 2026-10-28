const SYSTEM_PROMPT = `
## IDENTITY & ROLE
You are "Dhanushka's AI Assistant", a friendly, smart, and concise AI assistant on Dhanushka Rathnayaka's portfolio (www.dhanushka.live).

## LANGUAGE POLICY
- If the user asks in SINHALA (or Singlish) -> Respond warmly in SINHALA.
- If the user asks in ENGLISH -> Respond clearly in ENGLISH.

## ABOUT DHANUSHKA RATHNAYAKA
- Role: IT Undergraduate at ITUM (Institute of Technology, University of Moratuwa).
- Focus: AI Engineer (Machine Learning, Deep Learning, Python) & Full-Stack Web Developer (MERN Stack, Next.js, FastAPI).
- Freelancing: Available on Upwork and Fiverr for AI integration and Full-Stack web projects.
- Community: Founder of "Dhanushka's AI Code Hub" on Facebook.

## TECH STACK & SKILLS
- AI & Machine Learning: Python, NumPy, Pandas, Scikit-learn, XGBoost, Neural Networks, LLMs & RAG.
- Full-Stack Web Development: React.js, Next.js, Node.js, Express.js, FastAPI, MongoDB, Supabase (PostgreSQL), Tailwind CSS, Framer Motion.

## FEATURED PROJECTS
1. talking-hands-lk: Sri Lankan Sign Language (SLSL) to Sinhala Text & Speech Translator powered by AI.
2. GeoBlood: Full-stack blood donation platform built with React, FastAPI, and MongoDB.
3. Neural-Math-Engine: A Deep Learning engine built entirely from scratch using pure NumPy.
4. ITUM Sports Meet Dashboard: Real-time championship leaderboard and dashboard built with Next.js and Supabase.
5. Riyasewana Car Price Predictor: XGBoost machine learning model integrated with a React frontend.

## CONTACT DETAILS
- Email: infoname259@gmail.com
- GitHub: https://github.com/Dhanuwa856
- LinkedIn: https://www.linkedin.com/in/dhanushka-rathnayaka
- WhatsApp: +94 76 009 3002 (or click the "Let's Talk" button in the top bar).

## STYLE
Keep answers clear, helpful, and concise (2-4 sentences). Use plain text without heavy markdown clutter.
`;

/**
 * Built-in Smart Local Knowledge Base Fallback
 * Guarantees the chatbot ALWAYS works 100% even if API keys are missing or rate-limited.
 */
const getSmartLocalFallback = (userMessage) => {
  const q = userMessage.toLowerCase();
  const isSinhala =
    /[\u0D80-\u0DFF]/.test(userMessage) ||
    /\b(kohomada|kawuda|mokakda|monawada|wisthara|gana|kiyanna|karanna|puluwanda|machan)\b/i.test(q);

  if (q.includes('project') || q.includes('වැඩ') || q.includes('නිර්මාණ') || q.includes('work')) {
    return isSinhala
      ? "ධනුෂ්ක කරපු ප්‍රධාන AI සහ Full-Stack projects තමයි:\n- talking-hands-lk (සංඥා භාෂාව සිංහලට පරිවර්තනය කරන AI පද්ධතිය)\n- Neural-Math-Engine (NumPy වලින් මුල සිටම හදපු Deep Learning Engine එක)\n- GeoBlood (React, FastAPI සහ MongoDB වලින් හදපු ලේ දන්දීමේ වෙබ් අඩවිය)\n- Riyasewana Car Price Predictor (XGBoost ML මොඩලය)\nProjects කොටසින් මේවායේ Live Demo සහ GitHub code බලාගන්න පුළුවන්!"
      : "Here are Dhanushka's top AI & Full-Stack projects:\n- talking-hands-lk: AI Sri Lankan Sign Language to Sinhala translator\n- Neural-Math-Engine: Deep Learning engine built from scratch in NumPy\n- GeoBlood: Full-Stack blood donation platform (React, FastAPI, MongoDB)\n- Riyasewana Car Price Predictor: XGBoost ML web app\n- ITUM Sports Meet Dashboard: Real-time Next.js & Supabase app.";
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('python') || q.includes('react') || q.includes('දන්න')) {
    return isSinhala
      ? "ධනුෂ්ක ප්‍රධාන වශයෙන්ම AI Engineering සහ Full-Stack Development කරනවා. AI සඳහා Python, NumPy, Pandas, Scikit-learn, XGBoost සහ LLMs භාවිතා කරන අතර Web සඳහා React, Next.js, Node.js, FastAPI, MongoDB, Supabase සහ Tailwind CSS භාවිතා කරනවා."
      : "Dhanushka specializes in AI Engineering and Full-Stack Development. His AI stack includes Python, NumPy, Pandas, Scikit-learn, and XGBoost, while his Full-Stack web stack covers React, Next.js, Node.js, FastAPI, MongoDB, Supabase, and Tailwind CSS.";
  }

  if (q.includes('education') || q.includes('itum') || q.includes('university') || q.includes('campus') || q.includes('ඉගෙන') || q.includes('විශ්වවිද්‍යාල')) {
    return isSinhala
      ? "ධනුෂ්ක මොරටුව විශ්වවිද්‍යාලයේ තාක්ෂණ ආයතනයේ (ITUM) තොරතුරු තාක්ෂණ (IT - NDT) උපාධි අපේක්ෂකයෙක් ලෙස අධ්‍යාපනය ලබන අතරම ස්වයං අධ්‍යයනයෙන් AI Engineering හදාරනවා."
      : "Dhanushka is an IT Undergraduate (NDT program) at the Institute of Technology, University of Moratuwa (ITUM), combining software engineering fundamentals with hands-on AI & Machine Learning research.";
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('whatsapp') || q.includes('phone') || q.includes('සම්බන්ධ')) {
    return isSinhala
      ? "ධනුෂ්කව සම්බන්ධ කරගන්න infoname259@gmail.com වෙත ඊමේල් එකක් එවන්න, නැතිනම් ඉහළ තියෙන 'Let's Talk' බොත්තමෙන් WhatsApp (+94 76 009 3002) හරහා කතා කරන්න. Upwork හරහාද Freelance වැඩ ලබා දිය හැකියි!"
      : "You can reach Dhanushka via email at infoname259@gmail.com, on WhatsApp (+94 76 009 3002) using the 'Let's Talk' button, or hire him directly on Upwork for AI and Full-Stack projects!";
  }

  if (q.includes('who') || q.includes('about') || q.includes('dhanushka') || q.includes('කවුද')) {
    return isSinhala
      ? "මම ධනුෂ්ක රත්නායකගේ AI සහායකයා! ධනුෂ්ක කියන්නේ ITUM හි ඉගෙනුම ලබන, AI Engineering (Python/ML) සහ Full-Stack Web Development (MERN/Next.js/FastAPI) වලට දක්ෂ නිර්මාණශීලී Developer කෙනෙක්."
      : "Dhanushka Rathnayaka is an IT Undergraduate at ITUM (University of Moratuwa), an AI Engineer in training, and a Full-Stack Developer skilled in Python, Machine Learning, React, Next.js, FastAPI, and the MERN stack.";
  }

  return isSinhala
    ? "ආයුබෝවන්! මම ධනුෂ්කගේ AI Assistant. ඔයාට ධනුෂ්කගේ AI සහ Full-Stack Projects, Tech Stack එක, ITUM අධ්‍යාපන විස්තර හෝ ඔහුව සම්බන්ධ කරගන්නා ආකාරය ගැන ඕනෑම දෙයක් මගෙන් අහන්න පුළුවන්!"
    : "Hi there! I'm Dhanushka's AI Assistant. Feel free to ask me about his AI & Full-Stack projects (like talking-hands-lk or Neural-Math-Engine), his Python & MERN tech stack, his studies at ITUM, or how to hire him!";
};

export const getAIChatResponse = async (userMessage) => {
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // 1. Try Groq API with current supported Llama 3.3 / 3.1 models if key exists
  if (groqKey) {
    const modelsToTry = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
    for (const modelName of modelsToTry) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${groqKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: userMessage },
            ],
            temperature: 0.5,
            max_tokens: 220,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply) return reply.trim();
        }
      } catch (err) {
        console.warn(`Groq (${modelName}) fallback:`, err);
      }
    }
  }

  // 2. Try Google Gemini API if key exists
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${userMessage}` }],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply.trim();
      }
    } catch (err) {
      console.warn('Gemini API fallback:', err);
    }
  }

  // 3. Guaranteed Smart Built-In Fallback (Never fails!)
  return getSmartLocalFallback(userMessage);
};