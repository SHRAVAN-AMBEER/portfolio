import { pipeline, env } from '@xenova/transformers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const knowledgeBase = [
  {
    question: "Who are you? What is your name and background?",
    answer: "Hi! I am Ambeer Shravan Kumar, an AI/ML Engineer, Full Stack Builder, Software Developer, DevOps Engineer, and Cloud Architect based in Hyderabad, India."
  },
  {
    question: "What is your education? Where do you study and what is your CGPA?",
    answer: "I am pursuing a B.E. in Information Technology at Chaitanya Bharathi Institute of Technology (CBIT), graduating in 2027. My current CGPA is 8.74."
  },
  {
    question: "What are your core programming languages and web development skills?",
    answer: "I am highly proficient in Python, Java, SQL, and JavaScript. For web development, I build applications using HTML, CSS, Bootstrap, React.js, Node.js, Flask, Tailwind CSS, and REST APIs."
  },
  {
    question: "What is your experience in AI, Machine Learning, and Deep Learning?",
    answer: "I specialize in Convolutional Neural Networks (CNNs), Anomaly Detection algorithms, and data science libraries like Pandas, NumPy, Matplotlib, and Scikit-learn."
  },
  {
    question: "Do you have any experience with Big Data, Cloud, and DevOps?",
    answer: "Yes! I work with Apache Kafka, Apache Spark, Hive, Pig, and HDFS for Big Data. I deploy and manage infrastructure using AWS, Docker, GitHub Actions CI/CD pipelines, Nginx, and SSH."
  },
  {
    question: "Tell me about your Cloud-Based Log Analyzer project.",
    answer: "I built a serverless AWS pipeline using S3, Lambda, and OpenSearch. It processes over 10,000 logs for real-time security monitoring by utilizing an Isolation Forest algorithm for anomaly detection."
  },
  {
    question: "Tell me about your Personal Blog CI/CD Pipeline.",
    answer: "I developed a 100% automated deployment pipeline using GitHub Actions, AWS EC2, Nginx, and SSH. Whenever I push code, the deployment is completed in under 30 seconds with zero downtime."
  },
  {
    question: "What is CRYPTOSE?",
    answer: "CRYPTOSE is an AI-powered crypto analytics platform I built using React, Flask, MongoDB, and Matplotlib. It features advanced, role-based dashboards for analyzing cryptocurrency trends."
  },
  {
    question: "Tell me about your Online Movie Ticket Booking System.",
    answer: "I engineered a backend system using SQL, JDBC, and Java that ensures highly safe concurrent seat booking to entirely prevent race conditions and double-booking during peak traffic."
  },
  {
    question: "What certifications or achievements do you have?",
    answer: "I am an Oracle Cloud Infrastructure 2024 Certified Foundations Associate, a MongoDB Certified Developer (Python), and have completed Google Cloud Computing Fundamentals. I am also a 4-Star Python Programmer on HackerRank and represented the CBIT Football Team!"
  },
  {
    question: "How can I contact you or hire you?",
    answer: "You can reach out to me via email at shravanxd99@gmail.com, or use the contact form at the bottom of this portfolio page!"
  },
  {
    question: "What are your greatest strengths?",
    answer: "My greatest strengths are my adaptability to new technologies, my strong foundation in both frontend design and backend systems, and my problem-solving mindset when it comes to scalable cloud architectures."
  },
  {
    question: "What is your experience with DevOps?",
    answer: "I have hands-on experience building CI/CD pipelines using GitHub Actions, containerizing applications with Docker, and deploying full-stack apps on AWS EC2 instances with Nginx reverse proxies."
  },
  {
    question: "Are you looking for an internship or full-time role?",
    answer: "I am actively seeking internship opportunities in Software Engineering, AI/ML, and Cloud Architecture where I can contribute my skills and learn from experienced engineers."
  },
  {
    question: "What is your GitHub and LinkedIn?",
    answer: "You can find my open-source projects on GitHub at github.com/SHRAVAN-AMBEER, and connect with me professionally on LinkedIn!"
  },
  {
    question: "What is your favorite tech stack to build with?",
    answer: "I love building full-stack web applications using Next.js/React on the frontend and Node.js or Flask on the backend, integrated with MongoDB or PostgreSQL databases, and deployed seamlessly on AWS or Vercel."
  }
];

async function generateEmbeddings() {
  console.log("Initializing local Transformers.js Embedding Model (Xenova/all-MiniLM-L6-v2)...");
  
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
    progress_callback: x => console.log(x.status, x.name ? x.name : '')
  });
  
  const texts = knowledgeBase.map(item => `Question: ${item.question}\nAnswer: ${item.answer}`);
  console.log(`Generating embeddings for ${texts.length} items...`);
  
  try {
    const output = await extractor(texts, { pooling: 'mean', normalize: true });
    // @ts-ignore
    const embeddings = output.tolist();
    
    const vectorStore = knowledgeBase.map((item, index) => ({
      ...item,
      embedding: embeddings[index]
    }));
    
    const outputPath = path.join(__dirname, '../src/lib/vector_store.json');
    fs.writeFileSync(outputPath, JSON.stringify(vectorStore, null, 2));
    
    console.log(`✅ Successfully generated local embeddings and saved to ${outputPath}`);
  } catch (err) {
    console.error("Error generating local embeddings:", err);
  }
}

generateEmbeddings();
