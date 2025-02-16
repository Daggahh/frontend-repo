import React, { useState } from "react";
import styled from "styled-components";
import {
  Search,
  AccountCircle,
  Build,
  Extension,
  Help,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import FooterBottom from "../../Pages/FooterBottom";

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f5f9f9;
`;

const Header = styled.header`
  background-color: #012332;
  padding: 20px;
  text-align: center;
  color: white;
`;

const SearchBarContainer = styled.div`
  background-color: #012332;
  padding: 30px 20px;
  text-align: center;
`;

const SearchInput = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
`;

const IconWrapper = styled.div`
  color: #888;
  margin-right: 10px;
`;

const Section = styled.div`
  padding: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1000px;
  margin: 20px auto;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 20px;

    & > * {
      flex: 0 1 calc(50% - 10px); /* Two per row, accounting for spacing */
    }
  }
`;

const CategoryCard = styled.div`
  width: 22%;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const Icon = styled.div`
  color: #012332;
  font-size: 36px;
  margin-bottom: 10px;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  text-align: left;
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
`;

const Answer = styled.div`
  margin-top: 10px;
  color: #555;
`;
const SupportCenter = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      category: "Getting Started",
      question: "How do I learn the basics to get started with the tracker?",
      answer:
        "To get started with our tracker, log in to your account, navigate to the 'Overview' section, and follow the on-screen instructions to set up your profile. Explore the guided tutorials for a walkthrough.",
      isOpen: false,
    },
    {
      id: 2,
      category: "Account Management",
      question: "How do I update my account details?",
      answer:
        "Go to the 'Account Management' section, click on 'Edit Profile,' and make the necessary changes. Remember to save your changes before leaving the page.",
      isOpen: false,
    },
    {
      id: 3,
      category: "Feature Guides",
      question: "What are some advanced features of the tracker?",
      answer:
        "Advanced features include integration with external tools, detailed analytics, and custom reports. Visit the 'Feature Guides' section for more details.",
      isOpen: false,
    },
    {
      id: 4,
      category: "Support",
      question: "How do I contact customer support?",
      answer:
        "To contact customer support, visit the 'Support' section, where you can find FAQs, tutorials, and our contact form for assistance.",
      isOpen: false,
    },
    {
      id: 5,
      category: "Job Application Tracker",
      question: "How does it work?",
      answer:
        "Our job application tracker simplifies your job search by organizing applications, deadlines, and interviews. You can easily set reminders and receive notifications to ensure you never miss an opportunity. It helps you stay on top of your job hunt efficiently.",
      isOpen: false,
    },
    {
      id: 6,
      category: "User Experience",
      question: "Is it user-friendly?",
      answer:
        "Absolutely! Our tracker is designed with simplicity in mind, making it accessible for everyone. You don’t need to be tech-savvy to navigate its features. Just sign up and start managing your applications effortlessly.",
      isOpen: false,
    },
    {
      id: 7,
      category: "Job Application Management",
      question: "How do I add a new job application?",
      answer:
        "Navigate to the 'Add Job' section, fill out the required details, and click 'Save' to track your application.",
      isOpen: false,
    },
    {
      id: 8,
      category: "Reminders and Notifications",
      question: "Can I set reminders for deadlines?",
      answer:
        "Yes, you can set customized reminders for application deadlines and interview schedules. This feature ensures you stay organized and prepared for every step of your job search. You’ll receive timely notifications to keep you on track.",
      isOpen: false,
    },
    {
      id: 9,
      category: "Data Security",
      question: "Is my data secure?",
      answer:
        "We prioritize your privacy and data security. Your information is stored securely and is only accessible to you. We implement industry-standard security measures to protect your data from unauthorized access.",
      isOpen: false,
    },
    {
      id: 10,
      category: "Support",
      question: "What if I need help?",
      answer:
        "Our support team is here to assist you with any questions or issues you may encounter. You can reach out to us via the contact button for prompt assistance. We're dedicated to ensuring you have a smooth experience with our tracker.",
      isOpen: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleFAQ = (id) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq))
    );
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      (selectedCategory ? faq.category === selectedCategory : true) &&
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <Header>
        <h1>Welcome to JobJott Support Center!</h1>
      </Header>

      <SearchBarContainer>
        <SearchInput>
          <IconWrapper>
            <Search />
          </IconWrapper>
          <Input
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInput>
      </SearchBarContainer>

      <Section>
        <SectionTitle>Categories</SectionTitle>
        <CategoriesContainer>
          <CategoryCard onClick={() => setSelectedCategory("Getting Started")}>
            <Icon>
              <Help />
            </Icon>
            Getting Started
          </CategoryCard>
          <CategoryCard
            onClick={() => setSelectedCategory("Account Management")}
          >
            <Icon>
              <AccountCircle />
            </Icon>
            Account Management
          </CategoryCard>
          <CategoryCard onClick={() => setSelectedCategory("Feature Guides")}>
            <Icon>
              <Extension />
            </Icon>
            Feature Guides
          </CategoryCard>
          <CategoryCard onClick={() => setSelectedCategory("Support")}>
            <Icon>
              <Build />
            </Icon>
            Support
          </CategoryCard>
        </CategoriesContainer>
      </Section>

      <Section>
        <FAQContainer>
          {filteredFAQs.map((faq) => (
            <FAQItem key={faq.id} onClick={() => toggleFAQ(faq.id)}>
              <Question>
                <span>{faq.question}</span>
                {faq.isOpen ? <ExpandLess /> : <ExpandMore />}
              </Question>
              {faq.isOpen && <Answer>{faq.answer}</Answer>}
            </FAQItem>
          ))}
          {filteredFAQs.length === 0 && <p>No FAQs found for your query.</p>}
        </FAQContainer>
      </Section>

      <FooterBottom />
    </PageContainer>
  );
};

export default SupportCenter;
