import React from 'react'
import { GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import Button from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4'
import Code from '../components/core/HomePage/Code';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';

function Home() {
  return (
    <div>
        <div className='mx-auto flex max-w-maxContent flex-col items-center justify-between gap-8 text-white'>
            <Link to={"/signup"}>
            <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-md hover:scale-95 hover:drop-shadow-none">
                <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                <p>Become an Instructor</p>
                <GoArrowRight />
                </div>
            </div>
            </Link>

            <div className="text-center text-4xl font-semibold">
                Empower Your Future with
                <HighlightText text={" Coding Skills"} />
            </div>
            
            <div className="w-[90%] text-center text-base font-bold text-richblack-300">
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            <div className="mt-8 flex flex-row gap-7">
                <Button active={true} linkto={"/signup"}>
                    Learn More
                </Button>
                <Button active={false} linkto={"/login"}>
                    Book a Demo
                </Button>
            </div>

            <div className="mx-5 my-7 w-[70%] shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                <video
                src= {Banner}
                />
            </div>
            
            <div>
                <CodeBlocks
                position={"lg:flex-row"}
                heading={
                <div className="text-4xl font-semibold">
                    Unlock your
                    <HighlightText text={" coding potential"} /> with our online
                    courses.
                </div>
                }
                subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={{
                btnText: "Try it Yourself",
                link: "/signup",
                active: true,
                }}
                ctabtn2={{
                btnText: "Learn More",
                link: "/signup",
                active: false,
                }}
                />
            </div>
            
            <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={" coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
          />
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={" job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </Button>
            </div>
          </div>

        
        </div>

        <div className='w-[1440px] h-[725px] p-[150px]'>
        <InstructorSection></InstructorSection>
        </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Home
