import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-[5vw] py-[30px] font-mono text-[0.62rem] font-medium uppercase max-[700px]:flex-wrap max-[700px]:gap-[15px] max-[700px]:px-[6vw] max-[700px]:py-[25px]">
      <Link
        to="/"
        className="font-sans text-[1.1rem] font-extrabold tracking-[-0.08em] text-ink no-underline normal-case"
      >
        <span className="italic">hello</span>works<span className="tracking-normal text-blue">.</span>
      </Link>
      <span className="max-[700px]:order-3 max-[700px]:w-full max-[700px]:text-[0.5rem]">
        © 2026 HelloWorks. All rights reserved.
      </span>
      <Link to="/" className="font-mono text-[0.7rem] font-medium uppercase text-ink no-underline">
        Back to top ↑
      </Link>
    </footer>
  )
}
