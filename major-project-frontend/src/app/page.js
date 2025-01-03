"use client";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Users,
  Newspaper,
  Calendar,
  Book,
  Code,
  Keyboard,
  PartyPopper,
  Rss,
  Home as Hub,
  PersonStanding,
  Send,
  Bot,
} from "lucide-react";
import { FAQ } from "@/components/faq";
import { useState } from "react";

const clubs = [
  { name: "Coding Club", icon: Code },
  { name: "CP Club", icon: Keyboard },
  { name: "Cultural Club", icon: PartyPopper },
  { name: "Publicity ", icon: Rss },
];

const events = [
  // { name: "Annual Tech Fest", date: "October 15-17, 2023" },
  // { name: "Hackathon", date: "November 5-6, 2023" },
  // { name: "Industry Expert Talk Series", date: "Every Last Saturday" },
  { name: "will be updated soon....." },
];

export default function Home() {
  const [resumeResult, setresumeResult] = useState();
  const [loading,setLoading]=useState()
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target.photos.value;
    console.log(data);
  };
  const handleResume = async (e) => {
    e.preventDefault();
    setresumeResult("");
    setLoading(true);
    const formData = new FormData();
    const file = e.target.resume.files[0]; // Get the file
    if (!file) {
      alert("Please upload a file!");
      return;
    }
  
    formData.append("file", file);
  
    try {
      const response = await fetch("http://127.0.0.1:4000/resumeScore", {
        method: "POST",
        body: formData, 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const apiResponse = await response.text();
      const sanitizedResponse = apiResponse.replace(/```json|```/g, '');
        
      try {
        const result = JSON.parse(sanitizedResponse);
        console.log(result)
        setLoading(false)
        setresumeResult(result);
      } catch (err) {
        setresumeResult("something went wrong please check you file")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to upload file and submit data.");
    }
    
  };
  return (
    <div className="space-y-12">
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 p-2">
          Welcome to InsightHub RGUKT-B
        </h1>
        <p className="text-xl text-gray-600 dark:white max-w-2xl mx-auto">
          Empowering minds, shaping futures. Discover a world of opportunities
          and excellence at CSE.
        </p>
      </section>

      <EnhancedCard
        title="DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING"
        icon={<Code className="w-6 h-6" />}
        gradient="dark:bg-sky-950"
      >
        <p className="mb-4 ">
          Our Computer Science Engineering program is designed to equip students
          with cutting-edge knowledge and skills in various aspects of
          computing, from software development to artificial intelligence and
          beyond.
        </p>
        <div className="flex flex-col  gap-5 ">
          <div>
            <h3 className="font-bold mb-2 text-center underline">Vision</h3>
            <p className="text-sm">
              To be a globally recognized centre for excellence in the arena of
              Computer Science & Engineering education and research, catering to
              the current needs of industry and the society by producing
              globally competent and quality computer professionals
            </p>
          </div>
          <div>
            <h3 className="font-bold  text-center underline">Mission</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center">
                <ArrowRight className="mr-2 h-5 w-5 text-green-500" />
                To produce computer science graduates with sound subject
                knowledge, certified skill-sets and to foster leading edge in
                the fast changing field who can address current professional
                challenges
              </li>
              <div className="flex items-center">
                <ArrowRight className="mr-2 h-8 w-8 text-green-500" />
                To inculcate professional behavior and leadership abilities in
                the young minds to implant commitment as work culture for the
                progress of the nation, by producing computer science graduates
                with high levels of ethical, moral, human values and serving the
                society with highest regard to the mother land
              </div>
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-6 w-6 text-green-500" />
                To enhance and strengthen department interaction with Multi
                National Companies to be abreast with growing technological
                advancements by facilitating the students to work with recent
                tools and technologies
              </li>
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                To provide practical exposure in the various domain areas and
                undertake research and development activities in those areas
              </li>
              <div className="flex">
                <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                To develop entrepreneurship and managerial abilities through
                world-class engineering and management education
              </div>
            </ul>
          </div>
        </div>
      </EnhancedCard>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EnhancedCard
          title="Latest News"
          icon={<Newspaper className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-800 dark:to-teal-800"
        >
          <ul className="space-y-2">
            <li className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
              New AI research center opened
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
              Upcoming placement drive
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
              Annual tech fest dates announced
            </li>
          </ul>
        </EnhancedCard>

        <EnhancedCard
          title="Clubs"
          icon={<Users className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800"
        >
          <div className="grid grid-cols-2 gap-2">
            {clubs.map((club) => (
              <div key={club.name} className="flex items-center space-x-2">
                <club.icon className="w-4 h-4 text-purple-500" />
                <span className="text-sm">{club.name}</span>
              </div>
            ))}
          </div>
        </EnhancedCard>

        <EnhancedCard
          title="Upcoming Events"
          icon={<Calendar className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-800 dark:to-orange-800"
        >
          <ul className="space-y-2">
            {events.map((event) => (
              <li
                key={event.name}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium">{event.name}</span>
                <span className="text-xs text-gray-500">{event.date}</span>
              </li>
            ))}
          </ul>
        </EnhancedCard>
      </div>

      <EnhancedCard
        title="Quick Links"
        icon={<Zap className="w-6 h-6" />}
        gradient="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <a
            href="#"
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Academic Calendar
          </a>
          <a
            href="https://www.rgukt.ac.in/cse-faculty.html"
            target="blank"
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Users className="mr-2 h-4 w-4" />
            Staff
          </a>
          <a
            href="https://hub.rgukt.ac.in/"
            target="blank"
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Hub className="mr-2 h-4 w-4" />
            Hub
          </a>
          <a
            href="http://tpcrt.rf.gd/?i=1"
            target="blank"
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <PersonStanding className="mr-2 h-4 w-4" />
            Training & Placement Cell
          </a>
          <a
            href="https://t.me/rgukthub"
            target="blank"
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Send className="mr-2 h-4 w-4" />
            Notice Bot
          </a>
          <a
            href="https://t.me/+82bJNsedrp5lYTk9"
            target="blank"
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Bot className="mr-2 h-4 w-4" />
            Tnp Bot
          </a>
        </div>
      </EnhancedCard>
      <div className="w-full flex flex-col gap-3 h-36 bg-card bg-sky-100 dark:bg-slate-700 rounded-lg shadow-md p-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 justify-center"
        >
          <label htmlFor="photos" className="text-lg">
            Upload Event Pictures
          </label>
          <input type="file" id="photos"></input>
          <button
            type="submit"
            className="bg-red-100 rounded-lg shadow-md p-2 text-center"
          >
            submit
          </button>
        </form>
      </div>
      <div className="w-full flex flex-col gap-3  bg-card bg-sky-100 dark:bg-slate-700 rounded-lg shadow-md p-3 overflow-hidden">
        <form
          onSubmit={handleResume}
          className="flex flex-col gap-2 justify-center"
        >
          <label htmlFor="photos" className="text-xl m-2">
            Upload Your Resume Here for personalized assistance
          </label>
          <input type="file" id="resume"></input>
          {loading?<h1 className="bg-card bg-red-100 dark:bg-slate-700 rounded-lg shadow-md p-2">wait processing your request</h1>:<button
            type="submit"
            className="bg-red-100 rounded-lg shadow-md p-2 text-center"
          >
            submit
          </button>}
        </form>
        <div className="m-2 p-2 overflow-y-scroll">
          {resumeResult && Object.entries(resumeResult).map(([key, value], index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
              {typeof value === "string" ? (
                <p>{value}</p>
              ) : Array.isArray(value) ? (
                <ul className="list-disc list-inside">
                  {value.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : typeof value === "object" && value !== null ? (
                <div className="ml-4">
                  {Object.entries(value).map(([subKey, subValue], subIndex) => (
                    <div key={subIndex} className="mb-2">
                      <strong>{subKey.replace(/([A-Z])/g, ' $1')}: </strong>
                      {typeof subValue === "string" ? (
                        <span>{subValue}</span>
                      ) : Array.isArray(subValue) ? (
                        <ul className="list-disc list-inside">
                          {subValue.map((subItem, subIdx) => (
                            <li key={subIdx}>{subItem}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{String(value)}</p>
              )}
            </div>
  ))}
</div>

      </div>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Frequently Asked Questions
        </h2>
        <FAQ />
      </section>
    </div>
  );
}
