import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";

function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For API error handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      setLoading(false);
    } catch (error) {
      console.error("ERROR MESSAGE - ", error.message);
      setError("Failed to send message. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got an Idea? We&apos;ve got the skills. Let&apos;s team up.
      </h1>
      <p>Tell us more about yourself and what you&apos;ve got in mind.</p>
      <form
        className="flex flex-col gap-7"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstname" className="lable-style">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("firstname", { required: "Please enter your name." })}
              aria-label="First Name"
            />
            {errors.firstname && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.firstname.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastname" className="lable-style">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter last name"
              className="form-style"
              {...register("lastname")}
              aria-label="Last Name"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="lable-style">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            className="form-style"
            {...register("email", { required: "Please enter your Email address." })}
            aria-label="Email Address"
          />
          {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber" className="lable-style">
            Phone Number
          </label>

          <div className="flex gap-5">
            <div className="flex w-[81px] flex-col gap-2">
              <select
                className="form-style"
                {...register("countrycode", { required: true })}
                aria-label="Country Code"
              >
                {CountryCode.map((ele, i) => (
                  <option key={i} value={ele.code}>
                    {ele.code} - {ele.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                type="number"
                id="phonenumber"
                placeholder="12345 67890"
                className="form-style"
                {...register("phoneNo", {
                  required: "Please enter your Phone Number.",
                  maxLength: { value: 12, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone Number" },
                })}
                aria-label="Phone Number"
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="lable-style">
            Message
          </label>
          <textarea
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            className="form-style"
            {...register("message", { required: "Please enter your Message." })}
            aria-label="Message"
          />
          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.message.message}
            </span>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          disabled={loading}
          type="submit"
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
            !loading &&
            "transition-all duration-200 hover:scale-95 hover:shadow-none"
          } disabled:bg-richblack-500 sm:text-[16px]`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </>
  );
}

export default ContactUsForm;
