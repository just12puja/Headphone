"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hasScrolled, setHasScrolled] = useState(false);

    // At top: fully transparent, 0 blur. After scroll: frosted glass blur.
    const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(16px)"]);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setHasScrolled(latest > 10);
        });
    }, [scrollY]);

    return (
        <motion.nav
            style={{
                backdropFilter: backdropBlur,
            }}
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-3 transition-all duration-500 ${hasScrolled
                    ? "bg-[#E6D8C3]/85 shadow-[0_1px_0_0_rgba(74,59,40,0.06)]"
                    : "bg-transparent"
                }`}
        >
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start">
                <span className="text-lg md:text-xl font-semibold tracking-tight text-[#3A2E20]">
                    WH-1000XM6
                </span>
            </div>

            {/* Center: Minimalist Links */}
            <div className="hidden md:flex flex-[2] justify-center space-x-8 text-[13px] font-medium text-[#524638]">
                <a href="#overview" className="opacity-80 hover:opacity-100 transition-opacity">Overview</a>
                <a href="#technology" className="opacity-80 hover:opacity-100 transition-opacity">Technology</a>
                <a href="#noise-cancelling" className="opacity-80 hover:opacity-100 transition-opacity">Noise Cancelling</a>
                <a href="#specs" className="opacity-80 hover:opacity-100 transition-opacity">Specs</a>
                <a href="#buy" className="opacity-80 hover:opacity-100 transition-opacity">Buy</a>
            </div>

            {/* Right: Primary CTA */}
            <div className="flex-1 flex justify-end">
                <button className="px-5 py-2 md:px-6 text-[#4A3B28] bg-transparent border border-[#4A3B28]/80 rounded-full text-[13px] font-semibold tracking-wide hover:bg-gradient-to-r hover:from-[#4A3B28] hover:to-[#705E49] hover:text-[#FAF7F2] hover:border-transparent hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300">
                    Pre-order
                </button>
            </div>
        </motion.nav>
    );
}
