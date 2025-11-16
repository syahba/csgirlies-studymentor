import Navbar from "../components/common/Navbar";
import PrimaryButton from "../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigation = useNavigate();

  return (
    <div className="bg-linear-to-tr from-[#f89451] to-[var(--primary)] min-h-screen">
      <Navbar accentColor={"yellow"}></Navbar>

      <div className="flex flex-col items-center gap-6">
        <h1 className="text-[var(--neutral)]">
          Let's get to know{" "}
          <span className="text-[var(--darker-secondary)]">you</span>!
        </h1>

        <form action="" className="flex flex-col gap-4">
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
              className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="flex gap-10">
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
                className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)] w-26"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="year"
                className="text-[var(--neutral)] text-body font-bold"
              >
                What year are you in?
              </label>
              <div className="flex gap-2.5">
                <select
                  name="year"
                  id="year"
                  className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
                >
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                </select>

                <select
                  name="school"
                  id="school"
                  className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
                >
                  <option value="junior high">Junior High School</option>
                  <option value="senior high">Senior High School</option>
                </select>
              </div>
            </div>
          </div>

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
              className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
            />
          </div>

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
              className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--secondary)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="flex justify-center mt-8">
            <PrimaryButton
              text={"Register"}
              isBig={true}
              bgColor={"yellow"}
              isSubmit={true}
              onClick={() => navigation("/")}
            ></PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
