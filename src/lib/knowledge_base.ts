export type QA_Pair = {
  question: string;
  answer: string;
};

export const knowledgeBase: QA_Pair[] = [
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
  }
];
