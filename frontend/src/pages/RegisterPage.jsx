import Navbar from "../components/common/Navbar";
import PrimaryButton from "../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/userSlice";
import { useEffect, useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get registered status
    const storageKey = "registerStatus";
  const registerStatus = JSON.parse(localStorage.getItem(storageKey));

  // redirect if user has registered
  useEffect(() => {
    if (registerStatus) {
      navigate("/");
    }
  }, [registerStatus, navigate]);

  // local form state
  const [form, setForm] = useState({
    name: "",
    age: "",
    year: "1",
    school: "Junior High School",
    email: "",
    password: "",
  });

  // handle input changes
  const updateField = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // submit handler
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill name, email, and password.");
      return;
    }

    try {
      await dispatch(register(form));
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="bg-linear-to-tr from-[#f89451] to-[var(--primary)] min-h-screen">
      <Navbar accentColor={"yellow"} />

      <div className="flex flex-col items-center gap-6">
        <h1 className="text-[var(--neutral)]">
          Let's get to know{" "}
          <span className="text-[var(--darker-secondary)]">you</span>!
        </h1>

        {/* Registration Form */}
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-[var(--neutral)] text-body font-bold"
            >
              How may I call you?
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name here"
              value={form.name}
              onChange={updateField}
              className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
            />
          </div>

          {/* Age + Year */}
          <div className="flex gap-10">
            {/* Age */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="age"
                className="text-[var(--neutral)] text-body font-bold"
              >
                How old are you?
              </label>
              <input
                type="number"
                id="age"
                placeholder="Age"
                value={form.age}
                onChange={updateField}
                className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)] w-26"
              />
            </div>

            {/* Year + School */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="year"
                className="text-[var(--neutral)] text-body font-bold"
              >
                What year are you in?
              </label>

              <div className="flex gap-2.5">
                <select
                  id="year"
                  value={form.year}
                  onChange={updateField}
                  className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
                >
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                </select>

                <select
                  id="school"
                  value={form.school}
                  onChange={updateField}
                  className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
                >
                  <option value="Junior High School">Junior High School</option>
                  <option value="Senior High School">
                    Senior High School
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-[var(--neutral)] text-body font-bold"
            >
              What is your active email?
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email here"
              value={form.email}
              onChange={updateField}
              className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-[var(--neutral)] text-body font-bold"
            >
              Create a password please!
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password here"
              value={form.password}
              onChange={updateField}
              className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-center mt-8">
            <PrimaryButton
              text={"Register"}
              isBig={true}
              bgColor={"yellow"}
              isSubmit={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
