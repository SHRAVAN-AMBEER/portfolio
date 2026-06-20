import { pipeline, env } from '@xenova/transformers';
import { Index } from '@upstash/vector';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

const knowledgeBase = [
  {
    id: "kb-1",
    question: "Who are you? What is your name and background?",
    answer: "Hi! I am Ambeer Shravan Kumar, an AI/ML Engineer, Full Stack Builder, Software Developer, DevOps Engineer, and Cloud Architect based in Hyderabad, India."
  },
  {
    id: "kb-2",
    question: "What is your education? Where do you study and what is your CGPA?",
    answer: "I am pursuing a B.E. in Information Technology at Chaitanya Bharathi Institute of Technology (CBIT), graduating in 2027. My current CGPA is 8.74."
  },
  {
    id: "kb-3",
    question: "What are your core programming languages and web development skills?",
    answer: "I am highly proficient in Python, Java, SQL, and JavaScript. For web development, I build applications using HTML, CSS, Bootstrap, React.js, Node.js, Flask, Tailwind CSS, and REST APIs."
  },
  {
    id: "kb-4",
    question: "What is your experience in AI, Machine Learning, and Deep Learning?",
    answer: "I specialize in Convolutional Neural Networks (CNNs), Anomaly Detection algorithms, and data science libraries like Pandas, NumPy, Matplotlib, and Scikit-learn."
  },
  {
    id: "kb-5",
    question: "Do you have any experience with Big Data, Cloud, and DevOps?",
    answer: "Yes! I work extensively with Big Data technologies like Apache Kafka, Apache Spark, Hive, Pig, and HDFS. I deploy and manage infrastructure using AWS (EC2, S3, Lambda), Docker, GitHub Actions CI/CD pipelines, Nginx, and SSH."
  },
  {
    id: "kb-6",
    question: "Tell me about your Cloud-Based Log Analyzer project.",
    answer: "I built a serverless AWS pipeline using S3, Lambda, and OpenSearch. It processes over 10,000 logs for real-time security monitoring by utilizing an Isolation Forest algorithm for anomaly detection."
  },
  {
    id: "kb-7",
    question: "Tell me about your Personal Blog CI/CD Pipeline.",
    answer: "I developed a 100% automated deployment pipeline using GitHub Actions, AWS EC2, Nginx, Docker, and SSH. Whenever I push code, the deployment is completed in under 30 seconds with zero downtime."
  },
  {
    id: "kb-8",
    question: "What is CRYPTOSE?",
    answer: "CRYPTOSE is an AI-powered cryptocurrency analytics platform I built using React.js, Flask, MongoDB, and Matplotlib. It features advanced, role-based dashboards for analyzing cryptocurrency trends in real time."
  },
  {
    id: "kb-9",
    question: "Tell me about your Online Movie Ticket Booking System.",
    answer: "I engineered a backend system using SQL, JDBC, Java, and HTML/CSS that ensures highly safe concurrent seat booking to entirely prevent race conditions and double-booking during peak traffic using transactional concurrency control."
  },
  {
    id: "kb-10",
    question: "What certifications or achievements do you have?",
    answer: "I am an Oracle Cloud Infrastructure 2024 Certified Foundations Associate, a MongoDB Certified Developer (Python), and have completed Google Cloud Computing Fundamentals. I am also a 4-Star Python Programmer on HackerRank and represented the CBIT Football Team!"
  },
  {
    id: "kb-11",
    question: "How can I contact you or hire you?",
    answer: "You can reach out to me via email at shravanxd99@gmail.com, or use the contact form at the bottom of this portfolio page!"
  },
  {
    id: "kb-12",
    question: "What are your greatest strengths?",
    answer: "My greatest strengths are my adaptability to new technologies, my strong foundation in both frontend design and backend systems, and my problem-solving mindset when it comes to scalable cloud architectures and big data."
  },
  {
    id: "kb-13",
    question: "What is your experience with DevOps?",
    answer: "I have hands-on experience building CI/CD pipelines using GitHub Actions, containerizing applications with Docker, and deploying full-stack apps on AWS EC2 instances with Nginx reverse proxies."
  },
  {
    id: "kb-14",
    question: "Are you looking for an internship or full-time role?",
    answer: "I am actively seeking internship opportunities in Software Engineering, AI/ML, Big Data, and Cloud Architecture where I can contribute my skills and learn from experienced engineers."
  },
  {
    id: "kb-15",
    question: "What is your GitHub and LinkedIn?",
    answer: "You can find my open-source projects on GitHub at github.com/SHRAVAN-AMBEER, and connect with me professionally on LinkedIn!"
  },
  {
    id: "kb-16",
    question: "What is your favorite tech stack to build with?",
    answer: "I love building full-stack web applications using Next.js/React on the frontend and Node.js or Flask on the backend, integrated with MongoDB or PostgreSQL databases, and deployed seamlessly on AWS or Vercel."
  },
  {
    id: "kb-17",
    question: "Tell me about Tactical IQ. What tech stack did you use to build it?",
    answer: "Tactical IQ is a Big Data based project. I built it specifically utilizing powerful Big Data streaming and processing tools like Apache Spark and Apache Kafka, completely bypassing traditional web frameworks. It handles massive data pipelines."
  },
  {
    id: "kb-18",
    question: "Tell me about your Football Analytics Platform.",
    answer: "I developed a comprehensive data visualization and analysis tool for tracking football match statistics and trends. I leveraged Python, Pandas, and Scikit-learn to analyze player performance metrics and created interactive DataViz dashboards to present the complex data."
  },
  {
    id: "kb-19",
    question: "Tell me about your Cyber Physical Honeypot project.",
    answer: "I conducted security research by simulating vulnerable physical systems to trap and analyze malicious network actors. I engineered custom network listeners using Python for Threat Analysis, logging unauthorized access attempts and payload signatures to improve network security."
  },
  {
    id: "kb-20",
    question: "Do you do competitive programming?",
    answer: "Yes, I am actively engaged in competitive coding. I have achieved a 4-Star Python Programmer rank on HackerRank and frequently solve algorithmic problems on LeetCode."
  },
  {
    id: "kb-21",
    question: "What extracurricular activities do you participate in?",
    answer: "I represented the CBIT Football Team at the National-Level Inter-Engineering College Sports Fest (VJIT Sports Fest)."
  }
];

async function generateAndUploadEmbeddings() {
  console.log("Initializing local Transformers.js Embedding Model (Xenova/all-MiniLM-L6-v2)...");
  
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
    progress_callback: x => console.log(x.status, x.name ? x.name : '')
  });
  
  const texts = knowledgeBase.map(item => `Question: ${item.question}\nAnswer: ${item.answer}`);
  console.log(`Generating embeddings for ${texts.length} items...`);
  
  try {
    const output = await extractor(texts, { pooling: 'mean', normalize: true });
    // @ts-ignore
    const rawEmbeddings = output.tolist();
    
    const upstashVectors = knowledgeBase.map((item, index) => {
      // Zero-pad the 384-dimensional vector to 768 dimensions to fit Upstash
      // This is mathematically perfect for Cosine Similarity as zeros don't change the magnitude or dot product!
      const vector = [...rawEmbeddings[index], ...Array(384).fill(0)];
      
      return {
        id: item.id,
        vector: vector,
        metadata: {
          question: item.question,
          answer: item.answer
        }
      };
    });
    
    console.log(`Uploading ${upstashVectors.length} zero-padded vectors to Upstash...`);
    await index.upsert(upstashVectors);
    console.log("✅ Successfully generated local embeddings and seeded Upstash Vector Database!");
    
  } catch (err) {
    console.error("Error generating local embeddings:", err);
  }
}

generateAndUploadEmbeddings();
