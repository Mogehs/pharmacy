import React, { useState } from "react";
import Hero from "./Hero";
import Overview from "./Overview";
import Instructors from "./Instructors";
import ReviewForm from "./AddReview";
import NewsLater from "./NewsLater";
import ReviewList from "./ReviewList";
import { useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../../features/courseApi";

const CourseDetail = () => {
  //   const pharmacyCourses = [
  //     {
  //       id: "6818a9a37524cdb18c8590be",
  //       title: "Advanced Clinical Pharmacy,Techniques",
  //       instructor: "Dr. Sarah Khan",
  //       image: "/courses/cr1.jpg",
  //       instructorImage: "/courses/dr1.jpg",
  //       price: "$45",
  //       label1: "Hot",
  //       label2: "New",
  //       students: "5623",
  //       category: "Clinical Pharmacy",
  //       description:
  //         "Master advanced techniques in clinical pharmacy practice, focusing on evidence-based patient care, therapeutic strategies, and the application of clinical guidelines. This course helps you understand complex drug interactions, patient monitoring, and therapy optimization. You'll develop the skills needed to contribute effectively in clinical settings and make impactful therapeutic decisions.",
  //     },
  //     {
  //       id: 2,
  //       title: "Pharmaceutical Chemistry,Basics",
  //       instructor: "Dr. Rai Hamza",
  //       image: "/courses/cr2.jpg",
  //       instructorImage: "/courses/dt1.jpg",
  //       price: "$30",
  //       label1: "New",
  //       label2: "Top",
  //       students: "4387",
  //       category: "Chemistry",
  //       description:
  //         "Gain a foundational understanding of pharmaceutical chemistry, including the chemical properties of drugs, drug formulation, and analytical techniques. This course is ideal for beginners seeking to explore how chemistry underpins drug development and quality control in the pharmaceutical industry.",
  //     },
  //     {
  //       id: 3,
  //       title: "Pharmacology for Beginners",
  //       instructor: "Dr. Ayesha Randhawa",
  //       image: "/courses/cr3.jpg",
  //       instructorImage: "/courses/dr2.jpg",
  //       price: "$35",
  //       label1: "Hot",
  //       label2: "Free",
  //       students: "2890",
  //       category: "Pharmacology",
  //       description:
  //         "Explore the fundamental principles of pharmacology including drug actions, side effects, and mechanisms. This course is tailored for students or professionals new to the field and offers a solid base for understanding how drugs interact with biological systems.",
  //     },
  //     {
  //       id: 4,
  //       title: "Drug Interactions &,Safety",
  //       instructor: "Dr. Usman Tariq",
  //       image: "/courses/cr4.jpg",
  //       instructorImage: "/courses/dt2.jpg",
  //       price: "$40",
  //       label1: "Updated",
  //       label2: "Hot",
  //       students: "3502",
  //       category: "Safety",
  //       description:
  //         "Learn to identify, assess, and prevent drug interactions to enhance patient safety. This course provides comprehensive training on recognizing hazardous combinations and understanding pharmacokinetic and pharmacodynamic principles that affect drug safety.",
  //     },
  //     {
  //       id: 5,
  //       title: "Clinical Trials & Research",
  //       instructor: "Dr. Areeba Rehman",
  //       image: "/courses/cr5.jpg",
  //       instructorImage: "/courses/dr3.jpg",
  //       price: "$50",
  //       label1: "Trending",
  //       label2: "Top",
  //       students: "3120",
  //       category: "Research",
  //       description:
  //         "Understand the methodology and regulatory framework behind clinical trials. This course walks you through study design, ethics, protocol writing, and data analysis, preparing you to contribute to high-quality clinical research and drug evaluation.",
  //     },
  //     {
  //       id: 6,
  //       title: "Hospital Pharmacy Practice",
  //       instructor: "Dr. Bilal Nawaz",
  //       image: "/courses/cr6.jpg",
  //       instructorImage: "/courses/dt3.jpg",
  //       price: "$38",
  //       label1: "New",
  //       label2: "Hot",
  //       students: "4233",
  //       category: "Hospital Practice",
  //       description:
  //         "Discover the key roles and responsibilities of hospital pharmacists. This course covers drug dispensing protocols, patient counseling, inventory management, and clinical rounds, equipping you to work efficiently in hospital settings.",
  //     },
  //     {
  //       id: 7,
  //       title: "Essentials of Biopharmaceutics",
  //       instructor: "Dr. CH Tahseen",
  //       image: "/courses/cr7.jpg",
  //       instructorImage: "/courses/dt4.jpg",
  //       price: "$42",
  //       label1: "Hot",
  //       label2: "New",
  //       students: "2701",
  //       category: "Biopharmaceutics",
  //       description:
  //         "Delve into the principles of drug absorption, distribution, metabolism, and excretion. This course is essential for understanding how drug formulation and delivery affect therapeutic outcomes, ensuring optimal drug performance.",
  //     },
  //     {
  //       id: 8,
  //       title: "Pharmacy Law & Ethics",
  //       instructor: "Dr. Sara zafar",
  //       image: "/courses/cr8.jpg",
  //       instructorImage: "/courses/dr4.jpg",
  //       price: "$29",
  //       label1: "Updated",
  //       label2: "Top",
  //       students: "1832",
  //       category: "Pharmacy Law",
  //       description:
  //         "Explore legal frameworks and ethical responsibilities in pharmaceutical practice. This course helps you navigate the laws governing pharmacy operations, patient confidentiality, and professional conduct with clarity and integrity.",
  //     },
  //     {
  //       id: 9,
  //       title: "Introduction to Toxicology",
  //       instructor: "Dr. Waqas Abbas",
  //       image: "/courses/cr9.jpg",
  //       instructorImage: "/courses/dt5.jpg",
  //       price: "$34",
  //       label1: "New",
  //       label2: "Free",
  //       students: "2214",
  //       category: "Toxicology",
  //       description:
  //         "Gain essential knowledge on toxic substances, their effects on health, and methods of detection and treatment. Ideal for healthcare professionals looking to enhance their ability to manage poisoning and chemical exposure cases.",
  //     },
  //     {
  //       id: 10,
  //       title: "Therapeutics and Drug,Therapy",
  //       instructor: "Dr. Kinza Tariq",
  //       image: "/courses/cr10.jpg",
  //       instructorImage: "/courses/dr5.jpg",
  //       price: "$46",
  //       label1: "Trending",
  //       label2: "Hot",
  //       students: "3999",
  //       category: "Therapeutics",
  //       description:
  //         "Understand therapeutic drug use across various disease conditions. This course covers pharmacotherapeutic approaches, treatment guidelines, and case-based learning to prepare you for effective clinical decision-making.",
  //     },
  //     {
  //       id: 11,
  //       title: "Pharmacy Business &,Management",
  //       instructor: "Dr. Fakhar Abbas",
  //       image: "/courses/cr11.jpg",
  //       instructorImage: "/courses/dt6.jpg",
  //       price: "$55",
  //       label1: "Top",
  //       label2: "Hot",
  //       students: "2745",
  //       category: "Pharmacy Management",
  //       description:
  //         "Learn to run and manage a pharmacy business effectively. Topics include inventory management, marketing, customer service, financial operations, and leadership skills essential for pharmacy entrepreneurs.",
  //     },
  //     {
  //       id: 12,
  //       title: "Community Pharmacy,Essentials",
  //       instructor: "Dr. Kiran Rida",
  //       image: "/courses/cr12.jpg",
  //       instructorImage: "/courses/dr6.jpg",
  //       price: "$33",
  //       label1: "Hot",
  //       label2: "Free",
  //       students: "3699",
  //       category: "Community Pharmacy",
  //       description:
  //         "Master the foundations of community pharmacy including prescription handling, patient counseling, OTC medications, and primary healthcare support. This course prepares you to deliver safe and effective pharmacy services to the public.",
  //     },
  //   ];
  const { data: pharmacyCourses = [], isLoading, error } = useGetCoursesQuery();
  const { id } = useParams();

  const course = pharmacyCourses.find((c) => c._id.toString() === id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course.</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <>
      <Hero course={course} />
      <Overview course={course} />
      <Instructors course={course} />
      <NewsLater />
    </>
  );
};
export default CourseDetail;
