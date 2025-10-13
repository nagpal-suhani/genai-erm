"use client";

import { useState } from "react";

const WorkingPage = () => {
  // State to handle error for the year inputs
  const [yearErrors, setYearErrors] = useState<boolean[]>([false, false, false]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const regex = /^(?!0)\d{4}$/;

    // Update the error state for the specific year input
    setYearErrors((prev) =>
      prev.map((error, i) => (i === index ? !regex.test(value) : error))
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-black text-foreground">How it works?</h1>
        <p className="mt-0 max-w-2xl text-sm text-muted-foreground">
          From the ML Model, to the website's backend and frontend, here's how it all comes together.
        </p>
      </header>

      {/* Input the 3 images using multer */}
      <form
        action="http://127.0.0.1:8080/api/upload/"
        method="post"
        encType="multipart/form-data"
        className="mt-6"
      >
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Year-1 photo", "Year-2 photo", "Year-3 photo"].map((label, i) => (
            <div key={i} className="flex flex-col gap-6">
              <label className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border/50 bg-card p-6 text-center cursor-pointer hover:border-primary/60">
                <div className="flex h-28 w-full max-w-xs flex-col items-center justify-center rounded-md bg-muted/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11l2 2 4-4" />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">PNG / JPG • recommended 1024×1024</p>
                </div>

                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  required
                  className="sr-only"
                />

                <span className="mt-1 inline-block rounded bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  Click to choose file
                </span>
              </label>

              {/* Year input field */}
              <div className="flex flex-col gap-3">
                <label htmlFor={`year-${i}`} className="block text-sm font-medium text-foreground">
                  Enter Year for image {i+1}
                </label>
                <input
                  id={`year-${i}`}
                  type="text"
                  name={`year[${i}]`}
                  pattern="^(?!0)\d{4}$"
                  maxLength={4}
                  placeholder="Enter year (e.g. 2023)"
                  required
                  className={`mt-2 p-2 w-full rounded border ${
                    yearErrors[i] ? "border-red-500" : "border-muted/50"
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                  onChange={(e) => handleYearChange(e, i)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be a 4-digit year.
                </p>
              </div>
            </div>
          ))}
        </section>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Upload three images: any years of satellite photos of the same location.
          </p>
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Upload images
          </button>
        </div>
      </form>
    </main>
  );
};

export default WorkingPage;
